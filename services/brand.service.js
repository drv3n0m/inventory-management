const Brand = require("../models/Brand");

exports.createBrandService = async (data) => {
  return await Brand.create(data);
};

exports.getBrandService = async () => {
  return await Brand.find({}).select("-products -suppliers");
};

exports.getBrandByIdService = async (id) => {
  return await Brand.findOne({ _id: id });
};

exports.updateBrandService = async (id, data) => {
  return await Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};
