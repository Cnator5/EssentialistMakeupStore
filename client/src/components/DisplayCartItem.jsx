import React, { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../provider/GlobalProvider';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { FaCaretRight } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import AddToCartButton from './AddToCartButton';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import imageEmpty from '../assets/empty_cart.avif';

// Example: you can change this depending on your auth setup
const getStoredUser = () => {
  // Try to get user from Redux, context, or localStorage
  // Prefer Redux/context, fallback to localStorage
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  } catch {
    return null;
  }
};

const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector(state => state.cartItem.cart);
  const authUser = useSelector(state => state.auth?.user); // adapt to your Redux
  const isAuthenticated = useSelector(state => state.auth?.isAuthenticated); // adapt to your Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ----------------------------
  // OPTIONAL: Merge guest cart when user logs in
  // This is not visible here, but you should run this logic after login:
  /*
  useEffect(() => {
    if (isAuthenticated) {
      // If there is guest cart in localStorage, merge it
      const guestCart = JSON.parse(localStorage.getItem('cart_guest'));
      if (guestCart && guestCart.length > 0) {
        // Dispatch API or Redux action to add guestCart to user's account
        dispatch({ type: 'MERGE_GUEST_CART', payload: guestCart });
        localStorage.removeItem('cart_guest');
      }
      // Same for guest address if needed
    }
  }, [isAuthenticated]);
  */
  // ----------------------------

  const redirectToCheckoutPage = () => {
    navigate("/checkout");
    if (close) close();
  };

  // Use this to determine user status
  const user = authUser || getStoredUser();
  const isUserAuthenticated = !!(isAuthenticated || user);

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
          {cartItem[0] ? (
            <>
              <div className='flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-500 rounded-full'>
                <p>Your total savings</p>
                <p>{DisplayPriceInRupees(notDiscountTotalPrice - totalPrice)}</p>
              </div>
              <div className='bg-white rounded-lg p-4 grid gap-5 overflow-auto'>
                {cartItem.map((item) => (
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
                ))}
              </div>
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
          )}
        </div>

        {cartItem[0] && (
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
            {/* Show note depending on user status */}
            {!isUserAuthenticated &&
              <div className='mt-2 text-xs text-yellow-600 bg-yellow-50 px-3 py-2 rounded text-center'>
                Proceeding as guest. You can order and pay on delivery without logging in.
              </div>
            }
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCartItem;