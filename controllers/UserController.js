const { User } = require("../models/index");
const bcrypt = require("bcryptjs")

const UserController = {
      async createUser(req, res) {
        try {
        const password = await bcrypt.hash(req.body.password, 10)
         const user= await User.create({...req.body, password})
         res.send({msg:"User successfully created",user})
        } catch (error) {
            console.error(error)
            res.status(500).send({msg:"Error while creating user",error})
        }
      },
    }

    module.exports = UserController