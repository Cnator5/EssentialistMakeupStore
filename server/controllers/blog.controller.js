// import mongoose from "mongoose";
// import slugify from "slugify";
// import BlogModel from "../models/blog.model.js";
// import UserModel from "../models/user.model.js";

// const DEFAULT_CACHE = { maxAge: 120, sMaxAge: 600 };

// const setCacheHeaders = (res, cache = DEFAULT_CACHE) => {
//   if (!res || !cache) return;
//   res.set(
//     "Cache-Control",
//     `public, max-age=${cache.maxAge}, s-maxage=${cache.sMaxAge}`
//   );
//   res.set("Vary", "Authorization, Cookie");
// };

// const slugifySafe = (value = "") =>
//   slugify(value, {
//     lower: true,
//     strict: true,
//     remove: /[*+~.()'"!:@]/g
//   });

// const stripHtml = (input = "") => input.replace(/<[^>]*>/g, " ");

// const calculateReadingTime = (content = "") => {
//   const plain = stripHtml(content || "")
//     .replace(/\s+/g, " ")
//     .trim();
//   if (!plain) return 1;
//   const words = plain.split(" ").length;
//   return Math.max(1, Math.ceil(words / 200));
// };

// const normalizeTags = (tags) => {
//   const array = Array.isArray(tags)
//     ? tags
//     : typeof tags === "string"
//     ? tags.split(",")
//     : [];
//   const normalized = array
//     .map((tag) => String(tag).trim())
//     .filter(Boolean);
//   return [...new Set(normalized)];
// };

// const createExcerpt = (inputExcerpt, content) => {
//   if (inputExcerpt && inputExcerpt.trim()) {
//     return inputExcerpt.trim();
//   }
//   const plain = stripHtml(content || "")
//     .replace(/\s+/g, " ")
//     .trim();
//   if (!plain) return "";
//   return plain.length > 220 ? `${plain.slice(0, 217).trim()}...` : plain;
// };

// const generateUniqueSlug = async (title, excludeId = null) => {
//   const baseSlug = slugifySafe(title || "");
//   let slugCandidate = baseSlug;
//   let counter = 1;

//   const isSlugTaken = async (slugValue) => {
//     const query = { slug: slugValue };
//     if (excludeId) {
//       query._id = { $ne: excludeId };
//     }
//     return BlogModel.exists(query);
//   };

//   while (await isSlugTaken(slugCandidate)) {
//     slugCandidate = `${baseSlug}-${counter++}`;
//   }

//   return slugCandidate;
// };

// export const createBlogController = async (request, response) => {
//   try {
//     const {
//       title,
//       excerpt = "",
//       coverImage = "",
//       content,
//       tags = [],
//       status = "draft",
//       metaTitle = "",
//       metaDescription = ""
//     } = request.body;

//     if (!title || !title.trim()) {
//       return response.status(400).json({
//         message: "Blog title is required",
//         error: true,
//         success: false
//       });
//     }

//     if (!content || !content.trim()) {
//       return response.status(400).json({
//         message: "Blog content is required",
//         error: true,
//         success: false
//       });
//     }

//     const normalizedStatus = ["draft", "published", "archived"].includes(status)
//       ? status
//       : "draft";

//     const slug = await generateUniqueSlug(title.trim());
//     const normalizedTags = normalizeTags(tags);
//     const readingTime = calculateReadingTime(content);
//     const computedExcerpt = createExcerpt(excerpt, content);

//     const blog = await BlogModel.create({
//       title: title.trim(),
//       slug,
//       excerpt: computedExcerpt,
//       coverImage,
//       content,
//       tags: normalizedTags,
//       status: normalizedStatus,
//       metaTitle,
//       metaDescription,
//       readingTime,
//       author: request.userId || null,
//       publishedAt: normalizedStatus === "published" ? new Date() : null
//     });

