const {Router} = require('express');
const router = Router();
const ProductsAndDeals = require('../controllers/ProductsAndDeals');
const fileUpload = require("express-fileupload"); //Importación de paquete para la carga y devolución de fotos


const productsAndDeals = new ProductsAndDeals()

router.use(fileUpload());
router.post('/product', productsAndDeals.listNewProduct)
router.post('/typeOfDeal', productsAndDeals.listNewTypeOfDeal)
router.post('/galleryImage', productsAndDeals.addGalleryImage)
router.post('/productImage', productsAndDeals.updatePhotoProduct)

module.exports = router;