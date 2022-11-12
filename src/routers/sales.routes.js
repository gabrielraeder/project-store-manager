const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateNewSale = require('../middlewares/validateNewSale.middleware');

const router = express.Router();

router.post('/', validateNewSale, salesController.createSales);
router.get('/', salesController.findAll);
router.get('/:id', salesController.findById);
router.delete('/:id', salesController.remove);

module.exports = router;