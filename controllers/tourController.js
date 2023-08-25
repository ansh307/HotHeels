const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllTours = catchAsync(async (req, res) => {
  const features = new APIFeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: tours,
  });
});
exports.getTour = catchAsync(async (req, res) => {
  // if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
  // Yes, it's a valid ObjectId, proceed with `findById` call.
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: tour,
  });
  // }
});
exports.createTour = catchAsync(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(200).json({ 
    status: 'success',
    message: 'New Tour Added Successfully!',
    data: newTour,
  });
});
exports.updateTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: tour,
    },
  });
});
exports.deleteTour = catchAsync(async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);
  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: `${tour.name} deleted successfully!!!`,
  });
});
