const { UserModel, BookModel } = require("../models");
// const issuedBook = require("../dtos/book-dto.js");
const IssuedBook = require("../dtos/book-dto.js");

// const getAllBooks = () => {};
exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();
  console.log(books);
  if (books.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Found",
    });
  }
  // console.log(data);
  return res.status(200).json({
    success: true,
    data: books,
  });
};

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
exports.getSingleBookById = async (req, res) => {
  const { id } = req.params;
  const book = await BookModel.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found The Book By Their Id",
    data: book,
  });
};

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModel.find({
    issuedBook: { $exists: true },
  }).populate("issuedBook");

  // Data Transfer Object (DTO)

  const issuedBooks = users.map((each) => new IssuedBook(each));

  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Book Have Been Issued Yet..",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Users With The Issued Books...",
    data: issuedBooks,
  });
};

// router.post("/", (req, res) => {
//   const { data } = req.body;

//   if (!data) {
//     return res.status(400).json({
//       sucess: false,
//       message: "No Data To Add A Book",
//     });
//   }

//   const book = books.find((each) => each.id === data.id);
//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "Id Already Exists !!",
//     });
//   }
//   const allBooks = { ...books, data };
//   return res.status(201).json({
//     success: true,
//     message: "Added Book Succesfully",
//     data: allBooks,
//   });
// });

exports.addNewBook = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A Book",
    });
  }
  await BookModel.create(data);
  const allBooks = await BookModel.find();

  return res.status(201).json({
    success: true,
    message: "Added Book Succesfully",
    data: allBooks,
  });
};

// router.put("/updateBook/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const book = books.find((each) => each.id === id);

//   if (!book) {
//     return res.status(400).json({
//       success: false,
//       message: "Book Not Found For This ID",
//     });
//   }

//   const updateData = books.map((each) => {
//     if (each.id === id) {
//       return { ...each, ...data };
//     }

//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "Updated a Book By Their Id",
//     data: updateData,
//   });
// });

exports.updateBookById = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  // name="rk"
  // updated ="kr"
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      _id: id,
    },
    data,
    {
      new: true,
    }
  );
  return res.status(200).json({
    success: true,
    message: "Updated a Book By Their Id",
    data: updatedBook,
  });
};

// module.exports = { getAllBooks, getSingleBookById };
