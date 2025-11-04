import { Router } from "express";
import auth from "../middleware/auth.js";
import { admin } from "../middleware/admin.js";
import optionalAuth from "../middleware/optionalAuth.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogBySlugController,
  getBlogListController,
  updateBlogController
} from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.post("/create", auth, admin, createBlogController);
blogRouter.put("/update/:id", auth, admin, updateBlogController);
blogRouter.delete("/delete/:id", auth, admin, deleteBlogController);
blogRouter.get("/list", optionalAuth, getBlogListController);
blogRouter.get("/:slug", optionalAuth, getBlogBySlugController);

export default blogRouter;