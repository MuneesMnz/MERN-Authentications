const express = require("express");

const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "abcd123";

const mongoUrl =
  "mongodb+srv://mnz:mnz123@cluster0.3pyhzll.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

//SAMPLE TEST FOR POST
//--------------------

app.post("/post", async (req, res) => {
  console.log(req.body);
  const { data } = req.body;

  try {
    if (data === "mnz") {
      res.send({ status: "ok" });
    } else {
      res.send({ status: "User Not Found" });
    }
  } catch (err) {
    res.send({ status: "something went wrong" });
  }
});

//IMPORTING USER SCHEMA AND USING IT

require("./userSchema");
const User = mongoose.model("userInfo");

// REGISTER ROUTE
//---------------

app.post("/register", async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const oldEmail = await User.findOne({ email }); //CHECKING EMAIL EXIST OR NOT

    if (oldEmail) {
      return res.status(400).json({ error: "Already Used Email" });
      // return res.send({ status: "Already Use Email" });
    }

    const encryptedPassword = await bcryptjs.hash(password, 10); //ENCRYPTING PASSWORD

    //POSTING TO MONGODB
    await User.create({
      uname: name,
      email,
      phoneNo: mobile,
      password: encryptedPassword,
    });
    // res.send({ status: "OK" });
    res.status(201).json({ message: "Registrtion Successfull" });
  } catch (error) {
    res.status(500).json({ error: "Internal seerver Error" });
    // res.send({ status: "error" });
  }
});

//LOGIN ROUTE
//---------------

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }); //CHECKING EMAIL AVAILABLE OR NOTE IF AVAILABLE STORE THAT DATA IN TO USER
  if (!user) {
    return res.json({ status: "User not Found" });
  }

  //COMPARING REQ PASSWORD AND BODY APSSWORD WITH THE HELP OF BCRYPT
  if (await bcryptjs.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: 10,
    }); //CRAETING TOKEN
    //CHECKING IF STATUS 201 OR NOT 201 MEANS IT IS SUCCESS
    if (res.status(201)) {
      return res.json({ status: "Login Success", data: token }); //SENDING TOKEN
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});

//USER DATA GET WITH POSTING TOKEN
//--------------------------------

app.post("/userdata", async (req, res) => {
  const { token } = req.body; //PASSING TOKEN

  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      //VERIFYING TOKEN EXPIRE OR NOT
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user === "token expired") {
      return res.send({ status: "error with token", data: "token expired" });
    }
    const userEmail = user.email;
    //FINDING WITH USER EMAIL IF AVAILABLE OR NOT OR ANY ERROR
    User.findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (err) {
    res.send({ status: "error" });
  }
});

//SETING ROUTE TO APP FOR API

app.listen(5000, () => {
  console.log(" server started");
});
// SAMPLE REGISTER ROUTE

// require("./userSchema");
// const User = mongoose.model("userInfo");
// app.post("/register", async (req, res) => {
//   const { name, email, mobile } = req.body;

//   try {
//     await User.create({
//       uname: name,
//       email,
//       phoneNo: mobile,
//     });
//     res.send({ status: "OK" });
//   } catch (error) {
//     res.send({ status: "error" });
//   }
// });
