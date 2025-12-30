const { body, validationResult } = require('express-validator')

const registerValidation = [
  body("firstName").trim().escape().isLength({min:3}),
  body("lastName").trim().escape().isLength({min:0}),
  body("email").trim().normalizeEmail().isEmail(),
  body("password").isLength({min:6}).withMessage("Password too short"),
  body("role").trim()
];
const signinValidation = [
  body("email").trim().normalizeEmail().isEmail(),
  body("password").isLength({min:6}).withMessage("Password too short"),
  body("role").trim()
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  registerValidation,
  validate,
  signinValidation

}