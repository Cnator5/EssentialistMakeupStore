// import React, { useState } from 'react'
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux'
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import successAlert from '../utils/SuccessAlert';
// import { useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const UploadProduct = () => {
//   const [data,setData] = useState({
//       name : "",
//       image : [],
//       category : [],
//       subCategory : [],
//       unit : "",
//       stock : "",
//       price : "",
//       discount : "",
//       description : "",
//       more_details : {},
//   })
//   const [imageLoading,setImageLoading] = useState(false)
//   const [ViewImageURL,setViewImageURL] = useState("")
//   const allCategory = useSelector(state => state.product.allCategory)
//   const [selectCategory,setSelectCategory] = useState("")
//   const [selectSubCategory,setSelectSubCategory] = useState("")
//   const allSubCategory = useSelector(state => state.product.allSubCategory)

//   const [openAddField,setOpenAddField] = useState(false)
//   const [fieldName,setFieldName] = useState("")

//   // Quill editor modules and formats
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };
  
//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'link', 'image'
//   ];


//   const handleChange = (e)=>{
//     const { name, value} = e.target 

//     setData((preve)=>{
//       return{
//           ...preve,
//           [name]  : value
//       }
//     })
//   }

//    // Handle Quill editor change
//   const handleQuillChange = (content) => {
//     setData((prev) => {
//       return {
//         ...prev,
//         description: content
//       }
//     })
//   }

//   const handleUploadImage = async(e)=>{
//     const file = e.target.files[0]

//     if(!file){
//       return 
//     }
//     setImageLoading(true)
//     const response = await uploadImage(file)
//     const { data : ImageResponse } = response
//     const imageUrl = ImageResponse.data.url 

//     setData((preve)=>{
//       return{
//         ...preve,
//         image : [...preve.image,imageUrl]
//       }
//     })
//     setImageLoading(false)

//   }

//   const handleDeleteImage = async(index)=>{
//       data.image.splice(index,1)
//       setData((preve)=>{
//         return{
//             ...preve
//         }
//       })
//   }

//   const handleRemoveCategory = async(index)=>{
//     data.category.splice(index,1)
//     setData((preve)=>{
//       return{
//         ...preve
//       }
//     })
//   }
//   const handleRemoveSubCategory = async(index)=>{
//       data.subCategory.splice(index,1)
//       setData((preve)=>{
//         return{
//           ...preve
//         }
//       })
//   }

//   const handleAddField = ()=>{
//     setData((preve)=>{
//       return{
//           ...preve,
//           more_details : {
//             ...preve.more_details,
//             [fieldName] : ""
//           }
//       }
//     })
//     setFieldName("")
//     setOpenAddField(false)
//   }

//   const handleSubmit = async(e)=>{
//     e.preventDefault()
//     console.log("data",data)

//     try {
//       const response = await Axios({
//           ...SummaryApi.createProduct,
//           data : data
//       })
//       const { data : responseData} = response

//       if(responseData.success){
//           successAlert(responseData.message)
//           setData({
//             name : "",
//             image : [],
//             category : [],
//             subCategory : [],
//             unit : "",
//             stock : "",
//             price : "",
//             discount : "",
//             description : "",
//             more_details : {},
//           })

//       }
//     } catch (error) {
//         AxiosToastError(error)
//     }


//   }

//   // useEffect(()=>{
//   //   successAlert("Upload successfully")
//   // },[])
//   return (
//     <section className=''>
//         <div className='p-2   bg-white shadow-md flex items-center justify-between'>
//             <h2 className='font-semibold'>Upload Product</h2>
//         </div>
//         <div className='grid p-3'>
//             <form className='grid gap-4' onSubmit={handleSubmit}>
//                 <div className='grid gap-1'>
//                   <label htmlFor='name' className='font-medium'>Name</label>
//                   <input 
//                     id='name'
//                     type='text'
//                     placeholder='Enter product name'
//                     name='name'
//                     value={data.name}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>
//                 {/* <div className='grid gap-1'>
//                   <label htmlFor='description' className='font-medium'>Description</label>
//                   <textarea 
//                     id='description'
//                     type='text'
//                     placeholder='Enter product description'
//                     name='description'
//                     value={data.description}
//                     onChange={handleChange}
//                     required
//                     multiple 
//                     rows={3}
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded resize-none'
//                   />
//                 </div> */}
//                 <div className='grid gap-1'>
//             <label htmlFor='description' className='font-medium'>Description</label>
//             <div className="bg-blue-50 border rounded">
//               <ReactQuill
//                 theme="snow"
//                 value={data.description}
//                 onChange={handleQuillChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Enter product description"
//                 className="quill-editor"
//               />
//             </div>
//           </div>
//                 <div>
//                     <p className='font-medium'>Image</p>
//                     <div>
//                       <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'>
//                           <div className='text-center flex justify-center items-center flex-col'>
//                             {
//                               imageLoading ?  <Loading/> : (
//                                 <>
//                                    <FaCloudUploadAlt size={35}/>
//                                    <p>Upload Image</p>
//                                 </>
//                               )
//                             }
//                           </div>
//                           <input 
//                             type='file'
//                             id='productImage'
//                             className='hidden'
//                             accept='image/*'
//                             onChange={handleUploadImage}
//                           />
//                       </label>
//                       {/**display uploded image*/}
//                       <div className='flex flex-wrap gap-4'>
//                         {
//                           data.image.map((img,index) =>{
//                               return(
//                                 <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
//                                   <img
//                                     src={img}
//                                     alt={img}
//                                     className='w-full h-full object-scale-down cursor-pointer' 
//                                     onClick={()=>setViewImageURL(img)}
//                                   />
//                                   <div onClick={()=>handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
//                                     <MdDelete/>
//                                   </div>
//                                 </div>
//                               )
//                           })
//                         }
//                       </div>
//                     </div>

