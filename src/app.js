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

// app.get("/admin/getAllData", adminAuth, (req, res) => {
//   res.send("All data Fetched.");
// });

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
