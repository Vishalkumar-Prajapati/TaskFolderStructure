const fs = require('fs');

class Middleware {
    register(req, res, next) {
        try {
            if (req.nUserIndex!==-1) {
                return res.send({ sMessage: "this userName already exists" });
            }
            else {
                return next();
            }
        } catch (error) {
            return res.send({ sMessage: "Internal server error in middleware" });
        }
    }
    password(req, res, next) {
        try {
            if (req.nUserIndex!==-1) {
                if (req.aDatabase[req.nUserIndex].sPassword === req.body.sOldPassword) {
                    return next();
                }
                else {
                    return res.send({ sMessage: "please enter your old password correctly" });
                }
            }
            else {
                return res.send({ sMessage: "UserName not found" });
            }
        } catch (error) {
            return res.send({ sMessage: "Internal server error in middleware" });
        }
    }
    user(req,res,next){
        try {
            if (req.nUserIndex!==-1) {
                if (req.aDatabase[req.nUserIndex].sPassword === req.body.sPassword) {
                    return next();
                }
                else {
                    return res.send({ sMessage: "please enter your password correctly" });
                }
            }
            else {
                return res.send({ sMessage: "UserName not found" });
            }
        } catch (error) {
            return res.send({ sMessage: "Internal server error in middleware" });
        }
    }
    readDatabase(req,res,next){
        try {
            const oDatabase = fs.readFileSync('./app/users.json', 'utf8');
            const { aDatabase } = JSON.parse(oDatabase);
            const nUserIndex = aDatabase.findIndex(oUser => oUser.sUserName == req.body.sUserName);
            req.aDatabase=aDatabase;
            req.nUserIndex=nUserIndex;
            return next();
        } catch (error) {
            return res.send({ sMessage: "Internal server error in middleware" });
        }
    }
}

module.exports = new Middleware();