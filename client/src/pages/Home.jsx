// import React from 'react';
// import banner from '../assets/banner.avif';
// import bannern from '../assets/fbb4343f-2d39-4c25-ac2f-1ab5037f50da.avif';
// import bannerOGB from '../assets/OG-Shades-Desktop.webp';
// import bannerm from '../assets/56e20d4e-2643-4edb-b3fd-7762b81a7658.avif';
// import bannero from '../assets/f3675c63-2309-4402-960a-ca108012797a.avif';
// import bannerp from '../assets/lipstick-cosmetics-makeup-beauty-product-ad-banner_33099-1533.jpg';
// import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
// import { useSelector } from 'react-redux';
// import { valideURLConvert } from '../utils/valideURLConvert';
// import { useNavigate } from 'react-router-dom';
// import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
// import { Helmet } from "react-helmet-async";
// import ProductRecommendations from '../components/ProductRecommendations';

// const Home = () => {
//   const loadingCategory = useSelector(state => state.product.loadingCategory);
//   const categoryData = useSelector(state => state.product.allCategory);
//   const subCategoryData = useSelector(state => state.product.allSubCategory);
//   const navigate = useNavigate();

//   // Dynamic SEO: Build title and description from top categories
//   const topCategoryNames = categoryData
//     ?.slice(0, 3)
//     .map(cat => cat.name)
//     .join(', ');

//   const dynamicTitle = topCategoryNames
//     ? `Shop ${topCategoryNames} & More`
//     : 'Makeup: Beauty & Personal Care';

//   const dynamicDescription = topCategoryNames
//     ? `Discover the best in ${topCategoryNames} and more. Authentic makeup, cosmetics, and beauty essentials in Cameroon at EssentialisMakeupStore.`
//     : "Explore the best selection of authentic makeup products and cosmetics in Cameroon at Essentialist Makeup Store. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!";

//   // Structured data for organization, website, and breadcrumbs
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "WebSite",
//     "name": "EssentialisMakeupStore",
//     "url": "https://www.esmakeupstore.com/",
//     "potentialAction": {
//       "@type": "SearchAction",
//       "target": "https://www.esmakeupstore.com/search?q={search_term_string}",
//       "query-input": "required name=search_term_string"
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "EssentialisMakeupStore",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg"
//       }
//     },
//     "image": [
//       "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg",
//       "https://www.esmakeupstore.com/assets/NYX-PMU-Makeup-Lips-Liquid-Lipstick-LIP-LINGERIE-XXL-LXXL28-UNTAMABLE-0800897132187-OpenSwatch.webp",
//       "https://www.esmakeupstore.com/assets/800897085421_duochromaticilluminatingpowder_twilighttint_alt2.jpg"
//     ]
//   };

//   const breadcrumbLd = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://www.esmakeupstore.com/"
//       }
//     ]
//   };

//   const handleRedirectProductListpage = (id, cat) => {
//     const subcategory = subCategoryData.find(sub => 
//       sub.category.some(c => c._id === id)
//     );
//     const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subcategory.name)}-${subcategory._id}`;
//     navigate(url);
//   };

//   return (
//     <>
//       <Helmet>
//     <meta name="msvalidate.01" content="1D7D3FCABB171743A8EB32440530AC76" />
//         <title>{dynamicTitle}</title>
//         <meta name="description" content={dynamicDescription} />
//         <meta name="keywords" content="makeup, makeup Cameroon, makeup Douala, African makeup, Cameroon beauty, Douala beauty, buy makeup Cameroon, makeup brands Cameroon, makeup store Douala, cosmetics Cameroon, EssentialisMakeupStore, makeup artist Douala, beauty shop Douala, foundation, concealer, contour, bronzer, blush, highlighter, pressed powder, setting spray, primer, eyeshadow, eyeshadow palette, eyeliner, mascara, eyebrow pencil, lipsticks, lip gloss, lip liner, makeup brushes, beauty blender, makeup remover, skincare, moisturizer, face mask, African makeup trends, Cameroonian beauty, best makeup products Douala, affordable makeup Cameroon, professional makeup Douala, bridal makeup Cameroon, makeup for dark skin, melanin makeup, makeup tutorials Cameroon, beauty influencers Cameroon, beauty supply Douala, face makeup Cameroon, eye makeup Cameroon, lip makeup Cameroon, makeup tools Cameroon, Douala cosmetics, Cameroon makeup shop, best beauty brands Douala, Essentialis makeup, trending makeup Cameroon, makeup sale Cameroon, Douala beauty trends, Cameroon makeup artists, best beauty shop Douala, buy cosmetics Douala, authentic makeup Cameroon, popular makeup brands Cameroon, best eye shadow Cameroon, beauty care Cameroon, top makeup Cameroon, trending cosmetics Douala" />
//         <meta name="robots" content="index, follow" />
//         <link rel="canonical" href="https://www.esmakeupstore.com/" />

