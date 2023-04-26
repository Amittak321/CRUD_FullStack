require("dotenv").config();
const express = require("express");
const userRoute = require("./routes/userRoute");
const app = express();
const connect = require("./config/db");
connect();


app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/", userRoute);


module.exports = app;