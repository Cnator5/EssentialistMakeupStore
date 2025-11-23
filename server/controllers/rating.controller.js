// import RatingModel from "../models/rating.model.js";
// import ProductModel from "../models/product.model.js";
// import mongoose from "mongoose";

// function isValidStep(val) {
//   return Number.isFinite(val) && val >= 0.5 && val <= 5 && Math.abs(val * 2 - Math.round(val * 2)) < 1e-9;
// }

// function pickIdentity(req) {
//   const userId = req.userId || null;
//   const anonId =
//     (req.query?.anonId || req.body?.anonId || req.headers["x-anon-id"] || "")
//       .toString()
//       .trim() || null;
//   return { userId, anonId };
// }

// export const upsertRating = async (req, res) => {
//   try {
//     const { userId, anonId } = pickIdentity(req);
//     const { productId, value } = req.body || {};

//     if (!mongoose.isValidObjectId(productId)) {
//       return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
//     }
//     if (!isValidStep(value)) {
//       return res.status(400).json({ success: false, error: true, message: "value must be between 0.5 and 5 in 0.5 steps" });
//     }
//     if (!userId && !anonId) {
//       return res.status(400).json({ success: false, error: true, message: "Missing identity" });
//     }

//     const product = await ProductModel.findById(productId).select("_id");
//     if (!product) return res.status(404).json({ success: false, error: true, message: "Product not found" });

//     const query = { product: productId, ...(userId ? { user: userId } : { anonId }) };
//     const update = { $set: { value, user: userId || null, anonId: userId ? null : anonId } };

//     const updated = await RatingModel.findOneAndUpdate(query, update, {
//       new: true,
//       upsert: true,
//       setDefaultsOnInsert: true,
//     });

//     const { average, count } = await aggregateForProductWeighted(productId);

//     return res.json({
//       success: true,
//       error: false,
//       message: "Rating saved",
//       data: { myRating: updated.value, average, count },
//     });
//   } catch (err) {
//     if (err?.code === 11000) {
//       return res.status(409).json({ success: false, error: true, message: "Duplicate rating conflict" });
//     }
//     return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
//   }
// };

// export const getRatingsForProduct = async (req, res) => {
//   try {
//     const { userId, anonId } = pickIdentity(req);
//     const { productId } = req.params;

//     if (!mongoose.isValidObjectId(productId)) {
//       return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
//     }

//     const { average, count } = await aggregateForProductWeighted(productId);

//     let myRating = null;
//     if (userId || anonId) {
//       const mine = await RatingModel.findOne({
//         product: productId,
//         ...(userId ? { user: userId } : { anonId }),
//       }).select("value");
//       myRating = mine ? mine.value : null;
//     }

//     return res.json({ success: true, error: false, data: { average, count, myRating } });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
//   }
// };

// export const deleteMyRating = async (req, res) => {
//   try {
//     const { userId, anonId } = pickIdentity(req);
//     const { productId } = req.params;

//     if (!mongoose.isValidObjectId(productId)) {
//       return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
//     }
//     if (!userId && !anonId) {
//       return res.status(400).json({ success: false, error: true, message: "Missing identity" });
//     }

//     await RatingModel.deleteOne({
//       product: productId,
//       ...(userId ? { user: userId } : { anonId }),
//     });

//     const { average, count } = await aggregateForProductWeighted(productId);

//     return res.json({ success: true, error: false, message: "Rating removed", data: { average, count, myRating: null } });
//   } catch (err) {
//     return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
//   }
// };

// async function aggregateForProductWeighted(productId) {
//   const agg = await RatingModel.aggregate([
//     { $match: { product: new mongoose.Types.ObjectId(productId) } },
//     {
//       $group: {
//         _id: "$product",
//         rawCount: { $sum: 1 },
//         sumValues: { $sum: "$value" },
//       },
//     },
//     {
//       $project: {
//         _id: 0,
//         rawCount: 1,
//         weightedSum: { $multiply: ["$sumValues", 3572] },
//         weightedCount: { $multiply: ["$rawCount", 3572] },
//       },
//     },
//   ]);

