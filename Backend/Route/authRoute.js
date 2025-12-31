const express = require('express')
const {register,signin} = require('../Controler/AuthController');
const { registerValidation,validate, signinValidation } = require('../Model/user');

const router = express.Router();

router.post("/register",registerValidation,validate,register)
router.post("/signin",signinValidation,validate,signin)


module.exports = router;