import catchAsync from '../../utils/catchAsync';

const createPurchase = catchAsync(async (req, res) => {
  res.send('Purchase Created');
});

export { createPurchase };
