const express = require('express');
const router = express.Router();
const product = require('../controllers/products');
const multer = require('multer');
const { storage } = require('../cloudinary');

const upload = multer({storage});


router.route('/add')
      .get( product.renderadd)
      .post(upload.array('images'),product.add);

router.route('/list')
      .get(product.renderList);

router.delete('/:id/', product.delete);

router.get('/product-detail', product.detail);

module.exports = router;