//                 </div>
//                 <div className='grid gap-1'>
//                   <label className='font-medium'>Category</label>
//                   <div>
//                     <select
//                       className='bg-blue-50 border w-full p-2 rounded'
//                       value={selectCategory}
//                       onChange={(e)=>{
//                         const value = e.target.value 
//                         const category = allCategory.find(el => el._id === value )
                        
//                         setData((preve)=>{
//                           return{
//                             ...preve,
//                             category : [...preve.category,category],
//                           }
//                         })
//                         setSelectCategory("")
//                       }}
//                     >
//                       <option value={""}>Select Category</option>
//                       {
//                         allCategory.map((c,index)=>{ 
//                           return(
//                             <option value={c?._id}>{c.name}</option>
//                           )
//                         })
//                       }
//                     </select>
//                     <div className='flex flex-wrap gap-3'>
//                       {
//                         data.category.map((c,index)=>{
//                           return(
//                             <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                               <p>{c.name}</p>
//                               <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveCategory(index)}>
//                                 <IoClose size={20}/>
//                               </div>
//                             </div>
//                           )
//                         })
//                       }
//                     </div>
//                   </div>
//                 </div>
//                 <div className='grid gap-1'>
//                   <label className='font-medium'>Sub Category</label>
//                   <div>
//                     <select
//                       className='bg-blue-50 border w-full p-2 rounded'
//                       value={selectSubCategory}
//                       onChange={(e)=>{
//                         const value = e.target.value 
//                         const subCategory = allSubCategory.find(el => el._id === value )

//                         setData((preve)=>{
//                           return{
//                             ...preve,
//                             subCategory : [...preve.subCategory,subCategory]
//                           }
//                         })
//                         setSelectSubCategory("")
//                       }}
//                     >
//                       <option value={""} className='text-neutral-600'>Select Sub Category</option>
//                       {
//                         allSubCategory.map((c,index)=>{
//                           return(
//                             <option value={c?._id}>{c.name}</option>
//                           )
//                         })
//                       }
//                     </select>
//                     <div className='flex flex-wrap gap-3'>
//                       {
//                         data.subCategory.map((c,index)=>{
//                           return(
//                             <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                               <p>{c.name}</p>
//                               <div className='hover:text-red-500 cursor-pointer' onClick={()=>handleRemoveSubCategory(index)}>
//                                 <IoClose size={20}/>
//                               </div>
//                             </div>
//                           )
//                         })
//                       }
//                     </div>
//                   </div>
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='unit' className='font-medium'>Unit</label>
//                   <input 
//                     id='unit'
//                     type='text'
//                     placeholder='Enter product unit'
//                     name='unit'
//                     value={data.unit}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='stock' className='font-medium'>Number of Stock</label>
//                   <input 
//                     id='stock'
//                     type='number'
//                     placeholder='Enter product stock'
//                     name='stock'
//                     value={data.stock}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='price' className='font-medium'>Price</label>
//                   <input 
//                     id='price'
//                     type='number'
//                     placeholder='Enter product price'
//                     name='price'
//                     value={data.price}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>

//                 <div className='grid gap-1'>
//                   <label htmlFor='discount' className='font-medium'>Discount</label>
//                   <input 
//                     id='discount'
//                     type='number'
//                     placeholder='Enter product discount'
//                     name='discount'
//                     value={data.discount}
//                     onChange={handleChange}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>


//                 {/**add more field**/}
//                   {
//                     Object?.keys(data?.more_details)?.map((k,index)=>{
//                         return(
//                           <div className='grid gap-1'>
//                             <label htmlFor={k} className='font-medium'>{k}</label>
//                             <input 
//                               id={k}
//                               type='text'
//                               value={data?.more_details[k]}
//                               onChange={(e)=>{
//                                   const value = e.target.value 
//                                   setData((preve)=>{
//                                     return{
//                                         ...preve,
//                                         more_details : {
//                                           ...preve.more_details,
//                                           [k] : value
//                                         }
//                                     }
//                                   })
//                               }}
//                               required
//                               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                             />
//                           </div>
//                         )
//                     })
//                   }

//                 <div onClick={()=>setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//                   Add Fields
//                 </div>

//                 <button
//                   className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
//                 >
//                   Submit
//                 </button>
//             </form>
//         </div>

//         {
//           ViewImageURL && (
//             <ViewImage url={ViewImageURL} close={()=>setViewImageURL("")}/>
//           )
//         }

