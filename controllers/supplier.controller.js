const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  deleteSupplierByIdService,
} = require("../services/supplier.service");

exports.createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the supplier",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the supplier",
      message: error.message,
    });
  }
};

exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await getSuppliersService();

    res.status(200).json({
      status: "success",
      data: suppliers,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the suppliers",
    });
  }
};

exports.getSupplierById = async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await getSupplierByIdService(id);

    if (!supplier) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a supplier with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: supplier,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brands",
    });
  }
};

exports.updateSupplier = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await updateSupplierService(id, req.body);

    console.log(result);

    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the supplier with this id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the supplier",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the brand",
    });
  }
};

exports.deleteSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteSupplierByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the supplier",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the supplier",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the supplier",
      error: error.message,
    });
  }
};
