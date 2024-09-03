// src/config/inversify.config.js
const { Container } = require("inversify");
const TYPES = require("./types");
const ProductController = require("../controllers/ProductController");
const ProductService = require("../services/ProductService");
const ProductRepository = require("../repositories/ProductRepository");

const container = new Container();

// Bind all classes without using decorators
container
  .bind(TYPES.ProductRepository)
  .toConstantValue(new ProductRepository());
container
  .bind(TYPES.ProductService)
  .toConstantValue(new ProductService(container.get(TYPES.ProductRepository)));
container
  .bind(TYPES.ProductController)
  .toConstantValue(new ProductController(container.get(TYPES.ProductService)));

module.exports = { container };
