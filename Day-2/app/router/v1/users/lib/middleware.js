const fs = require('fs');

class Middleware {
    register(req, res, next) {
        if (req.nUserIndex!==-1) {
            return res.send({ sMessage: "this userName already exists" });
        }
        else {
            return next();
        }
    }
    password(req, res, next) {
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
    }
    user(req,res,next){
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
    }
    readDatabase(req,res,next){
        const oDatabase = fs.readFileSync('./app/users.json', 'utf8');
        const { aDatabase } = JSON.parse(oDatabase);
        const nUserIndex = aDatabase.findIndex(oUser => oUser.sUserName == req.body.sUserName);
        req.aDatabase=aDatabase;
        req.nUserIndex=nUserIndex;
        return next();
    }
}

module.exports = new Middleware();