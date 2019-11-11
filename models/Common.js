
const connection = require('./db')


const searchDonors = (req,res) => {
    let bloodGroup = req.body.key
    switch(bloodGroup){
        
        case(1): 
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor=true AND blood_group= ?'
        var params = [1]
        connection.query(queryString,params,(err,rows,feilds)=>{
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                console.log()
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Users": JSON.parse(JSON.stringify(rows))
                })

            }
        })
        break

        case(2):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor=true AND (blood_group= ? OR blood_group= ?)'
        var params = [1,2]
        connection.query(queryString,params,(err,rows,feilds)=>{
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
        break

        case(3):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor = true AND (blood_group= ? OR blood_group= ?)'
        var params = [1,3]
        connection.query(queryString,params,(err,rows,feilds)=>{
            if (err) {
                res.json({
                    "code": 400,
                    "failed": err
                })
            } else {
                console.log(JSON.stringify(rows))
                res.json({
                    "code": 200,
                    "success": "Query succesful",
                    "Users": JSON.parse(JSON.stringify(rows))
                })

            }
        })
        break

        case(4):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor= true AND (blood_group= ? OR blood_group= ? OR blood_group = ? OR blood_group= ?)'
        var params = [1,2,3,4]
        connection.query(queryString,params,(err,rows,feilds)=>{
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
        break

        case(5):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor= true AND (blood_group= ? OR blood_group= ?)'
        var params = [1,5]
        connection.query(queryString,params,(err,rows,feilds)=>{
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
        break

        case(6):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor= true AND (blood_group= ? OR blood_group= ? OR blood_group = ? OR blood_group= ?)'
        var params = [1,2,5,6]
        connection.query(queryString,params,(err,rows,feilds)=>{
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
        break

        case(7):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor=true AND (blood_group= ? OR blood_group= ? OR blood_group = ? OR blood_group= ?)'
        var params = [1,3,5,7]
        connection.query(queryString,params,(err,rows,feilds)=>{
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
        break

        case(8):
        var queryString = 'SELECT id,first_name,last_name,email,blood_group,gender from User where is_donor=true'
        var params = [1,2,3,4]
        connection.query(queryString,params,(err,rows,feilds)=>{
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

const getMedicalHistory = (req,res) => {
    
}


module.exports = {searchDonors,updateUserInfo}