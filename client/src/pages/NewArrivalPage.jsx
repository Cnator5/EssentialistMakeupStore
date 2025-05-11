import React from 'react';
import banner from '../assets/banner.avif';
import banner_two from '../assets/banner_two.avif';
import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import AdMarquee from './../components/AdMarquee';
import { Helmet } from 'react-helmet';

const NewArrivalPage = () => {
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
  <title>New Makeup Products | Discover the Best Makeup Products in Cameroon</title>
  <meta name="description" content="Explore new selection of authentic makeup products and cosmetics in Cameroon at Essentialist Makeup Store. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!" />
  <meta name="keywords" content="makeup, makeup store, buy makeup online, makeup Cameroon, cosmetics, beauty, lipstick, foundation, eyeshadow, mascara, makeup essentials, EssentialisMakeupStore, beauty products, online makeup shop, best makeup brands Cameroon, makeup deals, beauty shopping" />

  {/* SEO Canonical */}
  <link rel="canonical" href="https://www.esmakeupstore.com/" />

  {/* Favicon & Icons */}
  <link rel="icon" type="image/avif" href="/icon.avif" />
  <link rel="apple-touch-icon" href="/icon.png" />

  {/* PWA / Mobile  */}
  <meta name="theme-color" content="#faf6f3" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="mobile-web-app-capable" content="yes" />

  {/* Open Graph (Facebook, Messenger, WhatsApp etc.)  */}
  <meta property="og:title" content="Shop Makeup Essentials &amp; Cosmetics Online in Cameroon | EssentialisMakeupStore" />
  <meta property="og:description" content="Get the latest makeup products, cosmetics, and beauty essentials from your favorite brands. Shop lipsticks, eyeshadows, foundations, and more at EssentialisMakeupStore. Free shipping &amp; cash on delivery!" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="EssentialisMakeupStore" />
  <meta property="og:url" content="https://www.esmakeupstore.com/" />
  <meta property="og:image" content="https://www.esmakeupstore.com/icon.png" />
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
  <meta property="al:ios:app_name" content="EssentialisMakeupStore – Makeup Shopping" />
    </Helmet>
    <section className='bg-white'>
      <div className='hidden md:block'>
      <h1 className='text-center text-2xl font-bold text-gray-700 my-4'>New Arrival</h1>
        </div>
      
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-5 lg:grid-cols-5 gap-2'>
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
    </section>
    </>
  );
};

export default NewArrivalPage;