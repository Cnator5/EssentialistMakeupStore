import React, { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import { Link, useParams } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { useSelector } from 'react-redux'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Helmet } from 'react-helmet'

const ProductListPage = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const AllSubCategory = useSelector(state => state.product.allSubCategory)
  const [DisplaySubCatory, setDisplaySubCategory] = useState([])

  console.log(AllSubCategory)

  const subCategory = params?.subCategory?.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1)?.join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]


  const fetchProductdata = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8,
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData.data])
        }
        setTotalPage(responseData.totalCount)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdata()
  }, [params])


  useEffect(() => {
    const sub = AllSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id == categoryId
      })

      return filterData ? filterData : null
    })
    setDisplaySubCategory(sub)
  }, [params, AllSubCategory])

  return (
   <>
    <Helmet>
  <title>{subCategoryName} - Essentialist Makeup Store | Makeup in Cameroon</title>
  <meta name="description" content={`Discover the best of ${subCategoryName} at Essentialist Makeup Store. Shop quality makeup essentials in the ${subCategoryName} category.`} />
  {/* <meta name="keywords" content={`${subCategoryName}, beauty, cosmetics, makeup, ${subCategoryName} products`} /> */}
  <meta name="keywords" content={`${subCategoryName}, beauty, cosmetics, makeup, ${subCategoryName} products, face makeup, eye makeup, lipsticks, foundations, concealers, blush, bronzer, highlighter, mascara, eyeliner, eyeshadow, makeup brushes, makeup tools, setting spray, primer, makeup remover, cruelty-free makeup, waterproof makeup, vegan makeup, makeup kits, contour, makeup trends, affordable makeup, professional makeup, makeup palette, skin care, glowing skin, natural makeup, glam makeup, long lasting makeup, matte lipstick, liquid foundation, makeup tutorial, bridal makeup, makeup sale, makeup deals, makeup online Cameroon"`} />
  <link rel="canonical" href={`https://www.esmakeupstore.com/${valideURLConvert(subCategoryName)}-${subCategoryId}`} />
  <meta name="robots" content="index, follow" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Essentialist Makeup Store" />
  <meta property="og:url" content={`https://www.esmakeupstore.com/${valideURLConvert(subCategoryName)}-${subCategoryId}`} />
  <meta property="og:title" content={`${subCategoryName} - Essentialist Makeup Store | Makeup Essentials`} />
  <meta property="og:description" content={`Discover the best of ${subCategoryName} at Essentialist Makeup Store.`} />
  <meta property="og:image" content="https://www.esmakeupstore.com/assets/logo.jpg" />
</Helmet>
 <section className='sticky top-24 lg:top-20'>
      <div className='container sticky top-24  mx-auto grid grid-cols-[90px,1fr]  md:grid-cols-[200px,1fr] lg:grid-cols-[280px,1fr]'>
        {/**sub category **/}
        <div className=' min-h-[88vh] max-h-[88vh] overflow-y-scroll  grid gap-1 shadow-md scrollbarCustom bg-white py-2'>
          {
            DisplaySubCatory.map((s, index) => {
               const link = `/${valideURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${valideURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`w-full p-2 lg:flex items-center lg:w-full lg:h-16 box-border lg:gap-4 border-b 
                  hover:bg-green-100 cursor-pointer
                  ${subCategoryId === s._id ? "bg-green-100" : ""}
                `}
                >
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded  box-border' >
                    <img
                      src={s.image}
                      alt='subCategory'
                      className=' w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base sm:text-sm text-pink-400 font-semibold py-6 lg:py-0'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>


        {/**Product **/}
        <div className='sticky top-20'>
          <div className='bg-white shadow-md p-4 z-10'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

           <div className='min-h-[80vh] max-h-[80vh] overflow-y-auto relative'>
            <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 '>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}
                      />
                    )
                  })
                }
              </div>
           </div>

            {
              loading && (
                <Loading />
              )
            }

          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default ProductListPage