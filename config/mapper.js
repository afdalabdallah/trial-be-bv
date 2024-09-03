const { createMapper, createMap } = require("@automapper/core");
const { classes } = require("@automapper/classes");
const { sequelize } = require("@automapper/sequelize");
const Product = require("../models/Product");

const mapper = createMapper({
  strategyInitializer: classes(),
});

class ProductDTO {
  constructor() {
    // (this.id = null),
    (this.title = null),
      (this.price = null),
      (this.description = null),
      (this.image = null),
      (this.category = null);
  }
}

// createMap(mapper, Product, ProductDTO);
createMap(mapper, ProductDTO, Product);

module.exports = { mapper, ProductDTO };
