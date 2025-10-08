import catchAsync from '../../utils/catchAsync';

const createPricingPlan = catchAsync(async (req, res) => {
  res.send('Pricing Plan Created');
});

export { createPricingPlan };
