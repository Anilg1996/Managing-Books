const authorModel = require("../models/authorModel")
const { isValidName, isValidEmail, isValidPhone } = require("../validators/validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

// Author Registration 
const registerAuthor = async function (req, res) {
    try {
        const data = req.body
        const { name, phone, email, password } = data
        if (Object.keys(data).length == 0) return res.status(400).send("All Fields are Mandatory")

        //--------------------- Name Validation----------------------------/
        if (!name) return res.status(400).send("Name is required")
        if (!isValidName(name.trim())) return res.status(400).send({ status: false, message: "Please provide a Author Name" })

        //--------------------------Phone Validation-------------------------/

        if (!phone) return res.status(400).send("Phone is required")
        if (!isValidPhone(phone.trim())) return res.status(400).send({ status: false, message: "Please provide a valid Phone Number" })
        let uniquePhone = await authorModel.findOne({ phone: phone })
        if (uniquePhone) return res.status(400).send({ status: false, message: "Phone is already exist" })

        //----------------------- Email Validation---------------------------/

        if (!email) return res.status(400).send("Email is required")
        if (!isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Please provide a valid Email-Id" })
        let uniqueEmail = await authorModel.findOne({ email: email })
        if (uniqueEmail) return res.status(400).send({ status: false, message: "Email is already exist" })

        //---------------------------Password Validation--------------------/

        if (!password) return res.status(400).send("Password is required")
        const hashedPassword = await bcrypt.hash(password, 10);

        const newAuthor = new authorModel({
            name,
            email,
            phone,
            password : hashedPassword
        });

        let saveData = await newAuthor.save();
        return res.status(201).send({ status: true, message: "Author Registration Complete", authorData:  saveData})
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

// Author Login
const login = async function (req, res) {
    try {

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "login credentials required" })

        const {email, password } = req.body

        if (!email || !password) return res.status(400).send({ status: false, message: "Email and Password are required" })
    
            const author = await authorModel.findOne({ email: email })
            if (!author) {
                return res.status(400).send({status: false, message: "Your email is not Exist go to registration page"})
            }
            const passwordCorrect = await bcrypt.compare(password, author.password)
            if(!passwordCorrect){
                return res.status(400).send({ status: false, message: "Invalid Password"})
            }
            const { _id } = author
            const accessToken = jwt.sign(
                {
                    id: _id.toString(),
                    email: email
                },
                process.env.ACCESS_TOKEN_SECRET,
            );
            res.setHeader("x-api-key", accessToken);
            const responseData = {
                Id: author.id.toString(),
                email: email,
                name: author.name,
                accessToken: accessToken
            }
            return res.status(201).send({status: true, message: "Login Successful", data: responseData})
            }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }}


module.exports = { registerAuthor, login }