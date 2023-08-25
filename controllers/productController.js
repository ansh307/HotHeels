const Product = require('./../models/productModel');
const APIFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const products = await features.query;
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: products,
  });
});
exports.getProduct = catchAsync(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: product,
  });
});
exports.createProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: 'success',
    message: 'New Product Added Successfully!',
    data: newProduct,
  });
});
exports.updateProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: product,
    },
  });
});
exports.deleteProduct = catchAsync(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: `${product.name} deleted successfully!!!`,
  });
});
