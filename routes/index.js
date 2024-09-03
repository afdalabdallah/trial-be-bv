var express = require("express");
var router = express.Router();

const { container } = require("../config/inversify.config");
const TYPES = require("../config/types");

const productController = container.get(TYPES.ProductController);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post(
  "/v1/products",
  productController.createProductValidation,
  productController.createProduct
);

router.put(
  "/v1/products/:id",
  productController.createProductValidation,
  productController.updateProduct
);

router.get("/v1/products", logBody, productController.getProducts);

module.exports = router;
