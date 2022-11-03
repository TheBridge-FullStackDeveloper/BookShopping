const express = require("express")
const GenreController = require("../controllers/GenreController")
const router = express.Router()

router.post("/createGenre",GenreController.createGenre)

module.exports = router