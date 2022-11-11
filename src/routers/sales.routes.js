const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateNewSale = require('../middlewares/validateNewSale.middleware');

const router = express.Router();

router.post('/', validateNewSale, salesController.createSales);

module.exports = router;