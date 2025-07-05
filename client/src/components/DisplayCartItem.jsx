// import React from 'react'
// import { IoClose } from 'react-icons/io5'
// import { Link, useNavigate } from 'react-router-dom'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { FaCaretRight } from "react-icons/fa";
// import { useSelector } from 'react-redux'
// import AddToCartButton from './AddToCartButton'
// import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import imageEmpty from '../assets/empty_cart.avif'
// import toast from 'react-hot-toast'

// const DisplayCartItem = ({close}) => {
//     const { notDiscountTotalPrice, totalPrice ,totalQty} = useGlobalContext()
//     const cartItem  = useSelector(state => state.cartItem.cart)
//     const user = useSelector(state => state.user)
//     const navigate = useNavigate()

//     const redirectToCheckoutPage = ()=>{
//         if(user?._id){
//             navigate("/checkout")
//             if(close){
//                 close()
//             }
//             return
//         }
//         toast("Please Login")
//     }
//   return (
//     <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
//         <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto'>
//             <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
//                 <h2 className='font-semibold'>Cart</h2>
//                 <Link to={"/"} className='lg:hidden'>
//                     <IoClose size={25}/>
//                 </Link>
//                 <button onClick={close} className='hidden lg:block'>
//                     <IoClose size={25}/>
//                 </button>
//             </div>

//             <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
//                 {/***display items */}
//                 {
//                     cartItem[0] ? (
//                         <>
//                             <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
//                                     <p>Your total savings</p>
//                                     <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice )}</p>
//                             </div>
//                             <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
//                                     {
//                                         cartItem[0] && (
//                                             cartItem.map((item,index)=>{
//                                                 return(
//                                                     <div key={item?._id+"cartItemDisplay"} className='flex  w-full gap-4'>
//                                                         <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
//                                                             <img
//                                                                 src={item?.productId?.image[0]}
//                                                                 className='object-scale-down'
//                                                             />
//                                                         </div>
//                                                         <div className='w-full max-w-sm text-xs'>
//                                                             <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
//                                                             <p className='text-neutral-400'>{item?.productId?.unit}</p>
//                                                             <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price,item?.productId?.discount))}</p>
//                                                         </div>
//                                                         <div>
//                                                             <AddToCartButton data={item?.productId}/>
//                                                         </div>
//                                                     </div>
//                                                 )
//                                             })
//                                         )
//                                     }
//                             </div>
//                             <div className='bg-white p-4'>
//                                 <h3 className='font-semibold'>Bill details</h3>
//                                 <div className='flex gap-4 justify-between ml-1'>
//                                     <p>Items total</p>
//                                     <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
//                                 </div>
//                                 <div className='flex gap-4 justify-between ml-1'>
//                                     <p>Quntity total</p>
//                                     <p className='flex items-center gap-2'>{totalQty} item</p>
//                                 </div>
//                                 <div className='flex gap-4 justify-between ml-1'>
//                                     <p>Delivery Charge</p>
//                                     <p className='flex items-center gap-2'>Free</p>
//                                 </div>
//                                 <div className='font-semibold flex items-center justify-between gap-4'>
//                                     <p >Grand total</p>
//                                     <p>{DisplayPriceInRupees(totalPrice)}</p>
//                                 </div>
//                             </div>
//                         </>
//                     ) : (
//                         <div className='bg-white flex flex-col justify-center items-center'>
//                             <img
//                                 src={imageEmpty}
//                                 className='w-full h-full object-scale-down' 
//                             />
//                             <Link onClick={close} to={"/"} className='block bg-pink-400 px-4 py-2 text-white rounded'>Shop Now</Link>
//                         </div>
//                     )
//                 }
                
//             </div>

//             {
//                 cartItem[0] && (
//                     <div className='p-2'>
//                         <div className='bg-pink-400 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
//                             <div>
//                                 {DisplayPriceInRupees(totalPrice)}
//                             </div>
//                             <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
//                                 Proceed
//                                 <span><FaCaretRight/></span>
//                             </button>
//                         </div>
//                     </div>
//                 )
//             }
            
//         </div>
//     </section>
//   )
// }

// export default DisplayCartItem


