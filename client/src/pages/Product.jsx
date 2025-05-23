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
import { Helmet } from 'react-helmet';

const Product = () => {
  const [productData, setProductData] = useState([])
  const [page, setPage] = useState(1)
  
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

  return (
    <>
      <Helmet>
        <title>Essential Makeup products | Best Makeup Store</title>
        <meta name="description" content="Browse the best makeup and beauty products at Essentialist Makeup Store." />
        <link rel="canonical" href={`https://esmakeupstore.com/product`} />
        <meta name="keywords" content="makeup, beauty, Makeup in Douala, cosmetics, essentialist, products, discounts, offers" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Products | Essentialist Makeup Store" />
        <meta property="og:description" content="Browse the best makeup and beauty products at Essentialist Makeup Store." />
      </Helmet>
      <div className='flex flex-col gap-4'>
        <h1 className='text-2xl font-bold'>Essential Makeup products | Explore Our Range of Makeup and Beauty Products </h1>
        <div className='grid grid-cols-4 gap-4'>
          {productData?.map((item, index) => (
            <div key={index} className='border p-4 rounded-md'>
              <img src={item.image[0]} alt={item.name} className='w-full h-32 object-cover' />
              <h2 className='text-lg font-semibold'>{item.name}</h2>
              <p className='text-black'>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Product