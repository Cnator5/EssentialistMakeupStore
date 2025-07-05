import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

// export const addToCartItemController = async(request,response)=>{
//     try {
//         const  userId = request.userId
//         const { productId } = request.body
        
//         if(!productId){
//             return response.status(402).json({
//                 message : "Provide productId",
//                 error : true,
//                 success : false
//             })
//         }

//         const checkItemCart = await CartProductModel.findOne({
//             userId : userId,
//             productId : productId
//         })

//         if(checkItemCart){
//             return response.status(400).json({
//                 message : "Item already in cart"
//             })
//         }

//         const cartItem = new CartProductModel({
//             quantity : 1,
//             userId : userId,
//             productId : productId
//         })
//         const save = await cartItem.save()

//         const updateCartUser = await UserModel.updateOne({ _id : userId},{
//             $push : { 
//                 shopping_cart : productId
//             }
//         })

//         return response.json({
//             data : save,
//             message : "Item add successfully",
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

export const addToCartItemController = async(request,response)=>{
    try {
        const userId = request.userId // Will be null for guest users
        const { productId, guestCartId } = request.body
        
        if(!productId){
            return response.status(402).json({
                message : "Provide productId",
                error : true,
                success : false
            })
        }

        // For guest users, just return success - actual cart handling is done client-side
        if(!userId) {
            return response.json({
                message : "Item added to guest cart",
                error : false,
                success : true,
                isGuest: true
            })
        }

        // For logged in users, proceed with normal flow
        const checkItemCart = await CartProductModel.findOne({
            userId : userId,
            productId : productId
        })

        if(checkItemCart){
            return response.status(400).json({
                message : "Item already in cart"
            })
        }

        const cartItem = new CartProductModel({
            quantity : 1,
            userId : userId,
            productId : productId
        })
        const save = await cartItem.save()

        const updateCartUser = await UserModel.updateOne({ _id : userId},{
            $push : { 
                shopping_cart : productId
            }
        })

        return response.json({
            data : save,
            message : "Item add successfully",
            error : false,
            success : true
        })
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const mergeGuestCart = async(request, response) => {
    try {
        const userId = request.userId
        const { guestCart } = request.body

        if(!guestCart || !Array.isArray(guestCart)) {
            return response.status(400).json({
                message: "Invalid guest cart data",
                error: true,
                success: false
            })
        }

        // Add each guest cart item to user's cart
        for(let item of guestCart) {
            const checkItemCart = await CartProductModel.findOne({
                userId: userId,
                productId: item.productId
            })

            if(!checkItemCart) {
                const cartItem = new CartProductModel({
                    quantity: item.quantity,
                    userId: userId,
                    productId: item.productId
                })
                await cartItem.save()

                await UserModel.updateOne({ _id: userId }, {
                    $push: { 
                        shopping_cart: item.productId
                    }
                })
            }
        }

        return response.json({
            message: "Guest cart merged successfully",
            error: false,
            success: true
        })

    } catch(error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCartItemController = async(request,response)=>{
    try {
        const userId = request.userId

        const cartItem =  await CartProductModel.find({
            userId : userId
        }).populate('productId')

        return response.json({
            data : cartItem,
            error : false,
            success : true
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const updateCartItemQtyController = async(request,response)=>{
    try {
        const userId = request.userId 
        const { _id,qty } = request.body

        if(!_id ||  !qty){
            return response.status(400).json({
                message : "provide _id, qty"
            })
        }

        const updateCartitem = await CartProductModel.updateOne({
            _id : _id,
            userId : userId
        },{
            quantity : qty
        })

        return response.json({
            message : "Update cart",
            success : true,
            error : false, 
            data : updateCartitem
        })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

export const deleteCartItemQtyController = async(request,response)=>{
    try {
      const userId = request.userId // middleware
      const { _id } = request.body 
      
      if(!_id){
        return response.status(400).json({
            message : "Provide _id",
            error : true,
            success : false
        })
      }

      const deleteCartItem  = await CartProductModel.deleteOne({_id : _id, userId : userId })

      return response.json({
        message : "Item remove",
        error : false,
        success : true,
        data : deleteCartItem
      })

    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false
        })
    }
}

// import CartProductModel from "../models/cartproduct.model.js";
// import UserModel from "../models/user.model.js";

// export const addToCartItemController = async(request,response)=>{
//     try {
//         // Check if user is logged in (userId will be present from middleware)
//         const userId = request.userId;
//         const { productId } = request.body;
        
//         // Guest user handling - if userId not present, this is a guest cart request
//         const isGuestUser = !userId;
        
//         if(!productId){
//             return response.status(402).json({
//                 message : "Provide productId",
//                 error : true,
//                 success : false
//             })
//         }

//         // If logged in user, proceed with normal flow
//         if (!isGuestUser) {
//             const checkItemCart = await CartProductModel.findOne({
//                 userId : userId,
//                 productId : productId
//             })

//             if(checkItemCart){
//                 return response.status(400).json({
//                     message : "Item already in cart"
//                 })
//             }

//             const cartItem = new CartProductModel({
//                 quantity : 1,
//                 userId : userId,
//                 productId : productId
//             })
//             const save = await cartItem.save()

//             const updateCartUser = await UserModel.updateOne({ _id : userId},{
//                 $push : { 
//                     shopping_cart : productId
//                 }
//             })

//             return response.json({
//                 data : save,
//                 message : "Item add successfully",
//                 error : false,
//                 success : true
//             })
//         } else {
//             // For guest users, just return success so the front-end can manage the cart in localStorage
//             return response.json({
//                 data : {
//                     quantity: 1,
//                     productId: productId,
//                     isGuestCart: true
//                 },
//                 message : "Item add successfully to guest cart",
//                 error : false,
//                 success : true
//             })
//         }
        
//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export const getCartItemController = async(request,response)=>{
//     try {
//         const userId = request.userId;
        
//         // If guest user (no userId from middleware), return empty cart
//         // The front-end will handle displaying items from localStorage
//         if (!userId) {
//             return response.json({
//                 data : [],
//                 error : false,
//                 success : true,
//                 isGuestCart: true
//             })
//         }

//         const cartItem = await CartProductModel.find({
//             userId : userId
//         }).populate('productId')

//         return response.json({
//             data : cartItem,
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

// export const updateCartItemQtyController = async(request,response)=>{
//     try {
//         const userId = request.userId;
//         const { _id, qty } = request.body;
        
//         // Guest cart handling
//         if (!userId) {
//             return response.json({
//                 message : "Update cart",
//                 success : true,
//                 error : false, 
//                 data : { acknowledged: true, modifiedCount: 1 },
//                 isGuestCart: true
//             })
//         }

//         if(!_id ||  !qty){
//             return response.status(400).json({
//                 message : "provide _id, qty"
//             })
//         }

//         const updateCartitem = await CartProductModel.updateOne({
//             _id : _id,
//             userId : userId
//         },{
//             quantity : qty
//         })

//         return response.json({
//             message : "Update cart",
//             success : true,
//             error : false, 
//             data : updateCartitem
//         })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }

// export const deleteCartItemQtyController = async(request,response)=>{
//     try {
//       const userId = request.userId; // middleware
//       const { _id } = request.body;
      
//       // Guest cart handling
//       if (!userId) {
//           return response.json({
//               message : "Item remove",
//               error : false,
//               success : true,
//               data : { acknowledged: true, deletedCount: 1 },
//               isGuestCart: true
//           })
//       }
      
//       if(!_id){
//         return response.status(400).json({
//             message : "Provide _id",
//             error : true,
//             success : false
//         })
//       }

//       const deleteCartItem = await CartProductModel.deleteOne({_id : _id, userId : userId })

//       return response.json({
//         message : "Item remove",
//         error : false,
//         success : true,
//         data : deleteCartItem
//       })

//     } catch (error) {
//         return response.status(500).json({
//             message : error.message || error,
//             error : true,
//             success : false
//         })
//     }
// }