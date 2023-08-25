const mongoose = require('mongoose');
const modelerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name of model Cannot be empty!'],
    },
    profession: {
      type: String,
      required: [true, 'Profession of model Cannot be empty!'],
    },
    description: {
      type: String,
      required: [true, 'Profession of model Cannot be empty!'],
    },
    imagesrc: {
      type: String,
      required: [true, 'Profession of model Cannot be empty!'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Modeler = mongoose.model('Modeler', modelerSchema);

module.exports = Modeler;
