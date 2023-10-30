const express = require("express");
const router = express.Router(); 

const { registerAuthor, login } = require("../controllers/authorController");
const { createBook, viewAllBooks, viewBookById, updateBooks, deleteBook } = require("../controllers/bookController");
const { authticationToken, authorization } = require("../middleware/auth");

// ---------------------------- [[ Handling Handled Route ]] -----------------------------------
// author Routes
router.post("/register", registerAuthor);
router.post("/login", login);

// Book Routes
router.post("/addbook", authticationToken, createBook);
router.get("/viewallbook", authticationToken, viewAllBooks);
router.get("/viewbookbyid/:bookId", authticationToken, viewBookById);
router.put("/updatebook/:bookId", authticationToken, authorization, updateBooks);
router.delete("/removebook/:bookId", authticationToken, authorization, deleteBook);


module.exports = router

// ------------------------------ [[ Handling unhandled route ]] ------------------------------
router.all("/**", (req, res) => {
    return res.status(400).send({status: true, message: "Your API URL endpoint is Wrong Please Check Endpoint"})
});