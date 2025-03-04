const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    // read the token from the req cookies

    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not valid!");
    }

    // validate the token

    const decoded = await jwt.verify(token, "Dev@tinder099787");

    // find the user

    const { _id } = decoded;
    const user = await User.find({ _id });

    if (!user) {
      throw new Error("No user found!");
    }
    res.send(user);
    next();
  } catch (error) {
    res.status(400).send(`ERROR: ${error.message}`);
  }
};

module.exports = {
  userAuth,
};
