const jwt = require("jsonwebtoken");
const bookModel = require("../models/bookModel");

// Authentication 
const authticationToken = (req, res, next) => {
    try {
        const token = req.header("x-api-key");
        if (!token) {
            return res.status(401).send({ status: false, message: "No token provided." });
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(500).send({ status: false, message: "Invalid Token" });
            }
            req.user = user;
            next();
        });
    } catch (err) { 
        return res.status(500).send({ message: err.message });
    }
}

// Authorization
const authorization = async function (req, res, next) {
    try {
        const { bookId } = req.params; 

        let book = await bookModel.findOne({ _id: bookId });

        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found!" });
        }

        if (!book.authorId) {
            return res.status(500).send({ status: false, message: "AuthorId is not defined in the book" });
        }

        next();
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


module.exports = { authticationToken, authorization }