import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { FaCaretRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import imageEmpty from '../assets/empty_cart.avif'
import toast from 'react-hot-toast'
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import fetchUserDetails from '../utils/fetchUserDetails'
import { setUserDetails } from '../store/userSlice'

const DisplayCartItem = ({ close }) => {
    const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext()
    const cartItem = useSelector(state => state.cartItem.cart)
    const user = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // Login popup state
    const [showLoginPopup, setShowLoginPopup] = useState(false)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Register popup state
    const [showRegisterPopup, setShowRegisterPopup] = useState(false)
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showRegisterPassword, setShowRegisterPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isRegisterLoading, setIsRegisterLoading] = useState(false)

    const handleLoginChange = (e) => {
        const { name, value } = e.target
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleRegisterChange = (e) => {
        const { name, value } = e.target
        setRegisterData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const validLoginValues = Object.values(loginData).every(el => el)
    const validRegisterValues = Object.values(registerData).every(el => el)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await Axios({
                ...SummaryApi.login,
                data: loginData
            })

            if (response.data.error) {
                toast.error(response.data.message)
            }

            if (response.data.success) {
                toast.success(response.data.message)
                localStorage.setItem('accesstoken', response.data.data.accesstoken)
                localStorage.setItem('refreshToken', response.data.data.refreshToken)

                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))

                setLoginData({
                    email: "",
                    password: "",
                })

                setShowLoginPopup(false)
                navigate("/checkout")
                if (close) {
                    close()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        setIsRegisterLoading(true)

        if(registerData.password !== registerData.confirmPassword){
            toast.error("Password and confirm password must be same")
            setIsRegisterLoading(false)
            return
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: registerData
            })
            
            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setRegisterData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                })
                // Show login popup after successful registration
                setShowRegisterPopup(false)
                setShowLoginPopup(true)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setIsRegisterLoading(false)
        }
    }

    const redirectToCheckoutPage = () => {
        if (user?._id) {
            navigate("/checkout")
            if (close) {
                close()
            }
            return
        }

        // Show login popup
        setShowLoginPopup(true)
    }

    const switchToRegister = () => {
        setShowLoginPopup(false)
        setShowRegisterPopup(true)
    }

    const switchToLogin = () => {
        setShowRegisterPopup(false)
        setShowLoginPopup(true)
    }

    return (
        <section className='bg-neutral-900 fixed top-0 bottom-0 right-0 left-0 bg-opacity-70 z-50'>
            <div className='bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto relative'>
                <div className='flex items-center p-4 shadow-md gap-3 justify-between'>
                    <h2 className='font-semibold'>Cart</h2>
                    <Link to={"/"} className='lg:hidden'>
                        <IoClose size={25} />
                    </Link>
                    <button onClick={close} className='hidden lg:block'>
                        <IoClose size={25} />
                    </button>
                </div>

                <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
                    {/* display items */}
                    {
                        cartItem[0] ? (
                            <>
                                <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                                    <p>Your total savings</p>
                                    <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
                                </div>
                                <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                                    {
                                        cartItem[0] && (
                                            cartItem.map((item, index) => {
                                                return (
                                                    <div key={item?._id + "cartItemDisplay"} className='flex w-full gap-4'>
                                                        <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border rounded'>
                                                            <img
                                                                src={item?.productId?.image[0]}
                                                                className='object-scale-down w-full h-full'
                                                                alt={item?.productId?.name || "Product"}
                                                            />
                                                        </div>
                                                        <div className='w-full max-w-sm text-xs'>
                                                            <p className='text-xs text-ellipsis line-clamp-2'>{item?.productId?.name}</p>
                                                            <p className='text-neutral-400'>{item?.productId?.unit}</p>
                                                            <p className='font-semibold'>{DisplayPriceInRupees(pricewithDiscount(item?.productId?.price, item?.productId?.discount))}</p>
                                                        </div>
                                                        <div>
                                                            <AddToCartButton data={item?.productId} />
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                </div>
                                <div className='bg-white p-4'>
                                    <h3 className='font-semibold'>Bill details</h3>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Items total</p>
                                        <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Quantity total</p>
                                        <p className='flex items-center gap-2'>{totalQty} item</p>
                                    </div>
                                    <div className='flex gap-4 justify-between ml-1'>
                                        <p>Delivery Charge</p>
                                        <p className='flex items-center gap-2'>Free</p>
                                    </div>
                                    <div className='font-semibold flex items-center justify-between gap-4'>
                                        <p>Grand total</p>
                                        <p>{DisplayPriceInRupees(totalPrice)}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='bg-white flex flex-col justify-center items-center'>
                                <img
                                    src={imageEmpty}
                                    className='w-full h-full object-scale-down'
                                    alt="Empty cart"
                                />
                                <Link onClick={close} to={"/"} className='block bg-pink-400 px-4 py-2 text-white rounded mt-4'>Shop Now</Link>
                            </div>
                        )
                    }
                </div>

                {
                    cartItem[0] && (
                        <div className='p-2'>
                            <div className='bg-pink-400 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                                <div>
                                    {DisplayPriceInRupees(totalPrice)}
                                </div>
                                <button onClick={redirectToCheckoutPage} className='flex items-center gap-1'>
                                    Proceed
                                    <span><FaCaretRight /></span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center backdrop-blur-sm"
                    style={{ minHeight: "100vh" }}
                >
                    <div
                        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 flex flex-col overflow-auto"
                        style={{
                            maxHeight: "95vh",
                        }}
                        tabIndex={-1}
                    >
                        <button
                            onClick={() => setShowLoginPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close login popup"
                        >
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">Login to Continue</h2>
                        <form className="grid gap-4" onSubmit={handleLoginSubmit} autoComplete="on">
                            <div className="grid gap-1">
                                <label htmlFor="popup-email" className="font-medium">
                                    Email:
                                </label>
                                <input
                                    autoFocus
                                    type="email"
                                    id="popup-email"
                                    className="bg-blue-50 p-2 border rounded outline-none focus:border-pink-400"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="popup-password" className="font-medium">
                                    Password:
                                </label>
                                <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-pink-400">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="popup-password"
                                        className="w-full outline-none bg-blue-50"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="cursor-pointer text-gray-500 ml-2"
                                        tabIndex={0}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        role="button"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") setShowPassword((prev) => !prev);
                                        }}
                                    >
                                        {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                </div>
                                <Link
                                    to={"/forgot-password"}
                                    onClick={() => setShowLoginPopup(false)}
                                    className="block ml-auto hover:text-pink-400 text-sm transition"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                disabled={!validLoginValues || isLoading}
                                className={`
                                    ${validLoginValues && !isLoading ? "bg-pink-400 hover:bg-yellow-400" : "bg-gray-400 cursor-not-allowed"}
                                    text-white py-2 rounded font-bold my-3 tracking-wide transition
                                `}
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>

                        <p className='text-center mt-4'>
                            {"Don't have an account?"}
                            <button
                                onClick={switchToRegister}
                                className='font-bold text-pink-400 hover:text-yellow-400 ml-1'
                            >
                                Register
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {/* Register Popup */}
            {showRegisterPopup && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex items-center justify-center backdrop-blur-sm"
                    style={{ minHeight: "100vh" }}
                >
                    <div
                        className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 flex flex-col overflow-auto"
                        style={{
                            maxHeight: "95vh",
                        }}
                        tabIndex={-1}
                    >
                        <button
                            onClick={() => setShowRegisterPopup(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close register popup"
                        >
                            <IoClose size={24} />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
                        <form className="grid gap-4" onSubmit={handleRegisterSubmit} autoComplete="on">
                            <div className="grid gap-1">
                                <label htmlFor="popup-name" className="font-medium">
                                    Name:
                                </label>
                                <input
                                    autoFocus
                                    type="text"
                                    id="popup-name"
                                    className="bg-blue-50 p-2 border rounded outline-none focus:border-pink-400"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="popup-register-email" className="font-medium">
                                    Email:
                                </label>
                                <input
                                    type="email"
                                    id="popup-register-email"
                                    className="bg-blue-50 p-2 border rounded outline-none focus:border-pink-400"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="popup-register-password" className="font-medium">
                                    Password:
                                </label>
                                <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-pink-400">
                                    <input
                                        type={showRegisterPassword ? "text" : "password"}
                                        id="popup-register-password"
                                        className="w-full outline-none bg-blue-50"
                                        name="password"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div
                                        onClick={() => setShowRegisterPassword((prev) => !prev)}
                                        className="cursor-pointer text-gray-500 ml-2"
                                        tabIndex={0}
                                        aria-label={showRegisterPassword ? "Hide password" : "Show password"}
                                        role="button"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") setShowRegisterPassword((prev) => !prev);
                                        }}
                                    >
                                        {showRegisterPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <label htmlFor="popup-confirm-password" className="font-medium">
                                    Confirm Password:
                                </label>
                                <div className="bg-blue-50 p-2 border rounded flex items-center focus-within:border-pink-400">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="popup-confirm-password"
                                        className="w-full outline-none bg-blue-50"
                                        name="confirmPassword"
                                        value={registerData.confirmPassword}
                                        onChange={handleRegisterChange}
                                        placeholder="Confirm your password"
                                        required
                                    />
                                    <div
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="cursor-pointer text-gray-500 ml-2"
                                        tabIndex={0}
                                        aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                                        role="button"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") setShowConfirmPassword((prev) => !prev);
                                        }}
                                    >
                                        {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={!validRegisterValues || isRegisterLoading}
                                className={`
                                    ${validRegisterValues && !isRegisterLoading ? "bg-pink-400 hover:bg-yellow-400" : "bg-gray-400 cursor-not-allowed"}
                                    text-white py-2 rounded font-bold my-3 tracking-wide transition
                                `}
                            >
                                {isRegisterLoading ? 'Registering...' : 'Register'}
                            </button>
                        </form>

                        <p className='text-center mt-4'>
                            {"Already have an account?"}
                            <button
                                onClick={switchToLogin}
                                className='font-bold text-pink-400 hover:text-yellow-400 ml-1'
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default DisplayCartItem