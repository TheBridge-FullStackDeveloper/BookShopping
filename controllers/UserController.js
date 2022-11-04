const { User } = require("../models/index");
const bcrypt = require("bcryptjs");
const transporter = require("../config/nodemailer");
const jwt = require("jsonwebtoken")
const {jwt_secret}= require("../config/config.json")["development"]
const UserController = {
  async createUser(req, res, next) {
    try {
      const password = await bcrypt.hash(req.body.password, 10);
      const user = await User.create({
        ...req.body,
        password,
        confirmed: false,
      });
      //url que generamos para que el usuario pueda llamar al endpoint de confirmar su correo
      //recuerda poner el puerto que uses en tu proyecto, en mi caso 8000
      const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
      const url = "http://localhost:8000/users/confirmUser/" + emailToken;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Confirme su registro",
        html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
          <a href="${url}"> Click para confirmar tu registro</a>
          `,
      });
      res.send({
        msg: "User successfully created, please check your email and confirm",
        user,
      });
    } catch (error) {
      console.error(error);
      // res.status(500).send({msg:"Error while creating user",error})
      next(error);
    }
  },
  login(req, res) {
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (!user) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      if (!user.confirmed) {
        res
          .status(400)
          .send({
            message:
              "Por favor señorito o señorita confirme su correo, gracias!",
          });
      }
      const isMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .send({ message: "Usuario o contraseña incorrectos" });
      }
      // const token = jwt.sign({ id: user.id }, jwt_secret);
      // Token.create({ token, UserId: user.id });
      res.send({ message: "Bienvenid@ " + user.name, user });
    });
  },
  async confirm(req, res) {
    try {
      const token = req.params.email
      const payload = jwt.verify(token,jwt_secret)
      await User.update(
        { confirmed: true },
        {
          where: {
            email: payload.email,
          },
        }
      );
      res.status(201).send("Usuario confirmado con éxito");
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = UserController;
