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


import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useSelector, useDispatch } from 'react-redux';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder, fetchAddress } = useGlobalContext();
  const addressList = useSelector(state => state.addresses.addressList);
  const [selectAddress, setSelectAddress] = useState(0);
  const cartItemsList = useSelector(state => state.cartItem.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isAddressLoaded, setIsAddressLoaded] = useState(false);
  
  // Show address form only when no addresses are available or user explicitly wants to add a new one
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  // Add mtn and orange to loadingBtn state
  const [loadingBtn, setLoadingBtn] = useState({ 
    cod: false, 
    online: false, 
    mtn: false, 
    orange: false 
  });

  // Helper to get selected address
  const selectedAddress = addressList[selectAddress] || {};

  // Fetch addresses on component mount
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        // Only fetch if fetchAddress function exists
        if (fetchAddress) {
          await fetchAddress();
        } else {
          // Direct API call if global context function not available
          const response = await Axios({
            ...SummaryApi.getAddress
          });
          if (response.data.success) {
            // Dispatch to your Redux store if needed
            dispatch({ 
              type: 'SET_ADDRESS_LIST', 
              payload: response.data.addresses 
            });
          }
        }
        setIsAddressLoaded(true);
      } catch (error) {
        console.error("Failed to load addresses:", error);
        toast.error("Failed to load your saved addresses");
      }
    };

    loadAddresses();
  }, []);

  // Update showAddressForm state based on addressList
  useEffect(() => {
    if (isAddressLoaded) {
      // Show form if no addresses are available
      setShowAddressForm(addressList.length === 0);
    }
  }, [addressList, isAddressLoaded]);

  // Set the first available address as default when addresses load
  useEffect(() => {
    if (addressList.length > 0 && isAddressLoaded) {
      const firstValidIndex = addressList.findIndex(addr => addr.status);
      if (firstValidIndex >= 0) {
        setSelectAddress(firstValidIndex);
      }
    }
  }, [addressList, isAddressLoaded]);

  // --- Notify if no address on order attempt ---
  const requireAddress = () => {
    if (!addressList.length) {
      toast.error("Please add an address before proceeding with your order.");
      setShowAddressForm(true);
      return false;
    }
    if (!selectedAddress?._id) {
      toast.error("Select your address before placing your order.");
      return false;
    }
    return true;
  };

  const handleCashOnDelivery = async () => {
    if (!requireAddress()) return;
    try {
      setLoadingBtn(prev => ({ ...prev, cod: true }));
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          quantity: totalQty,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
          email: selectedAddress?.email || selectedAddress?.customer_email,
          phone: selectedAddress?.mobile,
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) fetchCartItem();
        if (fetchOrder) fetchOrder();
        navigate('/success', { state: { text: "Order" } });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingBtn(prev => ({ ...prev, cod: false }));
    }
  };

  const handleOnlinePayment = async () => {
    if (!requireAddress()) return;
    try {
      setLoadingBtn(prev => ({ ...prev, online: true }));
      toast.loading("Loading payment gateway...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: selectedAddress?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
          email: selectedAddress?.email || selectedAddress?.customer_email,
          phone: selectedAddress?.mobile
        }
      });

      const { data: responseData } = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id });

      if (fetchCartItem) fetchCartItem();
      if (fetchOrder) fetchOrder();
    } catch (error) {
      AxiosToastError(error);
      toast.dismiss();
    } finally {
      setLoadingBtn(prev => ({ ...prev, online: false }));
    }
  };

  const handleMtnPayment = async () => {
    if (!requireAddress()) return;
    try {
      setLoadingBtn(prev => ({ ...prev, mtn: true }));
      toast.loading("Redirecting to MTN MoMo...");
      const response = await Axios.post('/payments/mtn', {
        amount: totalPrice,
        phone: selectedAddress?.mobile,
        order_id: `ORDER_${Date.now()}`,
        email: selectedAddress?.email || selectedAddress?.customer_email,
        name: selectedAddress?.name,
      });
      const { payment_url } = response.data;
      if (payment_url) window.location.href = payment_url;
      else throw new Error("Failed to initiate MTN payment");
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingBtn(prev => ({ ...prev, mtn: false }));
      toast.dismiss();
    }
  };

  const handleOrangePayment = async () => {
    if (!requireAddress()) return;
    try {
      setLoadingBtn(prev => ({ ...prev, orange: true }));
      toast.loading("Redirecting to Orange Money...");
      const response = await Axios.post('/payments/orange', {
        amount: totalPrice,
        phone: selectedAddress?.mobile,
        order_id: `ORDER_${Date.now()}`,
        email: selectedAddress?.email || selectedAddress?.customer_email,
        name: selectedAddress?.name,
      });
      const { payment_url } = response.data;
      if (payment_url) window.location.href = payment_url;
      else throw new Error("Failed to initiate Orange payment");
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoadingBtn(prev => ({ ...prev, orange: false }));
      toast.dismiss();
    }
  };

  // Address form submission handler
  const onSubmitAddress = async (data) => {
    try {
      toast.loading("Saving your address...");
      const response = await Axios({
        ...SummaryApi.createAddress,
        data: {
          name: data.name,
          customer_email: data.email,
          address_line: data.addressline,
          city: data.city,
          state: data.state,
          country: data.country,
          pincode: data.pincode,
          mobile: data.mobile
        }
      });

      const { data: responseData } = response;
      
      if (responseData.success) {
        toast.dismiss();
        toast.success(responseData.message);
        reset();
        
        // Fetch updated address list
        if (fetchAddress) {
          await fetchAddress();
        } else {
          // Direct API call if global context function not available
          const addressResponse = await Axios({
            ...SummaryApi.getAddress
          });
          if (addressResponse.data.success) {
            // Dispatch to your Redux store
            dispatch({ 
              type: 'SET_ADDRESS_LIST', 
              payload: addressResponse.data.addresses 
            });
          }
        }
        
        // Hide form after successful address addition
        setShowAddressForm(false);
      }
    } catch (error) {
      toast.dismiss();
      AxiosToastError(error);
    }
  };

  // Payment button rendering with validation
  const renderPaymentButtons = () => {
    const isDisabled = !addressList.length || !selectedAddress?._id || 
                      loadingBtn.cod || loadingBtn.online || loadingBtn.mtn || loadingBtn.orange;
    
    const buttonClass = (bgColor, hoverColor) => `
      py-2.5 px-4 ${bgColor} ${hoverColor} rounded-md text-white font-semibold 
      flex items-center justify-center transition-colors
      ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
    `;
    
    return (
      <div className='w-full flex flex-col gap-3 mt-6'>
        {/* Stripe Payment Button */}
      {/*   <button
          className={buttonClass('bg-pink-500', 'hover:bg-green-600')}
          onClick={isDisabled ? () => requireAddress() : handleOnlinePayment}
          disabled={isDisabled}
        >
          {loadingBtn.online
            ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
            : "Pay with Stripe"}
        </button> */}

        {/* MTN Mobile Money Button */}
        <button
          className={buttonClass('bg-yellow-500', 'hover:bg-green-600')}
          onClick={isDisabled ? () => requireAddress() : handleMtnPayment}
          disabled={isDisabled}
        >
          {loadingBtn.mtn
            ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
            : "Pay with MTN Mobile Money"}
        </button>

        {/* Orange Mobile Money Button */}
        <button
          className={buttonClass('bg-pink-500', 'hover:bg-green-600')}
          onClick={isDisabled ? () => requireAddress() : handleOrangePayment}
          disabled={isDisabled}
        >
          {loadingBtn.orange
            ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
            : "Pay with Orange Money"}
        </button>
        
        {/* Cash on Delivery Button */}
        <button
          className={`py-2.5 px-4 border-2 border-pink-400 font-semibold 
            text-pink-500 hover:bg-green-400 hover:text-white rounded-md 
            flex items-center justify-center transition-colors
            ${isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
          `}
          onClick={isDisabled ? () => requireAddress() : handleCashOnDelivery}
          disabled={isDisabled}
        >
          {loadingBtn.cod
            ? <span className='flex items-center'><span className="loader mr-2"></span>Processing...</span>
            : "Cash on Delivery"}
        </button>
      </div>
    );
  };

  // Form field rendering with validation
  const renderFormField = (id, label, type = 'text', required = true) => {
    return (
      <div className='grid gap-1'>
        <label htmlFor={id} className='font-medium text-sm'>
          {label}{required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          id={id} 
          className={`border ${errors[id] ? 'border-red-500 bg-red-50' : 'bg-blue-50'} p-2 rounded border-gray-400 focus:outline-none focus:ring-2`}
          {...register(id, {required: required ? `${label} is required` : false})}
        />
        {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
      </div>
    );
  };

  return (
    <section className='bg-blue-50 min-h-screen py-4'>
      <div className='container mx-auto px-4 flex flex-col lg:flex-row w-full gap-6 justify-between'>
        <div className='w-full lg:w-3/5'>
          {/* Address Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className='text-xl font-semibold text-gray-800'>Your Delivery Address</h3>
              {/* Only show Add New Address button if addresses exist and form is hidden */}
              {isAddressLoaded && addressList.length > 0 && !showAddressForm && (
                <button 
                  onClick={() => setShowAddressForm(true)}
                  className="text-pink-500 hover:text-pink-700 text-sm font-medium flex items-center gap-1 bg-white py-1 px-3 rounded-full shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Address
                </button>
              )}
              {/* Show Hide Form button only when form is visible and it's not the first address */}
              {showAddressForm && addressList.length > 0 && (
                <button 
                  onClick={() => setShowAddressForm(false)}
                  className="text-pink-500 hover:text-pink-700 text-sm font-medium flex items-center gap-1 bg-white py-1 px-3 rounded-full shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Hide Form
                </button>
              )}
            </div>

            {/* Loading state for addresses */}
            {!isAddressLoaded && (
              <div className="bg-white p-8 rounded-lg shadow-md flex justify-center items-center">
                <div className="loader-lg mr-3"></div>
                <p className="text-gray-600">Loading your saved addresses...</p>
              </div>
            )}

            {/* Address form */}
            {showAddressForm && (
              <div className='bg-white p-5 rounded-lg shadow-md mb-5 transition-all duration-300'>
                <div className='flex justify-between items-center gap-4 border-b pb-3 mb-4'>
                  <h2 className='font-bold text-lg text-gray-800'>
                    {addressList.length === 0 ? "Add Your First Address" : "Add New Address"}
                  </h2>
                  {/* Only show close button if it's not the first address */}
                  {addressList.length > 0 && (
                    <button onClick={() => setShowAddressForm(false)} className='hover:text-red-500 transition-colors'>
                      <IoClose size={20}/>
                    </button>
                  )}
                </div>
                <form className='grid gap-4' onSubmit={handleSubmit(onSubmitAddress)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {renderFormField('name', 'Full Name')}
                    {renderFormField('email', 'Email Address', 'email')}
                  </div>
                  
                  {renderFormField('addressline', 'Address Line/Quarter')}
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {renderFormField('city', 'City')}
                    {renderFormField('state', 'State/Region')}
                  </div>
                  
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {renderFormField('pincode', 'Postal Code')}
                    {renderFormField('country', 'Country')}
                  </div>
                  
                  {renderFormField('mobile', 'Mobile Number')}

                  <button 
                    type='submit' 
                    className='bg-pink-500 w-full py-3 rounded-md font-bold text-white mt-2 hover:bg-pink-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300'
                  >
                    SAVE ADDRESS
                  </button>
                </form>
              </div>
            )}

            {/* --- Notification if no address exists --- */}
            {isAddressLoaded && !addressList.length && !showAddressForm && (
              <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-semibold flex items-center rounded-lg">
                <svg className="w-6 h-6 mr-3 text-yellow-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"/>
                </svg>
                <div>
                  <p>No delivery addresses found.</p>
                  <button 
                    onClick={() => setShowAddressForm(true)}
                    className="text-blue-600 underline text-sm mt-1 font-normal"
                  >
                    Click here to add your first address
                  </button>
                </div>
              </div>
            )}

            {/* Saved Addresses */}
            {isAddressLoaded && addressList.length > 0 && (
              <div className='bg-white p-5 rounded-lg shadow-md'>
                <h4 className="font-medium text-sm text-gray-500 mb-3">
                  {addressList.filter(addr => addr.status).length > 0 
                    ? "Select a delivery address" 
                    : "No active addresses found"}
                </h4>
                <div className='grid gap-3'>
                  {addressList.filter(addr => addr.status).length === 0 && (
                    <div className="p-3 bg-blue-50 text-blue-700 rounded-md">
                      <p>All your addresses are currently inactive.</p>
                      <button 
                        onClick={() => setShowAddressForm(true)}
                        className="text-blue-600 underline text-sm mt-1"
                      >
                        Add a new address
                      </button>
                    </div>
                  )}
                  
                  {addressList.map((address, index) => (
                    address.status && (
                      <label key={address._id || index} htmlFor={"address" + index} className="cursor-pointer">
                        <div className={`border rounded-lg p-4 flex gap-3 transition-all duration-200 hover:bg-blue-50 
                          ${selectAddress === index ? 'ring-2 ring-pink-400 bg-pink-50' : ''}`}
                        >
                          <div>
                            <input
                              id={"address" + index}
                              type='radio'
                              value={index}
                              checked={selectAddress === index}
                              onChange={e => setSelectAddress(Number(e.target.value))}
                              name='address'
                              disabled={loadingBtn.cod || loadingBtn.online || loadingBtn.mtn || loadingBtn.orange}
                              className="mt-1"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-800">{address.name}</p>
                            <p className="text-sm text-gray-600">{address.customer_email}</p>
                            <p className="text-sm text-gray-700">{address.address_line}</p>
                            <p className="text-sm text-gray-700">{address.city}, {address.state}</p>
                            <p className="text-sm text-gray-700">{address.country} - {address.pincode}</p>
                            <p className="text-sm font-medium mt-1 text-gray-800">{address.mobile}</p>
                          </div>
                        </div>
                      </label>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='w-full lg:w-2/5'>
          {/* Order Summary */}
          <div className='bg-white rounded-lg shadow-md p-5 sticky top-4'>
            <h3 className='text-xl font-semibold mb-4 text-gray-800'>Order Summary</h3>
            <div className='border-t border-gray-200 pt-4'>
              <h3 className='font-semibold mb-3 text-gray-700'>Bill Details</h3>
              <div className='flex gap-4 justify-between py-2 border-b border-gray-100'>
                <p className="text-gray-600">Items total ({totalQty} item{totalQty !== 1 ? 's' : ''})</p>
                <p className='flex items-center gap-2'>
                  {notDiscountTotalPrice !== totalPrice && (
                    <span className='line-through text-neutral-400 text-sm'>{DisplayPriceInRupees(notDiscountTotalPrice)}</span>
                  )}
                  <span className="font-medium">{DisplayPriceInRupees(totalPrice)}</span>
                </p>
              </div>
              <div className='flex gap-4 justify-between py-2 border-b border-gray-100'>
                <p className="text-gray-600">Delivery Charge</p>
                <p className='flex items-center gap-2 text-green-600 font-medium'>Free</p>
              </div>
              <div className='font-semibold flex items-center justify-between gap-4 mt-3 pt-3'>
                <p className="text-lg text-gray-800">Grand Total</p>
                <p className="text-lg text-pink-600">{DisplayPriceInRupees(totalPrice)}</p>
              </div>
            </div>
          
            {/* Render payment buttons */}
            {renderPaymentButtons()}
            
            {/* Address requirement notice */}
            {(!addressList.length || !selectedAddress?._id) && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm text-yellow-700 flex items-start">
                  <svg className="w-5 h-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>
                    You need to {addressList.length ? 'select' : 'add'} a delivery address before you can proceed with payment.
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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
        .loader-lg {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #e11d48;
          border-radius: 50%;
          width: 2em;
          height: 2em;
          animation: spin 0.8s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% {transform: rotate(360deg);}
        }
      `}</style>
    </section>
  );
};

export default CheckoutPage;