const mongoose = require("mongoose");
const Stock = require("../models/Stock");
const ObjectId = mongoose.Types.ObjectId;

exports.getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, count: stocks.length, page, stocks };
};

exports.getStockByIdService = async (id) => {
  const stock = await Stock.findOne({ _id: id })
    .populate("store.id")
    .populate("brand.id")
    .populate("suppliedBy.id");

  return stock;
};

exports.createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};
