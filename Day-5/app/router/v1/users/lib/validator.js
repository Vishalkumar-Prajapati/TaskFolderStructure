const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Validator {
  loginUser(req, res, next) {
    try {
      const { sUserName, sPassword } = req.body;
      if (!(sUserName && sPassword)) {
        return res.status(status.badRequest).json(message.mandatoryFields);
      }
      return next();
    } catch (error) {
      return res.status(status.internalServerError).json(message.validationError);
    }
  }

  registerUser(req, res, next) {
    try {
      const {
        sUserName, sPassword, sEmail, sFullName, nPhoneNumber,
      } = req.body;
      if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber)) {
        return res.status(status.badRequest).json(message.mandatoryFields);
      }
      if (common.validUserName(sUserName)) {
        if (common.validPassword(sPassword)) {
          return next();
        }
        return res.status(status.badRequest).json(message.passwordNotValid);
      }
      return res.status(status.badRequest).json(message.userNameNotValid);
    } catch (error) {
      return res.status(status.internalServerError).json(message.validationError);
    }
  }

  changePassword(req, res, next) {
    try {
      const { sNewPassword, sPassword } = req.body;
      if (!(sNewPassword && sPassword)) {
        return res.status(status.badRequest).json(message.passReq);
      }
      if (common.validPassword(sNewPassword)) {
        return next();
      }
      return res.status(status.badRequest).json(message.passwordNotValid);
    } catch (error) {
      return res.status(status.internalServerError).json(message.validationError);
    }
  }

  changeUserName(req, res, next) {
    try {
      const { sNewUserName } = req.body;
      if (!(sNewUserName)) {
        return res.status(status.badRequest).json(message.mandatoryFields);
      }
      if (common.validUserName(sNewUserName)) {
        return next();
      }
      return res.status(status.badRequest).json(message.userNameNotValid);
    } catch (error) {
      return res.status(status.internalServerError).json(message.validationError);
    }
  }
}
module.exports = new Validator();
