const Category = require("../models/Category");

exports.getCategoriesService = async () => {
  return await Category.find({});
};

exports.createCategoryService = async (data) => {
  return await Category.create(data);
};
