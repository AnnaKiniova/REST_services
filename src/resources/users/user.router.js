const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const allUsers = await usersService.getAll();
    res.json(allUsers.map(User.toResponse));
  })
  .post(async (req, res) => {
    if (usersService.validateUser(req.body)) {
      const newUser = await new User(req.body);
      console.log(newUser);
      console.log(newUser.id);
      await usersService.addUser(newUser);

      await (() => {
        res.status = 200;
        res.json(newUser);
      });
    }
  });

module.exports = router;
