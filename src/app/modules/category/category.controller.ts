import catchAsync from '../../utils/catchAsync';

const createCategory = catchAsync(async (req, res) => {
  res.send('Category Created');
});

export { createCategory };
