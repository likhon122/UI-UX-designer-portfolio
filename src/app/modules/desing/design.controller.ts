import catchAsync from '../../utils/catchAsync';

const createDesign = catchAsync(async (req, res) => {
  res.send('Design Created');
});

export { createDesign };
