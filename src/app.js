const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
  res.send("All data Fetched.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
