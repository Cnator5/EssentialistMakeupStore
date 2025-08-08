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
import useMobile from './hooks/useMobile';
// import { HelmetProvider } from 'react-helmet-async';
// import { AuthProvider } from './context/AuthContext';
import SideBar from './components/SideBar';
import { useScrollToTop } from './hooks/useScrollToTop';
import ScrollToTop from './components/ScrollToTop';



function App() {
  useScrollToTop();
  const dispatch = useDispatch()
  const location = useLocation()
  const [isMobile] = useMobile()
  

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


  // Check if the current path is not dashboard and not mobile (since sidebar is in header on mobile)
  const showSidebar = !location.pathname.includes('/dashboard') && !isMobile;

  return (
    <GlobalProvider>
      <Header/>
      <main className='min-h-[78vh]'>
        <div className="container mx-auto py-1">
          <div className="flex flex-col md:flex-row gap-4">
            {showSidebar && (
              <div className="w-full md:w-1/4 lg:w-1/5">
                <SideBar />
              </div>
            )}
            <div className={`w-full ${showSidebar ? 'md:w-3/4 lg:w-4/5' : 'w-full'}`}>
              <Outlet/>
            </div>
          </div>
        </div>
      </main>
      <Modal open={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <Login
          onSuccess={() => setShowLoginModal(false)}
        />
      </Modal>
        <ScrollToTop />
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