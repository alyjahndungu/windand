const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
import {
  createBooks,
  updateBook,
  getBookById,
  deleteBook,
} from "../services/books.service";

//Endpoint for creating new book
router.post(
  authorize,
  "/books",
  [
    check("title", "Title is required").not().isEmpty(),
    check("author", "Author is required").not().isEmpty(),
    check("genre", "Genre is required").not().isEmpty(),
    check("publishedDate", "publication date is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      await createBooks(req)
        .then((response) => {
          res.status(201).json({
            statusCode: 201,
            message: "Books successfully created!",
            result: response,
          });
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
            message:
              "Sorry, something went wrong on our server. Please try again",
          });
        });
    }
  }
);

//GET BOOK BY ID
router.route("/books/:id").get(authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getBookById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(error);
  }
});

//update books
router.route("/books/:id").patch(authorize, async (req, res) => {
  try {
    const { id } = req.params;
    await updateBook(id, req.body);
    return res.status(200).json({ message: "Book updated successfully" }).end();
  } catch (error) {
    return res.sendStatus(error);
  }
});

//DELETE BOOK BY ID
router.route(authorize, "/books/:id").delete(authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await deleteBook(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.sendStatus(error);
  }
});
