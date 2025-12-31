const express = require('express')
const { createTask, deleteTask, updateTask, getTaskUser, getTaskAdmin } = require('../Controller/taskController');
const { taskValidation, validate } = require('../Services/validation');
const onlyAdmin = require('../Middlewares/onlyAdmin');
const checkLogin = require('../Middlewares/isLoggedIn');

const router = express.Router();

router.post('/create',taskValidation,checkLogin,createTask)
router.put('/update/:id',checkLogin,updateTask)
router.delete('/delete/:id',checkLogin,validate,deleteTask)
router.get('/all',validate,checkLogin,getTaskUser)
router.get('/admin/all',onlyAdmin,validate,getTaskAdmin)




module.exports = router;