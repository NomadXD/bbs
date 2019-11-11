const connection = require('./db')



const getAllRequests = (req,res) => {
    if (connection.connect) {
        let queryString = 'SELECT User.id,User.first_name,User.last_name,User.email,User.gender FROM User,DonorRecepient where User.id=DonorRecepient.recepient_id AND DonorRecepient.donor_id = ?'
        let params = [req.user.id]
        connection.query(queryString,params,(err, rows, feilds) => {
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

const acceptRequest = (req,res) => {
    if (connection.connect) {
        let queryString = 'UPDATE DonorRecepient SET match_status = 2 where recepient_id = ?'
        let params = [req.body.recepient]
        connection.query(queryString,params,(err, rows, feilds) => {
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
    } else {
        res.json({
            "code": 400,
            "failed": "Database connection error"
        })
    }

}

const cancelRequest = (req,res) => {
    if (connection.connect) {
        let queryString = 'DELETE FROM DonorRecepient WHERE recepient_id= ?'
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
                    "success": "Request cancelled"
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


module.exports = {getAllRequests,acceptRequest}