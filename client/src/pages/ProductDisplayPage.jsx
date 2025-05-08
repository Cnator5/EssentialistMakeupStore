import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import Divider from '../components/Divider';
import image1 from '../assets/minute_delivery.jpeg';
import image2 from '../assets/Best_Prices_Offers.png';
import image3 from '../assets/Wide_Assortment.avif';
import { pricewithDiscount } from '../utils/PriceWithDiscount';
import AddToCartButton from '../components/AddToCartButton';
import { valideURLConvert } from '../utils/valideURLConvert'

import { Helmet } from 'react-helmet';

const ProductDisplayPage = () => {
  const params = useParams();
  let productId = params?.product?.split("-")?.slice(-1)[0];
  const [data, setData] = useState({
    name: "",
    image: []
  });
  const [image, setImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const imageContainer = useRef();

  const fetchProductDetails = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: {
          productId: productId
        }
      });

      const { data: responseData } = response;

      if (responseData.success) {
        setData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [params]);

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 100;
  };

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 100;
  };

  const imageUrl =
  data && data.image && data.image[0]
    ? (data.image[0].startsWith("http")
        ? data.image[0]
        : `https://www.esmakeupstore.com/assets/${data.image[0]}`)
    : "https://www.esmakeupstore.com/assets/logo.jpg";

  return (
   <>
      <Helmet>
  <title>{data.name} - Essentialist Makeup Store | Makeup Essentials</title>
  <meta name="description" content={data.description} />
  <meta
    name="keywords"
  content={`makeup, beauty, cosmetics, ${data.name}, ${data.unit}, discounts, offers, foundation, lipstick, mascara, eyeliner, eyeshadow, blush, bronzer, highlighter, contour, concealer, primer, setting spray, setting powder, makeup base, tinted moisturizer, BB cream, CC cream, powder, face palette, makeup palette, lip gloss, lip liner, matte lipstick, liquid lipstick, lip balm, lip stain, brow pencil, brow gel, brow powder, lash serum, false lashes, eyelash curler, eyeshadow palette, shimmer, glitter makeup, makeup remover, cleansing oil, cleansing balm, facial wipes, makeup sponges, beauty blender, makeup brushes, kabuki brush, blending brush, contour brush, fan brush, eye brush, lip brush, brush cleaner, vegan makeup, cruelty free, organic makeup, mineral makeup, hypoallergenic makeup, waterproof makeup, long wear makeup, sweat proof makeup, travel makeup kit, compact mirror, pocket mirror, makeup bag, vanity case, professional makeup, makeup artist, bridal makeup, wedding makeup, party makeup, glam makeup, natural makeup, nude makeup, smokey eye, cat eye, dewy finish, matte finish, luminous skin, glowing skin, radiant look, skin care, moisturizer, face serum, sheet mask, pore minimizer, anti-aging, sun protection, SPF makeup, beauty tips, makeup tutorial, makeup hacks, makeup trends, best sellers, top rated makeup, new makeup arrivals, exclusive offers, makeup sale, limited edition, gift sets, beauty box, makeup subscription, online makeup store, makeup shopping, beauty store Cameroon, beauty products Cameroon, cosmetics Cameroon, international makeup, imported makeup, premium makeup, affordable makeup, budget beauty, makeup deals, flash sale, best price, free shipping, cash on delivery, easy returns, customer reviews, latest makeup, trending makeup, influencer picks, must-have makeup, essentials`}
  />  
  <link
    rel="canonical"
    href={`https://www.esmakeupstore.com/${valideURLConvert(data.name)}-${productId}`}
  />
  <meta property="og:title" content={`${data.name} - Essentialist Makeup Store`} />
  <meta property="og:description" content={data.description} />
  <meta
    property="og:image"
    content={
      data.image && data.image[0]
        ? (data.image[0].startsWith("http")
            ? data.image[0]
            : `https://www.esmakeupstore.com/assets/${data.image[0]}`)
        : "https://www.esmakeupstore.com/assets/0d7ef2eINSIG00000668_01n (1).avif"
    }
  />
  <meta
    property="og:url"
    content={`https://www.esmakeupstore.com/${valideURLConvert(data.name)}-${productId}`}
  />
  <meta property="og:type" content="product" />
  <meta property="og:site_name" content="Essentialist Makeup Store" />
  <meta property="og:image" content={data.image} />
  <meta property="og:image:secure_url" content={data.image} />

  {/* Product Price OG tags (use correct prefix) */}
  <meta property="product:price:amount" content={data.price} />
  <meta property="product:price:currency" content="XAF" />

  <meta name="robots" content="index, follow" />
</Helmet>
   <section className='container mx-auto p-4 grid lg:grid-cols-2 '>
      <div className=''>
        <div className='bg-white lg:min-h-[65vh] lg:max-h-[65vh] rounded min-h-56 max-h-56 h-full w-full'>
          <img
            src={data.image[image]}
            className='w-full h-full object-scale-down scale-125'
            alt={data.name}
          />
        </div>
        <div className='flex items-center justify-center gap-3 my-2'>
          {
            data.image.map((img, index) => (
              <div key={img + index + "point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${index === image && "bg-slate-300"}`}></div>
            ))
          }
        </div>
        <div className='grid relative'>
          <div ref={imageContainer} className='flex gap-4 z-10 relative w-full overflow-x-auto scrollbar-none'>
            {
              data.image.map((img, index) => (
                <div className='w-20 h-20 min-h-20 min-w-20 scr cursor-pointer shadow-md' key={img + index}>
                  <img
                    src={img}
                    alt={`Product image ${index + 1} of ${data.name}`}
                    onClick={() => setImage(index)}
                    className='w-full h-full object-scale-down'
                  />
                </div>
              ))
            }
          </div>
          <div className='w-full -ml-3 h-full hidden lg:flex justify-between absolute  items-center'>
            <button onClick={handleScrollLeft} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleLeft />
            </button>
            <button onClick={handleScrollRight} className='z-10 bg-white relative p-1 rounded-full shadow-lg'>
              <FaAngleRight />
            </button>
          </div>
        </div>

        <div className='my-4 hidden lg:grid gap-3 p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => (
              <div key={element + index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            ))
          }
        </div>
      </div>

      <div className='p-4 lg:pl-7 text-base lg:text-lg'>
        <p className='bg-green-300 w-fit px-2 rounded-full'>10 Minutes</p>
        <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
        <p className=''>{data.unit}</p>
        <Divider />
        <div>
          <p className=''>Price</p>
          <div className='flex items-center gap-2 lg:gap-4'>
            <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
              <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}</p>
            </div>
            {
              data.discount && (
                <p className='line-through'>{DisplayPriceInRupees(data.price)}</p>
              )
            }
            {
              data.discount && (
                <p className="font-bold text-green-600 lg:text-2xl">{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
              )
            }
          </div>
        </div>

        {
          data.stock === 0 ? (
            <p className='text-lg text-red-500 my-2'>Out of Stock</p>
          ) : (
            <div className='my-4'>
              <AddToCartButton data={data} />
            </div>
          )
        }

        <h2 className='font-semibold'>Why shop from Essentialist Makeup Store?</h2>
        <div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image1}
              alt='Superfast delivery'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Superfast Delivery</div>
              <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image2}
              alt='Best prices and offers'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Best Prices and Offers</div>
              <p>Best price destination with offers directly from the manufacturers.</p>
            </div>
          </div>
          <div className='flex items-center gap-4 my-4'>
            <img
              src={image3}
              alt='Wide assortment'
              className='w-20 h-20'
            />
            <div className='text-sm'>
              <div className='font-semibold'>Wide Assortment</div>
              <p>Choose from over five thousand makeup products including foundations, lipsticks, eyeshadows, and more.</p>
            </div>
          </div>
        </div>

        <div className='my-4 grid gap-3 lg:hidden'>
          <div>
            <p className='font-semibold'>Description</p>
            <p className='text-base'>{data.description}</p>
          </div>
          <div>
            <p className='font-semibold'>Unit</p>
            <p className='text-base'>{data.unit}</p>
          </div>
          {
            data?.more_details && Object.keys(data?.more_details).map((element, index) => (
              <div key={element + index}>
                <p className='font-semibold'>{element}</p>
                <p className='text-base'>{data?.more_details[element]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
    </>
  );
}

export default ProductDisplayPage;