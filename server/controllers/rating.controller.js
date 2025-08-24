// controllers/rating.controller.js
import RatingModel from "../models/rating.model.js";
import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";

// Validate 0.5 step
function isValidStep(val) {
  return Number.isFinite(val) && val >= 0.5 && val <= 5 && Math.abs(val * 2 - Math.round(val * 2)) < 1e-9;
}

// POST /api/ratings  { productId, value }
export const upsertRating = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, value } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }
    if (!isValidStep(value)) {
      return res.status(400).json({ success: false, error: true, message: "value must be between 0.5 and 5 in 0.5 steps" });
    }

    const product = await ProductModel.findById(productId).select("_id");
    if (!product) return res.status(404).json({ success: false, error: true, message: "Product not found" });

    const updated = await RatingModel.findOneAndUpdate(
      { user: userId, product: productId },
      { $set: { value } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    const { average, count } = await aggregateForProduct(productId);

    return res.json({
      success: true,
      error: false,
      message: "Rating saved",
      data: { myRating: updated.value, average, count },
    });
  } catch (err) {
    // handle duplicate key err on unique index
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, error: true, message: "Duplicate rating conflict" });
    }
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

// GET /api/ratings/:productId
export const getRatingsForProduct = async (req, res) => {
  try {
    const userId = req.userId || null;
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }

    const { average, count } = await aggregateForProduct(productId);

    let myRating = null;
    if (userId) {
      const mine = await RatingModel.findOne({ user: userId, product: productId }).select("value");
      myRating = mine ? mine.value : null;
    }

    return res.json({ success: true, error: false, data: { average, count, myRating } });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

// DELETE /api/ratings/:productId
export const deleteMyRating = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }

    await RatingModel.deleteOne({ user: userId, product: productId });
    const { average, count } = await aggregateForProduct(productId);

    return res.json({ success: true, error: false, message: "Rating removed", data: { average, count, myRating: null } });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

// Helper: compute average and count
async function aggregateForProduct(productId) {
  const agg = await RatingModel.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    { $group: { _id: "$product", count: { $sum: 1 }, average: { $avg: "$value" } } },
  ]);

  const average = agg.length ? Number(agg[0].average.toFixed(2)) : 0;
  const count = agg.length ? agg[0].count : 0;

  return { average, count };
}