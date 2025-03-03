const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;

  try {
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
      age: age,
      gender: gender,
    });

    await user.save();
    res.status(200).json({ msg: "User added successfully" });

    console.log(user);
  } catch (error) {
    res.status(400).json({ msg: "Error while registering User" });
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const user = await User.find({ emailId: userEmail });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(404).json({ msg: "Users not found" });
    }

    res.status(200).json({ msg: "Users fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.status(200).json({ msg: "User deleted successfully.", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.status(200).json({ msg: "User updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong." });
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
