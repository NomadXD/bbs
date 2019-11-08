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
//const User        = require('../../sequalize').User;
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')
//const connection = require('../../models/db')
const User = require('../../models/User')

const userSchema = Joi.object().keys({
	id: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	first_name: Joi.string().alphanum().min(2).max(100).required(),
	last_name: Joi.string().alphanum().min(2).max(100).required(),
	birthday: Joi.date().iso().required(),
	gender: Joi.string().max(1).required(),
	account_status: Joi.optional(),
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
	authenticate.authenticateUser(req.body.email,req.body.password,res);

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
	console.log(details);
  User.createUser(req,res);
});



/* GET list route */
router.get('/list', authenticate.authenticateToken, (req, res, next) => {

	res.json({
		"user":req.user.email,
		"password":req.user.password
	})

	// User.findAll().then(users => {

	// 	return res.status(200).json(
	// 		JSON.stringify( users )
	// 	);
	// })

});

router.post('/testdb',async (req,res)=>{

	user =await User.createUser(req,res)

})


router.get('/search',authenticate.authenticateToken,(req,res,next)=>{
	//Query the db according to a specified feild and return a list of donor
})


router.delete('/delete',authenticate.authenticateToken,(req,res,next)=>{
	User.destroy({
		where:{
			id:req.user.id
		}
	}).then(function(value){
		res.json({"response":value})
	}).catch(function(err){
		res.json({"error":err})
	})
})

router.put('/update',authenticate.authenticateToken,(req,res,next)=>{
	console.log(req.body)
	User.update(
		{first_name:req.body.first_name},{where:req.user.id}
	).then(function(updated){
		res.json({updated})
	}).catch(function(err){
		res.json({err})
	})
		
	
})


router.post('/donate',authenticate.authenticateToken,(req,res,next)=>{

})


module.exports = router;
