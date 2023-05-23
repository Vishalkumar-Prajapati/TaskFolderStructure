const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const aUsers = require('../users.json');

class Common {
  validPassword(sPassword) {
    if (sPassword) return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16,}$/.test(sPassword);
    return false;
  }

  validPasswordV2(sPassword) {
    if (sPassword) return /^(?=.*[A-Z])(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{16,}$/.test(sPassword);
    return false;
  }

  validUserName(sUserName) {
    if (sUserName) return /^\d*[A-Z]\d+$/.test(sUserName) || /^\d+[A-Z]\d*$/.test(sUserName);
    return false;
  }

  validUserNameV2(sUserName) {
    if (sUserName) return /^[a-z]*[~!@#$%^&*_-][a-z]+$/.test(sUserName) || /^[a-z]+[~!@#$%^&*_-][a-z]*$/.test(sUserName);
    return false;
  }

  validEmail(sEmail) {
    if (sEmail) return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(sEmail);
    return false;
  }

  validPhoneNumber(nPhoneNumber) {
    if (nPhoneNumber) return /^[([1-9][0-9]{9}$/.test(nPhoneNumber);
    return false;
  }

  async passwordHash(sPassword) {
    const sHashedPass = await bcrypt.hash(sPassword, 10);
    return sHashedPass;
  }

  findIndex(sUserName) {
    return aUsers.findIndex((oUser) => oUser.sUserName === sUserName);
  }

  writeJson(arrUsers) {
    fs.writeFile(path.join(__dirname, '../users.json'), JSON.stringify(arrUsers), (err) => { if (err) console.error(err); });
  }

  comparePassword(sReqPassword, sPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(sReqPassword, sPassword, (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        if (!result) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  verify(sToken) {
    return new Promise((resolve) => {
      jwt.verify(sToken, process.env.SECURITY_KEY, (err, data) => {
        if (err) {
          console.error(err);
          resolve({ nUserIndex: -1, sRole: null });
          return;
        }
        const { sUserName, sRole } = data;
        const nUserIndex = aUsers.findIndex((oUser) => oUser.sUserName === sUserName);
        resolve({ nUserIndex, sRole });
      });
    });
  }
}

module.exports = new Common();
