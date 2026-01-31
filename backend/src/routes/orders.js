const express = require('express');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders,
} = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/admin/all', adminAuth, getAllOrders);
router.get('/:id', auth, getOrder);
router.put('/:id', adminAuth, updateOrderStatus);

module.exports = router;
