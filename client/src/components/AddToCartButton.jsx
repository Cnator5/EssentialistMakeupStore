// import React, { useEffect, useState } from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import AxiosToastError from '../utils/AxiosToastError'
// import Loading from './Loading'
// import { useSelector } from 'react-redux'
// import { FaMinus, FaPlus } from "react-icons/fa6";
// import { useNavigate } from 'react-router-dom'

// const AddToCartButton = ({ data }) => {
//     const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
//     const [loading, setLoading] = useState(false)
//     const cartItem = useSelector(state => state.cartItem.cart)
//     const user = useSelector(state => state.user)
//     const [isAvailableCart, setIsAvailableCart] = useState(false)
//     const [qty, setQty] = useState(0)
//     const [cartItemDetails, setCartItemsDetails] = useState()
//     const navigate = useNavigate()

//     const handleADDTocart = async (e) => {
//         e.preventDefault()
//         e.stopPropagation()

//         // Check if user is logged in
//         if (!user || !user._id) {
//             toast.error("Please login to add items to cart")
//             navigate("/login")
//             return
//         }

//         try {
//             setLoading(true)

//             const response = await Axios({
//                 ...SummaryApi.addTocart,
//                 data: {
//                     productId: data?._id
//                 }
//             })

//             const { data: responseData } = response

//             if (responseData.success) {
//                 toast.success(responseData.message)
//                 if (fetchCartItem) {
//                     fetchCartItem()
//                 }
//             }
//         } catch (error) {
//             AxiosToastError(error)
//         } finally {
//             setLoading(false)
//         }
//     }

//     //checking this item in cart or not
//     useEffect(() => {
//         const checkingitem = cartItem.some(item => item.productId._id === data._id)
//         setIsAvailableCart(checkingitem)

//         const product = cartItem.find(item => item.productId._id === data._id)
//         setQty(product?.quantity)
//         setCartItemsDetails(product)
//     }, [data, cartItem])


//     const increaseQty = async(e) => {
//         e.preventDefault()
//         e.stopPropagation()
        
//         // Check if user is logged in
//         if (!user || !user._id) {
//             toast.error("Please login to add items to cart")
//             navigate("/login")
//             return
//         }
    
//         const response = await updateCartItem(cartItemDetails?._id, qty+1)
        
//         if(response.success){
//             toast.success("Item added")
//         }
//     }

//     const decreaseQty = async(e) => {
//         e.preventDefault()
//         e.stopPropagation()
        
//         // Check if user is logged in
//         if (!user || !user._id) {
//             toast.error("Please login to manage your cart")
//             navigate("/login")
//             return
//         }
        
//         if(qty === 1){
//             deleteCartItem(cartItemDetails?._id)
//         }else{
//             const response = await updateCartItem(cartItemDetails?._id,qty-1)

//             if(response.success){
//                 toast.success("Item remove")
//             }
//         }
//     }
    
//     return (
//         <div className='w-full max-w-[150px]'>
//             {
//                 isAvailableCart ? (
//                     <div className='flex w-full h-full'>
//                         <button onClick={decreaseQty} className='bg-pink-400 hover:bg-yellow-400 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

//                         <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

//                         <button onClick={increaseQty} className='bg-pink-400 hover:bg-yellow-400 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
//                     </div>
//                 ) : (
//                     <button onClick={handleADDTocart} className='bg-pink-400 hover:bg-yellow-400 text-white px-2 lg:px-4 py-1 rounded'>
//                         {loading ? <Loading /> : "Add"}
//                     </button>
//                 )
//             }
//         </div>
//     )
// }

// export default AddToCartButton

import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

