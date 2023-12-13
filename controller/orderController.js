const Orders = require("../model/Orders.js");

//Creating Orders
exports.createOrder = async (req, res) => {
  try {
    let customer_name = req.body.customer_name;
    let customer_email = req.body.customer_email;
    let phonenumber = req.body.phonenumber;
    let address = req.body.address;
    let cake = req.body.cake;
    let quantity = req.body.quantity;
    let cake_id = req.body.cake_id;
    let user_id=req.body.user_id;

    console.log(
      customer_name,
      customer_email,
      phonenumber,
      address,
      cake,
      quantity,
      cake_id,
      user_id
    );

    let data = {
      customer_name: customer_name,
      customer_email: customer_email,
      address: address,
      phonenumber: phonenumber,
      cake: cake,
      quantity: quantity,
      cake_id: cake_id,
      user_id: user_id,
    };

    const orders = await Orders.create(data);
    res.status(201).json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};


exports.getOrders = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrdersById = async (req, res) => {
  try {

    const { id } = req.params;
    const orders = await Orders.findById(id);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Invalid Request" });
  }
};

exports.updateOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const options = { new: true };
    const orders = await Orders.findByIdAndUpdate(id, req.body, options);
    if (!orders) {
      return res
        .status(404)
        .json({ message: `cannot find any bill with id:${id}` });
    } else {
      // const updatedbills=await Bills.findById(id);
      return res.status(200).json(orders);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.cancelOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Orders.findByIdAndDelete(id);
    if (!orders) {
      return res.status(400).json({ message: `order with ${id} not found` });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.cakebyUsername = async (req, res) => {
  try {
    const user_id = req.params.id;
    console.log(user_id);
    const orders = await Orders.find({ user_id }).exec();

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this username." });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


