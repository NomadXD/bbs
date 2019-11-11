const Joi         = require('joi');
const router      = require('express').Router();
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')
const Donor = require('../../models/Donor')

const donorSchema = Joi.object().keys({
	id: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	first_name: Joi.string().alphanum().min(2).max(100).required(),
	last_name: Joi.string().alphanum().min(2).max(100).required(),
	birthday: Joi.date().iso().required(),
	gender: Joi.string().max(1).required(),
	account_status: Joi.required(),
	bloodGroupID:Joi.required()
});


router.post('/requests',authenticate.authenticateToken,(req,res)=>{
	Donor.getAllRequests(req,res)	
})

router.post('/accept',authenticate.authenticateToken,(req,res)=>{
	Donor.acceptRequest(req,res)
})






module.exports = router;