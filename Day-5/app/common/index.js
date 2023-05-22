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

  validUserName(sUserName) {
    if (sUserName) return /^\d*[A-Z]\d*$/.test(sUserName);
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
          resolve(-1);
          return;
        }
        const { sUserName } = data;
        const nUserIndex = aUsers.findIndex((oUser) => oUser.sUserName === sUserName);
        resolve(nUserIndex);
      });
    });
  }
}

module.exports = new Common();
