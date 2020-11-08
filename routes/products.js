var express = require('express');
var router = express.Router();
const middleware = require('../routes/middleware');
var [getProducts, insertProduct] = require('../controllers/product');
/* GET product listing. */
router.get('/', middleware.checkToken,async function (req, res, next) {
  const products = await getProducts();
  console.warn('products->', products);
  res.send(products);
});
/**
 * POST product
 */
router.post('/',middleware.checkToken, async function (req, res, next) {
  const newProduct = await insertProduct(req.body);
  console.warn('insert products->', newProduct);
  res.send(newProduct);
});

module.exports = router;
