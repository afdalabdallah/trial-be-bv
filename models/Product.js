const { DataTypes } = require("sequelize");
const { Sequelize } = require("../config/database");

const Product = Sequelize.define("product", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(
      "electronics",
      "jewelry",
      "men's clothing",
      "women's clothing"
    ),
    allowNull: false,
  },
});

module.exports = Product;
