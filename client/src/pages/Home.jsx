import React from 'react';
// import bannerVideo from '/banner.mp4';
import banner from '../assets/banner.avif';
import bannern from '../assets/fbb4343f-2d39-4c25-ac2f-1ab5037f50da.avif';
import bannerm from '../assets/56e20d4e-2643-4edb-b3fd-7762b81a7658.avif';
import bannero from '../assets/f3675c63-2309-4402-960a-ca108012797a.avif';
import bannerp from '../assets/lipstick-cosmetics-makeup-beauty-product-ad-banner_33099-1533.jpg';
// import banner_two from '../assets/banner_two.avif';
import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import AdMarquee from './../components/AdMarquee';
import { Helmet } from 'react-helmet';

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  const handleRedirectProductListpage = (id, cat) => {
    const subcategory = subCategoryData.find(sub => 
      sub.category.some(c => c._id === id)
    );
    const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
    navigate(url);
  };

  return (
  <>
  <Helmet>
        <title>Best Makeup in Cameroon | EssentialisMakeupStore</title>
        <link rel='icon' href='/icon.avif' />
        <meta name="description" content="Explore the best selection of authentic makeup products and cosmetics in Cameroon at Essentialist Makeup Store. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!" />
        <meta name="keywords" content="makeup, makeup Cameroon, makeup Douala, African makeup, Cameroon beauty, Douala beauty, buy makeup Cameroon, makeup brands Cameroon, makeup store Douala, cosmetics Cameroon, EssentialisMakeupStore, makeup artist Douala, beauty shop Douala, foundation, concealer, contour, bronzer, blush, highlighter, pressed powder, setting spray, primer, eyeshadow, eyeshadow palette, eyeliner, mascara, eyebrow pencil, lipsticks, lip gloss, lip liner, makeup brushes, beauty blender, makeup remover, skincare, moisturizer, face mask, African makeup trends, Cameroonian beauty, best makeup products Douala, affordable makeup Cameroon, professional makeup Douala, bridal makeup Cameroon, makeup for dark skin, melanin makeup, makeup tutorials Cameroon, beauty influencers Cameroon, beauty supply Douala, face makeup Cameroon, eye makeup Cameroon, lip makeup Cameroon, makeup tools Cameroon, Douala cosmetics, Cameroon makeup shop, best beauty brands Douala, Essentialis makeup, trending makeup Cameroon, makeup sale Cameroon, Douala beauty trends, Cameroon makeup artists, best beauty shop Douala, buy cosmetics Douala, authentic makeup Cameroon, popular makeup brands Cameroon, best eye shadow Cameroon, beauty care Cameroon, top makeup Cameroon, trending cosmetics Douala"/>  
        <meta name="description" content="Shop for makeup products in Cameroon. Buy blush, bronzer, contour sticks, make-up base, highlight, and more. Find the best beauty brands in Douala. Shop online and get your makeup products delivered to your doorstep." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.esmakeupstore.com/" />
        <link rel="icon" type="image/avif" href="/icon.avif" />
        <link rel="apple-touch-icon" href="/logo.jpg" />
        <meta name="theme-color" content="#faf6f3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta property="og:title" content="Shop Makeup Essentials &amp; Cosmetics Online in Cameroon | EssentialisMakeupStore" />
        <meta property="og:description" content="Get the latest makeup products, cosmetics, and beauty essentials from your favorite brands. Shop lipsticks, eyeshadows, foundations, and more at EssentialisMakeupStore. Free shipping &amp; cash on delivery!" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EssentialisMakeupStore" />
        <meta property="og:url" content="https://www.esmakeupstore.com/" />
        <meta property="og:image" content="https://www.esmakeupstore.com/logo.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EssentialisMakeupStore Logo" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="fr_CM" />
        <meta name="twitter:title" content="Shop Makeup Essentials &amp; Cosmetics Online in Cameroon | EssentialisMakeupStore" />
        <meta name="twitter:description" content="Discover a wide range of makeup products and cosmetics at EssentialisMakeupStore. Shop online for the best makeup deals and trending beauty items in Cameroon." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="al:android:package" content="com.fsn.esmakeupstore" />
        <meta property="al:android:app_name" content="EssentialisMakeupStore: Makeup Shopping App" />
        <meta property="al:ios:app_name" content="EssentialisMakeupStore -- Makeup Shopping" />
  </Helmet>
    <section className='bg-white'>     
      <div className='container mx-auto px-4'>
        <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
        {/* <video autoPlay muted loop className='w-full h-full rounded'>
          <source src={bannerVideo} type="video/mp4" />
        </video> */}
          <img src={bannern} className='w-full h-full hidden lg:block mt-4' alt='banner' />
          {/* <img src={banner} className='w-full h-full hidden lg:block' alt='banner' /> */}
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner' />
      <div className="font-bold text-[60px] md:text-[60px] text-center">
        <h1>Shop by Category</h1>
      </div>
        </div>
      </div>
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2 cursor-pointer'>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((_, index) => (
              <div key={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                <div className='bg-blue-100 min-h-24 rounded'></div>
                <div className='bg-blue-100 h-8 rounded'></div>
              </div>
            ))
          ) : (
            categoryData.map((cat) => (
              <div
                key={cat._id + "displayCategory"}
                className="w-full h-full"
                onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
              >
                <div>
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-scale-down" />
                </div>
                <div className="text-center text-xs sm:text-sm md:text-base font-semibold text-gray-700 mt-2">
                  {cat.name}
                </div>
              </div>
            ))
          )
        }
      </div>

      <div className='container mx-auto mt-2 px-4'>
        <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
        {/* <video autoPlay muted loop className='w-full h-full rounded'>
          <source src={bannerVideo} type="video/mp4" />
        </video> */}
          <img src={bannerm} className='w-full h-80 hidden lg:block' alt='banner' />
          {/* <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner' /> */}
           <img src={bannerp} className='w-full h-full lg:hidden' alt='banner' />
        </div>
        </div>
      {/***display category product */}
      {
        categoryData?.map((c) => (
          <CategoryWiseProductDisplay 
            key={c?._id + "CategorywiseProduct"} 
            id={c?._id} 
            name={c?.name}
          />
        ))
      }
      <img src={bannero} className='w-full h-80 hidden lg:block' alt='banner' />
    </section>
    </>
  );
};

export default Home;