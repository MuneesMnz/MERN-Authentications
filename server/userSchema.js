const mongoose = require("mongoose");
const userInfoSchema = new mongoose.Schema(
  {
    uname: String,
    email: { type: String, unique: true },
    phoneNo: String,
    password: String,
  },
  {
    collation: {
      locale: "en_US",
      strength: 1,
    },
  }
);

mongoose.model("userInfo", userInfoSchema);
