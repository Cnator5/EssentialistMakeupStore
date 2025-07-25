// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import Home from "../pages/Home";
// import SearchPage from "../pages/SearchPage";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ForgotPassword from "../pages/ForgotPassword";
// import OtpVerification from "../pages/OtpVerification";
// import ResetPassword from "../pages/ResetPassword";
// import UserMenuMobile from "../pages/UserMenuMobile";
// import Dashboard from "../layouts/Dashboard";
// import Profile from "../pages/Profile";
// import MyOrders from "../pages/MyOrders";
// import Address from "../pages/Address";
// import CategoryPage from "../pages/CategoryPage";
// import SubCategoryPage from "../pages/SubCategoryPage";
// import UploadProduct from "../pages/UploadProduct";
// import ProductAdmin from "../pages/ProductAdmin";
// import AdminPermision from "../layouts/AdminPermision";
// import ProductListPage from "../pages/ProductListPage";
// import ProductDisplayPage from "../pages/ProductDisplayPage";
// import CartMobile from "../pages/CartMobile";
// import CheckoutPage from "../pages/CheckoutPage";
// import Success from "../pages/Success";
// import Cancel from "../pages/Cancel";
// import Brands from '../pages/BrandPage';
// import BrandPage from './../pages/BrandPage';
// import NewArrivalPage from './../pages/NewArrivalPage';
// import ContactUsPage from "../pages/ContactPage";





// const router = createBrowserRouter([
//     {
//         path : "/",
//         element : <App/>,
//         children : [
//             {
//                 path : "",
//                 element : <Home/>
//             },
//             {
//                 path : "search",
//                 element : <SearchPage/>
//             },
//             {
//                 path : "brands",
//                 element : <BrandPage/>
//             },
//             {
//                 path : "new-arrival",
//                 element : <NewArrivalPage/>
//             },
//             {
//                 path : "contact",
//                 element : <ContactUsPage/>
//             },
//             {
//                 path : 'login',
//                 element : <Login/>
//             },
//             {
//                 path : "register",
//                 element : <Register/>
//             },
//             {
//                 path : "forgot-password",
//                 element : <ForgotPassword/>
//             },
//             {
//                 path : "verification-otp",
//                 element : <OtpVerification/>
//             },
//             {
//                 path : "reset-password",
//                 element : <ResetPassword/>
//             },
//             {
//                 path : "user",
//                 element : <UserMenuMobile/>
//             },
//             {
//                 path : "dashboard",
//                 element : <Dashboard/>,
//                 children : [
//                     {
//                         path : "profile",
//                         element : <Profile/>
//                     },
//                     {
//                         path : "myorders",
//                         element : <MyOrders/>
//                     },
//                     {
//                         path : "address",
//                         element : <Address/>
//                     },
//                     {
//                         path : 'category',
//                         element : <AdminPermision><CategoryPage/></AdminPermision>
//                     },
//                     {
//                         path : "subcategory",
//                         element : <AdminPermision><SubCategoryPage/></AdminPermision>
//                     },
//                     {
//                         path : 'upload-product',
//                         element : <AdminPermision><UploadProduct/></AdminPermision>
//                     },
//                     {
//                         path : 'product',
//                         element : <AdminPermision><ProductAdmin/></AdminPermision>
//                     }
//                 ]
//             },
//             {
//                 path : ":category",
//                 children : [
//                     {
//                         path : ":subCategory",
//                         element : <ProductListPage/>
//                     }
//                 ]
//             },
//             {
//                 path : "product/:product",
//                 element : <ProductDisplayPage/>
//             },
//             {
//                 path : 'cart',
//                 element : <CartMobile/>
//             },
//             {
//                 path : "checkout",
//                 element : <CheckoutPage/>
//             },
//             {
//                 path : "success",
//                 element : <Success/>
//             },
//             {
//                 path : 'cancel',
//                 element : <Cancel/>
//             }
//         ]
//     }
// ])

// export default router

import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import BrandPage from '../pages/BrandPage';
import NewArrivalPage from '../pages/NewArrivalPage';
import ContactUsPage from "../pages/ContactPage";
import PaymentReturn from "../pages/PaymentReturn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "search",
                element: <SearchPage />
            },
            {
                path: "brands",
                element: <BrandPage />
            },
            {
                path: "new-arrival",
                element: <NewArrivalPage />
            },
            {
                path: "contact",
                element: <ContactUsPage />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "return",
                element: <PaymentReturn />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: "category",
                        element: <AdminPermision><CategoryPage /></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage /></AdminPermision>
                    },
                    {
                        path: "upload-product",
                        element: <AdminPermision><UploadProduct /></AdminPermision>
                    },
                    {
                        path: "product",
                        element: <AdminPermision><ProductAdmin /></AdminPermision>
                    }
                ]
            },
            // SEO-friendly category & subcategory & product routes
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage />
                    },
                    {
                        path: ":subCategory/:product",
                        element: <ProductDisplayPage />
                    }
                ]
            },
            // Backward compatibility for legacy product URL
            {
                path: "product/:product",
                element: <ProductDisplayPage />
            },
            // Cart & checkout
            {
                path: "cart",
                element: <CartMobile />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: "cancel",
                element: <Cancel />
            }
        ]
    }
]);

export default router;