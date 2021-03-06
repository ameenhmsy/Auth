//jshint esversion:6

require("dotenv").config(); //
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => {
   console.log("Port Srv 3000");
});

//...............................................................
app.get("/", function (req, res) {
   res.render("home");
});
app.get("/login", function (req, res) {
   res.render("login");
});
app.get("/register", function (req, res) {
   res.render("register");
});

//...............................................................
const mongoose = require("mongoose");
const md5 = require("md5");

mongoose.connect("mongodb://localhost:27017/userDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({ email: String, password: String });

const User = new mongoose.model("User", userSchema);

app.post("/register", function (req, res) {});

//...............................................................
app.post("/login", (req, res) => {
   const username = req.body.username;
   const password = req.body.password;

   User.findOne({ email: username }, (err, foundUser) => {});
});

//...............................................................

//...............................................................

//...............................................................
