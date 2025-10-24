import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/Admin.js";
import {
  createBrandController,
  getBrandsController,
  getBrandDetailsController,
  updateBrandController,
  deleteBrandController
} from "../controllers/brand.controller.js";

const brandRouter = Router();

brandRouter.post("/create", auth, admin, createBrandController);
brandRouter.get("/list", getBrandsController);
brandRouter.get("/:identifier", getBrandDetailsController);
brandRouter.put("/update/:id", auth, admin, updateBrandController);
brandRouter.delete("/delete/:id", auth, admin, deleteBrandController);

export default brandRouter;