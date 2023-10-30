const bookModel = require("../models/bookModel")
const Validation = require("../validators/validator")
const mongoose = require('mongoose');


// Add Book 

const createBook = async function (req, res) {

    try {
        const data = req.body;

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "No input provided" });
        }

        const { title, authorId, summary } = data;

        if (!authorId) {
            return res.status(400).send({ status: false, message: "Please enter authorId" });
        }

        if (!mongoose.Types.ObjectId.isValid(authorId)) {
            return res.status(400).send({ status: false, message: "Author Id is not valid" });
        }

        if (req.decodedToken && req.decodedToken.authorId && authorId != req.decodedToken.authorId) {
            return res.status(403).send({ status: false, message: "You do not have authorization for this" });
        }

        // Title Validation
        if (!title) {
            return res.status(400).send({ status: false, message: "Please Enter Title" });
        }

        // Assuming Validation.isValid(title) is a custom validation function
        if (!Validation.isValid(title)) {
            return res.status(400).send({ status: false, message: "Please enter a valid title" });
        }

        let findTitle = await bookModel.findOne({ title: title });
        if (findTitle) {
            return res.status(400).send({ status: false, message: "A book already exists with this title" });
        }

        if (!summary) {
            return res.status(400).send({ status: false, message: "Write about Summary for this Book" });
        }

        const bookData = await bookModel.create(data);

        return res.status(201).send({ status: true, message: "Book Created Successfully", data: bookData });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};



// View a List of all Books

const viewAllBooks = async function (req, res) {
    try {
      const getBooksData = await bookModel.find().sort({ _id: -1 });
  
      res.status(200).send({ status: true, message: "All Books List", data: getBooksData });
    } catch (err) {
      return res.status(500).send({ status: false, message: err.message });
    }
  };

// view details of a specific Book 

const viewBookById = async function (req, res) {
    try {
        const bookId = req.params.bookId
        if (!bookId) return res.status(400).send({ status: false, error: "please inter book Id" })

        const books = await bookModel.findById({ _id: bookId }).sort({ _id: -1 })
        if (!books) return res.status(400).send({ status: false, error: "There is no such book exist" })

        return res.status(200).send({ status: true, message: 'Books list', data: books })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

// update details Book 

const updateBooks = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const data = req.body;
        const { title, summary } = req.body;
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, message: "Add fields to update" });
        }
            let findTitle = await bookModel.findOne({ title: title });
            if (findTitle) {
                return res.status(400).send({ status: false, message: "Book already exists for this title" });
            }

        if (summary && !summary) {
            return res.status(400).send({ status: false, message: "Please enter the Summary" });
        }

        let updatedData = await bookModel.findOneAndUpdate(
            { _id: bookId },
            { $set: { title: title, summary: summary } },
            { new: true, upsert: true }
        );

        return res.status(200).send({ status: true, message: "Book updated successfully", data: updatedData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


// Delete Book

const deleteBook = async function (req, res) {
    try {
       const bookId = req.params.bookId
      const deletedBook = await bookModel.findOneAndDelete({ _id: bookId });
  
      if (deletedBook) {
        return res
          .status(200)
          .send({ status: true, message: "Book is deleted successfully" });
      } else {
        return res.status(404).send({ status: false, message: "No Data found for this Id" });
      }
    } catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  };


module.exports = { createBook, viewAllBooks, viewBookById, updateBooks, deleteBook, }