//         {
//           openAddField && (
//             <AddFieldComponent 
//               value={fieldName}
//               onChange={(e)=>setFieldName(e.target.value)}
//               submit={handleAddField}
//               close={()=>setOpenAddField(false)} 
//             />
//           )
//         }
//     </section>
//   )
// }

// export default UploadProduct



// import React, { useState, useRef } from 'react'
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux'
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import successAlert from '../utils/SuccessAlert';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// const UploadProduct = () => {
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     stock: "",
//     price: "",
//     discount: "",
//     description: "",
//     more_details: {},
//   })
//   const [imageLoading, setImageLoading] = useState(false)
//   const [ViewImageURL, setViewImageURL] = useState("")
//   const allCategory = useSelector(state => state.product.allCategory)
//   const [selectCategory, setSelectCategory] = useState("")
//   const [selectSubCategory, setSelectSubCategory] = useState("")
//   const allSubCategory = useSelector(state => state.product.allSubCategory)

//   const [openAddField, setOpenAddField] = useState(false)
//   const [fieldName, setFieldName] = useState("")
//   const multipleFileInputRef = useRef(null);

//   // Quill editor modules and formats
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };
  
//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'link', 'image'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     })
//   }

//   // Handle Quill editor change
//   const handleQuillChange = (content) => {
//     setData((prev) => {
//       return {
//         ...prev,
//         description: content
//       }
//     })
//   }

//   // Single image upload
//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0]

//     if (!file) {
//       return
//     }
//     setImageLoading(true)
//     const response = await uploadImage(file)
//     const { data: ImageResponse } = response
//     const imageUrl = ImageResponse.data.url

//     setData((preve) => {
//       return {
//         ...preve,
//         image: [...preve.image, imageUrl]
//       }
//     })
//     setImageLoading(false)
//   }

//   // Multiple image upload
//   const handleMultipleUploadImages = async (e) => {
//     const files = e.target.files;
    
//     if (!files || files.length === 0) {
//       return;
//     }
    
//     setImageLoading(true);
//     const newImages = [...data.image];
    
//     // Process each file
//     for (let i = 0; i < files.length; i++) {
//       try {
//         const response = await uploadImage(files[i]);
//         const { data: ImageResponse } = response;
//         const imageUrl = ImageResponse.data.url;
//         newImages.push(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
    
//     setData((prev) => ({
//       ...prev,
//       image: newImages
//     }));
    
//     setImageLoading(false);
//   }

//   const handleDeleteImage = async (index) => {
//     data.image.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }

//   const handleRemoveCategory = async (index) => {
//     data.category.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }
//   const handleRemoveSubCategory = async (index) => {
//     data.subCategory.splice(index, 1)
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     })
//   }

//   const handleAddField = () => {
//     setData((preve) => {
//       return {
//         ...preve,
//         more_details: {
//           ...preve.more_details,
//           [fieldName]: ""
//         }
//       }
//     })
//     setFieldName("")
//     setOpenAddField(false)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log("data", data)

//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: data
//       })
//       const { data: responseData } = response

//       if (responseData.success) {
//         successAlert(responseData.message)
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           discount: "",
//           description: "",
//           more_details: {},
//         })
//       }
//     } catch (error) {
//       AxiosToastError(error)
//     }
//   }

//   return (
//     <section className=''>
//       <div className='p-2 bg-white shadow-md flex items-center justify-between'>
//         <h2 className='font-semibold'>Upload Product</h2>
//       </div>
//       <div className='grid p-3'>
//         <form className='grid gap-4' onSubmit={handleSubmit}>
//           <div className='grid gap-1'>
//             <label htmlFor='name' className='font-medium'>Name</label>
//             <input
//               id='name'
//               type='text'
//               placeholder='Enter product name'
//               name='name'
//               value={data.name}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>
//           <div className='grid gap-1'>
//             <label htmlFor='description' className='font-medium'>Description</label>
//             <div className="bg-blue-50 border rounded">
//               <ReactQuill
//                 theme="snow"
//                 value={data.description}
//                 onChange={handleQuillChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Enter product description"
//                 className="quill-editor"
//               />
//             </div>
//           </div>
//           <div>
//             <p className='font-medium'>Images</p>
//             <div>
//               {/* Single image upload option */}
//              {/*  <label htmlFor='productImage' className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer mb-2'>
//                 <div className='text-center flex justify-center items-center flex-col'>
//                   {
//                     imageLoading ? <Loading /> : (
//                       <>
//                         <FaCloudUploadAlt size={35} />
//                         <p>Upload Single Image</p>
//                       </>
//                     )
//                   }
//                 </div>
//                 <input
//                   type='file'
//                   id='productImage'
//                   className='hidden'
//                   accept='image/*'
//                   onChange={handleUploadImage}
//                 />
//               </label> */}

//               {/* Multiple image upload option */}
//               <label 
//                 htmlFor='multipleProductImages' 
//                 className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'
//               >
//                 <div className='text-center flex justify-center items-center flex-col'>
//                   {
//                     imageLoading ? <Loading /> : (
//                       <>
//                         <FaCloudUploadAlt size={35} />
//                         <p>Upload Multiple Images</p>
//                       </>
//                     )
//                   }
//                 </div>
//                 <input
//                   type='file'
//                   id='multipleProductImages'
//                   className='hidden'
//                   accept='image/*'
//                   multiple
//                   ref={multipleFileInputRef}
//                   onChange={handleMultipleUploadImages}
//                 />
//               </label>
              
