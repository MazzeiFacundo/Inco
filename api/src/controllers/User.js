const { Op } = require("sequelize");
const sequelize = require("sequelize");
const axios = require("axios");
const fs = require("fs");
const { User, Product } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const validation = require("../Validations/auths.js");

class UserClass {
    constructor() { }

    createUser = async (req, res) => {
        let {
            fullName,
            email,
            password,
            tel,
            description,
            profileImage,
            userName,
            repeatPassword,
        } = req.body;
        password = bcrypt.hashSync(
            req.body.password,
            Number.parseInt(authConfig.rounds)
        );
        if (!bcrypt.compareSync(repeatPassword, password))
            return res.status(409).json({ msgE: "Passwords do not match" });

        //Obtiene la foto del enlace en modo de bufer y la almacena en la DB como imagen de defecto.
        const photo = await axios.get(
            "https://i.pinimg.com/564x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg",
            { responseType: "arraybuffer" }
        );


        try {
            const token = jwt.sign(
                { userName, email, TypeUser: "Standard" },
                authConfig.secret,
                {
                    expiresIn: authConfig.expires,
                }
            );
            const user = await User.create({
                fullName,
                email,
                password,
                telephone: parseInt(tel),
                description,
                profileImage: photo.data,
                userName,
                token,
                MembershipUserIdMembershipUser: null,
            });
            return res.status(200).json({ msg: "User created successfully", token }); //Prueba para el front
        } catch (error) {
            console.log(error);
            return res.status(409).json({ msgE: "Error creating a new user" });
        }
    };

