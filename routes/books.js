const express = require("express");
const {
  getAllBooks,
  getSingleBookById,
  getAllIssuedBooks
} = require("../controllers/book-controller");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");
// const { route } = require("./users");

// const BookModel = require('../models/book-model');
// const UserModel = require("../models/user-model");

const router = express.Router();

const { UserModel, BookModel } = require("../models/index");

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get books by their id
 * Access: Public
 * Parameters: Id
 */
router.get("/:id", getSingleBookById);
// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const book = books.find((each) => each.id === id);

//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book Not Found",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "Found The Book By Their Id",
//     data: book,
//   });
// });

/**
 * Route: /books
 * Method: GET
 * Description: Getting all books
 * Access: Public
 * Parameters: None
 */
router.get("/", getAllBooks);
// router.get("/", (req, res) => {
//   res
//     .status(200)
//     .json({ sucess: true, message: "Got all the Books", data: books });
// });

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued/by-user", getAllIssuedBooks);

/**
 * Route: /
 * Method: POST
 * Description: Adding a New Book
 * Access: Public
 * Parameters: None
 * Data : id, name, genre, price, publisher, author
 */
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A Book",
    });
  }

  const book = books.find((each) => each.id === data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "Id Already Exists !!",
    });
  }
  const allBooks = { ...books, data };
  return res.status(201).json({
    success: true,
    message: "Added Book Succesfully",
    data: allBooks,
  });
});

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating a Book By Its ID
 * Access: Public
 * Parameters: Id
 * Data : id, name, genre, price, publisher, author
 */
router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book Not Found For This ID",
    });
  }

  const updateData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }

    return each;
  });
  return res.status(200).json({
    success: true,
    message: "Updated a Book By Their Id",
    data: updateData,
  });
});

// router.put("/updateBook/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const book = users.find((each) => each.id === id);
//   if (!book) {
//     return res.status(404).json({
//       success: false,
//       message: "Book Doesn't Exist !!",
//     });
//   }
//   const updateBookData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "Book Updated !!",
//     data: updateBookData,
//   });
// });
module.exports = router;