//               {/* Display uploaded images */}
//               <div className='flex flex-wrap gap-4 mt-4'>
//                 {
//                   data.image.map((img, index) => {
//                     return (
//                       <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
//                         <img
//                           src={img}
//                           alt={img}
//                           className='w-full h-full object-scale-down cursor-pointer'
//                           onClick={() => setViewImageURL(img)}
//                         />
//                         <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
//                           <MdDelete />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>

//           <div className='grid gap-1'>
//             <label className='font-medium'>Category</label>
//             <div>
//               <select
//                 className='bg-blue-50 border w-full p-2 rounded'
//                 value={selectCategory}
//                 onChange={(e) => {
//                   const value = e.target.value
//                   const category = allCategory.find(el => el._id === value)

//                   setData((preve) => {
//                     return {
//                       ...preve,
//                       category: [...preve.category, category],
//                     }
//                   })
//                   setSelectCategory("")
//                 }}
//               >
//                 <option value={""}>Select Category</option>
//                 {
//                   allCategory.map((c, index) => {
//                     return (
//                       <option key={c._id} value={c?._id}>{c.name}</option>
//                     )
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.category.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>
//           <div className='grid gap-1'>
//             <label className='font-medium'>Sub Category</label>
//             <div>
//               <select
//                 className='bg-blue-50 border w-full p-2 rounded'
//                 value={selectSubCategory}
//                 onChange={(e) => {
//                   const value = e.target.value
//                   const subCategory = allSubCategory.find(el => el._id === value)

//                   setData((preve) => {
//                     return {
//                       ...preve,
//                       subCategory: [...preve.subCategory, subCategory]
//                     }
//                   })
//                   setSelectSubCategory("")
//                 }}
//               >
//                 <option value={""} className='text-neutral-600'>Select Sub Category</option>
//                 {
//                   allSubCategory.map((c, index) => {
//                     return (
//                       <option key={c._id} value={c?._id}>{c.name}</option>
//                     )
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.subCategory.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>

//           <div className='grid gap-1'>
//             <label htmlFor='unit' className='font-medium'>Unit</label>
//             <input
//               id='unit'
//               type='text'
//               placeholder='Enter product unit'
//               name='unit'
//               value={data.unit}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//           <div className='grid gap-1'>
//             <label htmlFor='stock' className='font-medium'>Number of Stock</label>
//             <input
//               id='stock'
//               type='number'
//               placeholder='Enter product stock'
//               name='stock'
//               value={data.stock}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//           <div className='grid gap-1'>
//             <label htmlFor='price' className='font-medium'>Price</label>
//             <input
//               id='price'
//               type='number'
//               placeholder='Enter product price'
//               name='price'
//               value={data.price}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//           <div className='grid gap-1'>
//             <label htmlFor='discount' className='font-medium'>Discount</label>
//             <input
//               id='discount'
//               type='number'
//               placeholder='Enter product discount'
//               name='discount'
//               value={data.discount}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//           {/**add more field**/}
//           {
//             Object?.keys(data?.more_details)?.map((k, index) => {
//               return (
//                 <div key={k + index} className='grid gap-1'>
//                   <label htmlFor={k} className='font-medium'>{k}</label>
//                   <input
//                     id={k}
//                     type='text'
//                     value={data?.more_details[k]}
//                     onChange={(e) => {
//                       const value = e.target.value
//                       setData((preve) => {
//                         return {
//                           ...preve,
//                           more_details: {
//                             ...preve.more_details,
//                             [k]: value
//                           }
//                         }
//                       })
//                     }}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>
//               )
//             })
//           }

//           <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//             Add Fields
//           </div>

//           <button
//             className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {
//         ViewImageURL && (
//           <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
//         )
//       }

//       {
//         openAddField && (
//           <AddFieldComponent
//             value={fieldName}
//             onChange={(e) => setFieldName(e.target.value)}
//             submit={handleAddField}
//             close={() => setOpenAddField(false)}
//           />
//         )
//       }
//     </section>
//   )
// }

// export default UploadProduct

// import React, { useState, useRef } from 'react';
// import { FaCloudUploadAlt } from "react-icons/fa";
// import uploadImage from '../utils/UploadImage';
// import Loading from '../components/Loading';
// import ViewImage from '../components/ViewImage';
// import { MdDelete } from "react-icons/md";
// import { useSelector } from 'react-redux';
// import { IoClose } from "react-icons/io5";
// import AddFieldComponent from '../components/AddFieldComponent';
// import Axios from '../utils/Axios';
// import SummaryApi from '../common/SummaryApi';
// import AxiosToastError from '../utils/AxiosToastError';
// import successAlert from '../utils/SuccessAlert';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// // Add custom CSS for double line spacing
// const customQuillStyles = `
//   .quill-editor .ql-editor {
//     line-height: 2.0;
//   }
  
