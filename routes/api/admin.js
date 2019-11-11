const Joi         = require('joi');
const router      = require('express').Router();
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')
const User = require('../../models/User')
const Admin = require('../../models/Admin')



router.post('/accept',(req,res)=>{
    Admin.acceptUserRequest(req,res,Admin.deleteRequest)  
})

router.post('/requests',(req,res)=>{
    Admin.getAllUserRequests(res)
})













module.exports = router