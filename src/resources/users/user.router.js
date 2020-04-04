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
    try {
      if (usersService.validateUser(req.body)) {
        const newUser = new User(req.body);
        await usersService.addUser(newUser);
        res.status(200).json(User.toResponse(newUser));
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  });

router.route('/:id').get(async (req, res) => {
  console.log('in id route');
  try {
    const userFind = await usersService.findUser(req.params.id);
    console.log(`id: ${req.params.id}`);
    res.json(userFind);
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
});
module.exports = router;
