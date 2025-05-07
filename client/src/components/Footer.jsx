import React from 'react';
import mtnlogo from '../assets/mtnlogo.png';
import orange from '../assets/orange.png';
import stripe from '../assets/stripe.png';
import google_play from '../assets/google_play.png';
import app_store from '../assets/app_store.jpeg';
import {
  FaPhone,
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaTwitter,
  FaPinterest,
  FaHeart,
  FaTruck,
  FaUndo,
  FaCheck,
  FaStore,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <footer className="bg-gray-50 pt-5 mt-5 pb-6 text-gray-900 border-t-8 border-pink-200 shadow-xl">
        <div className="container mx-auto px-4">
          {/* Customer Support & Partners */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Customer Support Left */}
            <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center">
              <p className="text-gray-900 font-meduim mb-2 uppercase">
                For any help, you may call us:
              </p>
              <div className="flex items-center gap-2 mb-1">
                <FaPhone className="text-pink-400" />
                <span className="">+237 6 55 22 55 69</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <FaEnvelope className="text-pink-400" />
                <span className="">essentialistmakeup@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <FaMapMarkerAlt className="text-pink-400" />
                <span className="">
                  Carrefour Macon, Bonamoussadi Douala Cameroon
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                (Monday to Saturday, 8AM to 10PM and Sunday, 10AM to 7PM)
              </p>
            </div>

            {/* Partners Right */}
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-sm font-medium text-gray-700 mb-2 self-start">Partners</h1>
              <div className="w-full">
                <div className="flex flex-row items-center gap-6 overflow-x-auto py-4 px-2 rounded-lg scrollbar-thin scrollbar-thumb-pink-200 scrollbar-track-gray-100 shadow-md">
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src={mtnlogo} alt="MTN logo" className="w-20 h-20" />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src={orange} alt="Orange logo" className="w-20 h-20" />
                  </div>
                  
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src={stripe} alt="Stripe logo" className="w-20 h-20" />
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src={google_play} alt="google_play logo" className="w-20 h-20" /> 
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center">
                    <img src={app_store} alt="app_store logo" className="w-20 h-20" /> 
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10 bg-gray-300 p-4">
            {/* Column 1 */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Who are we?</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Authenticity</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Testimonials</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors flex">Essential Makeup Store CSR</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Responsible Disclosure</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Investor Relations</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Link to Smart ODR</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Help</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-600 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Frequently asked questions</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Store Locator</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Cancellation & Return</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Shipping & Delivery</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors flex flex-wrap">Sell on Essential Makeup Store</a></li>
              </ul>

              <h3 className="font-semibold text-gray-800 mb-4 mt-8">Inspire Me</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-600 transition-colors">Beauty Book</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Games Board</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Buying Guides</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-600 transition-colors">Offer Zone</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">New Launches</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Essential Makeup Store Man</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Essential Makeup Store Fashion</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Essential Makeup Store Pro</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Sitemap</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Top Makeup Categories</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-pink-600 transition-colors">Lipstick</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Foundation</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Concealer</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Eyeliner</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Mascara</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Highlighter</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Eyeshadow Palette</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Lip Gloss</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Compact Powder</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Makeup Brushes</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Blush</a></li>
                <li><a href="#" className="hover:text-pink-600 transition-colors">Bronzer</a></li>
              </ul>
            </div>

            {/* Column 5 - Feature Blocks */}
            <div className="col-span-2 md:col-span-1">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <FaTruck className="text-pink-500 text-xl" />
                    <span className="font-medium">Free Shipping</span>
                  </div>
                  <p className="text-xs text-gray-500">On Orders Above 50.000FCFA</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <FaUndo className="text-pink-500 text-xl" />
                    <span className="font-medium">Easy Returns</span>
                  </div>
                  <p className="text-xs text-gray-500">15-Day Return Policy</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4  hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <FaCheck className="text-pink-500 text-xl" />
                    <span className="font-medium">100% Authentic</span>
                  </div>
                  <p className="text-xs text-gray-500">Products Sourced Directly</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <FaStore className="text-pink-500 text-xl" />
                    <span className="font-medium">1900+ Brands</span>
                  </div>
                  <p className="text-xs text-gray-500">1.2 Lakh+ Products</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border-t border-gray-200 pt-8 mb-8">
            <p className="mb-4 text-center">
              Show us some love <FaHeart className="inline text-pink-500 animate-pulse" /> on social media
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://www.instagram.com/Essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors" aria-label="Essentialist Makeup Store Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="https://www.facebook.com/Essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors" aria-label="Essentialist Makeup Store Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="https://www.tiktok.com/@essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors" aria-label="Essentialist Makeup Store TikTok">
                <FaTiktok className="text-xl" />
              </a>
              {/* <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
                <FaPinterest className="text-xl" />
              </a> */}
            </div>
          </div>

          {/* Legal Links */}
          <div className="border-t border-gray-200 pt-6 text-center text-xs bg-gray-500 text-white p-4">
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
    </>
  );
};

export default Footer;