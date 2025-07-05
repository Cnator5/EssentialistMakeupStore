import React from 'react';
import banner from '../assets/banner.avif';
import bannern from '../assets/fbb4343f-2d39-4c25-ac2f-1ab5037f50da.avif';
import bannerOGB from '../assets/OG-Shades-Desktop.webp';
import bannerm from '../assets/56e20d4e-2643-4edb-b3fd-7762b81a7658.avif';
import bannero from '../assets/f3675c63-2309-4402-960a-ca108012797a.avif';
import bannerp from '../assets/lipstick-cosmetics-makeup-beauty-product-ad-banner_33099-1533.jpg';
import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import { Helmet } from "react-helmet-async";

const Home = () => {
  const loadingCategory = useSelector(state => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData = useSelector(state => state.product.allSubCategory);
  const navigate = useNavigate();

  // Dynamic SEO: Build title and description from top categories
  const topCategoryNames = categoryData
    ?.slice(0, 3)
    .map(cat => cat.name)
    .join(', ');

  const dynamicTitle = topCategoryNames
    ? `Shop ${topCategoryNames} & More | EssentialisMakeupStore`
    : 'Makeup: Beauty & Personal Care - EssentialisMakeupStore';

  const dynamicDescription = topCategoryNames
    ? `Discover the best in ${topCategoryNames} and more. Authentic makeup, cosmetics, and beauty essentials in Cameroon at EssentialisMakeupStore.`
    : "Explore the best selection of authentic makeup products and cosmetics in Cameroon at Essentialist Makeup Store. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!";

  // Structured data for organization, website, and breadcrumbs
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EssentialisMakeupStore",
    "url": "https://www.esmakeupstore.com/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.esmakeupstore.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EssentialisMakeupStore",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg"
      }
    },
    "image": [
      "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg",
      "https://www.esmakeupstore.com/assets/NYX-PMU-Makeup-Lips-Liquid-Lipstick-LIP-LINGERIE-XXL-LXXL28-UNTAMABLE-0800897132187-OpenSwatch.webp",
      "https://www.esmakeupstore.com/assets/800897085421_duochromaticilluminatingpowder_twilighttint_alt2.jpg"
    ]
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.esmakeupstore.com/"
      }
    ]
  };

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
        <title>{dynamicTitle}</title>
        <meta name="description" content={dynamicDescription} />
        <meta name="keywords" content="makeup, makeup Cameroon, makeup Douala, African makeup, Cameroon beauty, Douala beauty, buy makeup Cameroon, makeup brands Cameroon, makeup store Douala, cosmetics Cameroon, EssentialisMakeupStore, makeup artist Douala, beauty shop Douala, foundation, concealer, contour, bronzer, blush, highlighter, pressed powder, setting spray, primer, eyeshadow, eyeshadow palette, eyeliner, mascara, eyebrow pencil, lipsticks, lip gloss, lip liner, makeup brushes, beauty blender, makeup remover, skincare, moisturizer, face mask, African makeup trends, Cameroonian beauty, best makeup products Douala, affordable makeup Cameroon, professional makeup Douala, bridal makeup Cameroon, makeup for dark skin, melanin makeup, makeup tutorials Cameroon, beauty influencers Cameroon, beauty supply Douala, face makeup Cameroon, eye makeup Cameroon, lip makeup Cameroon, makeup tools Cameroon, Douala cosmetics, Cameroon makeup shop, best beauty brands Douala, Essentialis makeup, trending makeup Cameroon, makeup sale Cameroon, Douala beauty trends, Cameroon makeup artists, best beauty shop Douala, buy cosmetics Douala, authentic makeup Cameroon, popular makeup brands Cameroon, best eye shadow Cameroon, beauty care Cameroon, top makeup Cameroon, trending cosmetics Douala" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.esmakeupstore.com/" />

        {/* Favicons & Mobile */}
        <link rel="icon" type="image/avif" href="/icon.avif" />
        <link rel="apple-touch-icon" href="/icon.avif" />
        <meta name="theme-color" content="#faf6f3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Open Graph */}
        <meta property="og:title" content={dynamicTitle} />
        <meta property="og:description" content={dynamicDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EssentialisMakeupStore" />
        <meta property="og:url" content="https://www.esmakeupstore.com/" />
        <meta property="og:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="EssentialisMakeupStore Product Preview" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="fr_CM" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={dynamicTitle} />
        <meta name="twitter:description" content={dynamicDescription} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
        <meta name="twitter:image:alt" content="EssentialisMakeupStore Product Preview" />

        {/* App Links */}
        <meta property="al:android:package" content="com.fsn.esmakeupstore" />
        <meta property="al:android:app_name" content="EssentialisMakeupStore: Makeup Shopping App" />
        <meta property="al:ios:app_name" content="EssentialisMakeupStore -- Makeup Shopping" />

        {/* Multiple image_src */}
        <link rel="image_src" href="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
        <link rel="image_src" href="https://www.esmakeupstore.com/assets/NYX-PMU-Makeup-Lips-Liquid-Lipstick-LIP-LINGERIE-XXL-LXXL28-UNTAMABLE-0800897132187-OpenSwatch.webp" />
        <link rel="image_src" href="https://www.esmakeupstore.com/assets/800897085421_duochromaticilluminatingpowder_twilighttint_alt2.jpg" />

        {/* Structured Data: Organization, Website, Breadcrumb */}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <section className='bg-white'>
        <div className='container mx-auto px-4'>
          <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
            <img src={bannern} className='w-full h-full hidden lg:block mt-2' alt='Beautiful model with makeup' />
            <img src={bannerMobile} className='w-full h-full lg:hidden' alt='Cosmetics sale banner' />
            <div className="font-bold text-[60px] md:text-[60px] text-center">
              <h1>Shop by Category</h1>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-4 my-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2 cursor-pointer justify-center items-center'>
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
            <img src={bannerm} className='w-full h-80 hidden lg:block' alt='Eyeshadow palette banner' />
            <img src={bannerp} className='w-full h-full lg:hidden' alt='Lipstick collection banner' />
          </div>
        </div>
        
        {/* Desktop version - Original display */}
        <div className='lg:block'>
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
       
        <img src={bannero} className='w-full lg:block' alt='Special offer banner' />
        <img src={bannerOGB} className='w-full h-full lg:block mt-4' alt='OGB exclusive beauty offer' />
      </section>
    </>
  );
};

export default Home;