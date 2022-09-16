const { Router } = require('express');
const router = Router();
const ProductsAndDeals = require('../controllers/ProductsAndDeals');


const productsAndDeals = new ProductsAndDeals()

router.get('/allProducts', productsAndDeals.getAllProducts);
router.get('/allProductsASC', productsAndDeals.getAllProductsASC);
router.get('/allProductsDESC', productsAndDeals.getAllProductsDESC);

router.get('/allProductsOneRoom', productsAndDeals.getAllProductsOneRoom);
router.get('/allProductsTwoRooms', productsAndDeals.getAllProductsTwoRoom);
router.get('/allProductsThreeRooms', productsAndDeals.getAllProductsThreeRoom);
router.get('/allProductsFourRoomsPlus', productsAndDeals.getAllProductsFourRoomsPlus);

router.get('/allProductsOneBath', productsAndDeals.getAllProductsOneBath);
router.get('/allProductsTwoBath', productsAndDeals.getAllProductsTwoBath);
router.get('/allProductsThreeBath', productsAndDeals.getAllProductsThreeBath);
router.get('/allProductsFourBathPlus', productsAndDeals.getAllProductsFourBathPlus);

router.get('/allProductsOneDorm', productsAndDeals.getAllProductsOneDorm);
router.get('/allProductsTwoDorm', productsAndDeals.getAllProductsTwoDorm);
router.get('/allProductsThreeDorm', productsAndDeals.getAllProductsThreeDorm);
router.get('/allProductsFourDormPlus', productsAndDeals.getAllProductsFourDormPlus);

router.get("/getPhotoProduct", productsAndDeals.getPhotoProduct);
router.get("/getPhotoGallery", productsAndDeals.getPhotoGallery);
router.get("/getGalleryProduct", productsAndDeals.getGalleryProduct);
router.get('/getProductByUser', productsAndDeals.getProductByUser)
router.get('/productByName', productsAndDeals.getProductByName)
router.get('/productById', productsAndDeals.getProductById)

module.exports = router;