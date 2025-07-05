// import React, { useState } from 'react'
// import { useGlobalContext } from '../provider/GlobalProvider'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import AddAddress from '../components/AddAddress'
// import { useSelector } from 'react-redux'
// import AxiosToastError from '../utils/AxiosToastError'
// import Axios from '../utils/Axios'
// import SummaryApi from '../common/SummaryApi'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'
// import { loadStripe } from '@stripe/stripe-js'

// const CheckoutPage = () => {
//   const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem,fetchOrder } = useGlobalContext()
//   const [openAddress, setOpenAddress] = useState(false)
//   const addressList = useSelector(state => state.addresses.addressList)
//   const [selectAddress, setSelectAddress] = useState(0)
//   const cartItemsList = useSelector(state => state.cartItem.cart)
//   const navigate = useNavigate()

//   const handleCashOnDelivery = async() => {
//       try {
//           const response = await Axios({
//             ...SummaryApi.CashOnDeliveryOrder,
//             data : {
//               list_items : cartItemsList,
//               addressId : addressList[selectAddress]?._id,
//               subTotalAmt : totalPrice,
//               totalAmt :  totalPrice,
//               email : addressList[selectAddress]?.email,
//               phone : addressList[selectAddress]?.mobile,
//             }
//           })

//           const { data : responseData } = response

//           if(responseData.success){
//               toast.success(responseData.message)
//               if(fetchCartItem){
//                 fetchCartItem()
//               }
//               if(fetchOrder){
//                 fetchOrder()
//               }
//               navigate('/success',{
//                 state : {
//                   text : "Order"
//                 }
//               })
//           }

//       } catch (error) {
//         AxiosToastError(error)
//       }
//   }

//   const handleOnlinePayment = async()=>{
//     try {
//         toast.loading("Loading...")
//         const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
//         const stripePromise = await loadStripe(stripePublicKey)
       
//         const response = await Axios({
//             ...SummaryApi.payment_url,
//             data : {
//               list_items : cartItemsList,
//               addressId : addressList[selectAddress]?._id,
//               subTotalAmt : totalPrice,
//               totalAmt :  totalPrice,
//             }
//         })

//         const { data : responseData } = response

//         stripePromise.redirectToCheckout({ sessionId : responseData.id })
        
//         if(fetchCartItem){
//           fetchCartItem()
//         }
//         if(fetchOrder){
//           fetchOrder()
//         }
//     } catch (error) {
//         AxiosToastError(error)
//     }
//   }
//   return (
//     <section className='bg-blue-50'>
//       <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
//         <div className='w-full'>
//           {/***address***/}
//           <h3 className='text-lg font-semibold'>Choose your address</h3>
//           <div className='bg-white p-2 grid gap-4'>
//             {
//               addressList.map((address, index) => {
//                 return (
//                   <label htmlFor={"address" + index} className={!address.status && "hidden"}>
//                     <div className='border rounded p-3 flex gap-3 hover:bg-blue-50'>
//                       <div>
//                         <input id={"address" + index} type='radio' value={index} onChange={(e) => setSelectAddress(e.target.value)} name='address' />
//                       </div>
//                       <div>
//                         <p>{address.address_line}</p>
//                         <p>{address.city}</p>
//                         <p>{address.state}</p>
//                         <p>{address.country} - {address.pincode}</p>
//                         <p>{address.mobile}</p>
//                       </div>
//                     </div>
//                   </label>
//                 )
//               })
//             }
//             <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer'>
//               Click to add your address 
//             </div>
//           </div>



//         </div>

//         <div className='w-full max-w-md bg-white py-4 px-2'>
//           {/**summary**/}
//           <h3 className='text-lg font-semibold'>Summary</h3>
//           <div className='bg-white p-4'>
//             <h3 className='font-semibold'>Bill details</h3>
//             <div className='flex gap-4 justify-between ml-1'>
//               <p>Items total</p>
//               <p className='flex items-center gap-2'><span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span><span>{DisplayPriceInRupees(totalPrice)}</span></p>
//             </div>
//             <div className='flex gap-4 justify-between ml-1'>
//               <p>Quntity total</p>
//               <p className='flex items-center gap-2'>{totalQty} item</p>
//             </div>
//             <div className='flex gap-4 justify-between ml-1'>
//               <p>Delivery Charge</p>
//               <p className='flex items-center gap-2'>Free</p>
//             </div>
//             <div className='font-semibold flex items-center justify-between gap-4'>
//               <p >Grand total</p>
//               <p>{DisplayPriceInRupees(totalPrice)}</p>
//             </div>
//           </div>
//           <div className='w-full flex flex-col gap-4'>
//             <button className='py-2 px-4 bg-pink-400 hover:bg-yellow-400 rounded text-white font-semibold' onClick={handleOnlinePayment}>Online Payment</button>

//             <button className='py-2 px-4 border-2 border-pink-400 font-semibold text-black-600 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white' onClick={handleCashOnDelivery}>Cash on Delivery</button>
//           </div>
//         </div>
//       </div>


//       {
//         openAddress && (
//           <AddAddress close={() => setOpenAddress(false)} />
//         )
//       }
//     </section>
//   )
// }

// export default CheckoutPage