const AddToCartButton = ({ data }) => {
    const { fetchCartItem, updateCartItem, deleteCartItem } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const [isAvailableCart, setIsAvailableCart] = useState(false)
    const [qty, setQty] = useState(0)
    const [cartItemDetails, setCartItemsDetails] = useState()
    const navigate = useNavigate()

    // -------------- Guest Cart Helpers --------------
    const GUEST_CART_KEY = "guest_cart"

    // Adds to guest cart in localStorage
    const addToGuestCart = (product) => {
        let guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []
        const exist = guestCart.find(item => item._id === product._id)
        if (exist) {
            guestCart = guestCart.map(item =>
                item._id === product._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        } else {
            guestCart.push({ ...product, quantity: 1 })
        }
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestCart))
        return guestCart
    }

    // Update qty in guest cart
    const updateGuestCartQty = (productId, quantity) => {
        let guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []
        guestCart = guestCart.map(item =>
            item._id === productId
                ? { ...item, quantity }
                : item
        )
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestCart))
        return guestCart
    }

    // Remove from guest cart
    const removeFromGuestCart = (productId) => {
        let guestCart = JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []
        guestCart = guestCart.filter(item => item._id !== productId)
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(guestCart))
        return guestCart
    }

    // Get guest cart
    const getGuestCart = () => {
        return JSON.parse(localStorage.getItem(GUEST_CART_KEY)) || []
    }
    // ------------------------------------------------

    // Modified handleADDTocart to allow guest users
    const handleADDTocart = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        // If logged in, use backend
        if (user && user._id) {
            try {
                setLoading(true)
                const response = await Axios({
                    ...SummaryApi.addTocart,
                    data: {
                        productId: data?._id
                    }
                })
                const { data: responseData } = response
                if (responseData.success) {
                    toast.success(responseData.message)
                    if (fetchCartItem) fetchCartItem()
                }
            } catch (error) {
                AxiosToastError(error)
            } finally {
                setLoading(false)
            }
        } else { // Guest user: use localStorage
            addToGuestCart(data)
            toast.success("Added to cart")
            // trigger re-render
            setQty(1)
            setIsAvailableCart(true)
        }
    }

    //checking this item in cart or not
    useEffect(() => {
        let checkingitem = false
        let product
        if (user && user._id) {
            checkingitem = cartItem.some(item => item.productId._id === data._id)
            product = cartItem.find(item => item.productId._id === data._id)
            setQty(product?.quantity)
            setCartItemsDetails(product)
        } else {
            const guestCart = getGuestCart()
            checkingitem = guestCart.some(item => item._id === data._id)
            product = guestCart.find(item => item._id === data._id)
            setQty(product?.quantity || 0)
            setCartItemsDetails(product)
        }
        setIsAvailableCart(checkingitem)
    }, [data, cartItem, user])

    // Modified increaseQty to allow guest users
    const increaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (user && user._id) {
            const response = await updateCartItem(cartItemDetails?._id, qty + 1)
            if (response.success) toast.success("Item added")
        } else {
            updateGuestCartQty(data._id, qty + 1)
            setQty(qty + 1)
            toast.success("Item added")
        }
    }

    // Modified decreaseQty to allow guest users
    const decreaseQty = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (user && user._id) {
            if (qty === 1) {
                deleteCartItem(cartItemDetails?._id)
            } else {
                const response = await updateCartItem(cartItemDetails?._id, qty - 1)
                if (response.success) toast.success("Item removed")
            }
        } else {
            if (qty === 1) {
                removeFromGuestCart(data._id)
                setQty(0)
                setIsAvailableCart(false)
            } else {
                updateGuestCartQty(data._id, qty - 1)
                setQty(qty - 1)
                toast.success("Item removed")
            }
        }
    }

    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvailableCart ? (
                    <div className='flex w-full h-full'>
                        <button onClick={decreaseQty} className='bg-pink-400 hover:bg-yellow-400 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaMinus /></button>

                        <p className='flex-1 w-full font-semibold px-1 flex items-center justify-center'>{qty}</p>

                        <button onClick={increaseQty} className='bg-pink-400 hover:bg-yellow-400 text-white flex-1 w-full p-1 rounded flex items-center justify-center'><FaPlus /></button>
                    </div>
                ) : (
                    <button onClick={handleADDTocart} className='bg-pink-400 hover:bg-yellow-400 text-white px-2 lg:px-4 py-1 rounded'>
                        {loading ? <Loading /> : "Add"}
                    </button>
                )
            }
        </div>
    )
}

export default AddToCartButton