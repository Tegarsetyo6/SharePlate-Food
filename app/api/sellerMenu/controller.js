const { StatusCodes } = require('http-status-codes');

const { getAllSellerMenu } = require('../../services/mongoose/sellerMenu');

const index = async (req, res, next) => {
  try {
    const result = await getAllSellerMenu();

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  index,
};
