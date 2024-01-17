const Recipient = require('../../api/recipients/model');
const { BadRequestError, UnauthorizedError } = require('../../errors');
const { createTokenUser, createJWT } = require('../../utils');

const signin = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Recipient.findOne({ email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials3');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials4');
  }

  const token = createJWT({ payload: createTokenUser(result) });

  return { token };
};

module.exports = { signin };
