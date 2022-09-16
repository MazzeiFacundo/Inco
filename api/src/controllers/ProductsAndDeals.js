const axios = require('axios');
const { Product, User, Images } = require("../db.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const e = require('express');


class ProductsAndDeals {
    constructor() { }

    getProductByName = async (req, res) => {
        try {
            const name = req.query.name
            let allProducts = await this.getAllProducts();
            console.log(allProducts)
            let productsName = await allProducts.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
            productsName.length ? res.status(200).send(productsName) : res.status(404).send("No products")
        } catch (error) {
            console.log(error)
        }
    }

    getAllProducts = async (req, res) => {
        try {
            const name = req.query.name
            const searchInDb = async () => {
                return await Product.findAll({
                    attributes: { exclude: ['image', 'galleryImages'] },
                })
            }
            const dbResults = await searchInDb();
            if (name) {
                let allProducts = dbResults
                console.log(allProducts)
                let productsName = await allProducts.filter((e) => e.name.toLowerCase().includes(name.toLowerCase()))
                productsName.length ? res.status(200).send(productsName) : res.status(404).send("No products")
            } else {
                // console.log(dbResults);
                return res.status(200).send(dbResults);
            }
        } catch (error) {
            console.log(error)
        }
    }

    getAllProductsASC = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                order: [['price', 'ASC']],
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsDESC = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                order: [['price', 'DESC']],
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsOneRoom = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { rooms: 1 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsTwoRoom = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { rooms: 2 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsThreeRoom = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { rooms: 3 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsFourRoomsPlus = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { rooms: { [Op.gte]: 4 } },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsOneBath = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { bathrooms: 1 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsTwoBath = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { bathrooms: 2 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsThreeBath = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { bathrooms: 3 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsFourBathPlus = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { bathrooms: { [Op.gte]: 4 } },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsOneDorm = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { dorms: 1 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsTwoDorm = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { dorms: 2 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsThreeDorm = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { dorms: 3 },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsFourDormPlus = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                attributes: { exclude: ['image', 'galleryImages'] },
                where: { dorms: { [Op.gte]: 4 } },
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getProductById = async (req, res) => {
        try {
            const id = req.query.id;
            const product = await Product.findOne({
                where: { id: id },
                attributes: { exclude: ['image'] },
                include: [
                    {
                        model: User,
                        attributes: { exclude: ['profileImage', 'password'] },
                    },
                ],
            })
            console.log(product)
            res.status(200).send(product)
        } catch (error) {
            console.log(error)
        }
    }

    getProductByUser = async (req, res) => {
        let id = req.query.id;
        console.log(Product)

        if (id.substr(0, 3) === "asc") {
            try {
                const product = await Product.findAll({
                    order: [['price', 'ASC']],
                    where: { UserIdUser: id.substr(3) },
                })
                console.log(product)
                res.status(200).send(product)
            } catch (error) {
                console.log(error)
                res.status(404).send("No products were found")
            }
        }

        if (id.substr(0, 4) === "desc") {
            try {
                const product = await Product.findAll({
                    order: [['price', 'DESC']],
                    where: { UserIdUser: id.substr(4) },
                })
                console.log(product)
                res.status(200).send(product)
            } catch (error) {
                console.log(error)
                res.status(404).send("No products were found")
            }
        }

    }

    listNewProduct = async (req, res) => {

        try {

            const photo = await axios.get(
                "https://archello.s3.eu-central-1.amazonaws.com/images/2018/10/11/Contemporary-Modern-House-Design-6.1539270983.8601.jpg",
                { responseType: "arraybuffer" }
            );

            let {
                name,
                description,
                price,
                location,
                productWidth,
                productHeight,
                rooms,
                dorms,
                bathrooms,
                typeOfProduct,
                typeOfDeal,
                secondTypeOfDeal,
                token
            } = req.body
            const tokenDecode = jwt.decode(token);

            const user = await User.findOne({
                where: { userName: tokenDecode.userName },
            });
            if (!user) return res.status(404).json({ msgE: "Could not find your user" });

            let productCreated = await Product.create({
                name,
                description,
                price,
                location,
                productWidth,
                productHeight,
                rooms,
                dorms,
                bathrooms,
                photo,
                typeOfProduct,
                typeOfDeal,
                secondTypeOfDeal,
                image: photo.data,
                // galleryImages: photoArray
            })

            await productCreated.setUser(user.idUser)

            return res.status(201).json({
                msg: "Product listed successfully",
                userName: user.userName,
                productCreated
            });

        } catch (error) { console.log(error) }


    }

    deleteProduct = async (req, res) => {
        const { idProduct } = req.body;
        try {
            const product = await Product.findByPk(idProduct);
            if (!product) return res.status(404).json({ msgE: "No product found" });
            await product.destroy();

            return res.status(200).json({ msg: "Product deleted succesfully" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msgE: error.message });
        }
    };

    addGalleryImage = async (req, res) => {

        let id = req.query.id;
        let dataPhoto;

        try {
            dataPhoto = req.files.photoGallery.data;
        } catch (e) {
            console.log(e)
        }
        if (req.files) {
            dataPhoto = req.files.photoGallery.data;
        }

        console.log(dataPhoto)

        try {
            const product = await Product.findOne({
                where: { id: id },
            });
            if (!product) return res.status(404).json({ msgE: "Could not find your product" });

            const photo = await axios.get(
                "https://us.123rf.com/450wm/aquir/aquir1909/aquir190907813/129839336-bot%C3%B3n-de-ejemplo-ejemplo-de-signo-verde-redondeado-ejemplo.jpg?ver=6",
                { responseType: "arraybuffer" }
            );
            console.log(photo)

            let imageCreated = await Images.create({
                image: dataPhoto
            })

            await imageCreated.setProduct(product.id)

            return res.status(201).json({
                msg: "Image added successfully",
                product: product.id,
                imageCreated: imageCreated.id
            });
        } catch (error) {
            console.log(error)
        }
    }

    getPhotoProduct = async (req, res) => {
        const productId = req.query.id;
        // const tokenDecoded = jwt.decode(tokenUser);
        try {
            let productFind = await Product.findOne({ where: { id: productId } });
            return !productFind
                ? res.status(404).json({ msgE: "User not Found" })
                : res.status(200).end(productFind.image);
        } catch (error) {
            console.log(error);
            res.status(404).json({ msgE: "Error to get photo" });
        }
    };

    updatePhotoProduct = async (req, res) => {
        let id = req.query.id;
        let dataPhoto;

        try {
            dataPhoto = req.files.photoProduct.data;
        } catch (e) {
            console.log(e)
        }
        if (req.files) {
            dataPhoto = req.files.photoProduct.data;
        }

        console.log(dataPhoto)

        try {
            const product = await Product.findOne({
                where: { id: id },
            });
            if (!product) return res.status(404).json({ msgE: "Could not find your product" });

            let productUpdate = await Product.update({
                image: dataPhoto
            },
                { where: { id: product.dataValues.id } }
            )

            return res.status(201).json({
                msg: "Product updated successfully",
                product: product.id,
                imageUpdate: dataPhoto
            });
        } catch (error) {
            console.log(error)
        }

    };

    updatePhotoGallery = async (req, res) => {
        let id = req.query.id;
        let dataPhoto;

        try {
            dataPhoto = req.files.photoProduct.data;
        } catch (e) {
            console.log(e)
        }
        if (req.files) {
            dataPhoto = req.files.photoProduct.data;
        }

        console.log(dataPhoto)

        try {
            const imageGallery = await Images.findOne({
                where: { id: id },
            });
            if (!imageGallery) return res.status(404).json({ msgE: "Could not find your image" });

            let imageUpdated = await Images.update({
                image: dataPhoto
            },
                { where: { id: imageGallery.dataValues.id } }
            )

            return res.status(201).json({
                msg: "Image updated successfully",
                product: imageGallery.id,
                imageUpdate: dataPhoto
            });
        } catch (error) {
            console.log(error)
        }

    };

    deletePhotoGallery = async (req, res) => {
        let id = req.query.id;

        try {
            const imageGallery = await Images.findOne({
                where: { id: id },
            });
            if (!imageGallery) return res.status(404).json({ msgE: "Could not find your image" });

            let imageDelete = await Images.destroy(
                { where: { id: imageGallery.dataValues.id } }
            )

            return res.status(201).json({
                msg: "Image deleted successfully",
            });
        } catch (error) {
            console.log(error)
        }

    };

    getPhotoGallery = async (req, res) => {
        const imageId = req.query.id;
        // const tokenDecoded = jwt.decode(tokenUser);
        try {
            let imageFound = await Images.findOne({ where: { id: imageId } });
            console.log(imageFound.image)
            return !imageFound
                ? res.status(404).json({ msgE: "User not Found" })
                : res.status(200).end(imageFound.image);
        } catch (error) {
            console.log(error);
            res.status(404).json({ msgE: "Error to get photo" });
        }
    };

    getGalleryProduct = async (req, res) => {
        const productId = req.query.id;
        // const tokenDecoded = jwt.decode(tokenUser);
        try {
            let imagesFound = await Images.findAll(
                {
                    where: { productId: productId }, attributes: { exclude: ['image'] },
                },

            );
            console.log(imagesFound)
            res.send(imagesFound)
            // return !productFind
            //     ? res.status(404).json({ msgE: "User not Found" })
            //     : res.status(200).end(productFind.galleryImages[0]);
        } catch (error) {
            console.log(error);
            res.status(404).json({ msgE: "Error to get photo" });
        }
    };

    editProduct = async (req, res) => {
        const {
            id,
            name,
            description,
            price,
            location,
            typeOfProduct,
            typeOfDeal,
            secondTypeOfDeal,
            rooms,
            dorms,
            bathrooms,
            productWidth,
            productHeight
        } = req.body;

        if (!id) return res.status(404).json({ msgE: "No id provided" })

        try {
            /*-Primero busco el usuario para luego buscarlo cuando quiero actualizar los datos por el id*/
            const productFound = await Product.findOne({
                where: { id: id }, attributes: { exclude: ['image'] }
            });
            if (!productFound) res.status(404).json({ msgE: "Product not found" });
            const productUpdate = await Product.update(
                {
                    name:
                        name && name !== productFound.dataValues.name
                            ? name
                            : productFound.dataValues.name,

                    description:
                        description && description !== productFound.dataValues.description
                            ? description
                            : productFound.dataValues.description,

                    price:
                        price && price !== productFound.dataValues.price
                            ? price
                            : productFound.dataValues.price,

                    location:
                        location && location !== productFound.dataValues.location
                            ? location
                            : productFound.dataValues.location,

                    rooms:
                        rooms && rooms !== productFound.dataValues.rooms
                            ? rooms
                            : productFound.dataValues.rooms,

                    dorms:
                        dorms && dorms !== productFound.dataValues.dorms
                            ? dorms
                            : productFound.dataValues.dorms,

                    bathrooms:
                        bathrooms && bathrooms !== productFound.dataValues.bathrooms
                            ? bathrooms
                            : productFound.dataValues.bathrooms,

                    productWidth:
                        productWidth && productWidth !== productFound.dataValues.productWidth
                            ? productWidth
                            : productFound.dataValues.productWidth,

                    productHeight:
                        productHeight && productHeight !== productFound.dataValues.productHeight
                            ? productHeight
                            : productFound.dataValues.productHeight,
                    typeOfProduct:
                        typeOfProduct && typeOfProduct !== productFound.dataValues.typeOfProduct
                            ? typeOfProduct
                            : productFound.dataValues.typeOfProduct,

                    typeOfDeal:
                        typeOfDeal && typeOfDeal !== productFound.dataValues.typeOfDeal
                            ? typeOfDeal
                            : productFound.dataValues.typeOfDeal,

                    secondTypeOfDeal:
                        secondTypeOfDeal && secondTypeOfDeal !== productFound.dataValues.secondTypeOfDeal
                            ? secondTypeOfDeal
                            : null,
                },
                { where: { id: productFound.dataValues.id } }
            );

            const productUpdatedSend = await Product.findOne({ where: { id: id }, attributes: { exclude: ['image'] } });
            return !productUpdate.length
                ? res.status(404).json({ msgE: "Fail Edit product" })
                : res.status(200).json({ msg: "Successful edit", productUpdatedSend });
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "Fail Edit product" });
        }
    }

}

module.exports = ProductsAndDeals;