//   if (!agg.length) return { average: 0, count: 0 };
//   const weightedAvg = agg[0].weightedCount > 0 ? Number((agg[0].weightedSum / agg[0].weightedCount).toFixed(2)) : 0;
//   const count = agg[0].weightedCount;
//   return { average: weightedAvg, count };
// }



import RatingModel from "../models/rating.model.js";
import ProductModel from "../models/product.model.js";
import mongoose from "mongoose";
import { invalidateCacheNamespaces } from "../middleware/cache.middleware.js";

const RATING_CACHE_NAMESPACE = "ratings";

function isValidStep(val) {
  return (
    Number.isFinite(val) &&
    val >= 0.5 &&
    val <= 5 &&
    Math.abs(val * 2 - Math.round(val * 2)) < 1e-9
  );
}

function pickIdentity(req) {
  const userId = req.userId || null;
  const anonId =
    (req.query?.anonId || req.body?.anonId || req.headers["x-anon-id"] || "")
      .toString()
      .trim() || null;
  return { userId, anonId };
}

export const upsertRating = async (req, res) => {
  try {
    const { userId, anonId } = pickIdentity(req);
    const { productId, value } = req.body || {};

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }
    if (!isValidStep(value)) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "value must be between 0.5 and 5 in 0.5 steps" });
    }
    if (!userId && !anonId) {
      return res.status(400).json({ success: false, error: true, message: "Missing identity" });
    }

    const product = await ProductModel.findById(productId).select("_id");
    if (!product) {
      return res.status(404).json({ success: false, error: true, message: "Product not found" });
    }

    const query = { product: productId, ...(userId ? { user: userId } : { anonId }) };
    const update = { $set: { value, user: userId || null, anonId: userId ? null : anonId } };

    const updated = await RatingModel.findOneAndUpdate(query, update, {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    });

    const { average, count } = await aggregateForProductWeighted(productId);
    await invalidateCacheNamespaces(RATING_CACHE_NAMESPACE);

    return res.json({
      success: true,
      error: false,
      message: "Rating saved",
      data: { myRating: updated.value, average, count },
    });
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ success: false, error: true, message: "Duplicate rating conflict" });
    }
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

export const getRatingsForProduct = async (req, res) => {
  try {
    const { userId, anonId } = pickIdentity(req);
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }

    const { average, count } = await aggregateForProductWeighted(productId);

    let myRating = null;
    if (userId || anonId) {
      const mine = await RatingModel.findOne({
        product: productId,
        ...(userId ? { user: userId } : { anonId }),
      }).select("value");
      myRating = mine ? mine.value : null;
    }

    return res.json({ success: true, error: false, data: { average, count, myRating } });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

export const deleteMyRating = async (req, res) => {
  try {
    const { userId, anonId } = pickIdentity(req);
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ success: false, error: true, message: "Invalid productId" });
    }
    if (!userId && !anonId) {
      return res.status(400).json({ success: false, error: true, message: "Missing identity" });
    }

    await RatingModel.deleteOne({
      product: productId,
      ...(userId ? { user: userId } : { anonId }),
    });

    const { average, count } = await aggregateForProductWeighted(productId);
    await invalidateCacheNamespaces(RATING_CACHE_NAMESPACE);

    return res.json({
      success: true,
      error: false,
      message: "Rating removed",
      data: { average, count, myRating: null },
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: true, message: err.message || "Server error" });
  }
};

async function aggregateForProductWeighted(productId) {
  const agg = await RatingModel.aggregate([
    { $match: { product: new mongoose.Types.ObjectId(productId) } },
    {
      $group: {
        _id: "$product",
        rawCount: { $sum: 1 },
        sumValues: { $sum: "$value" },
      },
    },
    {
      $project: {
        _id: 0,
        rawCount: 1,
        weightedSum: { $multiply: ["$sumValues", 3572] },
        weightedCount: { $multiply: ["$rawCount", 3572] },
      },
    },
  ]);

  if (!agg.length) return { average: 0, count: 0 };
  const weightedAvg = agg[0].weightedCount > 0 ? Number((agg[0].weightedSum / agg[0].weightedCount).toFixed(2)) : 0;
  const count = agg[0].weightedCount;
  return { average: weightedAvg, count };
}