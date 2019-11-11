const Joi         = require('joi');
const router      = require('express').Router();
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')
const User = require('../../models/User')
const Admin = require('../../models/Admin')




router.post('/requests',(req,res)=>{
    Admin.getAllUserRequests(res)
})

router.post('/accept',(req,res)=>{
    Admin.acceptUserRequest(req,res,Admin.deleteRequest)  
})

router.post('/decline',(req,res)=>{
    Admin.deleteRequest(req.body,res)
})

router.post('/users',(req,res)=>{
    Admin.getAllUsers(res)
})

router.post('/donors',(req,res)=>{
    Admin.getAllDonors(res)
})

















module.exports = router