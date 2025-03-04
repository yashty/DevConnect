const express = require("express");
const { userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // validation of data
    validateSignupData(req);

    // encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: passwordHash,
      age: age,
      gender: gender,
    });

    await user.save();
    res.status(200).json({ msg: "User added successfully" });

    console.log(user);
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).json({ msg: "Error while registering User" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid credentials!");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      // create a JWT Token
      const token = await user.getJWT();
      //Add the token to cookie and send the response back to the user
      res.cookie("token", token, { expires: new Date(Date.now) + 8 * 3600000 });

      res.status(200).send("Login Successfull");
    } else {
      throw new Error("Invalid credentials!");
    }
  } catch (error) {
    console.error("SignIn Error:", error);
    res.status(400).json({ msg: "Error while logging User" });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(400).json({ msg: "Error while getting User" });
  }
});

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
