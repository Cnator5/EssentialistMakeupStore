// routes/rating.router.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import { deleteMyRating, getRatingsForProduct, upsertRating } from "../controllers/rating.controller.js";

const ratingRouter = Router();

// Read average/count and optionally myRating (if logged in)
ratingRouter.get("/:productId", getRatingsForProduct);

// Create/update requires auth
ratingRouter.post("/", auth, upsertRating);

// Delete my rating requires auth
ratingRouter.delete("/:productId", auth, deleteMyRating);

export default ratingRouter;