const { Genre } = require("../models/index");

const GenreController = {
  async createGenre(req, res) {
    try {
     const genre= await Genre.create(req.body) 
        res.send({msg:"Genre successfully created",genre})
    } catch (error) {
        console.error(error)
        res.status(500).send({msg:"Error while creating genre",error})
    }
  },
};

module.exports = GenreController;
