const BooksModel = require("../models/books");

export const getBookById = (_id) => BooksModel.findById({ _id });

export const createBooks = (values) =>
  new BooksModel(values).save().then((book) => book.toObject());

export const updateBook = (_id, values) =>
  BooksModel.findByIdAndUpdate(_id, values, {
    new: true,
  });

export const deleteBook = (_id) => BooksModel.findByIdAndDelete({ _id });
