const {Router} = require('express');
const router = Router();
const ProductsAndDeals = require('../controllers/ProductsAndDeals');


const productsAndDeals = new ProductsAndDeals()

router.get('/allProducts', productsAndDeals.getAllProducts)
router.get('/getProductByUser', productsAndDeals.getProductByUser)
router.get('/productById/:id', productsAndDeals.getProductById)
router.get('/allTypeOfDeals', productsAndDeals.getAllTypeOfDeals)

module.exports = router;