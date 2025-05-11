import React from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import mtnlogo from '../assets/mtnlogo.png';
import orange from '../assets/orange.png';
import stripe from '../assets/stripe.png';
const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-white text-white mt-10">
      {/* Service Benefits Banner */}
      <div className="flex flex-wrap justify-between py-6 px-8 bg-black border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="min-w-14">
            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 20H45M15 20C15 22.7614 12.7614 25 10 25C7.23858 25 5 22.7614 5 20C5 17.2386 7.23858 15 10 15C12.7614 15 15 17.2386 15 20ZM35 35H10M35 35C35 37.7614 37.2386 40 40 40C42.7614 40 45 37.7614 45 35C45 32.2386 42.7614 30 40 30C37.2386 30 35 32.2386 35 35Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-base uppercase">NATIONWIDE</h3>
            <h3 className="text-white font-bold text-base uppercase">SHIPPING</h3>
            <p className="text-white text-sm">Fast & Reliable</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="min-w-14">
            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="36" height="26" rx="2" stroke="white" strokeWidth="2"/>
              <path d="M10 25H46" stroke="white" strokeWidth="2"/>
              <path d="M16 32H24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-base uppercase">ONLINE PAYMENT</h3>
            <p className="text-white text-sm">100% Secure</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="min-w-14">
            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="20" r="8" stroke="white" strokeWidth="2"/>
              <path d="M14 40V38C14 31.373 20.373 26 28 26C35.627 26 42 31.373 42 38V40" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-base uppercase">CUSTOMER SUPPORT</h3>
            <p className="text-white text-sm">Friendly & Courteous</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="min-w-14">
            <svg className="w-14 h-14" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="16" stroke="white" strokeWidth="2"/>
              <path d="M28 18V28L35 32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-base uppercase">GREAT PRICES</h3>
            <p className="text-white text-sm">Value For Money</p>
          </div>
        </div>
      </div>
      
      {/* Main Footer Content */}
      <div className="px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Us Section */}
          <div>
            <h2 className="text-black uppercase font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-0.5 after:w-12 after:bg-gray-700">ABOUT US</h2>
            
            <p className="text-black mb-6">
              EssentialistMakeupStore is an online retailer that provides one-stop shopping for women's day-to-day essentials. Established in 2025, we are the best and only niche skincare, makeup, and lifestyle store in Cameroon wholly targeted at providing an unmatched range of products for women.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center text-black">
                <span className="inline-block mr-2">✉</span>
                <a href="mailto:info@girlyessentials.com.ng" className="hover:text-pink-500 transition duration-300">esssmakeup@gmail.com</a>
              </div>
              
              <div className="flex items-center text-black">
                <span className="inline-block mr-2">📱</span>
                <span>Phone: +237 655 22 55 69</span>
              </div>
              
              <div className="flex items-center text-black">
                <span className="inline-block mr-2">🏢</span>
                <span>Office opening hours - Monday to Friday 9am - 5:30pm</span>
              </div>
            </div>
          </div>
          
          {/* Quick Navigation */}
          <div>
            <h2 className="text-black uppercase font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-0.5 after:w-12 after:bg-gray-700">QUICK NAVIGATION</h2>
            
            <ul className="space-y-3">
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">How To Shop</a></li>
              <li><a href="/cart" className="text-black hover:text-pink-500 transition duration-300">Payments</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Shipping</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Returns Policy</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">FAQs</a></li>
            </ul>
          </div>
          
          {/* Useful Links */}
          <div>
            <h2 className="text-black uppercase font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-0.5 after:w-12 after:bg-gray-700">USEFUL LINKS</h2>
            
            <ul className="space-y-3">
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Profile</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Cart</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">MY Basket</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Returns Policy</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Register</a></li>
              <li><a href="#" className="text-black hover:text-pink-500 transition duration-300">Blog</a></li>
            </ul>
          </div>
          
          {/* Newsletter Section */}
          <div>
            <h2 className="text-black uppercase font-bold mb-6 relative after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-0.5 after:w-12 after:bg-gray-700">JOIN NEWSLETTER!</h2>
            
            <div className="flex mb-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="py-2.5 px-4 w-full rounded-l bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
              />
              <button className="bg-pink-400 flex text-white w-auto px-5 py-1 rounded-r font-bold border border-white hover:bg-gray-900 transition duration-300">
                Sign Up
              </button>
            </div>
            
            <p className="text-black">
              Is there a product you can't find on our website? Do tell us <a href="#" className="text-pink-500 hover:underline">here!</a>
            </p>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>
        
        {/* Payment Methods & Social Media */}
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-black font-bold mb-4">Payment Methods:</h3>
            <div className="flex space-x-2">
              <div className="bg-white p-1 rounded h-10 w-16 flex items-center justify-center">
                <img src={stripe} alt="Stripe logo" className="w-40 h-20" />
              </div>
              <div className="bg-white p-1 rounded h-10 w-16 flex items-center justify-center">
                <img src={orange} alt="Orange logo" className="w-20 h-10" />
              </div>
              <div className="bg-white  rounded h-10 w-16 flex items-center justify-center">
                <img src={mtnlogo} alt="mtnlogo" className="w-20 h-10" />
              </div>
              {/* <div className="bg-white p-1 rounded h-10 w-16 flex items-center justify-center">
                <img src="paystack-placeholder.png" alt="Paystack" className="max-h-full" />
              </div>
              <div className="bg-white p-1 rounded h-10 w-16 flex items-center justify-center">
                <img src="verve-placeholder.png" alt="Verve" className="max-h-full" />
              </div> */}
            </div>
          </div>
          
          <div>
            <h3 className="text-black font-bold mb-4">Stay Connected:</h3>
            <div className="flex space-x-2">
              <a href="https://www.facebook.com/Essentialistmakeupstore" className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition duration-300">
                <FaFacebook size={20} color="white" />
              </a>
              <a href="https://www.instagram.com/Essentialistmakeupstore" className="bg-black w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition duration-300 border border-white">
                <FaInstagram size={20} color="white" />
              </a>
              <a href="https://www.youtube.com/Essentialistmakeupstore" className="bg-rose-600 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition duration-300">
                <FaYoutube size={20} color="white" />
              </a>
              <a href="https://www.whatsapp.com/Essentialistmakeupstore" className="bg-green-600 w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition duration-300">
                <FaWhatsapp size={20} color="white" />
              </a>
              <a href="https://www.tiktok.com/@essentialistmakeupstore" className="bg-black w-10 h-10 rounded-full flex items-center justify-center hover:opacity-90 transition duration-300">
                <FaTiktok size={20} color="white" />
                </a>
            </div>
          </div>
        </div>
          {/* Legal Links */}
          <div className="border-t border-gray-200 pt-6 text-center text-xs bg-gray-500 text-white p-4 mt-10">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
              <a href="#" className="hover:text-yellow-400">Terms & Conditions</a>
              <a href="#" className="hover:text-yellow-400">Shipping Policy</a>
              <a href="#" className="hover:text-yellow-400">Cancellation Policy</a>
              <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
            </div>
            <p>© {currentYear} EssentialistMakeupStore E-RETAIL LIMITED All Rights Reserved.</p>
          </div>
       {/* Popular Links */}
          <div className="mt-8">
            <h4 className="text-sm font-medium mb-3 text-gray-900">Popular Makeup Links</h4>
            <div className="text-xs text-gray-900 flex flex-wrap gap-x-2 gap-y-1">
              <a href="#" className="hover:text-pink-600">lipstick</a>|
              <a href="#" className="hover:text-pink-600">highlighter</a>|
              <a href="#" className="hover:text-pink-600">concealer</a>|
              <a href="#" className="hover:text-pink-600">lip gloss</a>|
              <a href="#" className="hover:text-pink-600">eyeliner</a>|
              <a href="#" className="hover:text-pink-600">eyeshadow palette</a>|
              <a href="#" className="hover:text-pink-600">mascara</a>|
              <a href="#" className="hover:text-pink-600">mac foundation</a>|
              <a href="#" className="hover:text-pink-600">lip tint</a>|
              <a href="#" className="hover:text-pink-600">makeup pouch</a>|
              <a href="#" className="hover:text-pink-600">huda beauty foundation</a>|
              <a href="#" className="hover:text-pink-600">nyx</a>|
              <a href="#" className="hover:text-pink-600">bb cream</a>|
              <a href="#" className="hover:text-pink-600">insight cosmetics</a>|
              <a href="#" className="hover:text-pink-600">face foundation</a>|
              <a href="#" className="hover:text-pink-600">sugar lipstick</a>|
              <a href="#" className="hover:text-pink-600">compact powder</a>|
              <a href="#" className="hover:text-pink-600">setting spray</a>|
              <a href="#" className="hover:text-pink-600">makeup brushes</a>|
              <a href="#" className="hover:text-pink-600">kajal</a>|
              <a href="#" className="hover:text-pink-600">contour palette</a>|
              <a href="#" className="hover:text-pink-600">primer</a>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;