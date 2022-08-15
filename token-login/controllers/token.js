const jwt = require('jsonwebtoken');
const APIModel = require('../models/article')
const config = require('../../config/config.json')

// const users = {"username":"panupong","password":"123123"}
exports.tokenAuth = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    APIModel.getUsername(username,password).then((recordset) => {

      let token = jwt.sign(
        { "user_id": username, password },
        config.secret,
        {
          expiresIn: "2h",
        }
      );
      if(recordset.length > 0){
        console.log(recordset[0].email)
        return res.status(200).json({
          "username": username,
          "status": "success",
          "message": "Success",
          "accessToken" : token,
          "fname": recordset[0].fname,
          "lname": recordset[0].lname,
          "tel": recordset[0].tel,
          "email" : recordset[0].email,
          "picture" : recordset[0].picture
      });
      }else {
        // console.log({"Error": "Invalid Username"})
        return res.status(200).json({
          "status": "unsuccess",
          message: "Invalid Username Or Password"
      })
    }
    })
    // console.log(username,password)

};

