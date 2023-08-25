const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception ⚠️⚠️⚠️⚠️⚠️ ... Shutting down....');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
// mongoose
//   .connect(DB, {
//     // .connect(process.env.DATABASE_LOCAL, {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then(() => console.log('DB connection Successfull'))
//   // .catch(err => console.log("ERROR")) not a good way to handle error

async function connectToDatabase() {
  try {
    await mongoose.connect(
      process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD),
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('DB connection successful');
  } catch (error) {
    console.error('DB connection error:', error);
  }
}
connectToDatabase();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`listening on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err);

  console.log('unhandledRejection ⚠️⚠️⚠️⚠️⚠️ ... Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
