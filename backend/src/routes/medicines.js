const express = require('express');
const {
  getMedicines,
  getMedicine,
  createMedicine,
  updateMedicine,
  deleteMedicine,
  getCategories,
} = require('../controllers/medicineController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', getMedicines);
router.get('/categories/all', getCategories);
router.get('/:id', getMedicine);
router.post('/', adminAuth, createMedicine);
router.put('/:id', adminAuth, updateMedicine);
router.delete('/:id', adminAuth, deleteMedicine);

module.exports = router;
