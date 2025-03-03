const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://tyagiyash2612:Yash2612@cluster0.ssaaq.mongodb.net/DevConnect"
  );
};

module.exports = connectDB;