//     return response.status(201).json({
//       message: "Blog created successfully",
//       data: blog,
//       error: false,
//       success: true
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const updateBlogController = async (request, response) => {
//   try {
//     const { id } = request.params;

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return response.status(400).json({
//         message: "Valid blog id is required",
//         error: true,
//         success: false
//       });
//     }

//     const blog = await BlogModel.findById(id);

//     if (!blog) {
//       return response.status(404).json({
//         message: "Blog not found",
//         error: true,
//         success: false
//       });
//     }

//     const {
//       title,
//       excerpt,
//       coverImage,
//       content,
//       tags,
//       status,
//       metaTitle,
//       metaDescription
//     } = request.body;

//     if (typeof title === "string" && title.trim() && title.trim() !== blog.title) {
//       blog.title = title.trim();
//       blog.slug = await generateUniqueSlug(blog.title, blog._id);
//     }

//     if (typeof excerpt === "string") {
//       blog.excerpt = excerpt.trim();
//     }

//     if (typeof coverImage === "string") {
//       blog.coverImage = coverImage;
//     }

//     if (typeof content === "string") {
//       blog.content = content;
//       blog.readingTime = calculateReadingTime(content);
//       if (!blog.excerpt) {
//         blog.excerpt = createExcerpt("", content);
//       }
//     }

//     if (tags !== undefined) {
//       blog.tags = normalizeTags(tags);
//     }

//     if (typeof metaTitle === "string") {
//       blog.metaTitle = metaTitle;
//     }

//     if (typeof metaDescription === "string") {
//       blog.metaDescription = metaDescription;
//     }

//     if (status && ["draft", "published", "archived"].includes(status)) {
//       if (status === "published" && !blog.publishedAt) {
//         blog.publishedAt = new Date();
//       }
//       blog.status = status;
//     }

//     await blog.save();

//     return response.json({
//       message: "Blog updated successfully",
//       data: blog,
//       error: false,
//       success: true
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const deleteBlogController = async (request, response) => {
//   try {
//     const { id } = request.params;

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//       return response.status(400).json({
//         message: "Valid blog id is required",
//         error: true,
//         success: false
//       });
//     }

//     const deletion = await BlogModel.findByIdAndDelete(id);

//     if (!deletion) {
//       return response.status(404).json({
//         message: "Blog not found",
//         error: true,
//         success: false
//       });
//     }

//     return response.json({
//       message: "Blog deleted successfully",
//       data: deletion,
//       error: false,
//       success: true
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getBlogListController = async (request, response) => {
//   try {
//     const {
//       page = 1,
//       limit = 12,
//       search = "",
//       status,
//       sort = "newest",
//       scope = "public"
//     } = request.query;

//     const numericPage = Math.max(Number(page) || 1, 1);
//     const numericLimit = Math.min(Math.max(Number(limit) || 12, 1), 100);
//     const skip = (numericPage - 1) * numericLimit;

//     const isAdminScope = scope === "admin";
//     let requesterRole = null;

//     if (isAdminScope) {
//       if (!request.userId) {
//         return response.status(401).json({
//           message: "Authentication required",
//           error: true,
//           success: false
//         });
//       }

//       const adminUser = await UserModel.findById(request.userId).select("role");
//       requesterRole = adminUser?.role;

//       if (requesterRole !== "ADMIN") {
//         return response.status(403).json({
//           message: "Permission denied",
//           error: true,
//           success: false
//         });
//       }
//     }

//     const query = {};

//     if (search) {
//       const searchRegex = new RegExp(search, "i");
//       query.$or = [
//         { title: searchRegex },
//         { excerpt: searchRegex },
//         { tags: searchRegex }
//       ];
//     }

//     if (isAdminScope) {
//       if (status && status !== "all") {
//         query.status = status;
//       }
//     } else {
//       query.status = "published";
//     }

//     const sortMap = {
//       newest: { publishedAt: -1, createdAt: -1 },
//       oldest: { publishedAt: 1, createdAt: 1 }
//     };

//     const sortOption = sortMap[sort] || sortMap.newest;

//     const [blogs, totalCount] = await Promise.all([
//       BlogModel.find(query)
//         .sort(sortOption)
//         .skip(skip)
//         .limit(numericLimit)
//         .select(isAdminScope ? undefined : "-content")
//         .lean(),
//       BlogModel.countDocuments(query)
//     ]);

//     if (!isAdminScope) {
//       setCacheHeaders(response);
//     }

//     return response.json({
//       message: "Blog list",
//       data: blogs,
//       page: numericPage,
//       limit: numericLimit,
//       totalCount,
//       totalPages: Math.ceil(totalCount / numericLimit),
//       error: false,
//       success: true
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getBlogBySlugController = async (request, response) => {
//   try {
//     const { slug } = request.params;
//     const preview = request.query.preview === "true";

//     if (!slug) {
//       return response.status(400).json({
//         message: "Blog slug is required",
//         error: true,
//         success: false
//       });
//     }

//     const query = { slug };
//     if (preview) {
//       if (!request.userId) {
//         return response.status(401).json({
//           message: "Authentication required for preview",
//           error: true,
//           success: false
//         });
//       }

//       const adminUser = await UserModel.findById(request.userId).select("role");
//       if (adminUser?.role !== "ADMIN") {
//         return response.status(403).json({
//           message: "Permission denied",
//           error: true,
//           success: false
//         });
//       }
//     } else {
//       query.status = "published";
//     }

//     const blog = await BlogModel.findOne(query)
//       .populate("author", "name email")
//       .lean();

//     if (!blog) {
//       return response.status(404).json({
//         message: "Blog not found",
//         error: true,
//         success: false
//       });
//     }

//     if (!preview) {
//       setCacheHeaders(response, { maxAge: 180, sMaxAge: 900 });
//     }

//     return response.json({
//       message: "Blog details",
//       data: blog,
//       error: false,
//       success: true
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };



import mongoose from "mongoose";
import slugify from "slugify";
import BlogModel from "../models/blog.model.js";
import UserModel from "../models/user.model.js";
import { invalidateCacheNamespaces } from "../middleware/cache.middleware.js";

// const DEFAULT_CACHE = { maxAge: 120, sMaxAge: 600 };

//cache for a month 
const DEFAULT_CACHE = { maxAge: 2592000, sMaxAge: 2592000 };
const BLOG_CACHE_NAMESPACES = ["blogs:list", "blogs:slug"];

const setCacheHeaders = (res, cache = DEFAULT_CACHE) => {
  if (!res || !cache) return;
  res.set(
    "Cache-Control",
    `public, max-age=${cache.maxAge}, s-maxage=${cache.sMaxAge}`
  );
  res.set("Vary", "Authorization, Cookie");
};

const safeInvalidateBlogCache = async () => {
  try {
    await invalidateCacheNamespaces(BLOG_CACHE_NAMESPACES);
  } catch (error) {
    console.error("[blog] Cache invalidation error:", error);
  }
};

const slugifySafe = (value = "") =>
  slugify(value, {
    lower: true,
    strict: true,
    remove: /[*+~.()'"!:@]/g
  });

const stripHtml = (input = "") => input.replace(/<[^>]*>/g, " ");

const calculateReadingTime = (content = "") => {
  const plain = stripHtml(content || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return 1;
  const words = plain.split(" ").length;
  return Math.max(1, Math.ceil(words / 200));
};

const normalizeTags = (tags) => {
  const array = Array.isArray(tags)
    ? tags
    : typeof tags === "string"
    ? tags.split(",")
    : [];
  const normalized = array
    .map((tag) => String(tag).trim())
    .filter(Boolean);
  return [...new Set(normalized)];
};

const createExcerpt = (inputExcerpt, content) => {
  if (inputExcerpt && inputExcerpt.trim()) {
    return inputExcerpt.trim();
  }
  const plain = stripHtml(content || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!plain) return "";
  return plain.length > 220 ? `${plain.slice(0, 217).trim()}...` : plain;
};

const generateUniqueSlug = async (title, excludeId = null) => {
  const baseSlug = slugifySafe(title || "");
  let slugCandidate = baseSlug;
  let counter = 1;

  const isSlugTaken = async (slugValue) => {
    const query = { slug: slugValue };
    if (excludeId) {
      query._id = { $ne: excludeId };
    }
    return BlogModel.exists(query);
  };

  while (await isSlugTaken(slugCandidate)) {
    slugCandidate = `${baseSlug}-${counter++}`;
  }

  return slugCandidate;
};

export const createBlogController = async (request, response) => {
  try {
    const {
      title,
      excerpt = "",
      coverImage = "",
      content,
      tags = [],
      status = "draft",
      metaTitle = "",
      metaDescription = ""
    } = request.body;

    if (!title || !title.trim()) {
      return response.status(400).json({
        message: "Blog title is required",
        error: true,
        success: false
      });
    }

    if (!content || !content.trim()) {
      return response.status(400).json({
        message: "Blog content is required",
        error: true,
        success: false
      });
    }

    const normalizedStatus = ["draft", "published", "archived"].includes(status)
      ? status
      : "draft";

    const slug = await generateUniqueSlug(title.trim());
    const normalizedTags = normalizeTags(tags);
    const readingTime = calculateReadingTime(content);
    const computedExcerpt = createExcerpt(excerpt, content);

    const blog = await BlogModel.create({
      title: title.trim(),
      slug,
      excerpt: computedExcerpt,
      coverImage,
      content,
      tags: normalizedTags,
      status: normalizedStatus,
      metaTitle,
      metaDescription,
      readingTime,
      author: request.userId || null,
      publishedAt: normalizedStatus === "published" ? new Date() : null
    });

    await safeInvalidateBlogCache();

    return response.status(201).json({
      message: "Blog created successfully",
      data: blog,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const updateBlogController = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Valid blog id is required",
        error: true,
        success: false
      });
    }

    const blog = await BlogModel.findById(id);

    if (!blog) {
      return response.status(404).json({
        message: "Blog not found",
        error: true,
        success: false
      });
    }

    const {
      title,
      excerpt,
      coverImage,
      content,
      tags,
      status,
      metaTitle,
      metaDescription
    } = request.body;

    if (typeof title === "string" && title.trim() && title.trim() !== blog.title) {
      blog.title = title.trim();
      blog.slug = await generateUniqueSlug(blog.title, blog._id);
    }

    if (typeof excerpt === "string") {
      blog.excerpt = excerpt.trim();
    }

    if (typeof coverImage === "string") {
      blog.coverImage = coverImage;
    }

    if (typeof content === "string") {
      blog.content = content;
      blog.readingTime = calculateReadingTime(content);
      if (!blog.excerpt) {
        blog.excerpt = createExcerpt("", content);
      }
    }

    if (tags !== undefined) {
      blog.tags = normalizeTags(tags);
    }

    if (typeof metaTitle === "string") {
      blog.metaTitle = metaTitle;
    }

    if (typeof metaDescription === "string") {
      blog.metaDescription = metaDescription;
    }

    if (status && ["draft", "published", "archived"].includes(status)) {
      if (status === "published" && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
      blog.status = status;
    }

    await blog.save();
    await safeInvalidateBlogCache();

    return response.json({
      message: "Blog updated successfully",
      data: blog,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const deleteBlogController = async (request, response) => {
  try {
    const { id } = request.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: "Valid blog id is required",
        error: true,
        success: false
      });
    }

    const deletion = await BlogModel.findByIdAndDelete(id);

    if (!deletion) {
      return response.status(404).json({
        message: "Blog not found",
        error: true,
        success: false
      });
    }

    await safeInvalidateBlogCache();

    return response.json({
      message: "Blog deleted successfully",
      data: deletion,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getBlogListController = async (request, response) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      status,
      sort = "newest",
      scope = "public"
    } = request.query;

    const numericPage = Math.max(Number(page) || 1, 1);
    const numericLimit = Math.min(Math.max(Number(limit) || 12, 1), 100);
    const skip = (numericPage - 1) * numericLimit;

    const isAdminScope = scope === "admin";
    let requesterRole = null;

    if (isAdminScope) {
      if (!request.userId) {
        return response.status(401).json({
          message: "Authentication required",
          error: true,
          success: false
        });
      }

      const adminUser = await UserModel.findById(request.userId).select("role");
      requesterRole = adminUser?.role;

      if (requesterRole !== "ADMIN") {
        return response.status(403).json({
          message: "Permission denied",
          error: true,
          success: false
        });
      }
    }

    const query = {};

    if (search) {
      const searchRegex = new RegExp(search, "i");
      query.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { tags: searchRegex }
      ];
    }

    if (isAdminScope) {
      if (status && status !== "all") {
        query.status = status;
      }
    } else {
      query.status = "published";
    }

    const sortMap = {
      newest: { publishedAt: -1, createdAt: -1 },
      oldest: { publishedAt: 1, createdAt: 1 }
    };

    const sortOption = sortMap[sort] || sortMap.newest;

    const [blogs, totalCount] = await Promise.all([
      BlogModel.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(numericLimit)
        .select(isAdminScope ? undefined : "-content")
        .lean(),
      BlogModel.countDocuments(query)
    ]);

    if (!isAdminScope) {
      setCacheHeaders(response);
    }

    return response.json({
      message: "Blog list",
      data: blogs,
      page: numericPage,
      limit: numericLimit,
      totalCount,
      totalPages: Math.ceil(totalCount / numericLimit),
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getBlogBySlugController = async (request, response) => {
  try {
    const { slug } = request.params;
    const preview = request.query.preview === "true";

    if (!slug) {
      return response.status(400).json({
        message: "Blog slug is required",
        error: true,
        success: false
      });
    }

    const query = { slug };
    if (preview) {
      if (!request.userId) {
        return response.status(401).json({
          message: "Authentication required for preview",
          error: true,
          success: false
        });
      }

      const adminUser = await UserModel.findById(request.userId).select("role");
      if (adminUser?.role !== "ADMIN") {
        return response.status(403).json({
          message: "Permission denied",
          error: true,
          success: false
        });
      }
    } else {
      query.status = "published";
    }

    const blog = await BlogModel.findOne(query)
      .populate("author", "name email")
      .lean();

    if (!blog) {
      return response.status(404).json({
        message: "Blog not found",
        error: true,
        success: false
      });
    }

    if (!preview) {
      setCacheHeaders(response, { maxAge: 180, sMaxAge: 900 });
    }

    return response.json({
      message: "Blog details",
      data: blog,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};