import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { valideURLConvert } from '../utils/valideURLConvert';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
    const [isHovered, setIsHovered] = useState(false);
    const loadingCategory = useSelector(state => state.product.loadingCategory);
    const categoryData = useSelector(state => state.product.allCategory);
    const subCategoryData = useSelector(state => state.product.allSubCategory);
    const navigate = useNavigate();

    const handleRedirectProductListpage = (id, cat, subCat) => {
        const url = `/${valideURLConvert(cat)}-${id}/${valideURLConvert(subCat.name)}-${subCat._id}`;
        navigate(url);
        setIsHovered(false);
    };

    const getSubcategoriesForCategory = (categoryId) => {
        return subCategoryData.filter(sub =>
            sub.category.some(cat => cat._id === categoryId)
        );
    };

    return (
        <div className="relative group">
            {/* Makeup Button - Border Removed */}
            <button
                className="p-2 text-white font-medium rounded-lg hover:text-pink-400 transition-all duration-300 focus:outline-none"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onFocus={() => setIsHovered(true)}
                onBlur={() => setIsHovered(false)}
                aria-haspopup="true"
                aria-expanded={isHovered}
            >
                <span className="flex items-center text-semibold text-lg">
                    Shop All Makeup
                    <svg className="w-auto h-4 ml-1.5 transition-transform duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </span>
            </button>

            {/* Dropdown Panel */}
            {isHovered && (
                <div
                    className="
                        absolute left-0 top-full mt-1
                        w-full max-w-full
                        md:w-[1250px] md:max-w-[1250px]
                        md:translate-x-[-16.5%]
                        bg-white rounded-xl shadow-xl z-50 overflow-hidden
                        transform origin-top scale-y-100 transition-all duration-200
                    "
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-pink-500 h-1.5"></div>
                    <div className="p-4 md:p-8">
                        {loadingCategory ? (
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                                {[...Array(12)].map((_, index) => (
                                    <div key={index} className="animate-pulse font-bold">
                                        <div className="h-6 w-2/3 bg-gray-200 rounded mb-3" />
                                        {[...Array(4)].map((_, i) => (
                                            <div key={i} className="h-3 bg-gray-100 rounded w-1/2 mb-2 ml-2" />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                                {categoryData.map((category) => (
                                    <div key={category._id} className="break-inside-avoid">
                                        <div className="font-bold text-black pb-2 mb-3 text-base tracking-wide border-b border-pink-100 uppercase">
                                            {category.name}
                                        </div>
                                        <div className="space-y-0.5">
                                            {getSubcategoriesForCategory(category._id).map((subCat) => (
                                                <div
                                                    key={subCat._id}
                                                    className="text-sm text-black font-semibold md:font-normal rounded-md hover:bg-pink-50 hover:text-pink-400 cursor-pointer"
                                                    onClick={() => handleRedirectProductListpage(category._id, category.name, subCat)}
                                                >
                                                    {subCat.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;