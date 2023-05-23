/* eslint-disable consistent-return */
require('dotenv').config();
const aUsers = require('../../../../users.json');
const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Middleware {
  async loginUser(req, res, next) {
    try {
      req.nUserIndex = common.findIndex(req.body.sUserName);
      if (req.nUserIndex !== -1) {
        const { sPassword } = aUsers[req.nUserIndex];
        const bResult = await common.comparePassword(req.body.sPassword, sPassword);
        if (!bResult) {
          return res.status(status.badRequest).json(message.invalidCredentials);
        }
        return next();
      }
      return res.status(status.badRequest).json(message.invalidCredentials);
    } catch (error) {
      return res.status(status.internalServerError).json(message.middlewareError);
    }
  }

  registerUser(req, res, next) {
    try {
      req.nUserIndex = common.findIndex(req.body.sUserName);
      if (req.nUserIndex !== -1) {
        return res.status(status.badRequest).json(message.userExists);
      }
      return next();
    } catch (error) {
      return res.status(status.internalServerError).json(message.middlewareError);
    }
  }

  async password(req, res, next) {
    try {
      const { sPassword } = aUsers[req.nUserIndex];
      const bResult = await common.comparePassword(req.body.sPassword, sPassword);
      if (!bResult) {
        return res.status(status.badRequest).json(message.wrongPass);
      }
      return next();
    } catch {
      return res.status(status.internalServerError).json(message.middlewareError);
    }
  }

  async verifyToken(req, res, next) {
    try {
      const sToken = req.headers.authorization;
      if (sToken) {
        const nUserIndex = await common.verify(sToken);
        // console.log(nUserIndex);
        if (nUserIndex === -1) {
          return res.status(status.unAuthorized).json(message.tokenVerificationError);
        }
        req.nUserIndex = nUserIndex;
        next();
        return;
      }
      return res.status(status.unAuthorized).json(message.tokenRequire);
    } catch (error) {
      console.log(65, error);
      return res.status(status.internalServerError).json(message.middlewareError);
    }
  }
}

module.exports = new Middleware();
