const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },

    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    rooms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    dorms: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    productWidth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    productHeight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    typeOfProduct: {
      type: DataTypes.ENUM("House", "Apartment", "Land", "Duplex")
    },

    image: {
      type: DataTypes.BLOB,
      defaultValue: "none",
      allowNull: false,
    },
  });
};
