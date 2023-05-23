const jwt = require('jsonwebtoken');
require('dotenv').config();
const aUsers = require('../../../../users.json');
const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Controller {
  loginUser(req, res) {
    try {
      return res.status(status.statusSuccess).json({ sToken: jwt.sign({ sUserName: req.body.sUserName }, process.env.SECURITY_KEY, { expiresIn: '2h' }) });
    } catch (error) {
      console.error(error);
      return res.status(status.internalServerError).json(message.controllerError);
    }
  }

  async registerUser(req, res) {
    try {
      req.body.sPassword = await common.passwordHash(req.body.sPassword);
      aUsers.push(req.body);
      common.writeJson(aUsers);
      return res.status(status.statusSuccess).json(message.registeredSuccess);
    } catch (error) {
      console.error(error);
      return res.status(status.internalServerError).json(message.controllerError);
    }
  }

  async changePassword(req, res) {
    try {
      // console.log(req.nUserIndex);
      aUsers[req.nUserIndex].sPassword = await common.passwordHash(req.body.sNewPassword);
      common.writeJson(aUsers);
      return res.status(status.statusSuccess).json(message.changePass);
    } catch (error) {
      console.log(error);
      return res.status(status.internalServerError).json(message.controllerError);
    }
  }

  changeUserName(req, res) {
    try {
      aUsers[req.nUserIndex].sUserName = req.body.sNewUserName;
      common.writeJson(aUsers);
      return res.status(status.statusSuccess).json(message.userNameUpdated);
    } catch (error) {
      console.log(error);
      return res.status(status.internalServerError).json(message.controllerError);
    }
  }

  getUsersData(_req, res) {
    try {
      res.status(status.statusSuccess).json(aUsers);
    } catch (error) {
      console.error(error);
      res.status(status.internalServerError).json(message.controllerError);
    }
  }
}

module.exports = new Controller();
