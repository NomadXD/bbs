const Joi         = require('joi');
const router      = require('express').Router();
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')

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






module.exports = router;