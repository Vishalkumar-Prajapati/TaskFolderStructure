
class Validator {
    login(req, res, next){
        try {
            const { sUserName, sPassword} = req.body;
            if(sUserName && sPassword){
                return next();
            }
            else{
                return res.status(403).send({sMessage:" sUserName and sPassword required"});
            }
        } catch (error) {
            return res.send({ "sMessage": "internal server error in validation" });
        }
    }
    register(req, res, next) {
        try {
            const { sUserName, sPassword, sEmail, sFullName, nPhoneNumber } = req.body;
            if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber)) {
                return res.send({ sMessage: "all fields required" });
            }
            else {
                if (/^\d*[A-Z]\d*$/.test(sUserName)) {
                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16,}$/.test(sPassword)) {
                        return next();
                    }
                    else {
                        return res.send({ sMessage: "at least one capital letter, at least one small letter, at least one symbol, total length 16" })
                    }
                }
                else {
                    return res.send({ sMessage: "Only one charecter is capital and others are numbers" });
                }
            }
        } catch (error) {
            res.send({ "sMessage": "internal server error in validation" });
        }
    }
    password(req, res, next) {
        try {
            const { sUserName, sNewPassword, sOldPassword } = req.body;
            if (!(sUserName && sNewPassword && sOldPassword)) {
                return res.send({ sMessage: "all fields required" });
            }
            else {
                if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16,}$/.test(sNewPassword)) {
                    return next();
                }
                else {
                    res.send({ "sMessage": "at least one capital letter, at least one small letter, at least one symbol, total length 16" });
                }
            }
        } catch (error) {
            res.send({ "sMessage": "internal server error in validation" });
        }
    }
    user(req, res, next) {
        try {
            const { sUserName, sPassword, sNewUserName } = req.body;
            if (!(sUserName && sPassword && sNewUserName)) {
                return res.send({ sMessage: "all fields required" });
            }
            else {
                if (/^\d*[A-Z]\d*$/.test(sNewUserName)) {
                    return  next();
                }
                else {
                    return res.send({ sMessage: "Only one charecter is capital and others are numbers" });
                }
            }
        } catch (error) {
            res.send({ "sMessage": "internal server error in validation" });
        }
    }

}
module.exports = new Validator();