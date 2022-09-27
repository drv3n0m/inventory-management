const {
  getProductsServices,
  createProductService,
  updateProductByIdService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
} = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product
    //   .where("name").equals(/\w/)
    //   .where("quantity").gt(100).lt(600)
    //   .limit(2).sort({ quantity: -1 })

    //{price:{$ gt:50}
    //{ price: { gt: '50' } }

    console.log(req.query);

    let filters = { ...req.query };

    //sort, page, limit -> exclude
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    //gt,lt, gte, lte
    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    filters = JSON.parse(filterString);
    const queries = {};

    if (req.query.sort) {
      //price,quantity -> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      // console.log(fields);
    }

    if (req.query.page) {
      const { page = 1, limit = 10 } = req.query;
      //50 products
      // each page 10 product
      //page 1--> 1-10
      //page 2--> 2-20
      //page 3--> 21-30     --> page 3  -> skip 1-20  -> 3-1 ->2 *10
      //page 4--> 31-40      ---> page 4 --> 1-30  --> 4-1  -->3*10
      //page 5--> 41-50

      const skip = (page - 1) * parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductsServices(filters, queries);

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "can't get the data",
      error: err.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const result = await createProductService(req.body);
    result.logger();

    res.status(200).json({
      status: "success",
      message: "Data inserted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Data is not inserted",
      error: err.message,
    });
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductByIdService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "couldn't update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: "success",
      message: "successfully update the products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't updated the products",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "fail",
        error: "Couldn't delete the product",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Successfully deleted the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProduct = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: "success",
      message: "Successfully deleted the given products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Couldn't delete the given product",
      error: error.message,
    });
  }
};
