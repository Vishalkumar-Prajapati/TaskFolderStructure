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
        sUserName, sPassword, sEmail, sFullName, nPhoneNumber, sRole,
      } = req.body;
      if (!(sUserName && sPassword && sEmail && sFullName && nPhoneNumber && sRole)) {
        return res.status(status.badRequest).json(message.mandatoryFields);
      }
      if (!common.validUserNameV2(sUserName)) {
        return res.status(status.badRequest).json(message.userNameNotValidV2);
      }
      if (!common.validPasswordV2(sPassword)) {
        return res.status(status.badRequest).json(message.passwordNotValidV2);
      }
      if (!common.validEmail(sEmail)) {
        return res.status(status.badRequest).json(message.emailNotValid);
      }
      return next();
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
      if (common.validPasswordV2(sNewPassword)) {
        return next();
      }
      return res.status(status.badRequest).json(message.passwordNotValid);
    } catch (error) {
      console.error(error);
      return res.status(status.internalServerError).json(message.validationError);
    }
  }

  changeUserName(req, res, next) {
    try {
      const { sNewUserName } = req.body;
      if (!(sNewUserName)) {
        return res.status(status.badRequest).json(message.mandatoryFields);
      }
      if (common.validUserNameV2(sNewUserName)) {
        return next();
      }
      return res.status(status.badRequest).json(message.userNameNotValidV2);
    } catch (error) {
      return res.status(status.internalServerError).json(message.validationError);
    }
  }
}
module.exports = new Validator();
