import mongoose, { Schema } from 'mongoose';
import { TReview } from './review.types';

const ReviewSchema = new Schema<TReview>(
  {
    reviewer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    design: { type: Schema.Types.ObjectId, ref: 'Design', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: String,
  },
  { timestamps: true }
);

const Review = mongoose.model<TReview>('review', ReviewSchema);

export default Review;
