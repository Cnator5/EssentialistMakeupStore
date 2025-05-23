import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { setAllCategory,setAllSubCategory,setLoadingCategory } from './store/productSlice';
import { useDispatch } from 'react-redux';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';
import { handleAddItemCart } from './store/cartProduct'
import GlobalProvider from './provider/GlobalProvider';
import { FaCartShopping } from "react-icons/fa6";
import CartMobileLink from './components/CartMobile';
import Modal from './components/Modal';
import Login from './pages/Login';

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  

  const fetchUser = async()=>{
      const userData = await fetchUserDetails()
      dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async()=>{
    try {
        dispatch(setLoadingCategory(true))
        const response = await Axios({
            ...SummaryApi.getCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    } catch (error) {
      console.error("Category fetch failed:", error);
      toast.error("Failed to fetch categories");
    }finally{
      dispatch(setLoadingCategory(false))
    }
  }

  const fetchSubCategory = async()=>{
    try {
        const response = await Axios({
            ...SummaryApi.getSubCategory
        })
        const { data : responseData } = response

        if(responseData.success){
           dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
        }
    }catch (error) {
      console.error("Category fetch failed:", error);
      toast.error("Failed to fetch categories");
    } finally {
      dispatch(setLoadingCategory(false));
    }
  };

  

  useEffect(()=>{
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  },[])

    const [showLoginModal, setShowLoginModal] = useState(false);

  // Listen for a "show login" event (can use context, or a global state manager if you prefer)
  // Here is a quick demo using window event:
  useEffect(() => {
    const handler = () => setShowLoginModal(true);
    window.addEventListener("show-login", handler);
    return () => window.removeEventListener("show-login", handler);
  }, []);


  return (
    <GlobalProvider> 
      <Header/>
      <main className='min-h-[78vh]'>
          <Outlet/>
      </main>
       <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login
          onSuccess={() => setShowLoginModal(false)}
        />
      </Modal>
      <Footer/>
      <Toaster/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
    </GlobalProvider>
  )
}

export default App


