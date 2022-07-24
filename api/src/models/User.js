const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
// defino el modelo
    sequelize.define("User", {
        idUser: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        },
        fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: "Hey there! I'm using Inco!"
        },
        userName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        profileImage:{
            type: DataTypes.BLOB,
            allowNull: false,
            defaultValue: 'https://i.pinimg.com/564x/e5/91/dc/e591dc82326cc4c86578e3eeecced792.jpg'
        },
        nameTypeUser: {
            type: DataTypes.ENUM('Company', 'Standard', 'Admin'),
            allowNull: false,
            defaultValue: 'Standard'
        },
        validationCode:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        token:{
            type: DataTypes.TEXT,
            allowNull: true,
        }
    });
};