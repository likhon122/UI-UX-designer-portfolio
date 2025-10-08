import mongoose, { Schema } from 'mongoose';
import { TPricingPlan } from './pricingPlan.types';

const PricingPlanSchema = new Schema<TPricingPlan>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    features: [String],
    duration: String,
  },
  { timestamps: true }
);

const PricingPlan = mongoose.model<TPricingPlan>(
  'pricing-plan',
  PricingPlanSchema
);

export default PricingPlan;
