const connection = require('./db')

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


module.exports = {acceptUserRequest,deleteRequest,getAllUserRequests,getAllUsers,getAllDonors}