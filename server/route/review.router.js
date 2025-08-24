// routes/review.router.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import { createOrUpdateReview, deleteMyReview, listReviews } from "../controllers/review.controller.js";

const reviewRouter = Router();

// List paginated reviews for a product
reviewRouter.get("/:productId", listReviews);

// Create or update my review for a product
reviewRouter.post("/", auth, createOrUpdateReview);

// Delete my review for a product
reviewRouter.delete("/:productId", auth, deleteMyReview);

export default reviewRouter;