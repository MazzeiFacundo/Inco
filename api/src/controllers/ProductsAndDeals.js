const axios = require('axios');
const { Product, TypeOfDeal, User, Images } = require("../db.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");


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
                    include: {
                        model: TypeOfDeal,
                        attributes: ["name"],
                        through: {
                            attributes: [],
                        },
                    }
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
                order: [['price', 'ASC']],
                include: {
                    model: TypeOfDeal,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                }
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllProductsDESC = async (req, res) => {
        const searchInDb = async () => {
            return await Product.findAll({
                order: [['price', 'DESC']],
                include: {
                    model: TypeOfDeal,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                }
            })
        }
        const dbResults = await searchInDb();
        console.log(dbResults);
        res.status(200).send(dbResults);
    }

    getAllTypeOfDeals = async (req, res) => {
        const searchInDb = async () => {
            return await TypeOfDeal.findAll({
                include: {
                    model: Product,
                    attributes: ["name"],
                    through: {
                        attributes: [],
                    },
                }
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
                typeOfProduct,
                typeOfDeal,
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
                photo,
                typeOfProduct,
                image: photo.data,
                // galleryImages: photoArray
            })

            let typeOfDealDb = await TypeOfDeal.findAll({
                where: { name: typeOfDeal }
            })

            await productCreated.setUser(user.idUser)

            await productCreated.addTypeOfDeal(typeOfDealDb);

            return res.status(201).json({
                msg: "Product listed successfully",
                userName: user.userName,
                productCreated
            });

        } catch (error) { console.log(error) }


    }

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


    listNewTypeOfDeal = async (req, res) => {
        let {
            name
        } = req.body

        let dealCreated = await TypeOfDeal.create({
            name
        })

        res.send("New deal listed successfully")
    }

}

module.exports = ProductsAndDeals;