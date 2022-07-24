const axios = require('axios');
const { Product, TypeOfDeal, User } = require("../db.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");


class ProductsAndDeals {
    constructor() {}

    getAllProducts = async (req, res) => {
        let { parameter } = req.body

        if(parameter === "") {
            const searchInDb = async () => {
                return await Product.findAll({
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

        if(parameter === "asc") {
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

        if(parameter === "desc") {
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
        const id = req.params.id;
        const product = await Product.findOne({
            where: { id: id },
        })
        console.log(product)
        res.status(200).send(product)
    }

    getProductByUser = async (req, res) => {
        let { id, parameter } = req.body;
        console.log(Product)

        if(parameter === "") {
            try {
                const product = await Product.findAll({
                    where: { UserIdUser: id },
                })
                console.log(product)
                res.status(200).send(product)
            } catch (error) {
                console.log(error)
                res.status(404).send("No products were found")
            } 
        }

        if(parameter === "asc") {
            try {
                const product = await Product.findAll({
                    order: [['price', 'ASC']],
                    where: { UserIdUser: id },
                })
                console.log(product)
                res.status(200).send(product)
            } catch (error) {
                console.log(error)
                res.status(404).send("No products were found")
            } 
        }

        if(parameter === "desc") {
            try {
                const product = await Product.findAll({
                    order: [['price', 'DESC']],
                    where: { UserIdUser: id },
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

            let {
                name,
                description,
                price,
                typeOfProduct,
                typeOfDeal,
                image,
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
                typeOfProduct,
                image
            })
    
            let typeOfDealDb = await TypeOfDeal.findAll({
                where: { name: typeOfDeal }
            })
    
            console.log(typeOfDealDb)

            await productCreated.setUser(user.idUser)
    
            await productCreated.addTypeOfDeal(typeOfDealDb);
    
            return res.status(201).json({
                msg: "Product listed successfully",
                userName: user.userName,
              });

        }catch(error) {console.log(error)}

        
    }

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