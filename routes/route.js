const express = require("express");
const router = express.Router(); 

const { registerAuthor, login } = require("../controllers/authorController");

// ---------------------------- [[ Handling Handled Route ]] -----------------------------------
// author Routes
router.post("/register", registerAuthor);
router.post("/login", login);


module.exports = router

// ------------------------------ [[ Handling unhandled route ]] ------------------------------
router.all("/**", (req, res) => {
    return res.status(400).send({status: true, message: "Your API URL endpoint is Wrong Please Check Endpoint"})
});