const express = require("express");

const app = express();
const mongoose = require("mongoose");
app.use(express.json());

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

require("./userSchema");
const User = mongoose.model("userInfo");

app.post("/register", async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    await User.create({
      uname: name,
      email,
      phoneNo: mobile,
    });
    res.send({ status: "OK" });
  } catch (error) {
    res.send({ status: "error" });
  }
});
