const HttpStatus = require('http-status-codes');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const encryptPassword = async plainPassword => {
  const encryptedPassword = await new Promise((res, rej) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        rej(new Error(HttpStatus.BAD_REQUEST, 'Password was not encrypted'));
      }
      res(hash);
    });
  });
  return encryptedPassword;
};

const checkPassword = async (user, password) => {
  const match = await bcrypt.compare(password, user.password);
  return match;
};

module.exports = { encryptPassword, checkPassword };
