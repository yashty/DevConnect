const adminAuth = (req, res, next) => {
  const token = "xyz";
  const isAuthorized = token === "xyz";

  if (!isAuthorized) {
    res.status(400).send("Unauthorized request");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
