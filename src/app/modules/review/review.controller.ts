import catchAsync from '../../utils/catchAsync';

const createReview = catchAsync(async (req, res) => {
  res.send('Review Created');
});

export { createReview };
