//jshint esversion:6

require("dotenv").config(); //
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const encrypt = require("mongoose-encryption");
const md5 = require("md5"); // ..1

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

mongoose.connect("mongodb://localhost:27017/userDB", {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({ email: String, password: String });
//const secret1 = "Thxxxxxxxxxxxxxxret."; //Secret String Instead of 2 Keys
// userSchema.plugin(encrypt, {
//    secret: process.env.SECRET,
//    encryptedFields: ["password"],
// }); //

const User = new mongoose.model("User", userSchema);

app.post("/register", function (req, res) {
   const newUser = new User({
      email: req.body.username,
      password: md5(req.body.password), // ..2
   }); // Create user

   newUser.save((err) => {
      err ? console.log(err) : res.render("secrets");
   }); // Save user
});

//...............................................................
app.post("/login", (req, res) => {
   const username = req.body.username;
   const password = md5(req.body.password); // ..3

   User.findOne({ email: username }, (err, foundUser) => {
      if (err) {
         console.log(err);
      } else {
         if (foundUser) {
            if (foundUser.password === password) {
               res.render("secrets");
            }
         }
      }
   });
});

//...............................................................
