const mongoose = require('mongoose');
const slugify = require('slugify');

const imageSchema = new mongoose.Schema({
  url: String,
  width: String,
  height: String,
});

const productSchema = new mongoose.Schema({
  images: {
    small: imageSchema,
    medium: imageSchema,
    large: imageSchema,
  },
  description: {
    type: [String],
    required: [true, 'there must be description for product'],
  },
  binding: {
    type: String,
    enum: {
      values: ['Video Game', 'DVD-ROM', 'Computer Game'],
      message: 'Difficulty is either: easy, medium, difficult',
    },
    default: 'DVD-ROM',
  },
  brand: {
    type: String,
    required: [true, 'there must be brand for product'],
  },
  ean: String,
  esrbagerating: {
    type: String,
  },
  feature: {
    type: [String],
    required: [true, 'You must mention product feature'],
  },
  format: [String],
  genre: {
    type: String,
  },
  hardwareplatform: {
    type: String,
    default: 'pc',
  },
  label: String,
  price: {
    type: Number,
    required: [true, 'Must provide price for the product'],
  },
  currency: {
    type: String,
    default: 'USD',
  },
  manufacturer: String,
  model: String,
  mpn: String,
  numberofitems: {
    type: Number,
    default: 1,
  },
  operatingsystem: {
    type: String,
    required: [true, 'must be mentioned'],
  },
  packagequantity: {
    type: Number,
    default: 1,
  },
  partnumber: String,
  platform: {
    type: [String],
    required: [true, 'must mention the platform '],
  },
  productgroup: {
    type: String,
    default: 'Video Games',
  },
  producttypename: String,
  publisher: String,
  studio: String,
  title: {
    type: String,
    required: [true, 'must have a title for the product'],
  },
  upc: String,
  category: String,
  salesrank: Number,
  slug: String,
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.model, { lower: true });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
