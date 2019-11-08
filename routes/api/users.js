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
const connection = require('../../temp/db')


const userSchema = Joi.object().keys({
	id: Joi.string().alphanum().min(3).max(30).optional(),
	password: Joi.string().required(),
	email: Joi.string().email({ minDomainAtoms: 2 }).required(),
	first_name: Joi.string().alphanum().min(2).max(100).required(),
	last_name: Joi.string().alphanum().min(2).max(100).required(),
	birthday: Joi.date().iso().required(),
	gender: Joi.string().max(1).required(),
	account_status: Joi.optional(),
	bloodGroupID:Joi.required()
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

	if(connection.connect){
		res.json({"status":"Success"})
	}else{
		res.json({"status":"Error"})
	}
	

	// User.findOne({email: req.body.email}, {explicit: true}).then(function(user) {
	// 	// do something with user
	// 	res.send(user)
	// }).catch(function(err) {
	// 	res.send({error: err})
	// })

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



// return sequelize.transaction(t => {
//   // chain all your queries here. make sure you return them.
//   return User.create({
//     firstName: 'Abraham',
//     lastName: 'Lincoln'
//   }, {transaction: t}).then(user => {
//     return user.setShooter({
//       firstName: 'John',
//       lastName: 'Boothe'
//     }, {transaction: t});
//   });

// }).then(result => {
//   // Transaction has been committed
//   // result is whatever the result of the promise chain returned to the transaction callback
// }).catch(err => {
//   // Transaction has been rolled back
//   // err is whatever rejected the promise chain returned to the transaction callback
// });




module.exports = router;
