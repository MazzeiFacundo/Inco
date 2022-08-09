const { Router } = require('express');
const router = Router();
const ProductsAndDeals = require('../controllers/ProductsAndDeals');


const productsAndDeals = new ProductsAndDeals()

router.get('/allProducts', productsAndDeals.getAllProducts)
router.get('/allProductsASC', productsAndDeals.getAllProductsASC)
router.get('/allProductsDESC', productsAndDeals.getAllProductsDESC)
router.get("/getPhotoProduct", productsAndDeals.getPhotoProduct);
router.get("/getGalleryProduct", productsAndDeals.getGalleryProduct);
router.get('/getProductByUser', productsAndDeals.getProductByUser)
router.get('/productByName', productsAndDeals.getProductByName)
router.get('/productById', productsAndDeals.getProductById)
router.get('/allTypeOfDeals', productsAndDeals.getAllTypeOfDeals)

module.exports = router;