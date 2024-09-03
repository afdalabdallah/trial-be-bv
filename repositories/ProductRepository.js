const Product = require("../models/Product");

class ProductRepository {
  async create(productData) {
    return await Product.create(productData);
  }

  // Method to update an existing product by ID
  async updateProduct(id, productData) {
    const [updated] = await Product.update(productData, {
      where: { id: id },
    });
    return updated;
  }

  // Method to find a product by ID
  async findProductById(id) {
    return await Product.findOne({ where: { id: id } });
  }

  async getProducts({ limit, category, sort }) {
    const options = {};

    if (limit) {
      options.limit = parseInt(limit);
    }

    if (category) {
      options.where = { ...options.where, category };
    }

    if (sort) {
      options.order = [[sort, "ASC"]];
    }

    return await Product.findAll(options);
  }
}

module.exports = ProductRepository;
