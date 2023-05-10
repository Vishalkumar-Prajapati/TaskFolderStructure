
class Validator {
    register(req, res, next) {
        try {
            const { sUserName, sPassword, sEmail, sFullName, nPhoneNumber } = req.body;
            if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber)) {
                return res.send({ sMessage: "all fields required" });
            }
            else {
                if (/^([#$@!%&*?][a-z]+)$/i.test(sUserName) || /^([a-z]+[#$@!%&*?])$/i.test(sUserName) || /^([a-z]+[#$@!%&*?][a-z]+)$/i.test(sUserName)) {
                    if (/^(?=.*[A-Z])(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16}$/.test(sPassword)) {
                        return next();
                    }
                    else {
                        return res.send({ sMessage: "at least one capital letter ,at least one symbol, total length 16" })
                    }
                }
                else {
                    return res.send({ sMessage: "all small letter, and one symbol" });
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
                if (/^[0-9]{16}$/.test(sNewPassword)) {
                    return next();
                }
                else {
                    res.send({ "sMessage": "all number with length 16)" });
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
                if (/^([A-Z]+)$/i.test(sNewUserName)) {
                    return  next();
                }
                else {
                    return res.send({ sMessage: "all capital letter" });
                }
            }
        } catch (error) {
            res.send({ "sMessage": "internal server error in validation" });
        }
    }

}
module.exports = new Validator();