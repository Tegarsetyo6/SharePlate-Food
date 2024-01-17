const Users = require('../../api/users/model');

const { BadRequestError } = require('../../errors');

const createUser = async (req) => {
  const { email, password, confirmPassword, name, role } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError('Password dan ConfirmPassword tidak sama');
  }

  const result = await Users.create({
    email,
    name,
    password,
    role,
  });
  return result;
};

module.exports = { createUser };
