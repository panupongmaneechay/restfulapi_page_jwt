const jwt = require('jsonwebtoken');

const users = {"username":"panupong","password":"maneechay"}

const config = require('../../config.json')

exports.tokenAuth = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    // console.log(username,password)

    let token = jwt.sign(
        { "user_id": username, password },
        config.secret,
        {
          expiresIn: "2h",
        }
      );
    if(username === users.username && password === users.password){
        //  console.log({"accessToken" : token})
        return res.status(200).json({
            "username": username,
            "status": "success",
            "message": "Success",
            "accessToken" : token
            
        });
    } else {
      // console.log({"Error": "Invalid Username"})
      return res.status(200).json({
        "status": "unsuccess",
        message: "Invalid Username Or Password"
    })
  }
};

