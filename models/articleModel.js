const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema(
  {
    mainHeading: {
      type: String,
      required: [true, 'MainHeading of model Cannot be empty!'],
    },
    imagesName: {
      type: String,
    },
    info: {
      type: String,
      required: [true, 'info of model Cannot be empty!'],
    },
    date: {
      type: Date,
      required: [true, 'date of model Cannot be empty!'],
    },
    icons: [String],
    address: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
