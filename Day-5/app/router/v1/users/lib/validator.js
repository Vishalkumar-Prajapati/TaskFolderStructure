const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Validator {
  login(req, res, next) {
    try {
      const { sUserName, sPassword } = req.body;
      if (!(sUserName && sPassword)) {
        return res.status(status.badrequest).send(message.mandatoryFields);
      }
      return next();
    } catch (error) {
      return res.status(status.internalServerError).send(message.validationError);
    }
  }

  register(req, res, next) {
    try {
      const {
        sUserName, sPassword, sEmail, sFullName, nPhoneNumber,
      } = req.body;
      if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber)) {
        return res.status(status.badrequest).send(message.mandatoryFields);
      }
      if (common.validUserName(sUserName)) {
        if (common.validPassword(sPassword)) {
          return next();
        }
        return res.status(status.badrequest).send(message.passwordNotValid);
      }
      return res.status(status.badrequest).send(message.userNameNotValid);
    } catch (error) {
      return res.status(status.internalServerError).send(message.validationError);
    }
  }

  password(req, res, next) {
    try {
      const { sNewPassword, sPassword } = req.body;
      if (!(sNewPassword && sPassword)) {
        return res.status(status.badrequest).send(message.mandatoryFields);
      }
      if (common.validPassword(sNewPassword)) {
        return next();
      }
      return res.status(status.badrequest).send(message.passwordNotValid);
    } catch (error) {
      return res.status(status.internalServerError).send(message.validationError);
    }
  }

  user(req, res, next) {
    try {
      const { sUserName, sPassword, sNewUserName } = req.body;
      if (!(sUserName && sPassword && sNewUserName)) {
        return res.status(status.badrequest).send(message.mandatoryFields);
      }
      if (common.validUserName) {
        return next();
      }
      return res.status(status.badrequest).send(message.userNameNotValid);
    } catch (error) {
      return res.status(status.internalServerError).send(message.validationError);
    }
  }
}
module.exports = new Validator();
