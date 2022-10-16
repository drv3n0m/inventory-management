const Supplier = require("../models/Supplier");
const Brand = require("../models/Brand");

exports.createSupplierService = async (data) => {
  const supplier = await Supplier.create(data);
  const { _id, brand } = supplier;

  const res = await Brand.updateOne(
    { _id: brand.id },
    { $push: { suppliers: _id } }
  );

  console.log(_id, brand.id);
  return supplier;
};

exports.getSuppliersService = async () => {
  return await Supplier.find({});
};

exports.getSupplierByIdService = async (id) => {
  return await Supplier.findOne({ _id: id });
};

exports.updateSupplierService = async (id, data) => {
  return await Supplier.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

exports.deleteSupplierByIdService = async (id) => {
  return await Supplier.deleteOne({ _id: id });
};
