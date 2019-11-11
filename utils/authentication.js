const Donor = require('../sequalize').Donor;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const connection = require('../models/db')

const authenticateUser = async (email, password,res,callback) => {
  let queryString = 'SELECT * from User where email=?'
  connection.query(queryString, email, (err, rows, feilds) => {
      if(err){
        res.json({
          code:"400",
          failed:err
        })
      }
      let user = JSON.parse(JSON.stringify(rows))

      callback(user[0],password,res)    
  })

	
  }

const authenticateAccount = async (account,password,res) => {
  console.log(account)
    if (account == null) {
      return res.json({
          "success":false,
          "errors":'Username enetered is not valid'
      })
    }
	console.log("password"+password)
	console.log("account pass"+account.password)
    try {
      if (await bcrypt.compare(password, account.password)) {

    console.log("Inside compare") 
    const accesToken = jwt.sign(account,process.env.JWT_SECRET);
        return res.json({
            "code":200,
            "user":{
              "id":account.id,
              "first_name":account.first_name,
              "last_name":account.last_name,
              "gender":account.gender,
              "blood_group":account.blood_group,
              "email":account.email,
              "birthday":account.birthday.split("T")[0],
              "is_donor":account.is_donor,
              "token":accesToken
            }
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


  module.exports = {authenticateUser,authenticateToken,authenticateDonor,authenticateAccount};