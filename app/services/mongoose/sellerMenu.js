const SellerMenu = require('../../api/sellerMenu/model');

const { BadRequestError, NotFoundError } = require('../../errors/index');

const getAllSellerMenu = async (req) => {
  const result = await SellerMenu.find();

  return result;
};

const createMenu = async (req) => {
  const { name, description, category, price, id } = req.body;

  const check = await SellerMenu.findOne({
    name,
    sellerId: req.user.id,
  });
};

module.exports = {
  getAllSellerMenu,
};
