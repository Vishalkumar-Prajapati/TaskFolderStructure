class Validator {
  register(req, res, next) {
    try {
      const {
        sUserName,
        sPassword,
        sEmail,
        sFullName,
        nPhoneNumber,
      } = req.body;
      if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber)) {
        return res.send({ sMessage: 'all fields required' });
      }
      if (/^([a-z]*[#$@!%&*?][a-z]+)$/.test(sUserName) || /^([a-z]+[#$@!%&*?][a-z]*)$/.test(sUserName)) {
        if (/^(?=.*[A-Z])(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16}$/.test(sPassword)) {
          return next();
        }
        return res.send({ sMessage: 'at least one capital letter ,at least one symbol, total length 16 in password' });
      }
      return res.send({ sMessage: 'all small letter, and one symbol in username' });
    } catch (error) {
      return res.send({ sMessage: 'internal server error in validation' });
    }
  }

  password(req, res, next) {
    try {
      const { sUserName, sNewPassword, sOldPassword } = req.body;
      if (!(sUserName && sNewPassword && sOldPassword)) {
        return res.send({ sMessage: 'all fields required' });
      }
      if (/^[0-9]{16}$/.test(sNewPassword)) {
        return next();
      }
      return res.send({ sMessage: 'all number with length 16)' });
    } catch (error) {
      return res.send({ sMessage: 'internal server error in validation' });
    }
  }

  user(req, res, next) {
    try {
      const { sUserName, sPassword, sNewUserName } = req.body;
      if (!(sUserName && sPassword && sNewUserName)) {
        return res.send({ sMessage: 'all fields required' });
      }
      if (/^([A-Z]+)$/i.test(sNewUserName)) {
        return next();
      }
      return res.send({ sMessage: 'all capital letter' });
    } catch (error) {
      return res.send({ sMessage: 'internal server error in validation' });
    }
  }
}
module.exports = new Validator();
