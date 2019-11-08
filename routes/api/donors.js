const Joi         = require('joi');
const router      = require('express').Router();
const User        = require('../../models').Donor;
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

router.post('/login',(req,res,next)=>{
    const result = Joi.validate(req.body,donorSchema)

    if(result.error){
		return res.status(422).json({
			errors: result.error
		});
    }
    authenticate.authenticateDonor(req.body.email,req.body.password,res)
})




module.exports = router;