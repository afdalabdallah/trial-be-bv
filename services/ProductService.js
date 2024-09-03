const axios = require("axios");
const { mapper, ProductDTO } = require("../config/mapper");
const Product = require("../models/Product");

class ProductService {
  constructor(productRepository) {
    this.ProductRepository = productRepository;
  }

  async createProduct(productData) {
    try {
      // Call Fakestore API
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        productData
      );
      if (response.status !== 200 && response.status !== 201) {
        const error = new Error("Fakestore API call failed");
        error.statusCode = 400;
        throw error;
      }

      // Insert data to DB using repository
      const product = await this.ProductRepository.create(productData);

      return product;
    } catch (error) {
      console.error("Error in create service:", error);
      throw error;
    }
  }

  async updateProduct(id, data) {
    try {
      // Update product data in the Fakestore API
      const response = await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        data
      );

      if (response.status !== 200 && response.status !== 201) {
        throw new HttpError("Fakestore API call failed", 422);
      }

      // Update product data in the local database
      const updated = await this.ProductRepository.updateProduct(id, data);

      if (!updated) {
        throw new HttpError("Product not found", 400);
      }

      // Fetch the updated product from the database
      const updatedProduct = await this.ProductRepository.findProductById(id);

      return updatedProduct;
    } catch (error) {
      console.error("Error in update service:", error);
      throw error;
    }
  }

  async getProducts(query) {
    const product = await this.ProductRepository.getProducts(query);

    return product;
  }
}

module.exports = ProductService;
