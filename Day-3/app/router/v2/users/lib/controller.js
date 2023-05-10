const fs = require('fs');

class Controller {
    register(req, res) {
        try {
            req.aDatabase.push(req.body);
            fs.writeFileSync("./app/users.json", JSON.stringify({ aDatabase: req.aDatabase }));
            res.status(201).send({ "sMessage":"data is added successfully to the database"});
        } catch (error) {
            return res.send(res.send({ "sMessage": "internal server error in controller" }))
        }
    }
    password(req, res) {
        try {
            req.aDatabase[req.nUserIndex].sPassword = req.body.sNewPassword;
            fs.writeFileSync("./app/users.json", JSON.stringify({ aDatabase: req.aDatabase }));
            res.status(200).send({ "sMessage":"password updated successfully to the database"});
        } catch (error) {
            return res.send(res.send({ "sMessage": "internal server error in controller" }))
        }
    }
    user(req,res){
        try {
            req.aDatabase[req.nUserIndex].sUserName = req.body.sNewUserName;
            fs.writeFileSync("./app/users.json", JSON.stringify({ aDatabase: req.aDatabase }));
            res.status(200).send({ "sMessage":"userName updated successfully to the database"});
        } catch (error) {
            return res.send(res.send({ "sMessage": "internal server error in controller" }))
        }
    }
}

module.exports = new Controller();