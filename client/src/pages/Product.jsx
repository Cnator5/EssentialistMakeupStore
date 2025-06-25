// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common/SummaryApi'
// import AxiosToastError from '../utils/AxiosToastError'
// import Axios from '../utils/Axios'

// const Product = () => {
//   const [productData,setProductData] = useState([])
//   const [page,setPage] = useState(1)
  
//   const fetchProductData = async()=>{
//     try {
//         const response = await Axios({
//            ...SummaryApi.getProduct,
//            data : {
//               page : page,
//            }
//         })

//         const { data : responseData } = response 

//         console.log("product page ",responseData)
//         if(responseData.success){
          
//           setProductData(responseData.data)
//         }

//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }
  
//   console.log("product page")
//   useEffect(()=>{
//     fetchProductData()
//   },[])

//   return (
//     <>
//     <div className='flex flex-col gap-4'>
//       <h1 className='text-2xl font-bold'>Product</h1>
//       <div className='grid grid-cols-4 gap-4'>
//         {
//           productData?.map((item,index)=>(
//             <div key={index} className='border p-4 rounded-md'>
//               <img src={item.image[0]} alt={item.name} className='w-full h-32 object-cover' />
//               <h2 className='text-lg font-semibold'>{item.name}</h2>
//               <p className='text-gray-500'>{item.description}</p>
//             </div>
//           ))
//         }
//       </div>
//     </div>
//     </>
//   )
// }

// export default Product

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'

const WEBSITE_URL = "https://esmakeupstore.com"

const Product = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  
  // Fetch products from your API
  const fetchProductData = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getProduct,
        data: { page }
      })
      const { data: responseData } = response
      if (responseData.success) {
        setProductData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [page])

  // Build full SEO meta for all products (for "All Products" page)
  const pageTitle = 'Makeup | Makeup Products | Looking for Makeup Products? | Essentialist Makeup Store'
  const pageDescription = 'Browse the best makeup and beauty products at Essentialist Makeup Store. From foundation to lipstick, shop quality cosmetic brands in Cameroon!'
  const productNames = productData.map(p => p.name).join(', ')

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`makeup, beauty, makeup in Douala, cosmetics, essentialist, products, discounts, offers, ${productNames}`} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${WEBSITE_URL}/product`} />
        <meta property="og:site_name" content="Essentialist Makeup Store" />
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <link rel="canonical" href={`${WEBSITE_URL}/product`} />
      </Helmet>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>
          Essential Makeup Products | Explore Our Range of Makeup and Beauty Products
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {productData?.map((item) => {
            // Prefer slug for SEO-friendly URLs, fallback to _id
            const productUrl = `${WEBSITE_URL}/product/${item.slug || item._id}`
            // Use first image or a placeholder
            const imageUrl = item.image && item.image[0]
              ? item.image[0]
              : `${WEBSITE_URL}/default-image.jpg`
            // Short description for meta/alt
            const desc = item.description && item.description.length > 150
              ? item.description.slice(0, 150) + '...'
              : item.description

            return (
              <div key={item._id} className='border p-4 rounded-md shadow-sm bg-white hover:shadow-md transition'>
                {/* Per-product SEO helmet */}
                <Helmet>
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org/",
                      "@type": "Product",
                      "name": item.name,
                      "image": item.image,
                      "description": item.description,
                      "offers": {
                        "@type": "Offer",
                        "price": item.price,
                        "priceCurrency": "XAF"
                      }
                    })}
                  </script>
                </Helmet>
                <a href={productUrl}>
                  <img
                    src={imageUrl}
                    alt={`Buy ${item.name} - ${desc}`}
                    className='w-full h-32 object-cover rounded mb-2'
                    loading="lazy"
                  />
                </a>
                <a href={productUrl} className="hover:underline">
                  <h2 className='text-lg font-semibold'>{item.name}</h2>
                </a>
                <p className='text-gray-700 text-sm'>{desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Product