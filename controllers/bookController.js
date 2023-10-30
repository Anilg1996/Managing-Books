const bookModel = require("../models/bookModel")
const Validation = require("../validators/validator")
const { isValidObjectId } = require("mongoose")


//__________________________ Add Book  ___________________________________________//

const createBook = async function (req, res) {

    try {
        const data = req.body
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, message: "No input provided" });
        const { title, authorId, summary } = data

        if (!authorId) return res.status(400).send({ status: false, message: "Please enter authorId" })
        if (!isValidObjectId(authorId)) return res.status(400).send({ status: false, message: "user Id is not valid" })
        if (authorId != req.decodedToken.authorId) return res.status(403).send({ status: false, msg: "you do not have authorization to this " });

        //  -------------------------------Title Validation-----------------------
        if (!title) return res.status(400).send({ status: false, message: "Please Enter Title" })
        if (!Validation.isValid(title)) return res.status(400).send({ status: false, message: "please inter valid title" })
        let findTitle = await bookModel.findOne({ title: title })
        if (findTitle) return res.status(400).send({ status: false, message: "Book allrady exist for this title " })

        if (!excerpt) return res.status(400).send({ status: false, message: "Please enter excerpt" })
        if (!Validation.isValid(excerpt)) return res.status(400).send({ status: false, message: "please inter valid excerpt" })


        const bookData = await bookModel.create(data)
        res.status(201).send({ status: true, data: bookData })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



// ----------------------------------getBookbyPathParam----------------------------------

const getBookbyParam = async function (req, res) {
    try {
        const bookId = req.params.bookId
        if (!bookId) return res.status(400).send({ status: false, error: "please inter bookid" })
        if (!isValidObjectId(bookId)) return res.status(400).send({ status: false, msg: "Enter a valid bookId" })

        const books = await bookModel.findById({ _id: bookId })
        if (!books) return res.status(400).send({ status: false, error: "there is no such book exist" })

        const bookWithReview = await reviewModel.find({ bookId: bookId, isDeleted: false })

        return res.status(200).send({ status: true, message: 'Books list', data: book1 })
    } catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}




//------------------update API-----------------------//

const updateBooks = async function (req, res) {
    try {
        const bookId = req.params.bookId
        const data = req.body
        const { title, excerpt, releasedAt, ISBN } = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Add fields to update" });

        if (title) {
            if (!Validation.isValid(title)) return res.status(400).send({ status: false, message: "please inter valid title" })
            let findTitle = await bookModel.findOne({ title: title })
            if (findTitle) return res.status(400).send({ status: false, message: "Book allrady exist for this title " })
        }
        if (ISBN) {
            if (!Validation.isValidISBN(ISBN)) return res.status(400).send({ status: false, message: "please inter valid ISBN" })
            let sibnBook = await bookModel.findOne({ ISBN: ISBN })
            if (sibnBook) return res.status(400).send({ status: false, message: "Book allrady exist for this SIBN " })
        }

        let updatedData = await bookModel.findOneAndUpdate({ _id: bookId }, {
            $set: { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }
        }, { new: true, upsert: true })

        return res.status(200).send({ status: true, msg: "Book updated successfuly", data: updatedData })

    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}


//------------------Delete Blog by path param-----------------------//

const deleteBook = async (req, res) => {
    try {
        let bookId = req.params.bookId
        const delatedbookId = await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: new Date(Date.now()) }, }, { new: true });

        if (delatedbookId) {
            await reviewModel.updateMany({ bookId: delatedbookId._id }, { $set: { isDeleted: true } });
            return res.status(200).send({ status: true, msg: "Book is deleated successfuly with its reviews", data: delatedbookId })
        } else {
            return res.status(404).send({ status: false, msg: "No Book found for this id" })
        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message });
    }
};



module.exports = { createBook, getBooks, updateBooks, deleteBook, getBookbyParam }