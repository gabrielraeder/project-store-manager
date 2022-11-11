const express = require('express');
const productRouter = require('./products.routes');
const salesRouter = require('./sales.routes');

const router = express.Router();

router.use('/products', productRouter);
router.use('/sales', salesRouter);

module.exports = router;