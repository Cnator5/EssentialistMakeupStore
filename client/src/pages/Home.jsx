import React from 'react';
import { Helmet } from 'react-helmet';
import banner from '../assets/banner.avif';
import bannerMobile from "../assets/cosmetics-beauty-products-for-make-up-sale-banner-vector-25170220.avif";
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { Link, useNavigate } from 'react-router-dom';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';

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
    <section className='bg-white'>
      <Helmet>
        <title>Essentialist Makeup Store | Discover clean beauty</title>
        <meta name="description" content="Discover clean beauty products and makeup essentials at Essentialist Makeup Store. Shop our collection of top categories." />
        <meta name="keywords" content="clean beauty, makeup, cosmetics, skincare, beauty essentials, cruelty-free, vegan makeup" />
        <link rel="canonical" href="https://www.essentialistmakeupstore.com/" />
      </Helmet>

      <div className='container mx-auto mt-2 px-4'>
        <div className={`w-full h-full min-h-48 bg-blue-10 rounded ${!banner && "animate-pulse my-2"}`}>
          <img src={banner} className='w-full h-full hidden lg:block' alt='banner' />
          <img src={bannerMobile} className='w-full h-full lg:hidden' alt='banner' />
        </div>
      </div>
      
      <div className='container mx-auto px-4 my-2 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2'>
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
                <div className="text-center text-xs sm:text-sm md:text-base font-semibold text-gray-700 mt-2 truncate">
                  {cat.name}
                </div>
              </div>
            ))
          )
        }
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
    </section>
  );
};

export default Home;