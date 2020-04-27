const path = require('path');
const router = require('express').Router({ mergeParams: true });
const { getToken } = require('../../utils/jwsAuth');
const asyncWrap = require('../../async_wrap');
const HttpStatus = require('http-status-codes');
const { UserError } = require(path.join(__dirname, '../../errorHandler'));

router.route('/').post(
  asyncWrap(async (req, res) => {
    const token = await getToken(req);
    if (token) {
      res.status(HttpStatus.OK).json({ token });
    } else {
      console.log('inside error');
      throw new UserError(HttpStatus.UNAUTHORIZED, 'Wrong credintials');
    }
  })
);

module.exports = router;
