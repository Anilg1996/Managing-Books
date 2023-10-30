const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const route = require("./routes/route");
const dbConnect = require("./config/dbConnect");
dbConnect();

app.use(express.json());
app.use('/', route);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on Port ${process.env.PORT}`);
})





