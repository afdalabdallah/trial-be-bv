const { celebrate, Joi, Segments } = require("celebrate");
const axios = require("axios");

class ProductController {
  constructor(productService) {
    this.ProductService = productService;
  }

  createProductValidation = celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      image: Joi.string().uri().required(),
      category: Joi.string()
        .valid("electronics", "jewelry", "men's clothing", "women's clothing")
        .required(),
    }),
  });

  createProduct = async (req, res, next) => {
    try {
      const product = await this.ProductService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error("Error in createProduct controller:", error);
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        return res.status(400).json({ error: "Bad Request" });
      }
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
      // Call the service to update the product
      const updatedProduct = await this.ProductService.updateProduct(id, data);
      res.status(200).json(updatedProduct);
    } catch (error) {
      // Pass the error to the error-handling middleware
      next(error);
    }
  };

  getProducts = async (req, res, next) => {
    try {
      const query = {
        limit: req.query.limit,
        category: req.query.category,
        sort: req.query.sort,
      };

      const products = await this.ProductService.getProducts(query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = ProductController;
