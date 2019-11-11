const connection = require('./db')
const UUID = require('uuid/v4')

const acceptUserRequest = (req,res,callback) => {
    let user = req.body
    if (connection.connect) {
        let queryString = 'UPDATE User SET is_donor = ? WHERE email = ?'
        let params = [true,user.email]
        connection.query(queryString, params, (err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                // res.json({
                //     "code": 200,
                //     "success": "Details changed"
                // })
                callback(user,res)
            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
}


const deleteRequest = (user,res) => {
    let queryString = 'DELETE FROM DonationRequest WHERE requester_id = ?'
    let params = [user.id]
    connection.query(queryString, params, (err, rows, feilds) => {
        if (err) {
            res.json({
                "code": 400,
                "failed": err
            })
        } else {
            res.json({
                "code": 200,
                "success": "Query succesful"
            })
        }
    })

}


const getAllUserRequests = (res) => {   
    if (connection.connect) {
        let queryString = 'SELECT id,first_name,last_name,email,gender FROM User,DonationRequest where User.id=DonationRequest.requester_id'
        connection.query(queryString,(err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Users": JSON.parse(JSON.stringify(rows))
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

const getAllUsers = (res) => {
    if (connection.connect) {
        let queryString = 'SELECT id,first_name,last_name,email,gender FROM User where User.is_donor=false'
        connection.query(queryString,(err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Users": JSON.parse(JSON.stringify(rows))
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

const getAllDonors = (res) => {
    if (connection.connect) {
        let queryString = 'SELECT id,first_name,last_name,email,gender FROM User where User.is_donor=true'
        connection.query(queryString,(err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Users": JSON.parse(JSON.stringify(rows))
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

const getAllMatched = (req,res) => {
    if (connection.connect) {
        let queryString = 'SELECT match_id,donor_id,recepient_id from DonorRecepient where match_status=2'
        connection.query(queryString,(err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Matches": JSON.parse(JSON.stringify(rows))
                
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



const confirmCompletion = (req,res,callback) => {
    if (connection.connect) {
        let queryString = 'DELETE FROM DonorRecepient where match_id = ?'
        let params = [req.body.match_id]
        connection.query(queryString,params,(err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                // res.json({
                //     "code": 200,
                //     "success": "Query succesful",
                //     "Users": JSON.parse(JSON.stringify(rows))
                // })
                callback(req,res)

            }
        })
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }
}


const saveToMedicalHistory = (req,res) => {
    if (connection.connect) {
        let queryString = 'INSERT INTO DonationHistory VALUES (?,?,?,?,?)'
        let params = [UUID(),req.body.donor_id,req.body.recepient_id,null,null]
        connection.query(queryString, params, (err, rows, feilds) => {
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                res.json({
                    "code": 200,
                    "success": "Succesfully saved to donation history"
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


module.exports = {acceptUserRequest,deleteRequest,getAllUserRequests,getAllUsers,getAllDonors,getAllMatched,confirmCompletion,saveToMedicalHistory}