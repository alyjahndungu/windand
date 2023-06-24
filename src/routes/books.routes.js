const express = require("express");
const router = express.Router();
const BooksModel = require("../models/books");

//Endpoint for creating new book
router.post(
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
      const books = new BooksModel({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
      });

      books
        .save()
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
