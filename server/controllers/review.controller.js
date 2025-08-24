// controllers/review.controller.js
import mongoose from "mongoose";
import ReviewModel from "../models/review.model.js";
import ProductModel from "../models/product.model.js";
import RatingModel from "../models/rating.model.js";

function isValidStep(val) {
  return Number.isFinite(val) && val >= 0.5 && val <= 5 && Math.abs(val * 2 - Math.round(val * 2)) < 1e-9;
}

// GET /api/reviews/:productId?limit=10&page=1
export const listReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }

    const [items, total] = await Promise.all([
      ReviewModel.find({ product: productId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("user rating title comment isVerifiedPurchase createdAt")
        .populate("user", "name avatar"),
      ReviewModel.countDocuments({ product: productId }),
    ]);

    return res.json({
      success: true,
      error: false,
      data: {
        items,
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

// POST /api/reviews { productId, rating, title?, comment? }
export const createOrUpdateReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, rating, title, comment } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }
    if (!isValidStep(rating)) {
      return res.status(400).json({ success: false, error: true, message: "rating must be 0.5–5 in 0.5 steps" });
    }

    const product = await ProductModel.findById(productId).select("_id");
    if (!product) return res.status(404).json({ success: false, error: true, message: "Product not found" });

    // Upsert Review
    const review = await ReviewModel.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { rating, title, comment } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Keep RatingModel in sync for aggregate speed
    await RatingModel.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { value: rating } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.json({ success: true, error: false, message: "Review saved", data: review });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, error: true, message: "Duplicate review conflict" });
    }
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

// DELETE /api/reviews/:productId
export const deleteMyReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }

    await ReviewModel.deleteOne({ user: userId, product: productId });
    // Also remove rating
    await RatingModel.deleteOne({ user: userId, product: productId });

    return res.json({ success: true, error: false, message: "Review removed" });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};