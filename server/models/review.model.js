// models/review.model.js
import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, index: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true, index: true },
    // tie rating and review together; enforce same 0.5 steps
    rating: { type: Number, required: true, min: 0.5, max: 5 },
    title: { type: String, trim: true, maxlength: 140 },
    comment: { type: String, trim: true, maxlength: 5000 },
    isVerifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 1 review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

const ReviewModel = mongoose.model("review", reviewSchema);
export default ReviewModel;