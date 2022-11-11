const express = require('express');
const productRouter = require('./products.routes');

const router = express.Router();

router.use('/products', productRouter);

module.exports = router;