// routes/rating.router.js
import { Router } from "express";
import auth from "../middleware/auth.js";
import { deleteMyRating, getRatingsForProduct, upsertRating } from "../controllers/rating.controller.js";
import optionalAuth from '../middleware/optionalAuth.js';

const ratingRouter = Router();

// Read average/count and optionally myRating (if logged in)
ratingRouter.get("/:productId", getRatingsForProduct);

// Create/update requires auth
ratingRouter.post("/", optionalAuth, upsertRating);

// Delete my rating requires auth
ratingRouter.delete("/:productId", optionalAuth, deleteMyRating);


export default ratingRouter;