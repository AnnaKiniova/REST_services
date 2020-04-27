const path = require('path');
const router = require('express').Router({ mergeParams: true });
const { getToken } = require(path.join(__dirname, '../../utils/jwsAuth'));
const asyncWrap = require(path.join(__dirname, '../../async_wrap'));
const HttpStatus = require('http-status-codes');

router.route('/').post(
  asyncWrap(async (req, res) => {
    const token = await getToken(req);
    res.status(HttpStatus.OK).json({ token });
  })
);

module.exports = router;
