const Recipient = require('../../api/recipients/model');
const SellerMenu = require('../../api/sellerMenu/model');
const Orders = require('../../api/orders/model');

const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, role } = req.body;

  // jika email dan status tidak aktif
  let result = await Recipient.findOne({
    email,
    status: 'tidak aktif',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Recipient.create({
      firstName,
      lastName,
      email,
      password,
      role,
      otp: Math.floor(Math.random() * 9999),
    });
  }

  delete result._doc.password;

  return result;
};

const signinParticipant = async (req) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const result = await Recipient.findOne({ email: email });

  if (!result) {
    throw new UnauthorizedError('Invalid Credentials1');
  }

  const isPasswordCorrect = await result.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError('Invalid Credentials');
  }

  const token = createJWT({ payload: createTokenParticipant(result) });

  return token;
};

const getAllSellerMenu = async (req) => {
  const result = await SellerMenu.find({});

  return result;
};

const getOneSellerMenu = async (req) => {
  const { id } = req.params;
  const result = await SellerMenu.findOne({ _id: id });

  if (!result) throw new NotFoundError(`Tidak ada acara dengan id :  ${id}`);

  return result;
};

const getAllOrders = async (req) => {
  const { id } = req.body;
  const result = await Orders.find({ recipient: id });
  return result;
};

const checkoutOrder = async (req) => {
  try {
    const { sellerMenuId, recipientId, amount, sellerId } = req.body;

    const checkingEvent = await SellerMenu.findOne({ _id: sellerMenuId });
    if (!checkingEvent) {
      throw new NotFoundError('Tidak ada acara dengan id : ' + sellerMenuId);
    }

    // Assuming Orders is your Mongoose model for orders
    const result = await Orders.create({
      date: new Date(),
      recipient: recipientId,
      sellerMenuId,
      amount,
      sellerId,
    });

    return result;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error; // rethrow the error for handling elsewhere
  }
};

// const getAllPaymentByOrganizer = async (req) => {
//   const { organizer } = req.params;

//   const result = await Payments.find({ organizer: organizer });

//   return result;
// };

module.exports = {
  signupParticipant,
  signinParticipant,
  getAllSellerMenu,
  getOneSellerMenu,
  getAllOrders,
  checkoutOrder,
};
