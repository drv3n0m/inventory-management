const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");
const verifyToken = require("../middleware/verifyToken");
const authorization = require("../middleware/authorization");

// router.use(verifyToken);

{
  /* <input type="file" name="image" /> */
}
// const formData = new FormData();
// formData.append("image", forData);
router.post(
  "/file-upload",
  uploader.array("image"),
  productController.fileUpload
);

router
  .route("/")
  .get(productController.getProducts)
  .post(
    verifyToken,
    authorization("admin", "store-manager"),
    productController.createProduct
  );

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProduct);

router
  .route("/:id")
  .patch(productController.updateProductById)
  .delete(productController.deleteProductById);

// router.route("/:id").get()

module.exports = router;
