// const path = require('path');
const router = require('express').Router({ mergeParams: true });
const { getToken } = require('../../utils/jwsAuth');

router.route('/').post((req, res) => {
  // req = { login,  password }
  getToken(req, res);
});
