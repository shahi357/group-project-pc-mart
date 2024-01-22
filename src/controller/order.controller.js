import { Order } from "../model/order.model.js";
import { Product } from "../model/product.model.js";

export const addNewOrder = async (req, res) => {
  try {
    const items = req.body.items;

    const productIds = items.map((item) => {
      return { _id: item.productId };
    });
    const products = await Product.find({ _id: { $in: productIds } });
    const newItems = items.map((value) => {
      const product = products.find(
        (item) => item._id.toString() === value.productId.toString()
      );
      return {
        product: value.productId,
        quantity: value.quantity,
        price: product.productPrice,
      };
    });
    const saveObject = req.body;
    saveObject.orderDetails = newItems;
    saveObject.user = req.user;
    saveObject.orderDate = new Date();
    const response = await Order.insertMany(saveObject);
    res.status(201).json({
      message: "Order added successfully",
      data: response,
    });
  } catch (error) {
    console.log(error, "ADD_NEW_ORDER");
    res.status(400).json({ message: "Error creating order" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({ message: "Error fetching order" });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("orderDetails.product")
      .populate("user")
      .exec();
    res
      .status(200)
      .json({ message: "Order fetched successfully", data: orders });
  } catch (error) {
    console.log(error, "ERROR_WHILE_FETCHING_ALL_ORDERS");
    res.status(400).json({ message: "Error fetching orders" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ message: "order not found" });
      return;
    }
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting order" });
  }
};
