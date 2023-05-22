/* eslint-disable consistent-return */
require('dotenv').config();
const aUsers = require('../../../../users.json');
const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Middleware {
  async login(req, res, next) {
    try {
      req.nUserIndex = common.findIndex(req.body.sUserName);
      if (req.nUserIndex !== -1) {
        const { sPassword } = aUsers[req.nUserIndex];
        const bResult = await common.comparePassword(req.body.sPassword, sPassword);
        if (!bResult) {
          return res.status(status.badrequest).send(message.invalidCredentials);
        }
        return next();
      }
      return res.status(status.badrequest).send(message.invalidCredentials);
    } catch (error) {
      return res.status(status.internalServerError).send(message.middlewareError);
    }
  }

  register(req, res, next) {
    try {
      req.nUserIndex = common.findIndex(req.body.sUserName);
      if (req.nUserIndex !== -1) {
        return res.status(status.badrequest).send(message.userExists);
      }
      return next();
    } catch (error) {
      return res.status(status.internalServerError).send(message.middlewareError);
    }
  }

  async password(req, res, next) {
    try {
      const { sPassword } = aUsers[req.nUserIndex];
      const bResult = await common.comparePassword(req.body.sPassword, sPassword);
      if (!bResult) {
        return res.status(status.badrequest).send(message.invalidCredentials);
      }
      return next();
    } catch {
      return res.status(status.internalServerError).send(message.middlewareError);
    }
  }

  async verifyToken(req, res, next) {
    try {
      const sToken = req.headers.authorization;
      if (sToken) {
        const nUserIndex = await common.verify(sToken);
        // console.log(nUserIndex);
        if (nUserIndex === -1) {
          return res.status(status.unauthorized).send(message.tokenVerificationError);
        }
        req.nUserIndex = nUserIndex;
        next();
        return;
      }
      res.status(status.unauthorized).send(message.tokenRequire);
    } catch (error) {
      console.log(65, error);
      return res.status(status.internalServerError).send(message.middlewareError);
    }
  }
}

module.exports = new Middleware();