//   .plain-text-area {
//     width: 100%;
//     min-height: 200px;
//     line-height: 2.0;
//     padding: 12px;
//     white-space: pre-wrap;
//     font-family: inherit;
//     background-color: rgb(239 246 255);
//     border: 1px solid #e2e8f0;
//     border-radius: 0.25rem;
//     outline: none;
//   }
  
//   .plain-text-area:focus {
//     border-color: #93c5fd;
//   }
// `;

// const UploadProduct = () => {
//   const [data, setData] = useState({
//     name: "",
//     image: [],
//     category: [],
//     subCategory: [],
//     unit: "",
//     stock: "",
//     price: "",
//     bulkPrice: "", // New field for bulk price
//     discount: "",
//     description: "",
//     plainTextDetails: "", // New field for plain text that preserves formatting
//     more_details: {},
//   });
//   const [imageLoading, setImageLoading] = useState(false);
//   const [ViewImageURL, setViewImageURL] = useState("");
//   const allCategory = useSelector(state => state.product.allCategory);
//   const [selectCategory, setSelectCategory] = useState("");
//   const [selectSubCategory, setSelectSubCategory] = useState("");
//   const allSubCategory = useSelector(state => state.product.allSubCategory);

//   const [openAddField, setOpenAddField] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const multipleFileInputRef = useRef(null);

//   // Quill editor modules and formats
//   const modules = {
//     toolbar: [
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['link', 'image'],
//       ['clean']
//     ],
//   };
  
//   const formats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'link', 'image'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((preve) => {
//       return {
//         ...preve,
//         [name]: value
//       }
//     });
//   };

//   // Handle Quill editor change
//   const handleQuillChange = (content) => {
//     setData((prev) => {
//       return {
//         ...prev,
//         description: content
//       }
//     });
//   };

//   // Handle plain text change
//   const handlePlainTextChange = (e) => {
//     setData((prev) => {
//       return {
//         ...prev,
//         plainTextDetails: e.target.value
//       }
//     });
//   };

//   // Single image upload
//   const handleUploadImage = async (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }
//     setImageLoading(true);
//     const response = await uploadImage(file);
//     const { data: ImageResponse } = response;
//     const imageUrl = ImageResponse.data.url;

//     setData((preve) => {
//       return {
//         ...preve,
//         image: [...preve.image, imageUrl]
//       }
//     });
//     setImageLoading(false);
//   };

//   // Multiple image upload
//   const handleMultipleUploadImages = async (e) => {
//     const files = e.target.files;
    
//     if (!files || files.length === 0) {
//       return;
//     }
    
//     setImageLoading(true);
//     const newImages = [...data.image];
    
//     // Process each file
//     for (let i = 0; i < files.length; i++) {
//       try {
//         const response = await uploadImage(files[i]);
//         const { data: ImageResponse } = response;
//         const imageUrl = ImageResponse.data.url;
//         newImages.push(imageUrl);
//       } catch (error) {
//         console.error("Error uploading image:", error);
//       }
//     }
    
//     setData((prev) => ({
//       ...prev,
//       image: newImages
//     }));
    
//     setImageLoading(false);
//   };

//   const handleDeleteImage = async (index) => {
//     data.image.splice(index, 1);
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     });
//   };

//   const handleRemoveCategory = async (index) => {
//     data.category.splice(index, 1);
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     });
//   };
  
//   const handleRemoveSubCategory = async (index) => {
//     data.subCategory.splice(index, 1);
//     setData((preve) => {
//       return {
//         ...preve
//       }
//     });
//   };

//   const handleAddField = () => {
//     setData((preve) => {
//       return {
//         ...preve,
//         more_details: {
//           ...preve.more_details,
//           [fieldName]: ""
//         }
//       }
//     });
//     setFieldName("");
//     setOpenAddField(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("data", data);

//     try {
//       const response = await Axios({
//         ...SummaryApi.createProduct,
//         data: data
//       });
//       const { data: responseData } = response;

//       if (responseData.success) {
//         successAlert(responseData.message);
//         setData({
//           name: "",
//           image: [],
//           category: [],
//           subCategory: [],
//           unit: "",
//           stock: "",
//           price: "",
//           bulkPrice: "",
//           discount: "",
//           description: "",
//           plainTextDetails: "",
//           more_details: {},
//         });
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };

//   return (
//     <section className=''>
//       {/* Add the custom styles */}
//       <style>{customQuillStyles}</style>
      
//       <div className='p-2 bg-white shadow-md flex items-center justify-between'>
//         <h2 className='font-semibold'>Upload Product</h2>
//       </div>
//       <div className='grid p-3'>
//         <form className='grid gap-4' onSubmit={handleSubmit}>
//           <div className='grid gap-1'>
//             <label htmlFor='name' className='font-medium'>Name</label>
//             <input
//               id='name'
//               type='text'
//               placeholder='Enter product name'
//               name='name'
//               value={data.name}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>
//           <div className='grid gap-1'>
//             <label htmlFor='plainTextDetails' className='font-medium'>Description (Rich Text)</label>
//             <div className="bg-blue-50 border rounded">
//               <ReactQuill
//                 theme="snow"
//                 value={data.description}
//                 onChange={handleQuillChange}
//                 modules={modules}
//                 formats={formats}
//                 placeholder="Enter product description"
//                 className="quill-editor"
//               />
//             </div>
//           </div>
          