//         {/* Favicons & Mobile */}
//         <link rel="icon" type="image/avif" href="/icon.avif" />
//         <link rel="apple-touch-icon" href="/icon.avif" />
//         <meta name="theme-color" content="#faf6f3" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
//         <meta name="mobile-web-app-capable" content="yes" />

//         {/* Open Graph */}
//         <meta property="og:title" content={dynamicTitle} />
//         <meta property="og:description" content={dynamicDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:site_name" content="EssentialisMakeupStore" />
//         <meta property="og:url" content="https://www.esmakeupstore.com/" />
//         <meta property="og:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
//         <meta property="og:image:alt" content="EssentialisMakeupStore Product Preview" />
//         <meta property="og:locale" content="en_US" />
//         <meta property="og:locale:alternate" content="fr_CM" />

//         {/* Twitter Card */}
//         <meta name="twitter:title" content={dynamicTitle} />
//         <meta name="twitter:description" content={dynamicDescription} />
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
//         <meta name="twitter:image:alt" content="EssentialisMakeupStore Product Preview" />

//         {/* App Links */}
//         <meta property="al:android:package" content="com.fsn.esmakeupstore" />
//         <meta property="al:android:app_name" content="EssentialisMakeupStore: Makeup Shopping App" />
//         <meta property="al:ios:app_name" content="EssentialisMakeupStore -- Makeup Shopping" />

//         {/* Multiple image_src */}
//         <link rel="image_src" href="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
//         <link rel="image_src" href="https://www.esmakeupstore.com/assets/NYX-PMU-Makeup-Lips-Liquid-Lipstick-LIP-LINGERIE-XXL-LXXL28-UNTAMABLE-0800897132187-OpenSwatch.webp" />
//         <link rel="image_src" href="https://www.esmakeupstore.com/assets/800897085421_duochromaticilluminatingpowder_twilighttint_alt2.jpg" />

//         {/* Structured Data: Organization, Website, Breadcrumb */}
//         <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
//         <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
//       </Helmet>

//       <section className='bg-white'>
//       <ProductRecommendations  />
//         <div className='container mx-auto px-4'>
//           <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
//             <img src={bannern} className='w-full h-full hidden lg:block mt-2' alt='Beautiful model with makeup' />
//             <img src={bannerMobile} className='w-full h-full lg:hidden' alt='Cosmetics sale banner' />
//             <div className="font-bold text-[40px] md:text-[60px] text-center">
//               <h1>Shop by Category</h1>
//             </div>
//           </div>
//         </div>
//         <div className='container mx-auto px-8 my-2 grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2 cursor-pointer justify-center items-center'>
//           {
//             loadingCategory ? (
//               new Array(12).fill(null).map((_, index) => (
//                 <div key={index + "loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
//                   <div className='bg-blue-100 min-h-24 rounded'></div>
//                   <div className='bg-blue-100 h-8 rounded'></div>
//                 </div>
//               ))
//             ) : (
//               categoryData.map((cat) => (
//                 <div
//                   key={cat._id + "displayCategory"}
//                   className="w-full h-full"
//                   onClick={() => handleRedirectProductListpage(cat._id, cat.name)}
//                 >
//                   <div>
//                     <img src={cat.image} alt={cat.name} className="w-full h-full object-scale-down" />
//                   </div>
//                   <div className="text-center text-xs sm:text-sm md:text-base font-semibold text-gray-700 mt-2">
//                     {cat.name}
//                   </div>
//                 </div>
//               ))
//             )
//           }
//         </div>

//         <div className='container mx-auto mt-2 px-4'>
//           <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
//             <img src={bannerm} className='w-full h-80 hidden lg:block' alt='Eyeshadow palette banner' />
//             <img src={bannerp} className='w-full h-full lg:hidden' alt='Lipstick collection banner' />
//           </div>
//         </div>
        
