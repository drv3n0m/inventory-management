const {
  createBrandService,
  getBrandService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.service");

exports.createBrand = async (req, res, next) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({
      status: "success",
      message: "Successfully created the brand",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't create the brand",
      message: err.message,
    });
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const brands = await getBrandService();

    res.status(200).json({
      status: "success",
      data: brands,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brands",
    });
  }
};

exports.getBrandById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const brand = await getBrandByIdService(id);

    if (!brand) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't find a brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      data: brand,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't get the brands",
    });
  }
};

exports.updateBrand = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = updateBrandService(id, req.body);
    console.log(result);

    if (!result.nModified) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't update the brand with this id",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Successfully updated the brand",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: "Couldn't update the brand",
      message: err.message,
    });
  }
};