//           {/* New Plain Text Area that preserves formatting */}
//           <div className='grid gap-1'>
//             <label htmlFor='plainTextDetails' className='font-medium'>Additional Details (Plain Text - Preserves Formatting)</label>
//             <textarea
//               id='plainTextDetails'
//               name='plainTextDetails'
//               value={data.plainTextDetails}
//               onChange={handlePlainTextChange}
//               placeholder='Paste formatted text here (e.g., Color: Blue, Brand: NYx)'
//               className='plain-text-area'
//             />
//           </div>

//           <div>
//             <p className='font-medium'>Images</p>
//             <div>
//               {/* Multiple image upload option */}
//               <label 
//                 htmlFor='multipleProductImages' 
//                 className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'
//               >
//                 <div className='text-center flex justify-center items-center flex-col'>
//                   {
//                     imageLoading ? <Loading /> : (
//                       <>
//                         <FaCloudUploadAlt size={35} />
//                         <p>Upload Multiple Images</p>
//                       </>
//                     )
//                   }
//                 </div>
//                 <input
//                   type='file'
//                   id='multipleProductImages'
//                   className='hidden'
//                   accept='image/*'
//                   multiple
//                   ref={multipleFileInputRef}
//                   onChange={handleMultipleUploadImages}
//                 />
//               </label>
              
//               {/* Display uploaded images */}
//               <div className='flex flex-wrap gap-4 mt-4'>
//                 {
//                   data.image.map((img, index) => {
//                     return (
//                       <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
//                         <img
//                           src={img}
//                           alt={img}
//                           className='w-full h-full object-scale-down cursor-pointer'
//                           onClick={() => setViewImageURL(img)}
//                         />
//                         <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
//                           <MdDelete />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>

//           <div className='grid gap-1'>
//             <label className='font-medium'>Category</label>
//             <div>
//               <select
//                 className='bg-blue-50 border w-full p-2 rounded'
//                 value={selectCategory}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   const category = allCategory.find(el => el._id === value);

//                   setData((preve) => {
//                     return {
//                       ...preve,
//                       category: [...preve.category, category],
//                     }
//                   });
//                   setSelectCategory("");
//                 }}
//               >
//                 <option value={""}>Select Category</option>
//                 {
//                   allCategory.map((c, index) => {
//                     return (
//                       <option key={c._id} value={c?._id}>{c.name}</option>
//                     )
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.category.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>
//           <div className='grid gap-1'>
//             <label className='font-medium'>Sub Category</label>
//             <div>
//               <select
//                 className='bg-blue-50 border w-full p-2 rounded'
//                 value={selectSubCategory}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   const subCategory = allSubCategory.find(el => el._id === value);

//                   setData((preve) => {
//                     return {
//                       ...preve,
//                       subCategory: [...preve.subCategory, subCategory]
//                     }
//                   });
//                   setSelectSubCategory("");
//                 }}
//               >
//                 <option value={""} className='text-neutral-600'>Select Sub Category</option>
//                 {
//                   allSubCategory.map((c, index) => {
//                     return (
//                       <option key={c._id} value={c?._id}>{c.name}</option>
//                     )
//                   })
//                 }
//               </select>
//               <div className='flex flex-wrap gap-3'>
//                 {
//                   data.subCategory.map((c, index) => {
//                     return (
//                       <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
//                         <p>{c.name}</p>
//                         <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
//                           <IoClose size={20} />
//                         </div>
//                       </div>
//                     )
//                   })
//                 }
//               </div>
//             </div>
//           </div>

//         {/*   <div className='grid gap-1'>
//             <label htmlFor='unit' className='font-medium'>Unit</label>
//             <input
//               id='unit'
//               type='text'
//               placeholder='Enter product unit'
//               name='unit'
//               value={data.unit}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div> */}

//           <div className='grid gap-1'>
//             <label htmlFor='stock' className='font-medium'>Number of Stock</label>
//             <input
//               id='stock'
//               type='number'
//               placeholder='Enter product stock'
//               name='stock'
//               value={data.stock}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//           <div className='grid gap-1'>
//             <label htmlFor='price' className='font-medium'>Price</label>
//             <input
//               id='price'
//               type='number'
//               placeholder='Enter product price'
//               name='price'
//               value={data.price}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>
//           <div className='grid gap-1'>
//             <label htmlFor='bulkPrice' className='font-medium'>Bulk Price</label>
//             <input
//               id='bulkPrice'
//               type='number'
//               placeholder='Enter product bulk price'
//               name='bulkPrice'
//               value={data.bulkPrice}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div>

//          {/*  <div className='grid gap-1'>
//             <label htmlFor='discount' className='font-medium'>Discount</label>
//             <input
//               id='discount'
//               type='number'
//               placeholder='Enter product discount'
//               name='discount'
//               value={data.discount}
//               onChange={handleChange}
//               required
//               className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//             />
//           </div> */}

