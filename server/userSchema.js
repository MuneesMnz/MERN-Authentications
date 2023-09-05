const mongoose = require("mongoose");
const userInfoSchema = new mongoose.Schema(
  {
    uname: String,
    email: String,
    phoneNo: String,
  },
  {
    collation: "userInfo",
  }
);

mongoose.model("userInfo", userInfoSchema);
