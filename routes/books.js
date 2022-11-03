const express = require("express")
const BookController = require("../controllers/BookController")
const router = express.Router()

router.post("/createBook",BookController.createBook)
router.get("/getAllBooks",BookController.getAllBooks)
router.delete("/destroyBook/:id",BookController.delete)
router.put("/updateBook/:id",BookController.update)

module.exports = router