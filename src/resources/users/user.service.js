const Joi = require('joi');

const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const addUser = newUser => usersRepo.addUser(newUser);

const findUser = id => usersRepo.findUser(id);

const validateUser = input => {
  const schema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required()
  });
  const result = schema.validate(input);
  if (result.error) {
    throw new Error('wrong data input');
  }
  return !result.error;
};

module.exports = { getAll, validateUser, addUser, findUser };

// exports.createUser = (reqBody, users) => {
//   console.log('in val 1');
//   console.log(reqBody, users);
//   if (validateData(reqBody)) {
//     console.log('in val 2');
//     const newUser = reqBody;
//     newUser.id = getId(users);
//     users.push(newUser);
//     console.log(users);
//     return true;
//   }
//   return false;
// };
