import React, { useEffect, useState } from 'react'
import logo from '../assets/logo.jpg'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import Dropdown from './Dropdown';


const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    const cartItem = useSelector(state => state.cartItem.cart)
    const { totalPrice, totalQty } = useGlobalContext()
    const [openCartSection, setOpenCartSection] = useState(false)
    const [openMakeup, setOpenMakeup] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }
        navigate("/user")
    }

    // Optional: close dropdown when clicking away
    useEffect(() => {
        const handler = (e) => {
            if (!e.target.closest('.makeup-dropdown')) {
                setOpenMakeup(false);
            }
        };
        if (openMakeup) {
            document.addEventListener('mousedown', handler);
        }
        return () => document.removeEventListener('mousedown', handler);
    }, [openMakeup]);

    return (
        <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='w-full max-w-screen-2xl mx-auto flex items-center px-2 justify-between min-h-[56px]'>
                        {/* logo */}
                        <div className='h-full flex-1 min-w-[80px]'>
                            <Link to={"/"} className='h-full flex justify-start items-center'>
                                <img
                                    src={logo}
                                    width={180}
                                    height={60}
                                    alt='logo'
                                    className='hidden lg:block'
                                    style={{ maxWidth: "100%", objectFit: "contain" }}
                                />
                                <img
                                    src={logo}
                                    width={120}
                                    height={60}
                                    alt='logo'
                                    className='lg:hidden'
                                    style={{ maxWidth: "100%", objectFit: "contain" }}
                                />
                            </Link>
                        </div>

                        {/* Makeup category dropdown */}
                        <div className='flex-1 lg:flex hidden items-center justify-center relative'>
                            <Dropdown />
                        </div>

                       

                        {/* Search */}
                        <div className='hidden lg:block flex-1 px-3'>
                            <Search />
                        </div>

                        {/* login and my cart */}
                        <div className='flex items-center flex-1 justify-end min-w-[120px]'>
                            {/* user icons display in only mobile version*/}
                            <button className='text-pink-400 lg:hidden p-2' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>

                            {/* Desktop */}
                            <div className='hidden lg:flex items-center gap-6 xl:gap-10'>
                                {
                                    user?._id ? (
                                        <div className='relative'>
                                            <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer text-semibold text-lg'>
                                                <p>Account</p>
                                                {
                                                    openUserMenu ? (
                                                        <GoTriangleUp size={25} />
                                                    ) : (
                                                        <GoTriangleDown size={25} />
                                                    )
                                                }
                                            </div>
                                            {
                                                openUserMenu && (
                                                    <div className='absolute right-0 top-12 z-50'>
                                                        <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                            <UserMenu close={handleCloseUserMenu} />
                                                        </div>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    ) : (
                                        <button onClick={redirectToLoginPage} className='text-lg px-2'>Login</button>
                                    )
                                }
                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 bg-pink-400 hover:bg-yellow-400 px-3 py-2 rounded text-white transition-colors duration-200'>
                                    {/* add to card icons */}
                                    <div className='animate-bounce'>
                                        <BsCart4 size={26} />
                                    </div>
                                    <div className='font-semibold text-sm text-left'>
                                        {
                                            cartItem[0] ? (
                                                <div>
                                                    <p>{totalQty} Items</p>
                                                    <p>{DisplayPriceInRupees(totalPrice)}</p>
                                                </div>
                                            ) : (
                                                <p>My Cart</p>
                                            )
                                        }
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='w-full max-w-screen-2xl mx-auto px-2 lg:hidden flex'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
        </header>
    )
}

export default Header
