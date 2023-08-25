const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Modeler = require('./../../models/modelerModel');
const Article = require('./../../models/articleModel');
const User = require('./../../models/userModel');
const Tour = require('./../../models/tourModel');
const Product = require('./../../models/productModel');


dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

// READ JSON FILE
const modelers = JSON.parse(fs.readFileSync(`${__dirname}/modeler.json`, 'utf-8'));
const articles = JSON.parse(fs.readFileSync(`${__dirname}/article.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const products = JSON.parse(fs.readFileSync(`${__dirname}/product.json`, 'utf-8'));

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Modeler.create(modelers);
    await Tour.create(tours);
    await Product.create(products);
    await Article.create(articles);
    await User.create(users, { validateBeforeSave: false });

    // await Review.create(reviews);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Modeler.deleteMany();
    await Article.deleteMany();
    await User.deleteMany();
    await Tour.deleteMany();
    await Product.deleteMany();

    // await Review.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
