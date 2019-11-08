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
const User        = require('../../models').User;
const bcrypt = require('bcrypt');
const authenticate = require('../../utils/authentication')


const userSchema = Joi.object().keys({
	id: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	first_name: Joi.string().alphanum().min(2).max(100).required(),
	last_name: Joi.string().alphanum().min(2).max(100).required(),
	birthday: Joi.date().iso().required(),
	gender: Joi.string().max(1).required(),
	account_status: Joi.optional()
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
		
    try{
			req.body.password = await bcrypt.hash(req.body.password, 10)
			console.log(details);
        const user = await User.create(req.body);
        return res.json({ user });
    }catch(e){
        return res.status(500).json({
			errors: e
		});
    }
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

router.post('/testdb',(req,res)=>{
	let passedValue = req.body.email
	//let user = User.findOne({where:{email:req.body.email}});
	//console.log(user)

	// let user = User.getUserByEmail(req.body.email)
	// console.log(user)
	// res.json({user})

	User.findOne({email: req.body.email}, {explicit: true}).then(function(user) {
		// do something with user
		res.send(user)
	}).catch(function(err) {
		res.send({error: err})
	})

})



module.exports = router;
