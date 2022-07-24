const {Router} = require('express');
const router = Router();
const ProductsAndDeals = require('../controllers/ProductsAndDeals');


const productsAndDeals = new ProductsAndDeals()

router.post('/product', productsAndDeals.listNewProduct)
router.post('/typeOfDeal', productsAndDeals.listNewTypeOfDeal)

module.exports = router;