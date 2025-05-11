import React from 'react';
// import banner from '../assets/banner.avif';
// import banner_two from '../assets/banner_two.avif';
// import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import AdMarquee from './../components/AdMarquee';
import { Helmet } from 'react-helmet';

const BrandPage = () => {
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
  <title>Best Makeup Brands | Discover the Best Makeup Products in Cameroon</title>
  <meta name="description" content="Explore the best makeup though out top Brands selection of makeup products in Cameroon from USA at Essentialist Makeup Store. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!" />
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
  <meta property="og:description" content="Get the latest makeup through brands like ELF, SMASHBOX, BOBBI BROWN, TOO FACED, ESTEE LAUDER, MAC, CLINIQUE, ONE SIZE, JUVIA, cosmetics, and beauty essentials from your favorite brands. Shop lipsticks, eyeshadows, foundations, and more at EssentialisMakeupStore. Free shipping &amp; cash on delivery!" />
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
  <meta name="twitter:description" content="Discover a wide range of makeup through brands like ELF, SMASHBOX, BOBBI BROWN, TOO FACED, ESTEE LAUDER, MAC, CLINIQUE, ONE SIZE, JUVIA and cosmetics at EssentialisMakeupStore. Shop online for the best makeup deals and trending beauty items in Cameroon." />
  <meta name="twitter:card" content="summary_large_image" />

  <meta property="al:android:package" content="com.fsn.esmakeupstore" />
  <meta property="al:android:app_name" content="EssentialisMakeupStore: Makeup Shopping App" />
  <meta property="al:ios:app_name" content="EssentialisMakeupStore – Makeup Shopping" />
    </Helmet>
    <section className='bg-white'>
    
      <h1 className='text-center text-2xl font-semibold py-4'>Shop by Brand</h1>
      <div className='hidden md:block'>
  
     
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
        </div>
  
    </section>
    </>
  );
};

export default BrandPage;