const connection = require('./db')
const UUID = require('uuid/v4');
const jwt = require('jsonwebtoken')


const createUser = (req, res) => {
    if (connection.connect) {
        let data = req.body
        let queryString = 'INSERT INTO User VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        let params = [UUID(), data.first_name, data.last_name, data.email, data.birthday, data.password, data.gender, false, data.blood_group, null, null]
        connection.query(queryString, params, (err, rows, feilds) => {
            // if (err) return { type: "Database Error", code: err.errno, error: err.message }
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                const token = jwt.sign(req.body,process.env.JWT_SECRET)
                let user = {
                    "first_name":data.first_name,
                    "last_name":data.last_name,
                    "email":data.email,
                    "birthday":data.birthday.split("T")[0],
                    "gender":data.gender,
                    "blood_group":data.blood_group,
                    "token":token

                }
                res.json({
                    "code": 200,
                    "success": "Welcome to BBS",
                    "user":user
                })
            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
}


const findUserByEmail = (email) => {
    if (connection.connect) {
        var user
        let queryString = 'SELECT * from User where email=?'
        connection.query(queryString, email, (err, rows, feilds) => {
            console.log("rows", rows)
            setValue(rows)
        })

        // let user = function setValue(value){
        //     user = value
        //     return user
        // }

        
        //console.log("user: ",use)
        //return user 
    }

}

const updateUserInfo = (req,res) => {
    let user = req.user
    let newInfo = req.body
    if (connection.connect) {
        let queryString = 'UPDATE User SET first_name = ?,last_name = ?,email = ?,birthday = ?, gender = ?, blood_group = ? WHERE email = ?'
        let params = [newInfo.first_name, newInfo.last_name, newInfo.email, newInfo.birthday,newInfo.gender,newInfo.blood_group,user.email]
        connection.query(queryString, params, (err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Details changed"
                })
            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
    
}

const deleteUser = (req,res) => {
    let user = req.user
    if (connection.connect) {
        let queryString = 'DELETE FROM User WHERE email = ?'
        let params = [user.email]
        connection.query(queryString, params, (err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "User Deleted"
                })
            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }

}

const requestToDonate = (req,res) => {
    let user = req.user
    if (connection.connect) {
        let queryString = 'INSERT INTO DonationRequest VALUES (?,?)'
        let params = [UUID(),user.id]
        connection.query(queryString, params, (err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Request sent to Admin. Await for approval"
                })
                //callback(process.env.REQUESTED_USER,res)
            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
}

const updateUserStatus = (status,res) => {
    if(connection.connect){
        console.log(status)
        let queryString = 'UPDATE User SET account_status= ?'
        let params = [status]
        connection.query(queryString,params,(err,rows,feilds) => {
            if(err){
                res.json({
                    "code":400,
                    "failed":"User status update failed"
                })
            }else{
                res.json({
                    "code":200,
                    "succes":"Request sent to Admin. Await for approval"
                })
            }
        })
    }else{
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
}

const makeRequest = (req,res) => {
    let queryString = 'INSERT INTO DonorRecepient values (?,?,?,?)'
    params = [UUID(),req.body.donor,req.user.id,1]
    connection.query(queryString,params,(err,rows,feilds) => {
        if(err){
            res.json({
                "code":400,
                "failed":"User status update failed"
            })
        }else{
            res.json({
                "code":200,
                "success":"Request sent to donor. Await for acceptance"
            })
        }
    })
}

const getAllRequests = (req,res) => {
    let queryString = 'SELECT User.id,User.first_name,User.last_name,User.email,User.gender,User.blood_group,DonorRecepient.match_status FROM User,DonorRecepient where DonorRecepient.recepient_id = ? AND DonorRecepient.donor_id=User.id AND User.is_donor=true'
    params = [req.user.id]
    connection.query(queryString,params,(err,rows,feilds)=>{
        if(err){
            res.json({
                "code":200,
                "failed":err
            })
        }else{
            res.json({
                "code":200,
                "requests": JSON.parse(JSON.stringify(rows))
            })
        }
    })
}







module.exports = { createUser, findUserByEmail,updateUserInfo,deleteUser,requestToDonate,updateUserStatus,makeRequest,getAllRequests};