const express = require("express");

const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcryptjs = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://mnz:mnz123@cluster0.3pyhzll.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

app.listen(5000, () => {
  console.log(" server started");
});

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

// app.post("/register", async (req, res) => {
//   const { name, email, mobile, password } = req.body;

//   try {
//     const oldEmail = await User.findOne({ email });

//     if (oldEmail) {
//       return res.status(400).json({ error: "Already Used Email" });
//     }
//     const encryptedPassword = await bcryptjs.hash(password, 10);
//     await User.create({
//       uname: name,
//       email,
//       phoneNo: mobile,
//       password: encryptedPassword,
//     });
//     res.status(201).json({ message: "Registrtion Successfull" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal seerver Error" });
//   }
// });

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