    loginUser = async (req, res) => {
        //User login validation function
        const { email, userName, password } = req.body;
        try {
            const userResponse = await validation.validationLoginUser(
                email,
                userName,
                password
            );
            if (userResponse) return res.status(404).json(userResponse);

            const userFoundDB = await User.findOne({
                where: { [Op.or]: [{ userName: userName }, { email: email }] },
            });
            const token = jwt.sign(
                {
                    userName: userFoundDB.userName,
                    email: userFoundDB.email,
                    TypeUser: userFoundDB.nameTypeUser,
                },
                authConfig.secret,
                { expiresIn: authConfig.expires }
            );
            await User.update(
                { token },
                { where: { [Op.or]: [{ userName: userName }, { email: email }] } }
            );
            return res.status(200).json({
                msg: "Everything is fine (:",
                token,
                stateUser: userFoundDB.nameStateUser,
            });
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "User not found" });
        }
    };

    closeSessionUser = async (req, res) => {
        const tokenUser = req.body.token;
        const tokenDecoded = jwt.decode(tokenUser);
        console.log(tokenDecoded)
        const userFind = await User.findOne({
            where: { userName: tokenDecoded.userName },
        });

        try {
            if (!userFind) return res.status(404).json({ msgE: "There was an error finding the user" });
            if (!userFind.token) return res.status(404).json({ msgE: "Already logged out" });
            await User.update(
                { token: null },
                { where: { userName: tokenDecoded.userName } }
            );
            return res.status(200).json({ msg: "User logged out successfully" });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msgE: "There was an error logging out" });
        }
    };

    changeUserToCompany = async (req, res) => {
        const tokenUser = req.body.token;
        const tokenDecoded = jwt.decode(tokenUser);
        console.log(tokenDecoded)
        const userFind = await User.findOne({
            where: { userName: tokenDecoded.userName },
        });

        try {
            if (!userFind) return res.status(404).json({ msgE: "There was an error finding the user" });
            if (userFind.nameTypeUser === "Company") return res.status(404).json({ msgE: "User is already Company" });
            await User.update(
                { nameTypeUser: "Company" },
                { where: { userName: tokenDecoded.userName } }
            );
            return res.status(200).json({ msg: "User changed to Company successfully" });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msgE: "There was an error changing user to Company" });
        }
    };

    changeUserToStandard = async (req, res) => {
        const tokenUser = req.body.token;
        const tokenDecoded = jwt.decode(tokenUser);
        console.log(tokenDecoded)
        const userFind = await User.findOne({
            where: { userName: tokenDecoded.userName },
        });
        console.log(userFind);

        try {
            if (!userFind) return res.status(404).json({ msgE: "There was an error finding the user" });
            if (userFind.nameTypeUser === "Standard") return res.status(404).json({ msgE: "User is already Standard" });
            await User.update(
                { nameTypeUser: "Standard" },
                { where: { userName: tokenDecoded.userName } }
            );
            return res.status(200).json({ msg: "User changed to Standard successfully" });
        } catch (error) {
            console.log(error);
            return res.status(404).json({ msgE: "There was an error changing user to Standard" });
        }
    };

    getAllUsers = async (req, res) => {
        try {
            const users = await User.findAll({ attributes: { exclude: ['profileImage'] } });

            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    getProfileInfo = async (req, res) => {
        const { token, userName } = req.body;
        const userFoundDB = await User.findOne({
            where: { userName },
            include: [
                {
                    model: Product,
                    include: [
                        { model: User, attributes: ["userName"] },
                    ],
                },
            ],
        });
        if (!userFoundDB) return res.status(404).json({ msgE: "User not found" });
        res.status(200).json(userFoundDB);
    };

    editionBasicDataProfile = async (req, res) => {
        let dataPhoto;
        const { token, fullName, description, tel } = req.body;

        //Si no se pasa el token, devolvemos un error
        if (!token) {
            return res.status(400).json({ msgE: "Token doesn't exist" });
        }
        //Valida si pasaron una foto
        // try {
        //     dataPhoto = req.files.photoProfile.data;
        // } catch (e) {
        //     console.log(e)
        // }
        // if (req.files) {
        //     dataPhoto = req.files.photoProfile.data;
        // }
        const tokenDecode = jwt.decode(token, authConfig.secret);
        try {
            /*-Primero busco el usuario para luego buscarlo cuando quiero actualizar los datos por el id*/
            const userFound = await User.findOne({
                where: {
                    [Op.or]: [
                        { userName: tokenDecode.userName },
                        { email: tokenDecode.email },
                    ],
                },
            });
            if (!userFound) res.status(404).json({ msgE: "User not found" });
            const userUpdate = await User.update(
                {
                    //En el caso que alguno de los parámetros no me lo pasen, busco el valor que tiene el usuario y le setteo el mismo.
                    fullName:
                        fullName && fullName !== userFound.dataValues.fullName
                            ? fullName
                            : userFound.dataValues.fullName,
                    description:
                        description && description !== userFound.dataValues.description
                            ? description
                            : userFound.dataValues.description,
                    telephone:
                        tel && tel !== userFound.dataValues.telephone
                            ? tel
                            : userFound.dataValues.telephone,
                    profileImage:
                        dataPhoto && dataPhoto !== userFound.dataValues.profileImage
                            ? dataPhoto
                            : userFound.dataValues.profileImage,
                },
                { where: { idUser: userFound.dataValues.idUser } }
            );
            const userUpdatedSend = await User.findOne({ where: { [Op.or]: [{ userName: tokenDecode.userName }, { email: tokenDecode.email }] } });
            return !userUpdate.length
                ? res.status(404).json({ msgE: "Fail Edit profile" })
                : res.status(200).json({ msg: "Successful edit", token, userUpdatedSend });
        } catch (error) {
            console.log(error)
            return res.status(404).json({ msgE: "Fail Edit profile" });
        }
    };

    getPhotoUser = async (req, res) => {
        const userNameQuery = req.query.userName;
        // const tokenDecoded = jwt.decode(tokenUser);
        try {
            let userFind = await User.findOne({ where: { userName: userNameQuery } });
            return !userFind
                ? res.status(404).json({ msgE: "User not Found" })
                : res.status(200).end(userFind.profileImage);
        } catch (error) {
            console.log(error);
            res.status(404).json({ msgE: "Error to get photo" });
        }
    };

}

module.exports = UserClass;
