const SellerMenu = require('../../api/sellerMenu/model');

const { BadRequestError, NotFoundError } = require('../../errors/index');

const getAllSellerMenu = async (req) => {
  const result = await SellerMenu.find();

  return result;
};

const createMenu = async (req) => {
  const { name, description, category, price, sellerId, amount } = req.body;

  const check = await SellerMenu.findOne({
    name,
    sellerId: sellerId,
  });

  if (check) {
    throw new BadRequestError('Nama tidak boleh duplikat');
  }

  const result = await SellerMenu.create({
    name,
    description,
    category,
    price,
    sellerId,
    amount,
  });

  return result;
};

const deleteMenu = async (req) => {
  const { id } = req.params;

  const result = await SellerMenu.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Menu dengan id :  ${id}`);

  return SellerMenu.deleteOne({ _id: id });
};

const updateMenu = async (req) => {
  const { id } = req.params;
  const { name, description, category, price, sellerId, amount } = req.body;

  const check = await SellerMenu.findOne({
    name,
    _id: id,
    sellerId: sellerId,
  });

  if (check) throw new BadRequestError('Kategori nama duplikasi');

  const result = await SellerMenu.findOneAndUpdate(
    {
      _id: id,
    },
    { name, description, category, price, sellerId, amount },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError();

  return result;
};

module.exports = {
  getAllSellerMenu,
  createMenu,
  deleteMenu,
  updateMenu,
};
