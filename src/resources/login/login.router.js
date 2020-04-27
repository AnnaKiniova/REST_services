// const path = require('path');
const path = require('path');
const router = require('express').Router({ mergeParams: true });
const { getToken } = require('../../utils/jwsAuth');
const asyncWrap = require(path.join(__dirname, '../../async_wrap'));

router.route('/').post(
  asyncWrap(async (req, res) => {
    // req = { login,  password }
    const token = await getToken(req, res);
    res
      .status(200)
      .json(token)
      .send('Successful login');
  })
);
