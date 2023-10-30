const express = require("express");
const router = express.Router(); 

const { registerAuthor, login } = require("../controllers/authorController");
const { createBook, viewAllBooks, viewBookById, updateBooks, deleteBook } = require("../controllers/bookController");

// ---------------------------- [[ Handling Handled Route ]] -----------------------------------
// author Routes
router.post("/register", registerAuthor);
router.post("/login", login);

// Book Routes
router.post("/addbook", createBook);
router.get("/viewallbook", viewAllBooks);
router.get("/viewbookbyid/:bookId", viewBookById);
router.put("/updatebook/:bookId", updateBooks);
router.delete("/removebook/:bookId", deleteBook);


module.exports = router

// ------------------------------ [[ Handling unhandled route ]] ------------------------------
router.all("/**", (req, res) => {
    return res.status(400).send({status: true, message: "Your API URL endpoint is Wrong Please Check Endpoint"})
});