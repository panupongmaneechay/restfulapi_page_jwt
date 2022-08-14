const jwt = require('jsonwebtoken');
const dbconfig = require('../../config/configdb.json')
const bu = Object.keys(dbconfig)[0]
const APIModel = require('../models/article')
const config = require('../../config/config.json')

// const users = {"username":"panupong","password":"123123"}
exports.tokenAuth = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    APIModel.getUsername(username,password, bu).then((recordset) => {

      let token = jwt.sign(
        { "user_id": username, password },
        config.secret,
        {
          expiresIn: "2h",
        }
      );
      if(recordset.length > 0){
        return res.status(200).json({
          "username": username,
          "status": "success",
          "message": "Success",
          "accessToken" : token
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

