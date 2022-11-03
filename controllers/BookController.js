const { Book, Genre, GenreBook } = require("../models/index");

const BookController = {
  //   async createBook(req, res) {
  //     try {
  //      const book= await Book.create(req.body)
  //      book.addGenre(req.body.GenreId)
  //      res.send({msg:"Book successfully created",book})
  //     } catch (error) {
  //         console.error(error)
  //         res.status(500).send({msg:"Error while creating book",error})
  //     }
  //   },
  createBook(req, res) {
    Book.create(req.body)
      .then((book) => {
        book.addGenre(req.body.GenreId);
        res.send({ msg: "Book successfully created", book });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ msg: "Error while creating book", error });
      });
  },
  async getAllBooks(req, res) {
    try {
      const books = await Book.findAll({
        include: [{ model: Genre, attributes: ["name"], through: { attributes: [] } }],
      });
      res.send({ msg: "Your books", books });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Error while getting books", error });
    }
  },
  async delete(req, res) {
    try {
        await Book.destroy({
            where: {
                id: req.params.id
            }
        })
        await GenreBook.destroy({
            where: {
                BookId: req.params.id
            }
        })
        res.send({ message: 'The book has been removed'})
    }
     catch (error) {
        console.log(error)
    }
},
async update(req, res) {
    try {
      await Book.update(req.body,
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const book = await Book.findByPk(req.params.id)//nos traemos el libro ya actualizado
      book.setGenres(req.body.GenreId);
      res.send("Book successfully updated");
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "There was a problem trying to update the book" });
    }
  },

};

module.exports = BookController;
