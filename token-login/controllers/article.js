const APIModel = require('../models/article')

exports.getArticle = (req, res) => {
        APIModel.getArticle().then((recordset) => {
            console.log(recordset[0].article)
            return res.status(200).json({
                "status": "success",
                "article" : recordset[0].article,
                "updateusername": recordset[0].updateusername,
                "createupdate": recordset[0].createupdate
            });
        })
           
    }

