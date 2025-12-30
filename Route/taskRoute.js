const express = require('express')
const { validate } = require('../Model/user');
const { createTask, deleteTask, updateTask, getTaskUser, getTaskAdmin } = require('../Controller/taskController');
const { taskValidation } = require('../Services/validation');
const onlyAdmin = require('../Middlewares/onlyAdmin');
const checkLogin = require('../Middlewares/isLoggedIn');

const router = express.Router();

router.post('/create',checkLogin,taskValidation,validate,createTask)
router.put('/update/:id',checkLogin,validate,updateTask)
router.delete('/delete:id',checkLogin,validate,deleteTask)
router.get('/all',validate,checkLogin,getTaskUser)
router.get('/admin/all',onlyAdmin,validate,getTaskAdmin)




module.exports = router;