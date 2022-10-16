const Store = require("../models/Store");

exports.getStoresService = async () => {
  return await Store.find({});
};

exports.createStoreService = async (data) => {
  return await Store.create(data);
};

exports.getStoreByIdService = async (storeId) => {
  return await Store.find({ _id: storeId });
};
