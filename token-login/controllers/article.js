const APIModel = require('../models/article')

exports.getArticle = (req, res) => {
        APIModel.getArticle().then((recordset) => {
            
                return res.status(200).json({
                    "status": "success",
                    recordset
                    // "article" : recordset.article,
                    // "updateusername": recordset.updateusername,
                    // "createupdate": recordset.createupdate
                });
            
            
        })
           
    }

exports.createArticle = (req, res) => {
    let updateusername = req.body.updateusername;
    let article = req.body.article;
        APIModel.createArticle(updateusername,article).then((recordset) => {
            return res.status(200).json({
                "status": "success",
            });
        })
           
    }

    exports.updateProfile = (req, res) => {
        let fname = req.body.fname || '';
        let lname = req.body.lname || '';
        let tel = req.body.tel || '';
        let email = req.body.email || '';
        let username = req.body.username || '';
        let picture = req.body.picture || '';
            APIModel.updateProfile(fname,lname,tel,email,username,picture).then((recordset) => {
                return res.status(200).json({
                    "status": "success",
                });
            })
               
        }
    