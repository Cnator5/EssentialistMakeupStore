import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from './../hooks/useMobile';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage, setIsSearchPage] = useState(false) 
    const [isMobile] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname === "/search" 
        setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

    return (
        <div
            className="
                w-100
                min-w-[10px] 
                xs:min-w-[10px]
                sm:min-w-[10px]
                md:min-w-[10px]
                lg:min-w-[30px]
                max-w-full
                h-11 
                md:h-12
                rounded-lg border
                overflow-hidden
                flex items-center
                text-white
                group focus-within:border-primary-200
                transition-all
                duration-200
                px-2
                 bg-black 
                "
            style={{
                boxSizing: 'border-box'
            }}
        >
            <div className="flex-shrink-0 flex items-center h-full">
                {
                    (isMobile && isSearchPage ) ? (
                        <Link to={"/"} className='flex justify-center items-center h-9 w-9 p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md transition text-black'>
                            <FaArrowLeft size={20}/>
                        </Link>
                    ) :(
                        <button className='flex justify-center items-center h-9 w-9 p-2 group-focus-within:text-primary-200 transition'>
                            <IoSearch size={22}/>
                        </button>
                    )
                }
            </div>
            <div className="flex-1 w-0 h-full flex items-center">
                {
                    !isSearchPage ? (
                        <div 
                            onClick={redirectToSearchPage} 
                            className='w-full h-full flex items-center cursor-pointer pl-1 text-[0.98rem] md:text-base'
                        >
                            <TypeAnimation
                                sequence={[
                                    'Search "Bronzer"', 1000,
                                    'Search "Face Primer"', 1000,
                                    'Search "Foundation"', 1000,
                                    'Search "Mineral Makeup"', 1000,
                                    'Search "Airbrush Makeup"', 1000,
                                    'Search "Concealer"', 1000,
                                    'Search "HD Makeup"', 1000,
                                    'Search "Highlighter"', 1000,
                                    'Search "Mascara"', 1000,
                                    'Search "Eyeshadow"', 1000,
                                    'Search "Lipgloss"', 1000,
                                    'Search "Base makeup"', 1000,
                                    'Search "Blush"', 1000,
                                    'Search "Bridal Makup"', 1000,
                                    'Search "Contour Powder"', 1000,
                                    'Search "Eye Primer"', 1000,
                                    'Search "Eyeliner"', 1000,
                                    'Search "Lipstick"', 1000,
                                    'Search "Natural makeup"', 1000,
                                    'Search "Setting Powder"', 1000,
                                    'Search "Setting Spray"', 1000,
                                    'Search "Shimmery Makeup"',
                                ]}
                                wrapper="span"
                                speed={10}
                                repeat={Infinity}
                                className="truncate"
                            />
                        </div>
                    ) : (
                        <div className='w-full h-full flex items-center'>
                            <input
                                type='text'
                                placeholder='Search for Face Primer Bronzer and more.'
                                autoFocus
                                defaultValue={searchText}
                                className='bg-transparent w-full h-full outline-none text-[0.99rem] md:text-base px-1'
                                onChange={handleOnChange}
                                style={{
                                    minWidth: 0 // prevents overflow
                                }}
                            />
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Search