//           {/**add more field**/}
//           {
//             Object?.keys(data?.more_details)?.map((k, index) => {
//               return (
//                 <div key={k + index} className='grid gap-1'>
//                   <label htmlFor={k} className='font-medium'>{k}</label>
//                   <input
//                     id={k}
//                     type='text'
//                     value={data?.more_details[k]}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       setData((preve) => {
//                         return {
//                           ...preve,
//                           more_details: {
//                             ...preve.more_details,
//                             [k]: value
//                           }
//                         }
//                       });
//                     }}
//                     required
//                     className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
//                   />
//                 </div>
//               )
//             })
//           }

//           <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
//             Add Fields
//           </div>

//           <button
//             className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {
//         ViewImageURL && (
//           <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
//         )
//       }

//       {
//         openAddField && (
//           <AddFieldComponent
//             value={fieldName}
//             onChange={(e) => setFieldName(e.target.value)}
//             submit={handleAddField}
//             close={() => setOpenAddField(false)}
//           />
//         )
//       }
//     </section>
//   );
// };

// export default UploadProduct;

import React, { useState, useRef } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../utils/UploadImage';
import Loading from '../components/Loading';
import ViewImage from '../components/ViewImage';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import successAlert from '../utils/SuccessAlert';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Add custom CSS for double line spacing and tabular format
const customQuillStyles = `
  .quill-editor .ql-editor {
    line-height: 2.0;
  }
  
  .plain-text-area {
    width: 100%;
    min-height: 200px;
    line-height: 1.8;
    padding: 12px;
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    background-color: rgb(239 246 255);
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    outline: none;
    tab-size: 4;
    font-size: 14px;
  }
  
  .plain-text-area:focus {
    border-color: #93c5fd;
  }

  .tabular-display {
    white-space: pre-wrap;
    font-family: 'Courier New', monospace;
    line-height: 1.8;
    background-color: #f8fafc;
    padding: 12px;
    border-radius: 0.25rem;
    border: 1px solid #e2e8f0;
    font-size: 14px;
    tab-size: 4;
    overflow-x: auto;
  }

  .tabular-display::selection {
    background-color: #bfdbfe;
  }

  .tabular-display::-moz-selection {
    background-color: #bfdbfe;
  }
`;

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    bulkPrice: "", // New field for bulk price
    discount: "",
    description: "",
    plainTextDetails: "", // New field for plain text that preserves formatting
    more_details: {},
  });
  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageURL, setViewImageURL] = useState("");
  const allCategory = useSelector(state => state.product.allCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");
  const allSubCategory = useSelector(state => state.product.allSubCategory);

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");
  const multipleFileInputRef = useRef(null);

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image'],
      ['clean']
    ],
  };
  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    });
  };

  // Handle Quill editor change
  const handleQuillChange = (content) => {
    setData((prev) => {
      return {
        ...prev,
        description: content
      }
    });
  };

  // Handle plain text change with tab formatting
  const handlePlainTextChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        plainTextDetails: e.target.value
      }
    });
  };

  // Handle tab key in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      const newValue = value.substring(0, start) + '\t' + value.substring(end);
      
      setData((prev) => ({
        ...prev,
        plainTextDetails: newValue
      }));
      
      // Reset cursor position
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1;
      }, 0);
    }
  };

  // Single image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl]
      }
    });
    setImageLoading(false);
  };

  // Multiple image upload
  const handleMultipleUploadImages = async (e) => {
    const files = e.target.files;
    
    if (!files || files.length === 0) {
      return;
    }
    
    setImageLoading(true);
    const newImages = [...data.image];
    
    // Process each file
    for (let i = 0; i < files.length; i++) {
      try {
        const response = await uploadImage(files[i]);
        const { data: ImageResponse } = response;
        const imageUrl = ImageResponse.data.url;
        newImages.push(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
    
    setData((prev) => ({
      ...prev,
      image: newImages
    }));
    
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    });
  };
  
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve
      }
    });
  };

  const handleAddField = () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: ""
        }
      }
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("data", data);

    try {
      const response = await Axios({
        ...SummaryApi.createProduct,
        data: data
      });
      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          bulkPrice: "",
          discount: "",
          description: "",
          plainTextDetails: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className=''>
      {/* Add the custom styles */}
      <style>{customQuillStyles}</style>
      
      <div className='p-2 bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Upload Product</h2>
      </div>
      <div className='grid p-3'>
        <form className='grid gap-4' onSubmit={handleSubmit}>
          <div className='grid gap-1'>
            <label htmlFor='name' className='font-medium'>Name</label>
            <input
              id='name'
              type='text'
              placeholder='Enter product name'
              name='name'
              value={data.name}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='description' className='font-medium'>Description (Rich Text)</label>
            <div className="bg-blue-50 border rounded">
              <ReactQuill
                theme="snow"
                value={data.description}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                placeholder="Enter product description"
                className="quill-editor"
              />
            </div>
          </div>
          
          {/* Plain Text Area that preserves tabular formatting */}
          <div className='grid gap-1'>
            <label htmlFor='plainTextDetails' className='font-medium'>
              Product Specifications (Tabular Format)
            </label>
            <p className='text-sm text-gray-600 mb-2'>
              Use Tab key to align columns. Format: "Property[Tab]Value" on each line.
              <br />
              Example: Color[Tab]Blue, then press Enter for next line.
            </p>
            <textarea
              id='plainTextDetails'
              name='plainTextDetails'
              value={data.plainTextDetails}
              onChange={handlePlainTextChange}
              onKeyDown={handleKeyDown}
              placeholder={`Item Form\tPowder\nColor\tNatural Tan\nSkin Type\tNormal\nFinish Type\tSheer\nRecommended Uses\tConcealer`}
              className='plain-text-area'
            />
            {/* Preview */}
            {data.plainTextDetails && (
              <div className='grid gap-1 mt-2'>
                <label className='font-medium text-sm'>Preview:</label>
                <div className='tabular-display'>
                  {data.plainTextDetails}
                </div>
              </div>
            )}
          </div>

          <div>
            <p className='font-medium'>Images</p>
            <div>
              {/* Multiple image upload option */}
              <label 
                htmlFor='multipleProductImages' 
                className='bg-blue-50 h-24 border rounded flex justify-center items-center cursor-pointer'
              >
                <div className='text-center flex justify-center items-center flex-col'>
                  {
                    imageLoading ? <Loading /> : (
                      <>
                        <FaCloudUploadAlt size={35} />
                        <p>Upload Multiple Images</p>
                      </>
                    )
                  }
                </div>
                <input
                  type='file'
                  id='multipleProductImages'
                  className='hidden'
                  accept='image/*'
                  multiple
                  ref={multipleFileInputRef}
                  onChange={handleMultipleUploadImages}
                />
              </label>
              
              {/* Display uploaded images */}
              <div className='flex flex-wrap gap-4 mt-4'>
                {
                  data.image.map((img, index) => {
                    return (
                      <div key={img + index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border relative group'>
                        <img
                          src={img}
                          alt={img}
                          className='w-full h-full object-scale-down cursor-pointer'
                          onClick={() => setViewImageURL(img)}
                        />
                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 hover:bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                          <MdDelete />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label className='font-medium'>Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const category = allCategory.find(el => el._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      category: [...preve.category, category],
                    }
                  });
                  setSelectCategory("");
                }}
              >
                <option value={""}>Select Category</option>
                {
                  allCategory.map((c, index) => {
                    return (
                      <option key={c._id} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.category.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label className='font-medium'>Sub Category</label>
            <div>
              <select
                className='bg-blue-50 border w-full p-2 rounded'
                value={selectSubCategory}
                onChange={(e) => {
                  const value = e.target.value;
                  const subCategory = allSubCategory.find(el => el._id === value);

                  setData((preve) => {
                    return {
                      ...preve,
                      subCategory: [...preve.subCategory, subCategory]
                    }
                  });
                  setSelectSubCategory("");
                }}
              >
                <option value={""} className='text-neutral-600'>Select Sub Category</option>
                {
                  allSubCategory.map((c, index) => {
                    return (
                      <option key={c._id} value={c?._id}>{c.name}</option>
                    )
                  })
                }
              </select>
              <div className='flex flex-wrap gap-3'>
                {
                  data.subCategory.map((c, index) => {
                    return (
                      <div key={c._id + index + "productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                        <p>{c.name}</p>
                        <div className='hover:text-red-500 cursor-pointer' onClick={() => handleRemoveSubCategory(index)}>
                          <IoClose size={20} />
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>

          <div className='grid gap-1'>
            <label htmlFor='stock' className='font-medium'>Number of Stock</label>
            <input
              id='stock'
              type='number'
              placeholder='Enter product stock'
              name='stock'
              value={data.stock}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          <div className='grid gap-1'>
            <label htmlFor='price' className='font-medium'>Price</label>
            <input
              id='price'
              type='number'
              placeholder='Enter product price'
              name='price'
              value={data.price}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='bulkPrice' className='font-medium'>Bulk Price</label>
            <input
              id='bulkPrice'
              type='number'
              placeholder='Enter product bulk price'
              name='bulkPrice'
              value={data.bulkPrice}
              onChange={handleChange}
              required
              className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
            />
          </div>

          {/**add more field**/}
          {
            Object?.keys(data?.more_details)?.map((k, index) => {
              return (
                <div key={k + index} className='grid gap-1'>
                  <label htmlFor={k} className='font-medium'>{k}</label>
                  <input
                    id={k}
                    type='text'
                    value={data?.more_details[k]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((preve) => {
                        return {
                          ...preve,
                          more_details: {
                            ...preve.more_details,
                            [k]: value
                          }
                        }
                      });
                    }}
                    required
                    className='bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded'
                  />
                </div>
              )
            })
          }

          <div onClick={() => setOpenAddField(true)} className=' hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
            Add Fields
          </div>

          <button
            className='bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'
          >
            Submit
          </button>
        </form>
      </div>

      {
        ViewImageURL && (
          <ViewImage url={ViewImageURL} close={() => setViewImageURL("")} />
        )
      }

      {
        openAddField && (
          <AddFieldComponent
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            submit={handleAddField}
            close={() => setOpenAddField(false)}
          />
        )
      }
    </section>
  );
};

export default UploadProduct;