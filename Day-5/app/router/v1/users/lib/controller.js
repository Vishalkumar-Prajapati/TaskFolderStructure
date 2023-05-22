const fs = require('fs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const aUsers = require('../../../../users.json');
const { message, status } = require('../../../../message/index');
const common = require('../../../../common/index');

class Controller {
  login(req, res) {
    try {
      return res.status(status.statusSuccess).send({ sToken: jwt.sign({ sUserName: req.body.sUserName }, process.env.SECURITY_KEY, { expiresIn: '2h' }) });
    } catch (error) {
      console.error(error);
      return res.status(status.internalServerError).send(message.controllerError);
    }
  }

  async register(req, res) {
    try {
      req.body.sPassword = await common.passwordHash(req.body.sPassword);
      aUsers.push(req.body);
      common.writeJson(aUsers);
      return res.status(status.statusSuccess).send(message.registeredSuccess);
    } catch (error) {
      console.error(error);
      return res.status(status.internalServerError).send(message.controllerError);
    }
  }

  password(req, res) {
    try {
      // console.log(req.nUserIndex);
      aUsers[req.nUserIndex].sPassword = req.body.sNewPassword;
      common.writeJson(aUsers);
      return res.status(200).send({ sMessage: 'password updated successfully to the database' });
    } catch (error) {
      console.log(error);
      return res.status(status.internalServerError).send(message.controllerError);
    }
  }

  user(req, res) {
    try {
      req.aDatabase[req.nUserIndex].sUserName = req.body.sNewUserName;
      fs.writeFileSync('./app/users.json', JSON.stringify({ aDatabase: req.aDatabase }));
      return res.status(200).send({ sMessage: 'userName updated successfully to the database' });
    } catch (error) {
      return res.status(status.internalServerError).send(message.controllerError);
    }
  }
}

module.exports = new Controller();
