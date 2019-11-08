const connection = require('./db')
const UUID = require('uuid/v4');


const createUser = (req,res) => {

    if(connection.connect){
        let data = req.body
        let queryString = 'INSERT INTO User VALUES (?,?,?,?,?,?,?,?,?,?,?)'
        let params = [UUID(), data.first_name, data.last_name, data.email, data.birthday, data.password, data.gender, data.account_status, data.blood_group, null, null]
        connection.query(queryString, params, (err, rows, feilds) => {
            // if (err) return { type: "Database Error", code: err.errno, error: err.message }
            if (err) {
                res.json({
                    "code":400,
                    "failed":err
                })
            }else{
                res.json({
                    "code":200,
                    "success":"Welcome to BBS"
                })
            }
        })
    }else{
        res.json({
            "code":400,
            "failed":"Database connection error"
        })
    }


}


module.exports = {createUser};