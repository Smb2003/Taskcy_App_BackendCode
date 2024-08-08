const express = require('express');
const { SignUp_Controller, Login_Controller, Check_auth_Controller } = require('../Controllers/Check_auth_Controllers');
const {Check_auth_middleware} = require('../Middleware/Check_auth_middleware')
const router = express.Router();

router.get('/checkingRoutes', (req,res)=>{
    return res.json({message: 'Checking Routes'})
})

router.post('/signUp', SignUp_Controller);
router.post('/login', Login_Controller);

router.use(Check_auth_middleware);

router.get('/Check_auth', Check_auth_Controller);




module.exports = {router}