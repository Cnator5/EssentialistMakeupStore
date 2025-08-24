// models/rating.model.js
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true, index: true },
    // allow half-stars: 0.5 increments from 0.5 to 5
    value: { type: Number, required: true, min: 0.5, max: 5 },
  },
  { timestamps: true }
);

// One rating per user per product
ratingSchema.index({ user: 1, product: 1 }, { unique: true });

const RatingModel = mongoose.model("rating", ratingSchema);
export default RatingModel;