//         {/* Desktop version - Original display */}
//         <div className='lg:block'>
//           {
//             categoryData?.map((c) => (
//               <CategoryWiseProductDisplay 
//                 key={c?._id + "CategorywiseProduct"} 
//                 id={c?._id} 
//                 name={c?.name}
//               />
//             ))
//           }
//         </div>
       
//         <img src={bannero} className='w-full lg:block' alt='Special offer banner' />
//         <img src={bannerOGB} className='w-full h-full lg:block mt-4' alt='OGB exclusive beauty offer' />
//       </section>
//     </>
//   );
// };

// export default Home;


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
import ProductRecommendations from '../components/ProductRecommendations';

// TikTok-style videos (local mp4 files)
const tiktokVideos = [
  '/public/Download (2).mp4',
  '/public/Download (1).mp4',
  '/public/Download.mp4',
  '/public/Download (3).mp4',
  '/public/Download (4).mp4',
  '/public/essentialist-video.mp4',
];

// TikTokGallery component for displaying videos in grid
const TikTokGallery = ({ videos }) => (
  <section className="my-16">
    <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
      Watch Some Of Our Makeup Samples
    </h2>
    <div
      className="
        grid gap-8
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        max-w-7xl
        mx-auto
        px-2
      "
    >
      {videos.map((url, i) => (
        <div
          key={url}
          className="
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-lg
            flex
            flex-col
            items-center
            aspect-[9/16]
            border border-gray-100
            transition-transform
            hover:scale-[1.025]
            hover:shadow-2xl
          "
          style={{
            minHeight: "350px",
            background: "linear-gradient(130deg,#f8fafc 0%, #fff 100%)"
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover bg-gray-100"
            style={{ aspectRatio: "9 / 16", maxHeight: "100%" }}
            aria-label={`Makeup video demo ${i + 1}`}
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  </section>
);

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
    ? `Shop ${topCategoryNames} & More`
    : 'Makeup: Beauty & Personal Care';

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
        <meta name="msvalidate.01" content="1D7D3FCABB171743A8EB32440530AC76" />
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
        <ProductRecommendations />
        <div className='container mx-auto px-4'>
          <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
            <img src={bannern} className='w-full h-full hidden lg:block mt-2' alt='Beautiful model with makeup' />
            <img src={bannerMobile} className='w-full h-full lg:hidden' alt='Cosmetics sale banner' />
            <div className="font-bold text-[40px] md:text-[60px] text-center">
              <h1>Shop by Category</h1>
            </div>
          </div>
        </div>
        <div className='container mx-auto px-8 my-2 grid grid-cols-5 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-2 cursor-pointer justify-center items-center'>
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

        {/* TikTok Video Gallery */}
        <TikTokGallery videos={tiktokVideos} />

        {/* WhatsApp Floating Button */}
        <a
          href="https://wa.me/237655225569"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed z-50 bottom-6 right-6 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-colors"
          style={{ boxShadow: '0 4px 16px rgba(37, 211, 102, 0.3)' }}
          aria-label="Contact us on WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.099-.47-.148-.669.15-.198.297-.767.966-.941 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.61-.916-2.206-.242-.58-.487-.5-.669-.51-.173-.006-.372-.007-.571-.007s-.521.075-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.214 3.074.149.198 2.1 3.205 5.077 4.372.71.306 1.263.489 1.695.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.123-.272-.198-.57-.347zm-5.421 7.617c-1.191 0-2.381-.195-3.509-.577l-3.909 1.024 1.04-3.814c-.673-1.045-1.205-2.181-1.498-3.377C1.212 14.271 0 12.211 0 9.999 0 4.477 5.373 0 12 0c3.185 0 6.187 1.24 8.438 3.488C22.687 5.737 24 8.741 24 12c0 6.627-5.373 12-12 12zm0-22C6.486 2 2 6.486 2 12c0 2.083 1.04 4.166 2.888 5.833l-.96 3.521 3.624-.948C9.834 21.001 10.912 21.2 12 21.2c5.514 0 10-4.486 10-10S17.514 2 12 2z"/>
          </svg>
        </a>
      </section>
    </>
  );
};

export default Home;