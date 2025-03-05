const express = require("express");
const User = require("../models/user");
const { validateSignupData } = require("../utils/validation");
const bcrypt = require("bcrypt");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logged out Successfully");
});

module.exports = authRouter;
