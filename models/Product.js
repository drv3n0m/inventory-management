const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const valid = require("validator");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      lowercase: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litre", "pcs", "bag"],
        message: "unit value can't be {VALUE}, must be kg/litre/pcs/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: [valid.isURL, "wrong url"],
      },
    ],

    category: {
      type: String,
      required: true,
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

//mongoose middleware for saving data: pre post

productSchema.pre("save", function (next) {
  //this ->
  console.log("Before Saving Data");
  if (this.quantity == 0) {
    this.status = "out-of-stock";
  }
  next();
});

//  productSchema.post('save',function(doc,next){
//   console.log('After saving data');

//   next()
// })

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// SCHEMA -> MODEL -> QUERY

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
