const jwt = require("jsonwebtoken");

const authticationToken = (req, res, next) => {
    try {
        const token = req.header("x-api-key");
        if (!token) { 
        return res.status(401).send({ status: false, message: "No token provided." });
        };
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return res.status(500).send({ status:false ,message:"Invalid Token"})
            }
            req.user = user
            next();
        })
    } catch (error) {
        
    }}

module.exports = { authticationToken }