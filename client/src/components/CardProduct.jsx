// import React, { useState } from 'react'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { Link } from 'react-router-dom'
// import { valideURLConvert } from '../utils/valideURLConvert'
// import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from './AddToCartButton'

// const CardProduct = ({data}) => {
//     const url = `/product/${valideURLConvert(data.name)}-${data._id}`
//     const [isHovered, setIsHovered] = useState(false)
  
//     return (
//         <Link 
//             to={url} 
//             className='relative flex flex-col border overflow-hidden transition-all duration-300 ease-in-out py-3 lg:p-4 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md'
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{
//                 transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
//                 minWidth: '18rem',
//                 maxWidth: '22rem'
//             }}
//         >
//             {/* Product Image Container */}
//             <div className='relative overflow-hidden rounded-lg aspect-square mb-3'>
//                 <img 
//                     src={data.image[0]}
//                     className='w-full h-full object-contain transition-transform duration-500 ease-in-out'
//                     style={{
//                         transform: isHovered ? 'scale(1.05)' : 'scale(1)'
//                     }}
//                     alt={data.name}
//                 />
                
//                 {/* Discount Badge - Only shows if discount exists */}
//                 {Boolean(data.discount) && (
//                     <div className='absolute top-2 right-2 bg-green-600 text-white font-medium rounded-full px-2 py-1 text-xs'>
//                         {data.discount}% OFF
//                     </div>
//                 )}
//             </div>
            
//             {/* Product Details */}
//             <div className='flex-grow flex flex-col px-2'>
//                 {/* Delivery Time */}
//                 <div className='flex items-center gap-2 mb-2'>
//                     <div className='rounded-full text-xs w-fit px-2 py-0.5 text-green-600 bg-green-50 flex items-center'>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         10 min
//                     </div>
//                 </div>
                
//                 {/* Product Name */}
//                 <h3 className='font-semibold text-gray-800 text-sm lg:text-base line-clamp-2 mb-1 transition-colors duration-300' style={{ color: isHovered ? '#4b5563' : '#1f2937' }}>
//                     {data.name}
//                 </h3>
                
//                 {/* Product Unit */}
//                 <div className='text-gray-500 text-sm mb-3'>
//                     {data.unit}
//                 </div>
                
//                 {/* Price and Add to Cart */}
//                 <div className='flex items-center justify-between mt-auto'>
//                     <div className='flex flex-col'>
//                         <div className='font-bold text-gray-900'>
//                             {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//                         </div>
                        
//                         {Boolean(data.discount) && (
//                             <div className='text-xs text-gray-500 line-through'>
//                                 {DisplayPriceInRupees(data.price)}
//                             </div>
//                         )}
//                     </div>
                    
//                     <div className='transition-transform duration-300' style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
//                         {data.stock === 0 ? (
//                             <p className='text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full'>Out of stock</p>
//                         ) : (
//                             <AddToCartButton data={data} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default CardProduct

// import React, { useState } from 'react'
// import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
// import { Link } from 'react-router-dom'
// import { valideURLConvert } from '../utils/valideURLConvert'
// import { pricewithDiscount } from '../utils/PriceWithDiscount'
// import AddToCartButton from './AddToCartButton'

// const CardProduct = ({ data, index = 0, repeatIndex = 0 }) => {
//     const url = `/product/${valideURLConvert(data.name)}-${data._id}`
//     const [isHovered, setIsHovered] = useState(false)

//     // Use repeatIndex to select image, fallback to first image if out of range
//     const imageSrc =
//         data.image && data.image.length > repeatIndex
//             ? data.image[repeatIndex]
//             : data.image && data.image.length > 0
//                 ? data.image[0]
//                 : '';

//     return (
//         <Link 
//             to={url} 
//             className='relative flex flex-col border overflow-hidden transition-all duration-300 ease-in-out py-3 lg:p-4 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md'
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//             style={{
//                 transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
//                 minWidth: '18rem',
//                 maxWidth: '22rem'
//             }}
//         >
//             {/* Product Image Container */}
//             <div className='relative overflow-hidden rounded-lg aspect-square mb-3'>
//                 <img 
//                     src={imageSrc}
//                     className='w-full h-full object-contain transition-transform duration-500 ease-in-out'
//                     style={{
//                         transform: isHovered ? 'scale(1.05)' : 'scale(1)'
//                     }}
//                     alt={data.name}
//                 />
                
//                 {/* Discount Badge - Only shows if discount exists */}
//                 {Boolean(data.discount) && (
//                     <div className='absolute top-2 right-2 bg-green-600 text-white font-medium rounded-full px-2 py-1 text-xs'>
//                         {data.discount}% OFF
//                     </div>
//                 )}
//             </div>
            
//             {/* Product Details */}
//             <div className='flex-grow flex flex-col px-2'>
//                 {/* Delivery Time */}
//                 <div className='flex items-center gap-2 mb-2'>
//                     <div className='rounded-full text-xs w-fit px-2 py-0.5 text-green-600 bg-green-50 flex items-center'>
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                         </svg>
//                         10 min
//                     </div>
//                 </div>
                
//                 {/* Product Name */}
//                 <h3 className='font-semibold text-gray-800 text-sm lg:text-base line-clamp-2 mb-1 transition-colors duration-300' style={{ color: isHovered ? '#4b5563' : '#1f2937' }}>
//                     {data.name}
//                 </h3>
                
//                 {/* Product Unit */}
//                 <div className='text-gray-500 text-sm mb-3'>
//                     {data.unit}
//                 </div>
                
//                 {/* Price and Add to Cart */}
//                 <div className='flex items-center justify-between mt-auto'>
//                     <div className='flex flex-col'>
//                         <div className='font-bold text-gray-900'>
//                             {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
//                         </div>
                        
//                         {Boolean(data.discount) && (
//                             <div className='text-xs text-gray-500 line-through'>
//                                 {DisplayPriceInRupees(data.price)}
//                             </div>
//                         )}
//                     </div>
                    
//                     <div className='transition-transform duration-300' style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
//                         {data.stock === 0 ? (
//                             <p className='text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full'>Out of stock</p>
//                         ) : (
//                             <AddToCartButton data={data} />
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </Link>
//     )
// }

// export default CardProduct


import React, { useState } from 'react'
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import { Link } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from './AddToCartButton'

const CardProduct = ({data}) => {
    const url = `/product/${valideURLConvert(data.name)}-${data._id}`
    const [isHovered, setIsHovered] = useState(false)
  
    return (
        <Link 
            to={url} 
            className='relative flex flex-col border border-gray-200 overflow-hidden transition-all duration-300 ease-in-out py-3 lg:p-4 rounded-lg cursor-pointer bg-white shadow-sm hover:shadow-md'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
                minWidth: window.innerWidth < 768 ? '5rem' : '18rem',
                maxWidth: '22rem'
            }}
        >
            {/* Product Image Container */}
            <div className='relative overflow-hidden rounded-lg aspect-square mb-3'>
                <img 
                    src={data.image[0]}
                    className='w-full h-full object-contain transition-transform duration-500 ease-in-out'
                    style={{
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                    alt={data.name}
                />
                
                {/* Discount Badge - Only shows if discount exists */}
                {Boolean(data.discount) && (
                    <div className='absolute top-2 right-2 bg-green-600 text-white font-medium rounded-full px-2 py-1 text-xs'>
                        {data.discount}% OFF
                    </div>
                )}
            </div>
            
            {/* Product Details */}
            <div className='flex-grow flex flex-col px-2'>
                {/* Delivery Time */}
                <div className='flex items-center gap-2 mb-2'>
                    <div className='rounded-full text-xs w-fit px-2 py-0.5 text-green-600 bg-green-50 flex items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        10 min
                    </div>
                </div>
                
                {/* Product Name */}
                <h3 className='font-semibold text-gray-800 text-sm lg:text-base line-clamp-2 mb-1 transition-colors duration-300' style={{ color: isHovered ? '#4b5563' : '#1f2937' }}>
                    {data.name}
                </h3>
                
                {/* Product Unit */}
                <div className='text-gray-500 text-sm mb-3'>
                    {data.unit}
                </div>
                
                {/* Price and Add to Cart */}
                <div className='flex items-center justify-between mt-auto'>
                    <div className='flex flex-col'>
                        <div className='font-bold text-gray-900'>
                            {DisplayPriceInRupees(pricewithDiscount(data.bulkPrice, data.discount))}
                        </div>
                        
                        {Boolean(data.discount) && (
                            <div className='text-xs text-gray-500 line-through'>
                                {DisplayPriceInRupees(data.price)}
                            </div>
                        )}
                    </div>
                    
                    <div className='transition-transform duration-300' style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}>
                        {data.stock === 0 ? (
                            <p className='text-red-500 text-sm bg-red-50 px-3 py-1 rounded-full'>Out of stock</p>
                        ) : (
                            <AddToCartButton data={data} />
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardProduct