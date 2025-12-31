const { body, validationResult } = require('express-validator')

const registerValidation = [
  body("firstName").trim().escape().isLength({min:3}),
  body("lastName").trim().escape().isLength({min:0}),
  body("email").trim().normalizeEmail().isEmail(),
  body("password").isLength({min:6}).withMessage("Password too short"),
  body("role").trim()
];
const taskValidation = [
  body("task").trim().escape().isLength({min:10}).withMessage("task too short"),
  body("completionTime").isISO8601().toDate().custom((value)=>{
    if(value < new Date()){
      throw new Error("Due date must be in future..")
    }
    return
  })
];
const signinValidation = [
  body("email").trim().normalizeEmail().isEmail(),
  body("password").isLength({min:6}).withMessage("Password too short"),
  body("role").trim()
];

const validate = (req, res, next) => {
  console.log("middlewar1")
  const errors = validationResult(req);
  if(!res.headersSent){
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  }
  console.log("inside validate")
  next();
};

module.exports = {
  registerValidation,
  validate,
  signinValidation,
  taskValidation

}