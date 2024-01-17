const Seller = require('../../api/seller/model');
const SellerMenu = require('../../api/sellerMenu/model');
const Orders = require('../../api/orders/model');

const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');
const { createTokenParticipant, createJWT } = require('../../utils');

const signupParticipant = async (req) => {
  const { firstName, lastName, email, password, storeName, profileImage } = req.body;

  // jika email dan status tidak aktif
  let result = await Seller.findOne({
    email,
    status: 'tidak aktif',
  });

  if (result) {
    result.firstName = firstName;
    result.lastName = lastName;
    result.role = role;
    result.email = email;
    result.password = password;
    result.storeName = storeName;
    result.profileImage = profileImage;
    result.otp = Math.floor(Math.random() * 9999);
    await result.save();
  } else {
    result = await Seller.create({
      firstName,
      lastName,
      email,
      password,
      storeName,
      profileImage,
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

  const result = await Seller.findOne({ email: email });

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
  const { id } = req.body;
  const result = await SellerMenu.find({ sellerId: id });

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
  const result = await Orders.find({ sellerId: id });
  return result;
};

module.exports = {
  signupParticipant,
  signinParticipant,
  getAllSellerMenu,
  getOneSellerMenu,
  getAllOrders,
};