import React, { useState } from 'react'
import { useGlobalContext } from '../provider/GlobalProvider'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder } = useGlobalContext()
  const [openAddress, setOpenAddress] = useState(false)
  const addressList = useSelector(state => state.addresses.addressList)
  const [selectAddress, setSelectAddress] = useState(0)
  const cartItemsList = useSelector(state => state.cartItem.cart)
  const navigate = useNavigate()

  // Loading state for both buttons
  const [loadingBtn, setLoadingBtn] = useState({ cod: false, online: false })

  // Helper to get selected address email/phone
  const selectedAddress = addressList[selectAddress] || {}

  // --- New: Notify if no address on order attempt ---
  const requireAddress = () => {
    if (!addressList.length) {
      toast.error("Please add an address before proceeding with your order.")
      setOpenAddress(true)
      return false
    }
    if (!selectedAddress?._id) {
      toast.error("Select your address before placing your order.")
      return false
    }
    return true
  }

  const handleCashOnDelivery = async () => {
    if (!requireAddress()) return
    try {
      setLoadingBtn(prev => ({ ...prev, cod: true }))
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          quantity: totalQty,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
          email: selectedAddress?.email,
          phone: selectedAddress?.mobile,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        if (fetchCartItem) fetchCartItem()
        if (fetchOrder) fetchOrder()
        navigate('/success', { state: { text: "Order" } })
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoadingBtn(prev => ({ ...prev, cod: false }))
    }
  }

  const handleOnlinePayment = async () => {
    if (!requireAddress()) return
    try {
      setLoadingBtn(prev => ({ ...prev, online: true }))
      toast.loading("Loading...")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
      const stripePromise = await loadStripe(stripePublicKey)

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
          email: selectedAddress?.email,
          phone: selectedAddress?.mobile
        }
      })

      const { data: responseData } = response

      stripePromise.redirectToCheckout({ sessionId: responseData.id })

      if (fetchCartItem) fetchCartItem()
      if (fetchOrder) fetchOrder()
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoadingBtn(prev => ({ ...prev, online: false }))
    }
  }

  return (
    <section className='bg-blue-50 min-h-screen'>
      <div className='container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between'>
        <div className='w-full'>
          {/* --- Notification if no address exists --- */}
          {!addressList.length && (
            <div className="mb-3 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold flex items-center rounded">
              <svg className="w-6 h-6 mr-2 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"/>
              </svg>
              Please add an address to continue with your order.
            </div>
          )}
          {/* address */}
          <h3 className='text-lg font-semibold'>Choose your address</h3>
          <div className='bg-white p-2 grid gap-4'>
            {
              addressList.map((address, index) => (
                <label key={address._id || index} htmlFor={"address" + index} className={!address.status && "hidden"}>
                  <div className={`border rounded p-3 flex gap-3 hover:bg-blue-50 ${selectAddress === index ? 'ring-2 ring-pink-400' : ''}`}>
                    <div>
                      <input
                        id={"address" + index}
                        type='radio'
                        value={index}
                        checked={selectAddress === index}
                        onChange={e => setSelectAddress(Number(e.target.value))}
                        name='address'
                        disabled={loadingBtn.cod || loadingBtn.online}
                      />
                    </div>
                    <div>
                      <p className="font-bold">{address.name}</p>
                      <p>{address.customer_email}</p>
                      <p>{address.address_line}</p>
                      <p>{address.city}</p>
                      <p>{address.state}</p>
                      <p>{address.country} - {address.pincode}</p>
                      <p>{address.mobile}</p>
                    </div>
                  </div>
                </label>
              ))
            }
            {/* --- Attention-grabbing Add Address box --- */}
            <div
              onClick={() => setOpenAddress(true)}
              className={`h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer rounded transition duration-300
                ${!addressList.length ? 'animate-pulse border-yellow-500 bg-yellow-50' : 'hover:border-pink-400'}
              `}
              tabIndex={0}
              role="button"
              aria-label="Click to add address"
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpenAddress(true) }}
            >
              <svg className="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
              </svg>
              <span className="font-bold text-pink-600 text-base">
                {addressList.length === 0 ? "You must add an address before ordering. Click here!" : "Click to add your address"}
              </span>
            </div>
          </div>
        </div>

        <div className='w-full max-w-md bg-white py-4 px-2'>
          {/* summary */}
          <h3 className='text-lg font-semibold'>Summary</h3>
          <div className='bg-white p-4'>
            <h3 className='font-semibold'>Bill details</h3>
            <div className='flex gap-4 justify-between ml-1'>
              <p>Items total</p>
              <p className='flex items-center gap-2'>
                <span className='line-through text-neutral-400'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                <span>{DisplayPriceInRupees(totalPrice)}</span>
              </p>
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
          <div className='w-full flex flex-col gap-4'>

            {/* --- Disable order buttons if no address --- */}
            <button
              className={`py-2 px-4 bg-pink-400 hover:bg-yellow-400 rounded text-white font-semibold flex items-center justify-center disabled:opacity-60
                ${(!addressList.length || !selectedAddress?._id) ? 'cursor-not-allowed' : ''}
              `}
              onClick={handleOnlinePayment}
              disabled={loadingBtn.online || loadingBtn.cod || !addressList.length || !selectedAddress?._id}
            >
              {loadingBtn.online
                ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
                : "Online Payment"}
            </button>
            <button
              className={`py-2 px-4 border-2 border-pink-400 font-semibold text-black-600 hover:bg-yellow-400 hover:border-yellow-400 hover:text-white flex items-center justify-center disabled:opacity-60
                ${(!addressList.length || !selectedAddress?._id) ? 'cursor-not-allowed' : ''}
              `}
              onClick={handleCashOnDelivery}
              disabled={loadingBtn.cod || loadingBtn.online || !addressList.length || !selectedAddress?._id}
            >
              {loadingBtn.cod
                ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
                : "Cash on Delivery"}
            </button>
          </div>
        </div>
      </div>
      {openAddress && (
        <AddAddress close={() => setOpenAddress(false)} />
      )}

      {/* Loader Style */}
      <style>{`
        .loader {
          border: 2px solid #f3f3f3;
          border-top: 2px solid #e11d48;
          border-radius: 50%;
          width: 1em;
          height: 1em;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
      `}</style>
    </section>
  )
}

export default CheckoutPage