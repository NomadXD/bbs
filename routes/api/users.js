/**
 *
 * Author:  AppSeed.us
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/app-generator/nodejs-starter
 *
 */

const Joi         = require('joi');
const router      = require('express').Router();
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')
const User = require('../../models/User')
const Common = require('../../models/Common')

const userSchema = Joi.object().keys({
	id: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	first_name: Joi.string().alphanum().min(2).max(100).required(),
	last_name: Joi.string().alphanum().min(2).max(100).required(),
	birthday: Joi.date().iso().required(),
	gender: Joi.string().max(1).required(),
	is_donor: Joi.optional(),
	blood_group:Joi.required()
});

/* POST login route */
router.post('/login', (req, res, next) => {
	const { body: { user } } = req;
	console.log(req.body);
	const result = Joi.validate(req.body, userSchema);
    
	if(result.error){
		return res.status(422).json({
			errors: result.error
		});
	}
	console.log('login');
	authenticate.authenticateUser(req.body.email,req.body.password,res,authenticate.authenticateAccount);

});



router.post('/signup', async (req, res /*, next*/) => {

	let details = req.body;
	const result = Joi.validate(req.body, userSchema);
	if(result.error){
		return res.status(422).json({
			errors: result.error
		});
	}

	req.body.password = await bcrypt.hash(req.body.password, 10)
  User.createUser(req,res);
});



/* GET list route */
router.get('/list', authenticate.authenticateToken, (req, res, next) => {

	res.json({
		"user":req.user.email,
		"password":req.user.password
	})


});

router.post('/testdb',async (req,res)=>{

	user =await User.createUser(req,res)

})


router.post('/search',authenticate.authenticateToken,(req,res,next)=>{
	Common.searchDonors(req,res)
})


router.delete('/delete',authenticate.authenticateToken,(req,res,next)=>{
	User.deleteUser(req,res)	
})

router.put('/update',authenticate.authenticateToken,(req,res,next)=>{
	User.updateUserInfo(req,res)
		
	
})


router.post('/donate',authenticate.authenticateToken,(req,res,next)=>{
	User.requestToDonate(req,res)

})

router.post('/requestdonor',authenticate.authenticateToken,(req,res)=>{
	User.makeRequest(req,res)
})


module.exports = router;
