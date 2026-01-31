const Order = require('../models/Order');
const Medicine = require('../models/Medicine');

// @route   POST /api/orders
// @desc    Create order
// @access  Private
exports.createOrder = async (req, res) => {
  try {
    const { medicines, shippingAddress } = req.body;

    if (!medicines || medicines.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No medicines in order' });
    }

    let totalPrice = 0;

    for (let item of medicines) {
      const medicine = await Medicine.findById(item.medicineId);

      if (!medicine) {
        return res
          .status(404)
          .json({ success: false, message: `Medicine ${item.medicineId} not found` });
      }

      if (medicine.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${medicine.name}`,
        });
      }

      totalPrice += medicine.price * item.quantity;
      item.name = medicine.name;
      item.price = medicine.price;

      // Decrease stock
      medicine.stock -= item.quantity;
      await medicine.save();
    }

    const order = await Order.create({
      userId: req.user.id,
      medicines,
      totalPrice,
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders
// @desc    Get user orders
// @access  Private
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('medicines.medicineId');

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/:id
// @desc    Get single order
// @access  Private
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('medicines.medicineId');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Check if user owns this order
    if (order.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ success: false, message: 'Not authorized to access this order' });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   PUT /api/orders/:id
// @desc    Update order status (Admin only)
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;

    let order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @route   GET /api/orders/admin/all
// @desc    Get all orders (Admin only)
// @access  Private/Admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('medicines.medicineId');

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
