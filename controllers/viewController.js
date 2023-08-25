const Article = require('./../models/articleModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = async (req, res, next) => {
  // 1)Get tour data from collection
  const articles = await Article.find();
  // 2)Build template

  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'Home page',
    articles,
  });
};
