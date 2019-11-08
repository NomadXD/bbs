const User = require('../sequalize').User;
const Donor = require('../sequalize').Donor;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const authenticateUser = async (email, password,res) => {
	const user = await User.findOne({where:{email}})
	console.log(email,password)
    if (user == null) {
      return res.json({
          "success":false,
          "errors":'Username enetered is not valid'
      })
    }
	console.log("passed")
	console.log(user.password)
    try {
      if (await bcrypt.compare(password, user.password)) {

    console.log(user.password) 
    const accesToken = jwt.sign(user.toJSON(),process.env.JWT_SECRET);
        return res.json({
            token:accesToken
        })
      } else {
        return res.json({ message: 'Password incorrect' })
      }
    } catch (e) {
      console.log(e)
      return res.json({
        "success":false,
        "error":e
      })
    }
  }

const authenticateToken = async (req,res,next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];

  if(token===null) return res.sendStatus(401)

  jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  })

}

const authenticateDonor = async (email, password,res) => {
	const donor = await Donor.findOne({where:{email}})
	console.log(email,password)
    if (donor == null) {
      return res.json({
          "success":false,
          "errors":'Username enetered is not valid'
      })
    }
	console.log("passed")
	console.log(donor.password)
    try {
      if (await bcrypt.compare(password, donor.password)) {

    console.log(donor.password) 
    const accesToken = jwt.sign(donor.toJSON(),process.env.JWT_SECRET);
        return res.json({
            token:accesToken
        })
      } else {
        return res.json({ message: 'Password incorrect' })
      }
    } catch (e) {
      console.log(e)
      return res.json({
        "success":false,
        "error":e
      })
    }
  }


  module.exports = {authenticateUser,authenticateToken,authenticateDonor};