const connection = require('./db')
const UUID = require('uuid/v4');


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
                res.json({
                    "code": 200,
                    "success": "Welcome to BBS"
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







module.exports = { createUser, findUserByEmail,updateUserInfo,deleteUser,requestToDonate,updateUserStatus};