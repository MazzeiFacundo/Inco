const axios = require('axios');
const { Product, TypeOfDeal, User } = require("../db.js");
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
                    attributes: {exclude: ['image', 'galleryImages']},
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

            const photoArray = [];

            const photoArray1 = await axios.get(
                "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2021/08/download-23.jpg",
                { responseType: "arraybuffer" }
            );

            const photoArray2 = await axios.get(
                "https://ca-times.brightspotcdn.com/dims4/default/c12c0dd/2147483647/strip/true/crop/2000x1195+0+0/resize/1486x888!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fad%2Ff4%2F1f1b2193479eafb7cbba65691184%2F10480-sunset-fullres-01.jpg",
                { responseType: "arraybuffer" }
            );

            photoArray.push(photoArray1)
            photoArray.push(photoArray2)
            console.log(photoArray)

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
                photoArray,
                typeOfProduct,
                image: photo.data,
                galleryImages: photoArray
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

    getGalleryProduct = async (req, res) => {
        const productId = req.query.id;
        // const tokenDecoded = jwt.decode(tokenUser);
        try {
            let productFind = await Product.findOne({ where: { id: productId } });
            return !productFind
                ? res.status(404).json({ msgE: "User not Found" })
                : res.status(200).send(productFind.galleryImages);
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