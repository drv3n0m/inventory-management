const express = require("express");
const brandController = require("../controllers/brandController");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

const router = express.Router();

router
  .route("/")
  .post(verifyToken, authorization("admin"), brandController.createBrand)
  .get(brandController.getBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .patch(brandController.updateBrand);

module.exports = router;
