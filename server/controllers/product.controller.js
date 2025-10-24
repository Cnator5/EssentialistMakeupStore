// import ProductModel from "../models/product.model.js";

// export const createProductController = async(request,response)=>{
//     try {
//         const { 
//             name ,
//             image ,
//             category,
//             subCategory,
//             unit,
//             stock,
//             bulkPrice,
//             price,
//             discount,
//             description,
//             specifications,
//             more_details,
//         } = request.body 

//         // if(!name || !image[0] || !category[0] || !subCategory[0] || !unit || bulkPrice || !price || !description ){
//         if(!name || !image[0] || !category[0] || !subCategory[0] || !bulkPrice || !price || !description ){
//             return response.status(400).json({
//                 message : "Enter required fields",
//                 error : true,
//                 success : false
//             })
//         }

//         const product = new ProductModel({
//             name ,
//             image ,
//             category,
//             subCategory,
//             unit,
//             stock,
//             bulkPrice : request.body.bulkPrice || null,
//             price,
//             discount,
//             description,
//             specifications,
//             more_details,
//         })
//         const saveProduct = await product.save()

//         return response.json({
//             message : "Product Created Successfully",
//             data : saveProduct,
//             error : false,
//             success : true
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export const getProductController = async(request,response)=>{
//     try {
        
//         let { page, limit, search } = request.body 

//         if(!page){
//             page = 1
//         }

//         if(!limit){
//             limit = 10
//         }

//         const query = search ? {
//             $text : {
//                 $search : search
//             }
//         } : {}

//         const skip = (page - 1) * limit

//         const [data,totalCount] = await Promise.all([
//             ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit).populate('category subCategory'),
//             ProductModel.countDocuments(query)
//         ])

//         return response.json({
//             message : "Product data",
//             error : false,
//             success : true,
//             totalCount : totalCount,
//             totalNoPage : Math.ceil( totalCount / limit),
//             data : data
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export const getProductByCategory = async(request,response)=>{
//     try {
//         const { id } = request.body 

//         if(!id){
//             return response.status(400).json({
//                 message : "provide category id",
//                 error : true,
//                 success : false
//             })
//         }

//         const product = await ProductModel.find({ 
//             category : { $in : id }
//         }).limit(15)

//         return response.json({
//             message : "category product list",
//             data : product,
//             error : false,
//             success : true
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export const getProductByCategoryAndSubCategory  = async(request,response)=>{
//     try {
//         const { categoryId,subCategoryId,page,limit } = request.body

//         if(!categoryId || !subCategoryId){
//             return response.status(400).json({
//                 message : "Provide categoryId and subCategoryId",
//                 error : true,
//                 success : false
//             })
//         }

//         if(!page){
//             page = 1
//         }

//         if(!limit){
//             limit = 10
//         }

//         const query = {
//             category : { $in :categoryId  },
//             subCategory : { $in : subCategoryId }
//         }

//         const skip = (page - 1) * limit

//         const [data,dataCount] = await Promise.all([
//             ProductModel.find(query).sort({createdAt : -1 }).skip(skip).limit(limit),
//             ProductModel.countDocuments(query)
//         ])

//         return response.json({
//             message : "Product list",
//             data : data,
//             totalCount : dataCount,
//             page : page,
//             limit : limit,
//             success : true,
//             error : false
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// // export const getProductDetails = async(request,response)=>{
// //     try {
// //         const { productId } = request.body 

// //         const product = await ProductModel.findOne({ _id : productId })


// //         return response.json({
// //             message : "product details",
// //             data : product,
// //             error : false,
// //             success : true
// //         })

// //     } catch (error) {
// //         return response.status(500).json({
// //             message : error.message || error,
// //             error : true,
// //             success : false
// //         })
// //     }
// // }

// //update product
// export const updateProductDetails = async(request,response)=>{
//     try {
//         const { _id } = request.body 

//         if(!_id){
//             return response.status(400).json({
//                 message : "provide product _id",
//                 error : true,
//                 success : false
//             })
//         }

//         const updateProduct = await ProductModel.updateOne({ _id : _id },{
//             ...request.body
//         })

//         return response.json({
//             message : "updated successfully",
//             data : updateProduct,
//             error : false,
//             success : true
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// //delete product
// export const deleteProductDetails = async(request,response)=>{
//     try {
//         const { _id } = request.body 

//         if(!_id){
//             return response.status(400).json({
//                 message : "provide _id ",
//                 error : true,
//                 success : false
//             })
//         }

//         const deleteProduct = await ProductModel.deleteOne({_id : _id })

//         return response.json({
//             message : "Delete successfully",
//             error : false,
//             success : true,
//             data : deleteProduct
//         })
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// //search product
// export const searchProduct = async(request,response)=>{
//     try {
//         let { search, page , limit } = request.body 

//         if(!page){
//             page = 1
//         }
//         if(!limit){
//             limit  = 10
//         }

//         const query = search ? {
//             $text : {
//                 $search : search
//             }
//         } : {}

//         const skip = ( page - 1) * limit

//         const [data,dataCount] = await Promise.all([
//             ProductModel.find(query).sort({ createdAt  : -1 }).skip(skip).limit(limit).populate('category subCategory'),
//             ProductModel.countDocuments(query)
//         ])

//         return response.json({
//             message : "Product data",
//             error : false,
//             success : true,
//             data : data,
//             totalCount :dataCount,
//             totalPage : Math.ceil(dataCount/limit),
//             page : page,
//             limit : limit 
//         })


//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// };

// // Add this new function to your product.controller.js file

// export const getProductsByIds = async (request, response) => {
//     try {
//         const { ids } = request.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return response.status(400).json({
//                 message: "An array of product IDs is required.",
//                 error: true,
//                 success: false
//             });
//         }

//         // Find all products where the _id is in the provided array
//         const products = await ProductModel.find({
//             '_id': { $in: ids }
//         }).populate('category subCategory');

//         return response.json({
//             message: "Products fetched successfully by IDs",
//             data: products,
//             error: false,
//             success: true
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// };

// export const getProductDetails = async(request,response)=>{
//     try {
//         const { productId } = request.body 

//         // THE FIX IS HERE: Add .populate() to get the full category/subcategory objects
//         const product = await ProductModel.findOne({ _id : productId }).populate('category subCategory')

//         if (!product) {
//             return response.status(404).json({
//                 message: "Product not found",
//                 error: true,
//                 success: false
//             })
//         }

//         return response.json({
//             message : "product details",
//             data : product,
//             error : false,
//             success : true
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// };


// export const getProductsByCategorySubcategorySlug = async (request, response) => {
//     try {
//         const { categorySlug, subCategorySlug, page = 1, limit = 10 } = request.body;

//         if (!categorySlug || !subCategorySlug) {
//             return response.status(400).json({
//                 message: "Provide categorySlug and subCategorySlug",
//                 error: true,
//                 success: false
//             });
//         }

//         // Function to create slug from name
//         const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

//         // Find category by slug
//         const categories = await CategoryModel.find();
//         const category = categories.find(cat => slugify(cat.name) === categorySlug);
        
//         if (!category) {
//             return response.status(404).json({
//                 message: "Category not found",
//                 error: true,
//                 success: false
//             });
//         }

//         // Find subcategory by slug and category
//         const subCategories = await SubCategoryModel.find().populate('category');
//         const subCategory = subCategories.find(sub => 
//             slugify(sub.name) === subCategorySlug && 
//             sub.category.some(cat => cat._id.toString() === category._id.toString())
//         );

//         if (!subCategory) {
//             return response.status(404).json({
//                 message: "Subcategory not found",
//                 error: true,
//                 success: false
//             });
//         }

//         const query = {
//             category: { $in: [category._id] },
//             subCategory: { $in: [subCategory._id] }
//         };

//         const skip = (page - 1) * limit;

//         const [products, totalCount] = await Promise.all([
//             ProductModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('category subCategory'),
//             ProductModel.countDocuments(query)
//         ]);

//         return response.json({
//             message: "Products fetched successfully",
//             data: {
//                 products,
//                 totalCount,
//                 categoryData: category,
//                 subCategoryData: subCategory
//             },
//             page,
//             limit,
//             success: true,
//             error: false
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// };

// export const getProductBySlug = async (request, response) => {
//     try {
//         const { categorySlug, subCategorySlug, productSlug } = request.body;

//         if (!categorySlug || !subCategorySlug || !productSlug) {
//             return response.status(400).json({
//                 message: "Provide categorySlug, subCategorySlug, and productSlug",
//                 error: true,
//                 success: false
//             });
//         }

//         const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

//         // Find all products with populated category and subcategory
//         const products = await ProductModel.find().populate('category subCategory');
        
//         // Find the product that matches all slugs
//         const product = products.find(prod => {
//             const prodSlug = slugify(prod.name);
//             const catSlug = prod.category[0] ? slugify(prod.category[0].name) : '';
//             const subCatSlug = prod.subCategory[0] ? slugify(prod.subCategory[0].name) : '';
            
//             return prodSlug === productSlug && 
//                    catSlug === categorySlug && 
//                    subCatSlug === subCategorySlug;
//         });

//         if (!product) {
//             return response.status(404).json({
//                 message: "Product not found",
//                 error: true,
//                 success: false
//             });
//         }

//         return response.json({
//             message: "Product details",
//             data: product,
//             error: false,
//             success: true
//         });

//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//             success: false
//         });
//     }
// };







// import mongoose from "mongoose";
// import CategoryModel from "../models/category.model.js";
// import SubCategoryModel from "../models/subCategory.model.js";
// import ProductModel from "../models/product.model.js";
// import BrandModel from "../models/brand.model.js";

// const slugify = (text = "") =>
//   text
//     .toString()
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]+/g, "-")
//     .replace(/^-+|-+$/g, "");

// const sanitizeArray = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);

// const castToObjectIdArray = (value) =>
//   sanitizeArray(value)
//     .map((id) => {
//       if (mongoose.Types.ObjectId.isValid(id)) {
//         return new mongoose.Types.ObjectId(id);
//       }
//       return null;
//     })
//     .filter(Boolean);

// const buildProductQuery = ({ search, filters = {} }) => {
//   const query = {};

//   if (search) {
//     query.$text = { $search: search };
//   }

//   if (filters.publish !== undefined) {
//     query.publish = !!filters.publish;
//   }

//   if (filters.categoryIds && filters.categoryIds.length) {
//     query.category = { $in: filters.categoryIds };
//   }

//   if (filters.subCategoryIds && filters.subCategoryIds.length) {
//     query.subCategory = { $in: filters.subCategoryIds };
//   }

//   if (filters.brandIds && filters.brandIds.length) {
//     query.brand = { $in: filters.brandIds };
//   }

//   if (filters.price) {
//     const priceFilter = {};
//     if (filters.price.min !== undefined && filters.price.min !== null) {
//       priceFilter.$gte = Number(filters.price.min);
//     }
//     if (filters.price.max !== undefined && filters.price.max !== null) {
//       priceFilter.$lte = Number(filters.price.max);
//     }
//     if (Object.keys(priceFilter).length) {
//       query.price = priceFilter;
//     }
//   }

//   if (filters.discount) {
//     const discountFilter = {};
//     if (filters.discount.min !== undefined && filters.discount.min !== null) {
//       discountFilter.$gte = Number(filters.discount.min);
//     }
//     if (filters.discount.max !== undefined && filters.discount.max !== null) {
//       discountFilter.$lte = Number(filters.discount.max);
//     }
//     if (Object.keys(discountFilter).length) {
//       query.discount = discountFilter;
//     }
//   }

//   if (filters.bulkPrice) {
//     const bulkFilter = {};
//     if (filters.bulkPrice.min !== undefined && filters.bulkPrice.min !== null) {
//       bulkFilter.$gte = Number(filters.bulkPrice.min);
//     }
//     if (filters.bulkPrice.max !== undefined && filters.bulkPrice.max !== null) {
//       bulkFilter.$lte = Number(filters.bulkPrice.max);
//     }
//     if (Object.keys(bulkFilter).length) {
//       query.bulkPrice = bulkFilter;
//     }
//   }

//   if (filters.stockStatus === "inStock") {
//     query.stock = { $gt: 0 };
//   } else if (filters.stockStatus === "outOfStock") {
//     query.stock = { $lte: 0 };
//   }

//   if (filters.units && filters.units.length) {
//     query.unit = { $in: filters.units };
//   }

//   if (Array.isArray(filters.attributeFilters)) {
//     filters.attributeFilters.forEach(({ key, values }) => {
//       if (!key) return;
//       const path = key.trim();
//       if (!path) return;

//       if (Array.isArray(values) && values.length) {
//         query[path] = { $in: values };
//       } else if (values !== undefined && values !== null) {
//         query[path] = values;
//       }
//     });
//   }

//   if (filters.ids && filters.ids.length) {
//     query._id = { $in: filters.ids };
//   }

//   return query;
// };

// const SORT_PRESETS = {
//   newest: { createdAt: -1 },
//   oldest: { createdAt: 1 },
//   priceAsc: { price: 1 },
//   priceDesc: { price: -1 },
//   nameAsc: { name: 1 },
//   nameDesc: { name: -1 },
//   discountDesc: { discount: -1 },
//   stockDesc: { stock: -1 }
// };

// const buildSortOptions = (sortInput) => {
//   if (!sortInput) {
//     return SORT_PRESETS.newest;
//   }

//   if (typeof sortInput === "string") {
//     return SORT_PRESETS[sortInput] || SORT_PRESETS.newest;
//   }

//   if (typeof sortInput === "object") {
//     const { field, order } = sortInput;
//     const allowedFields = ["price", "name", "createdAt", "discount", "stock"];
//     if (allowedFields.includes(field)) {
//       const direction = order === "asc" ? 1 : -1;
//       return { [field]: direction };
//     }
//   }

//   return SORT_PRESETS.newest;
// };

// const resolveBrandIdsFromFilters = async (filters = {}) => {
//   const brandIds = new Set();

//   castToObjectIdArray(filters.brandIds).forEach((id) => brandIds.add(id));

//   if (Array.isArray(filters.brandSlugs) && filters.brandSlugs.length) {
//     const dbBrands = await BrandModel.find({
//       slug: { $in: filters.brandSlugs }
//     }).select("_id");
//     dbBrands.forEach((brand) => brandIds.add(brand._id));
//   }

//   return Array.from(brandIds);
// };

// export const createProductController = async (request, response) => {
//   try {
//     const {
//       name,
//       image,
//       category,
//       subCategory,
//       unit,
//       stock,
//       bulkPrice,
//       price,
//       discount,
//       description,
//       specifications,
//       more_details,
//       brandId,
//       brandSlug,
//       publish = true
//     } = request.body;

//     if (!name || !image?.[0] || !category?.[0] || !subCategory?.[0] || !price || !description) {
//       return response.status(400).json({
//         message: "Enter required fields",
//         error: true,
//         success: false
//       });
//     }

//     let brandObjectId = null;

//     if (brandId) {
//       if (!mongoose.Types.ObjectId.isValid(brandId)) {
//         return response.status(400).json({
//           message: "Invalid brand id",
//           error: true,
//           success: false
//         });
//       }
//       brandObjectId = new mongoose.Types.ObjectId(brandId);
//     } else if (brandSlug) {
//       const brandDoc = await BrandModel.findOne({ slug: brandSlug }).select("_id");
//       if (!brandDoc) {
//         return response.status(400).json({
//           message: "Brand with provided slug not found",
//           error: true,
//           success: false
//         });
//       }
//       brandObjectId = brandDoc._id;
//     }

//     if (brandObjectId) {
//       const brandExists = await BrandModel.exists({
//         _id: brandObjectId,
//         isActive: true
//       });
//       if (!brandExists) {
//         return response.status(400).json({
//           message: "Selected brand is not active",
//           error: true,
//           success: false
//         });
//       }
//     }

//     const product = new ProductModel({
//       name,
//       image,
//       category,
//       subCategory,
//       unit,
//       stock,
//       bulkPrice: bulkPrice ?? null,
//       price,
//       discount,
//       description,
//       specifications,
//       more_details,
//       brand: brandObjectId,
//       publish
//     });

//     const saveProduct = await product.save();

//     return response.json({
//       message: "Product Created Successfully",
//       data: saveProduct,
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

// export const getProductController = async (request, response) => {
//   try {
//     let {
//       page = 1,
//       limit = 10,
//       search = "",
//       filters = {},
//       sort = "newest",
//       projection = null
//     } = request.body;

//     page = Math.max(Number(page) || 1, 1);
//     limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

//     const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
//     const resolvedFilters = {
//       ...filters,
//       brandIds: resolvedBrandIds,
//       categoryIds: castToObjectIdArray(filters.categoryIds),
//       subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
//       ids: castToObjectIdArray(filters.ids)
//     };

//     const query = buildProductQuery({ search, filters: resolvedFilters });
//     const sortOptions = buildSortOptions(sort);
//     const skip = (page - 1) * limit;

//     const findQuery = ProductModel.find(query)
//       .sort(sortOptions)
//       .skip(skip)
//       .limit(limit)
//       .populate("category subCategory brand");

//     if (projection && typeof projection === "object") {
//       findQuery.select(projection);
//     }

//     const [data, totalCount] = await Promise.all([
//       findQuery.lean(),
//       ProductModel.countDocuments(query)
//     ]);

//     return response.json({
//       message: "Product data",
//       error: false,
//       success: true,
//       data,
//       page,
//       limit,
//       totalCount,
//       totalNoPage: Math.ceil(totalCount / limit),
//       filtersApplied: resolvedFilters,
//       sortApplied: sortOptions
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getProductByCategory = async (request, response) => {
//   try {
//     const { id, limit = 15, sort = "newest" } = request.body;

//     if (!id) {
//       return response.status(400).json({
//         message: "provide category id",
//         error: true,
//         success: false
//       });
//     }

//     const categoryIds = castToObjectIdArray(Array.isArray(id) ? id : [id]);

//     if (!categoryIds.length) {
//       return response.status(400).json({
//         message: "Invalid category id provided",
//         error: true,
//         success: false
//       });
//     }

//     const products = await ProductModel.find({
//       category: { $in: categoryIds }
//     })
//       .sort(buildSortOptions(sort))
//       .limit(Number(limit) || 15)
//       .populate("category subCategory brand")
//       .lean();

//     return response.json({
//       message: "category product list",
//       data: products,
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

// export const getProductByCategoryAndSubCategory = async (request, response) => {
//   try {
//     let {
//       categoryId,
//       subCategoryId,
//       page = 1,
//       limit = 10,
//       sort = "newest"
//     } = request.body;

//     if (!categoryId || !subCategoryId) {
//       return response.status(400).json({
//         message: "Provide categoryId and subCategoryId",
//         error: true,
//         success: false
//       });
//     }

//     const categoryIds = castToObjectIdArray(
//       Array.isArray(categoryId) ? categoryId : [categoryId]
//     );
//     const subCategoryIds = castToObjectIdArray(
//       Array.isArray(subCategoryId) ? subCategoryId : [subCategoryId]
//     );

//     if (!categoryIds.length || !subCategoryIds.length) {
//       return response.status(400).json({
//         message: "Invalid category or subcategory id",
//         error: true,
//         success: false
//       });
//     }

//     page = Math.max(Number(page) || 1, 1);
//     limit = Math.max(Number(limit) || 10, 1);

//     const query = {
//       category: { $in: categoryIds },
//       subCategory: { $in: subCategoryIds }
//     };

//     const skip = (page - 1) * limit;

//     const [data, dataCount] = await Promise.all([
//       ProductModel.find(query)
//         .sort(buildSortOptions(sort))
//         .skip(skip)
//         .limit(limit)
//         .populate("category subCategory brand")
//         .lean(),
//       ProductModel.countDocuments(query)
//     ]);

//     return response.json({
//       message: "Product list",
//       data,
//       totalCount: dataCount,
//       page,
//       limit,
//       success: true,
//       error: false
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getProductDetails = async (request, response) => {
//   try {
//     const { productId } = request.body;

//     if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
//       return response.status(400).json({
//         message: "Valid productId is required",
//         error: true,
//         success: false
//       });
//     }

//     const product = await ProductModel.findOne({ _id: productId })
//       .populate("category subCategory brand")
//       .lean();

//     if (!product) {
//       return response.status(404).json({
//         message: "Product not found",
//         error: true,
//         success: false
//       });
//     }

//     return response.json({
//       message: "product details",
//       data: product,
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

// export const updateProductDetails = async (request, response) => {
//   try {
//     const { _id, brandId, brandSlug, category, subCategory, ...rest } = request.body;

//     if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
//       return response.status(400).json({
//         message: "provide valid product _id",
//         error: true,
//         success: false
//       });
//     }

//     const product = await ProductModel.findById(_id);
//     if (!product) {
//       return response.status(404).json({
//         message: "Product not found",
//         error: true,
//         success: false
//       });
//     }

//     if (category) {
//       product.category = castToObjectIdArray(Array.isArray(category) ? category : [category]);
//     }

//     if (subCategory) {
//       product.subCategory = castToObjectIdArray(
//         Array.isArray(subCategory) ? subCategory : [subCategory]
//       );
//     }

//     if (brandId || brandSlug) {
//       let brandObjectId = null;

//       if (brandId) {
//         if (!mongoose.Types.ObjectId.isValid(brandId)) {
//           return response.status(400).json({
//             message: "Invalid brand id",
//             error: true,
//             success: false
//           });
//         }
//         brandObjectId = new mongoose.Types.ObjectId(brandId);
//       } else if (brandSlug) {
//         const brandDoc = await BrandModel.findOne({ slug: brandSlug }).select("_id");
//         if (!brandDoc) {
//           return response.status(400).json({
//             message: "Brand with provided slug not found",
//             error: true,
//             success: false
//           });
//         }
//         brandObjectId = brandDoc._id;
//       }

//       if (brandObjectId) {
//         const brandExists = await BrandModel.exists({
//           _id: brandObjectId,
//           isActive: true
//         });
//         if (!brandExists) {
//           return response.status(400).json({
//             message: "Selected brand is not active",
//             error: true,
//             success: false
//           });
//         }
//       }

//       product.brand = brandObjectId;
//     }

//     if (rest.brand === null) {
//       product.brand = null;
//     }

//     Object.assign(product, rest);

//     const updatedProduct = await product.save();

//     return response.json({
//       message: "updated successfully",
//       data: updatedProduct,
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

// export const deleteProductDetails = async (request, response) => {
//   try {
//     const { _id } = request.body;

//     if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
//       return response.status(400).json({
//         message: "provide valid product _id",
//         error: true,
//         success: false
//       });
//     }

//     const deleteProduct = await ProductModel.deleteOne({ _id });

//     return response.json({
//       message: "Delete successfully",
//       error: false,
//       success: true,
//       data: deleteProduct
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const searchProduct = async (request, response) => {
//   try {
//     let { search, page = 1, limit = 10, filters = {}, sort = "newest" } = request.body;

//     page = Math.max(Number(page) || 1, 1);
//     limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

//     const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
//     const resolvedFilters = {
//       ...filters,
//       brandIds: resolvedBrandIds,
//       categoryIds: castToObjectIdArray(filters.categoryIds),
//       subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
//       ids: castToObjectIdArray(filters.ids)
//     };

//     const query = buildProductQuery({ search, filters: resolvedFilters });
//     const sortOptions = buildSortOptions(sort);
//     const skip = (page - 1) * limit;

//     const [data, dataCount] = await Promise.all([
//       ProductModel.find(query)
//         .sort(sortOptions)
//         .skip(skip)
//         .limit(limit)
//         .populate("category subCategory brand")
//         .lean(),
//       ProductModel.countDocuments(query)
//     ]);

//     return response.json({
//       message: "Product data",
//       error: false,
//       success: true,
//       data,
//       totalCount: dataCount,
//       totalPage: Math.ceil(dataCount / limit),
//       page,
//       limit
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getProductsByIds = async (request, response) => {
//   try {
//     const { ids } = request.body;

//     if (!Array.isArray(ids) || !ids.length) {
//       return response.status(400).json({
//         message: "An array of product IDs is required.",
//         error: true,
//         success: false
//       });
//     }

//     const objectIds = castToObjectIdArray(ids);

//     const products = await ProductModel.find({
//       _id: { $in: objectIds }
//     })
//       .populate("category subCategory brand")
//       .lean();

//     return response.json({
//       message: "Products fetched successfully by IDs",
//       data: products,
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

// export const getProductsByCategorySubcategorySlug = async (request, response) => {
//   try {
//     const {
//       categorySlug,
//       subCategorySlug,
//       page = 1,
//       limit = 10,
//       sort = "newest"
//     } = request.body;

//     if (!categorySlug || !subCategorySlug) {
//       return response.status(400).json({
//         message: "Provide categorySlug and subCategorySlug",
//         error: true,
//         success: false
//       });
//     }

//     const categories = await CategoryModel.find();
//     const category = categories.find((cat) => slugify(cat.name) === categorySlug);

//     if (!category) {
//       return response.status(404).json({
//         message: "Category not found",
//         error: true,
//         success: false
//       });
//     }

//     const subCategories = await SubCategoryModel.find().populate("category");
//     const subCategory = subCategories.find(
//       (sub) =>
//         slugify(sub.name) === subCategorySlug &&
//         sub.category.some((cat) => cat._id.toString() === category._id.toString())
//     );

//     if (!subCategory) {
//       return response.status(404).json({
//         message: "Subcategory not found",
//         error: true,
//         success: false
//       });
//     }

//     const query = {
//       category: { $in: [category._id] },
//       subCategory: { $in: [subCategory._id] }
//     };

//     const safePage = Math.max(Number(page) || 1, 1);
//     const safeLimit = Math.max(Number(limit) || 10, 1);
//     const skip = (safePage - 1) * safeLimit;

//     const [products, totalCount] = await Promise.all([
//       ProductModel.find(query)
//         .sort(buildSortOptions(sort))
//         .skip(skip)
//         .limit(safeLimit)
//         .populate("category subCategory brand")
//         .lean(),
//       ProductModel.countDocuments(query)
//     ]);

//     return response.json({
//       message: "Products fetched successfully",
//       data: {
//         products,
//         totalCount,
//         categoryData: category,
//         subCategoryData: subCategory
//       },
//       page: safePage,
//       limit: safeLimit,
//       success: true,
//       error: false
//     });
//   } catch (error) {
//     return response.status(500).json({
//       message: error.message || error,
//       error: true,
//       success: false
//     });
//   }
// };

// export const getProductBySlug = async (request, response) => {
//   try {
//     const { categorySlug, subCategorySlug, productSlug } = request.body;

//     if (!categorySlug || !subCategorySlug || !productSlug) {
//       return response.status(400).json({
//         message: "Provide categorySlug, subCategorySlug, and productSlug",
//         error: true,
//         success: false
//       });
//     }

//     const products = await ProductModel.find()
//       .populate("category subCategory brand")
//       .lean();

//     const product = products.find((prod) => {
//       const prodSlug = slugify(prod.name);
//       const categoryObj = prod.category?.[0];
//       const subCategoryObj = prod.subCategory?.[0];
//       const catSlug = categoryObj ? slugify(categoryObj.name) : "";
//       const subCatSlug = subCategoryObj ? slugify(subCategoryObj.name) : "";

//       return prodSlug === productSlug && catSlug === categorySlug && subCatSlug === subCategorySlug;
//     });

//     if (!product) {
//       return response.status(404).json({
//         message: "Product not found",
//         error: true,
//         success: false
//       });
//     }

//     return response.json({
//       message: "Product details",
//       data: product,
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

// export const getProductFilterMetaController = async (request, response) => {
//   try {
//     const { filters = {}, search = "" } = request.body;

//     const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
//     const resolvedFilters = {
//       ...filters,
//       brandIds: resolvedBrandIds,
//       categoryIds: castToObjectIdArray(filters.categoryIds),
//       subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
//       ids: castToObjectIdArray(filters.ids)
//     };

//     const query = buildProductQuery({ search, filters: resolvedFilters });

//     const pipeline = [
//       { $match: query },
//       {
//         $facet: {
//           priceRange: [
//             {
//               $group: {
//                 _id: null,
//                 min: { $min: "$price" },
//                 max: { $max: "$price" }
//               }
//             }
//           ],
//           brands: [
//             {
//               $group: {
//                 _id: "$brand",
//                 count: { $sum: 1 }
//               }
//             },
//             { $sort: { count: -1 } }
//           ],
//           categories: [
//             { $unwind: { path: "$category", preserveNullAndEmptyArrays: false } },
//             {
//               $group: {
//                 _id: "$category",
//                 count: { $sum: 1 }
//               }
//             },
//             { $sort: { count: -1 } }
//           ],
//           subCategories: [
//             { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: false } },
//             {
//               $group: {
//                 _id: "$subCategory",
//                 count: { $sum: 1 }
//               }
//             },
//             { $sort: { count: -1 } }
//           ],
//           stockStatus: [
//             {
//               $group: {
//                 _id: {
//                   $cond: [{ $gt: ["$stock", 0] }, "inStock", "outOfStock"]
//                 },
//                 count: { $sum: 1 }
//               }
//             }
//           ]
//         }
//       }
//     ];

//     const [result] = await ProductModel.aggregate(pipeline);

//     const brandIds = (result?.brands || []).map((item) => item._id).filter(Boolean);
//     const categoryIds = (result?.categories || []).map((item) => item._id);
//     const subCategoryIds = (result?.subCategories || []).map((item) => item._id);

//     const [brandDocs, categoryDocs, subCategoryDocs] = await Promise.all([
//       brandIds.length
//         ? BrandModel.find({ _id: { $in: brandIds } })
//             .select("name slug logo isActive")
//             .lean()
//         : [],
//       categoryIds.length
//         ? CategoryModel.find({ _id: { $in: categoryIds } })
//             .select("name image")
//             .lean()
//         : [],
//       subCategoryIds.length
//         ? SubCategoryModel.find({ _id: { $in: subCategoryIds } })
//             .select("name image")
//             .lean()
//         : []
//     ]);

//     const brandMap = new Map(brandDocs.map((doc) => [doc._id.toString(), doc]));
//     const categoryMap = new Map(categoryDocs.map((doc) => [doc._id.toString(), doc]));
//     const subCategoryMap = new Map(subCategoryDocs.map((doc) => [doc._id.toString(), doc]));

//     const priceRange = result?.priceRange?.[0] || { min: null, max: null };

//     const stockStatus = (result?.stockStatus || []).reduce(
//       (acc, curr) => {
//         if (curr?._id === "inStock") {
//           acc.inStock = curr.count;
//         }
//         if (curr?._id === "outOfStock") {
//           acc.outOfStock = curr.count;
//         }
//         return acc;
//       },
//       { inStock: 0, outOfStock: 0 }
//     );

//     return response.json({
//       message: "Product filter metadata",
//       success: true,
//       error: false,
//       data: {
//         priceRange,
//         stockStatus,
//         brands: (result?.brands || [])
//           .map((item) => {
//             if (!item._id) return null;
//             const brandDoc = brandMap.get(item._id.toString());
//             if (!brandDoc) return null;
//             return {
//               _id: item._id,
//               count: item.count,
//               name: brandDoc.name,
//               slug: brandDoc.slug,
//               logo: brandDoc.logo,
//               isActive: brandDoc.isActive
//             };
//           })
//           .filter(Boolean),
//         categories: (result?.categories || [])
//           .map((item) => {
//             const doc = categoryMap.get(item._id.toString());
//             if (!doc) return null;
//             return {
//               _id: item._id,
//               count: item.count,
//               name: doc.name,
//               image: doc.image,
//               slug: slugify(doc.name)
//             };
//           })
//           .filter(Boolean),
//         subCategories: (result?.subCategories || [])
//           .map((item) => {
//             const doc = subCategoryMap.get(item._id.toString());
//             if (!doc) return null;
//             return {
//               _id: item._id,
//               count: item.count,
//               name: doc.name,
//               image: doc.image,
//               slug: slugify(doc.name)
//             };
//           })
//           .filter(Boolean)
//       }
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
import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";
import BrandModel from "../models/brand.model.js";
import { invalidateCacheNamespaces } from "../middleware/cache.middleware.js";

const PRODUCT_CACHE_NAMESPACES = [
  "products:list",
  "products:by-category",
  "products:category-sub",
  "products:details",
  "products:search",
  "products:ids",
  "products:slug",
  "products:filter-meta"
];

const PRODUCT_DEFAULT_CACHE = {
  maxAge: 60,
  sMaxAge: 180
};

const PRODUCT_DETAILS_CACHE = {
  maxAge: 120,
  sMaxAge: 600
};

const PRODUCT_FILTER_CACHE = {
  maxAge: 300,
  sMaxAge: 900
};

const setCacheHeaders = (res, { maxAge, sMaxAge }) => {
  res.set("Cache-Control", `public, max-age=${maxAge}, s-maxage=${sMaxAge}`);
  res.set("Vary", "Authorization, Cookie");
};

const safeInvalidateCacheNamespaces = async (namespaces) => {
  try {
    await invalidateCacheNamespaces(namespaces);
  } catch (error) {
    console.error("Cache invalidation error:", error);
  }
};

const slugify = (text = "") =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sanitizeArray = (value) =>
  Array.isArray(value) ? value.filter(Boolean) : [];

const castToObjectIdArray = (value) =>
  sanitizeArray(value)
    .map((id) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        return new mongoose.Types.ObjectId(id);
      }
      return null;
    })
    .filter(Boolean);

const buildProductQuery = ({ search, filters = {} }) => {
  const query = {};

  if (search) {
    query.$text = { $search: search };
  }

  if (filters.publish !== undefined) {
    query.publish = !!filters.publish;
  }

  if (filters.categoryIds && filters.categoryIds.length) {
    query.category = { $in: filters.categoryIds };
  }

  if (filters.subCategoryIds && filters.subCategoryIds.length) {
    query.subCategory = { $in: filters.subCategoryIds };
  }

  if (filters.brandIds && filters.brandIds.length) {
    query.brand = { $in: filters.brandIds };
  }

  if (filters.price) {
    const priceFilter = {};
    if (filters.price.min !== undefined && filters.price.min !== null) {
      priceFilter.$gte = Number(filters.price.min);
    }
    if (filters.price.max !== undefined && filters.price.max !== null) {
      priceFilter.$lte = Number(filters.price.max);
    }
    if (Object.keys(priceFilter).length) {
      query.price = priceFilter;
    }
  }

  if (filters.discount) {
    const discountFilter = {};
    if (filters.discount.min !== undefined && filters.discount.min !== null) {
      discountFilter.$gte = Number(filters.discount.min);
    }
    if (filters.discount.max !== undefined && filters.discount.max !== null) {
      discountFilter.$lte = Number(filters.discount.max);
    }
    if (Object.keys(discountFilter).length) {
      query.discount = discountFilter;
    }
  }

  if (filters.bulkPrice) {
    const bulkFilter = {};
    if (filters.bulkPrice.min !== undefined && filters.bulkPrice.min !== null) {
      bulkFilter.$gte = Number(filters.bulkPrice.min);
    }
    if (filters.bulkPrice.max !== undefined && filters.bulkPrice.max !== null) {
      bulkFilter.$lte = Number(filters.bulkPrice.max);
    }
    if (Object.keys(bulkFilter).length) {
      query.bulkPrice = bulkFilter;
    }
  }

  if (filters.stockStatus === "inStock") {
    query.stock = { $gt: 0 };
  } else if (filters.stockStatus === "outOfStock") {
    query.stock = { $lte: 0 };
  }

  if (filters.units && filters.units.length) {
    query.unit = { $in: filters.units };
  }

  if (Array.isArray(filters.attributeFilters)) {
    filters.attributeFilters.forEach(({ key, values }) => {
      if (!key) return;
      const path = key.trim();
      if (!path) return;

      if (Array.isArray(values) && values.length) {
        query[path] = { $in: values };
      } else if (values !== undefined && values !== null) {
        query[path] = values;
      }
    });
  }

  if (filters.ids && filters.ids.length) {
    query._id = { $in: filters.ids };
  }

  return query;
};

const SORT_PRESETS = {
  newest: { createdAt: -1 },
  oldest: { createdAt: 1 },
  priceAsc: { price: 1 },
  priceDesc: { price: -1 },
  nameAsc: { name: 1 },
  nameDesc: { name: -1 },
  discountDesc: { discount: -1 },
  stockDesc: { stock: -1 }
};

const buildSortOptions = (sortInput) => {
  if (!sortInput) {
    return SORT_PRESETS.newest;
  }

  if (typeof sortInput === "string") {
    return SORT_PRESETS[sortInput] || SORT_PRESETS.newest;
  }

  if (typeof sortInput === "object") {
    const { field, order } = sortInput;
    const allowedFields = ["price", "name", "createdAt", "discount", "stock"];
    if (allowedFields.includes(field)) {
      const direction = order === "asc" ? 1 : -1;
      return { [field]: direction };
    }
  }

  return SORT_PRESETS.newest;
};

const resolveBrandIdsFromFilters = async (filters = {}) => {
  const brandIds = new Set();

  castToObjectIdArray(filters.brandIds).forEach((id) => brandIds.add(id));

  if (Array.isArray(filters.brandSlugs) && filters.brandSlugs.length) {
    const dbBrands = await BrandModel.find({
      slug: { $in: filters.brandSlugs }
    }).select("_id");
    dbBrands.forEach((brand) => brandIds.add(brand._id));
  }

  return Array.from(brandIds);
};

export const createProductController = async (request, response) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      bulkPrice,
      price,
      discount,
      description,
      specifications,
      more_details,
      brandId,
      brandSlug,
      publish = true
    } = request.body;

    if (
      !name ||
      !image?.[0] ||
      !category?.[0] ||
      !subCategory?.[0] ||
      !price ||
      !description
    ) {
      return response.status(400).json({
        message: "Enter required fields",
        error: true,
        success: false
      });
    }

    let brandObjectId = null;

    if (brandId) {
      if (!mongoose.Types.ObjectId.isValid(brandId)) {
        return response.status(400).json({
          message: "Invalid brand id",
          error: true,
          success: false
        });
      }
      brandObjectId = new mongoose.Types.ObjectId(brandId);
    } else if (brandSlug) {
      const brandDoc = await BrandModel.findOne({ slug: brandSlug }).select("_id");
      if (!brandDoc) {
        return response.status(400).json({
          message: "Brand with provided slug not found",
          error: true,
          success: false
        });
      }
      brandObjectId = brandDoc._id;
    }

    if (brandObjectId) {
      const brandExists = await BrandModel.exists({
        _id: brandObjectId,
        isActive: true
      });
      if (!brandExists) {
        return response.status(400).json({
          message: "Selected brand is not active",
          error: true,
          success: false
        });
      }
    }

    const product = new ProductModel({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      bulkPrice: bulkPrice ?? null,
      price,
      discount,
      description,
      specifications,
      more_details,
      brand: brandObjectId,
      publish
    });

    const saveProduct = await product.save();

    await safeInvalidateCacheNamespaces(PRODUCT_CACHE_NAMESPACES);

    return response.json({
      message: "Product Created Successfully",
      data: saveProduct,
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

export const getProductController = async (request, response) => {
  try {
    let {
      page = 1,
      limit = 10,
      search = "",
      filters = {},
      sort = "newest",
      projection = null
    } = request.body;

    page = Math.max(Number(page) || 1, 1);
    limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
    const resolvedFilters = {
      ...filters,
      brandIds: resolvedBrandIds,
      categoryIds: castToObjectIdArray(filters.categoryIds),
      subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
      ids: castToObjectIdArray(filters.ids)
    };

    const query = buildProductQuery({ search, filters: resolvedFilters });
    const sortOptions = buildSortOptions(sort);
    const skip = (page - 1) * limit;

    const findQuery = ProductModel.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .populate("category subCategory brand");

    if (projection && typeof projection === "object") {
      findQuery.select(projection);
    }

    const [data, totalCount] = await Promise.all([
      findQuery.lean(),
      ProductModel.countDocuments(query)
    ]);

    setCacheHeaders(response, PRODUCT_DEFAULT_CACHE);

    return response.json({
      message: "Product data",
      error: false,
      success: true,
      data,
      page,
      limit,
      totalCount,
      totalNoPage: Math.ceil(totalCount / limit),
      filtersApplied: resolvedFilters,
      sortApplied: sortOptions
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getProductByCategory = async (request, response) => {
  try {
    const { id, limit = 15, sort = "newest" } = request.body;

    if (!id) {
      return response.status(400).json({
        message: "provide category id",
        error: true,
        success: false
      });
    }

    const categoryIds = castToObjectIdArray(Array.isArray(id) ? id : [id]);

    if (!categoryIds.length) {
      return response.status(400).json({
        message: "Invalid category id provided",
        error: true,
        success: false
      });
    }

    const products = await ProductModel.find({
      category: { $in: categoryIds }
    })
      .sort(buildSortOptions(sort))
      .limit(Number(limit) || 15)
      .populate("category subCategory brand")
      .lean();

    setCacheHeaders(response, PRODUCT_DEFAULT_CACHE);

    return response.json({
      message: "category product list",
      data: products,
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

export const getProductByCategoryAndSubCategory = async (request, response) => {
  try {
    let {
      categoryId,
      subCategoryId,
      page = 1,
      limit = 10,
      sort = "newest"
    } = request.body;

    if (!categoryId || !subCategoryId) {
      return response.status(400).json({
        message: "Provide categoryId and subCategoryId",
        error: true,
        success: false
      });
    }

    const categoryIds = castToObjectIdArray(
      Array.isArray(categoryId) ? categoryId : [categoryId]
    );
    const subCategoryIds = castToObjectIdArray(
      Array.isArray(subCategoryId) ? subCategoryId : [subCategoryId]
    );

    if (!categoryIds.length || !subCategoryIds.length) {
      return response.status(400).json({
        message: "Invalid category or subcategory id",
        error: true,
        success: false
      });
    }

    page = Math.max(Number(page) || 1, 1);
    limit = Math.max(Number(limit) || 10, 1);

    const query = {
      category: { $in: categoryIds },
      subCategory: { $in: subCategoryIds }
    };

    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort(buildSortOptions(sort))
        .skip(skip)
        .limit(limit)
        .populate("category subCategory brand")
        .lean(),
      ProductModel.countDocuments(query)
    ]);

    setCacheHeaders(response, PRODUCT_DEFAULT_CACHE);

    return response.json({
      message: "Product list",
      data,
      totalCount: dataCount,
      page,
      limit,
      success: true,
      error: false
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getProductDetails = async (request, response) => {
  try {
    const { productId } = request.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return response.status(400).json({
        message: "Valid productId is required",
        error: true,
        success: false
      });
    }

    const product = await ProductModel.findOne({ _id: productId })
      .populate("category subCategory brand")
      .lean();

    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    setCacheHeaders(response, PRODUCT_DETAILS_CACHE);

    return response.json({
      message: "product details",
      data: product,
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

export const updateProductDetails = async (request, response) => {
  try {
    const { _id, brandId, brandSlug, category, subCategory, ...rest } = request.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).json({
        message: "provide valid product _id",
        error: true,
        success: false
      });
    }

    const product = await ProductModel.findById(_id);
    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    if (category) {
      product.category = castToObjectIdArray(Array.isArray(category) ? category : [category]);
    }

    if (subCategory) {
      product.subCategory = castToObjectIdArray(
        Array.isArray(subCategory) ? subCategory : [subCategory]
      );
    }

    if (brandId || brandSlug) {
      let brandObjectId = null;

      if (brandId) {
        if (!mongoose.Types.ObjectId.isValid(brandId)) {
          return response.status(400).json({
            message: "Invalid brand id",
            error: true,
            success: false
          });
        }
        brandObjectId = new mongoose.Types.ObjectId(brandId);
      } else if (brandSlug) {
        const brandDoc = await BrandModel.findOne({ slug: brandSlug }).select("_id");
        if (!brandDoc) {
          return response.status(400).json({
            message: "Brand with provided slug not found",
            error: true,
            success: false
          });
        }
        brandObjectId = brandDoc._id;
      }

      if (brandObjectId) {
        const brandExists = await BrandModel.exists({
          _id: brandObjectId,
          isActive: true
        });
        if (!brandExists) {
          return response.status(400).json({
            message: "Selected brand is not active",
            error: true,
            success: false
          });
        }
      }

      product.brand = brandObjectId;
    }

    if (rest.brand === null) {
      product.brand = null;
    }

    Object.assign(product, rest);

    const updatedProduct = await product.save();

    await safeInvalidateCacheNamespaces(PRODUCT_CACHE_NAMESPACES);

    return response.json({
      message: "updated successfully",
      data: updatedProduct,
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

export const deleteProductDetails = async (request, response) => {
  try {
    const { _id } = request.body;

    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
      return response.status(400).json({
        message: "provide valid product _id",
        error: true,
        success: false
      });
    }

    const deleteProduct = await ProductModel.deleteOne({ _id });

    await safeInvalidateCacheNamespaces(PRODUCT_CACHE_NAMESPACES);

    return response.json({
      message: "Delete successfully",
      error: false,
      success: true,
      data: deleteProduct
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const searchProduct = async (request, response) => {
  try {
    let { search, page = 1, limit = 10, filters = {}, sort = "newest" } = request.body;

    page = Math.max(Number(page) || 1, 1);
    limit = Math.min(Math.max(Number(limit) || 10, 1), 100);

    const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
    const resolvedFilters = {
      ...filters,
      brandIds: resolvedBrandIds,
      categoryIds: castToObjectIdArray(filters.categoryIds),
      subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
      ids: castToObjectIdArray(filters.ids)
    };

    const query = buildProductQuery({ search, filters: resolvedFilters });
    const sortOptions = buildSortOptions(sort);
    const skip = (page - 1) * limit;

    const [data, dataCount] = await Promise.all([
      ProductModel.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate("category subCategory brand")
        .lean(),
      ProductModel.countDocuments(query)
    ]);

    setCacheHeaders(response, PRODUCT_DEFAULT_CACHE);

    return response.json({
      message: "Product data",
      error: false,
      success: true,
      data,
      totalCount: dataCount,
      totalPage: Math.ceil(dataCount / limit),
      page,
      limit
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getProductsByIds = async (request, response) => {
  try {
    const { ids } = request.body;

    if (!Array.isArray(ids) || !ids.length) {
      return response.status(400).json({
        message: "An array of product IDs is required.",
        error: true,
        success: false
      });
    }

    const objectIds = castToObjectIdArray(ids);

    const products = await ProductModel.find({
      _id: { $in: objectIds }
    })
      .populate("category subCategory brand")
      .lean();

    setCacheHeaders(response, PRODUCT_DETAILS_CACHE);

    return response.json({
      message: "Products fetched successfully by IDs",
      data: products,
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

export const getProductsByCategorySubcategorySlug = async (request, response) => {
  try {
    const {
      categorySlug,
      subCategorySlug,
      page = 1,
      limit = 10,
      sort = "newest"
    } = request.body;

    if (!categorySlug || !subCategorySlug) {
      return response.status(400).json({
        message: "Provide categorySlug and subCategorySlug",
        error: true,
        success: false
      });
    }

    const categories = await CategoryModel.find();
    const category = categories.find((cat) => slugify(cat.name) === categorySlug);

    if (!category) {
      return response.status(404).json({
        message: "Category not found",
        error: true,
        success: false
      });
    }

    const subCategories = await SubCategoryModel.find().populate("category");
    const subCategory = subCategories.find(
      (sub) =>
        slugify(sub.name) === subCategorySlug &&
        sub.category.some((cat) => cat._id.toString() === category._id.toString())
    );

    if (!subCategory) {
      return response.status(404).json({
        message: "Subcategory not found",
        error: true,
        success: false
      });
    }

    const query = {
      category: { $in: [category._id] },
      subCategory: { $in: [subCategory._id] }
    };

    const safePage = Math.max(Number(page) || 1, 1);
    const safeLimit = Math.max(Number(limit) || 10, 1);
    const skip = (safePage - 1) * safeLimit;

    const [products, totalCount] = await Promise.all([
      ProductModel.find(query)
        .sort(buildSortOptions(sort))
        .skip(skip)
        .limit(safeLimit)
        .populate("category subCategory brand")
        .lean(),
      ProductModel.countDocuments(query)
    ]);

    setCacheHeaders(response, PRODUCT_DEFAULT_CACHE);

    return response.json({
      message: "Products fetched successfully",
      data: {
        products,
        totalCount,
        categoryData: category,
        subCategoryData: subCategory
      },
      page: safePage,
      limit: safeLimit,
      success: true,
      error: false
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getProductBySlug = async (request, response) => {
  try {
    const { categorySlug, subCategorySlug, productSlug } = request.body;

    if (!categorySlug || !subCategorySlug || !productSlug) {
      return response.status(400).json({
        message: "Provide categorySlug, subCategorySlug, and productSlug",
        error: true,
        success: false
      });
    }

    const products = await ProductModel.find()
      .populate("category subCategory brand")
      .lean();

    const product = products.find((prod) => {
      const prodSlug = slugify(prod.name);
      const categoryObj = prod.category?.[0];
      const subCategoryObj = prod.subCategory?.[0];
      const catSlug = categoryObj ? slugify(categoryObj.name) : "";
      const subCatSlug = subCategoryObj ? slugify(subCategoryObj.name) : "";

      return (
        prodSlug === productSlug && catSlug === categorySlug && subCatSlug === subCategorySlug
      );
    });

    if (!product) {
      return response.status(404).json({
        message: "Product not found",
        error: true,
        success: false
      });
    }

    setCacheHeaders(response, PRODUCT_DETAILS_CACHE);

    return response.json({
      message: "Product details",
      data: product,
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

export const getProductFilterMetaController = async (request, response) => {
  try {
    const { filters = {}, search = "" } = request.body;

    const resolvedBrandIds = await resolveBrandIdsFromFilters(filters);
    const resolvedFilters = {
      ...filters,
      brandIds: resolvedBrandIds,
      categoryIds: castToObjectIdArray(filters.categoryIds),
      subCategoryIds: castToObjectIdArray(filters.subCategoryIds),
      ids: castToObjectIdArray(filters.ids)
    };

    const query = buildProductQuery({ search, filters: resolvedFilters });

    const pipeline = [
      { $match: query },
      {
        $facet: {
          priceRange: [
            {
              $group: {
                _id: null,
                min: { $min: "$price" },
                max: { $max: "$price" }
              }
            }
          ],
          brands: [
            {
              $group: {
                _id: "$brand",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],
          categories: [
            { $unwind: { path: "$category", preserveNullAndEmptyArrays: false } },
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],
          subCategories: [
            { $unwind: { path: "$subCategory", preserveNullAndEmptyArrays: false } },
            {
              $group: {
                _id: "$subCategory",
                count: { $sum: 1 }
              }
            },
            { $sort: { count: -1 } }
          ],
          stockStatus: [
            {
              $group: {
                _id: {
                  $cond: [{ $gt: ["$stock", 0] }, "inStock", "outOfStock"]
                },
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ];

    const [result] = await ProductModel.aggregate(pipeline);

    const brandIds = (result?.brands || []).map((item) => item._id).filter(Boolean);
    const categoryIds = (result?.categories || []).map((item) => item._id);
    const subCategoryIds = (result?.subCategories || []).map((item) => item._id);

    const [brandDocs, categoryDocs, subCategoryDocs] = await Promise.all([
      brandIds.length
        ? BrandModel.find({ _id: { $in: brandIds } })
            .select("name slug logo isActive")
            .lean()
        : [],
      categoryIds.length
        ? CategoryModel.find({ _id: { $in: categoryIds } })
            .select("name image")
            .lean()
        : [],
      subCategoryIds.length
        ? SubCategoryModel.find({ _id: { $in: subCategoryIds } })
            .select("name image")
            .lean()
        : []
    ]);

    const brandMap = new Map(brandDocs.map((doc) => [doc._id.toString(), doc]));
    const categoryMap = new Map(categoryDocs.map((doc) => [doc._id.toString(), doc]));
    const subCategoryMap = new Map(subCategoryDocs.map((doc) => [doc._id.toString(), doc]));

    const priceRange = result?.priceRange?.[0] || { min: null, max: null };

    const stockStatus = (result?.stockStatus || []).reduce(
      (acc, curr) => {
        if (curr?._id === "inStock") {
          acc.inStock = curr.count;
        }
        if (curr?._id === "outOfStock") {
          acc.outOfStock = curr.count;
        }
        return acc;
      },
      { inStock: 0, outOfStock: 0 }
    );

    setCacheHeaders(response, PRODUCT_FILTER_CACHE);

    return response.json({
      message: "Product filter metadata",
      success: true,
      error: false,
      data: {
        priceRange,
        stockStatus,
        brands: (result?.brands || [])
          .map((item) => {
            if (!item._id) return null;
            const brandDoc = brandMap.get(item._id.toString());
            if (!brandDoc) return null;
            return {
              _id: item._id,
              count: item.count,
              name: brandDoc.name,
              slug: brandDoc.slug,
              logo: brandDoc.logo,
              isActive: brandDoc.isActive
            };
          })
          .filter(Boolean),
        categories: (result?.categories || [])
          .map((item) => {
            const doc = categoryMap.get(item._id.toString());
            if (!doc) return null;
            return {
              _id: item._id,
              count: item.count,
              name: doc.name,
              image: doc.image,
              slug: slugify(doc.name)
            };
          })
          .filter(Boolean),
        subCategories: (result?.subCategories || [])
          .map((item) => {
            const doc = subCategoryMap.get(item._id.toString());
            if (!doc) return null;
            return {
              _id: item._id,
              count: item.count,
              name: doc.name,
              image: doc.image,
              slug: slugify(doc.name)
            };
          })
          .filter(Boolean)
      }
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};