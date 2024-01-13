const donationMenu = require('../../api/donationMenu/model');

const { BadRequestError, NotFoundError } = require('../../errors/index');

const getAllDonationMenu = async (req) => {
  const result = await donationMenu.find();

  return result;
};

const createMenu = async (req) => {
  const { name, description, category, sellerId, amount } = req.body;

  const check = await donationMenu.findOne({
    name,
    sellerId: sellerId,
  });

  if (check) {
    throw new BadRequestError('Nama tidak boleh duplikat');
  }

  const result = await donationMenu.create({
    name,
    description,
    category,
    sellerId,
    amount,
  });

  return result;
};

const deleteMenu = async (req) => {
  const { id } = req.params;

  const result = await donationMenu.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Menu dengan id :  ${id}`);

  return donationMenu.deleteOne({ _id: id });
};

const updateMenu = async (req) => {
  const { id } = req.params;
  const { name, description, category, sellerId, amount } = req.body;

  const check = await donationMenu.findOne({
    name,
    _id: id,
    sellerId: sellerId,
  });

  if (check) throw new BadRequestError('Kategori nama duplikasi');

  const result = await donationMenu.findOneAndUpdate(
    {
      _id: id,
    },
    { name, description, category, sellerId, amount },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError();

  return result;
};

const checkingMenu = async (req) => {
  const { id } = req.params;
  const result = await donationMenu.findOne({
    _id: id,
  });

  if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

  return result;
};

module.exports = {
  getAllDonationMenu,
  createMenu,
  deleteMenu,
  updateMenu,
  checkingMenu,
};
