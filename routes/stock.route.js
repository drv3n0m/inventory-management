const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stock.controller");

router
  .route("/")
  .get(stockController.getStocks)
  .post(stockController.createStock);

router.route("/:id").get(stockController.getStockById);

module.exports = router;
