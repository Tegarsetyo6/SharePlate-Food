const Orders = require('../../api/orders/model');

const getAllOrders = async (req) => {
  const { limit = 10, page = 1, startDate, endDate } = req.query;
  let condition = {};

  if (startDate && endDate) {
    const start = new Date(startDate);
    start.setHours(0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59);
    condition = {
      ...condition,
      date: {
        $gte: start,
        $lt: end,
      },
    };
  }

  const result = await Orders.find(condition)
    .limit(limit)
    .skip(limit * (page - 1));

  const count = await Orders.countDocuments(condition);

  return { data: result, pages: Math.ceil(count / limit), total: count };
};

const createOrders = async (req) => {
  try {
    // Extract necessary information from the request body or parameters
    const { date, recipientId, sellerMenuId } = req.body;

    // Create a new order instance
    const newOrder = new Orders({
      date,
      recipient: recipientId,
      sellerMenu: sellerMenuId,
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Optionally, you can perform additional actions or validations here

    return savedOrder;
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error creating order:', error);
    throw error;
  }
};

module.exports = {
  getAllOrders,
  //   createOrders,
};
