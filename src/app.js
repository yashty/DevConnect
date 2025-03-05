const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.js");
const requestRouter = require("./routes/request.js");
const profileRouter = require("./routes/profile.js");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", requestRouter);
app.use("/", profileRouter);

connectDB()
  .then(() => {
    console.log("Database connection established.....");
    app.listen(3000, () => {
      console.log("Server is running on port 3000....");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
