const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res.status(400).json({ msg: "Error while getting User" });
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).json({ msg: "Invalid Edit Request" });
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    await loggedInUser.save();
    res.status(200).json({ msg: "Profile Updated Successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Error while updating User" });
  }
});

module.exports = profileRouter;
