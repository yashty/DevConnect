const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong Password!");
  }
};

const validateEditProfileData = (req) => {
  const alloweEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoURL",
    "skills",
    "about",
    "gender",
    "age",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    alloweEditFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = { validateSignupData, validateEditProfileData };
