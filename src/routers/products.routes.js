const express = require('express');
const productController = require('../controllers/products.controller');
const validateProductName = require('../middlewares/validateProductName.middleware');

const router = express.Router();

router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.post('/', validateProductName, productController.createProduct);
router.put('/:id', validateProductName, productController.update);
router.delete('/:id', productController.remove);

module.exports = router;