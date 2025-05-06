// import React from 'react';
// import {
//   FaFacebook, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCcStripe
// } from "react-icons/fa";
// import { FaTiktok } from 'react-icons/fa6';

// // Payment partners, with color and initials or icon
// const paymentPartners = [
//   { name: 'MTN', label: 'MTN', color: '#ffcb05' },     // Yellow for MTN
//   { name: 'Orange', label: 'OR', color: '#ff6600' },   // Orange for Orange
//   { name: 'Stripe', icon: FaCcStripe, color: '#635bff' } // Stripe icon and color
// ];

// // Delivery partners, with color and initials
// const deliveryPartners = [
//   { name: 'FedEx', label: 'FX', color: '#4d148c' },    // Purple for FedEx
//   { name: 'DHL', label: 'DHL', color: '#ffcc00' },     // Yellow for DHL
//   { name: 'TNT', label: 'TNT', color: '#ff6600' },     // Orange for TNT
//   { name: 'UPS', label: 'UPS', color: '#351c15' },     // Brown for UPS
//   { name: 'EMS', label: 'EMS', color: '#003399' }      // Blue for EMS
// ];

// const PartnerIcon = ({ icon: Icon, color, label, name }) => (
//   <div
//     className="flex items-center justify-center w-8 h-8 rounded-full shadow bg-white dark:bg-neutral-800"
//     style={{ backgroundColor: color }}
//     title={name}
//   >
//     {Icon ? (
//       <Icon className="text-white w-5 h-5" />
//     ) : (
//       <span className="font-bold text-xs text-white">{label}</span>
//     )}
//   </div>
// );

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 dark:from-neutral-800 dark:via-purple-900 dark:to-pink-900 transition-colors duration-300 font-poppins border-t border-pink-100/50 mt-8 sm:mt-12">
//       <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
//         {/* Main Footer Content */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 sm:mb-12">
//           {/* Company Info */}
//           <div className="w-full max-w-md">
//             <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
//               EssentialistmakeupStore
//             </h3>
//             <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-300 mb-3 sm:mb-4 font-light leading-relaxed">
//               Elevating your beauty with premium cosmetics and expert care. Your destination for luxurious makeup essentials.
//             </p>
//             <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-300">
//               <FaHeart className="text-pink-400 animate-pulse w-4 h-4" />
//               <span className="font-light">Crafted with beauty in mind</span>
//             </div>
//           </div>

//           {/* Contact Info */}
//           <div className="w-full max-w-md">
//             <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
//               Get in Touch
//             </h3>
//             <div className="space-y-3 sm:space-y-4">
//               {[
//                 { icon: FaEnvelope, text: 'essentialistmakeup@gmail.com' },
//                 { icon: FaPhone, text: '+237 6 55 22 55 69' },
//                 { icon: FaMapMarkerAlt, text: 'Carrefour Macon, Bonamoussadi Douala Cameroon' }
//               ].map((item, index) => (
//                 <div key={index} className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-300 group">
//                   <item.icon className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
//                   <span className="font-light text-sm sm:text-base break-words">{item.text}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Partners Column */}
//           <div className="w-full max-w-md">
//             <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
//               Delivery Partners
//             </h3>
//             <div className="flex flex-wrap items-center gap-3 mb-5">
//               {deliveryPartners.map((partner, idx) => (
//                 <PartnerIcon key={idx} color={partner.color} label={partner.label} name={partner.name} />
//               ))}
//             </div>
//             <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
//               Payment Partners
//             </h3>
//             <div className="flex flex-wrap items-center gap-3">
//               {paymentPartners.map((partner, idx) => (
//                 <PartnerIcon
//                   key={idx}
//                   icon={partner.icon}
//                   color={partner.color}
//                   label={partner.label}
//                   name={partner.name}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Footer */}
//         <div className="border-t border-white-100/50 dark:border-white-700/50 pt-6 sm:pt-8">
//           <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
//             {/* Copyright */}
//             <p className="text-neutral-500 dark:text-neutral-300 font-light text-sm sm:text-base text-center sm:text-left">
//               © {currentYear} EssentialistmakeupStore. All rights reserved.
//             </p>

//             {/* Social Links */}
//             <div className="flex items-center space-x-4 sm:space-x-6">
//               {[
//                 { icon: FaFacebook, href: '' },
//                 { icon: FaInstagram, href: '' },
//                 { icon: FaTiktok, href: '' }
//               ].map((social, index) => (
//                 <a
//                   key={index}
//                   href={social.href}
//                   className="text-neutral-500 hover:text-pink-400 dark:text-neutral-300 dark:hover:text-pink-400 transition-colors duration-200 text-lg sm:text-xl"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
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
  FaStore
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-5 mt-5 pb-6 text-gray-700 border-t-8 border-pink-200 shadow-xl">
      <div className="container mx-auto px-4">
        {/* Customer Support */}
        <div className="mb-8 text-center md:text-left">
          <p className="text-dark-700 font-semibold mb-2">For any help, you may call us at</p>
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <FaPhone className="text-pink-500" />
            <span className="font-semibold">+237 6 55 22 55 69</span>
          </div>
          <p className="text-sm text-gray-500">(Monday to Saturday, 8AM to 10PM and Sunday, 10AM to 7PM)</p>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Column 1 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Who are we?</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Authenticity</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Testimonials</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">EssentialistMakeupStore CSR</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Responsible Disclosure</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Investor Relations</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Link to Smart ODR</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-600 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Frequently asked questions</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Cancellation & Return</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Sell on EssentialistMakeupStore</a></li>
            </ul>

            <h3 className="font-bold text-gray-800 mb-4 mt-8">Inspire Me</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-600 transition-colors">Beauty Book</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Games Board</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Buying Guides</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-pink-600 transition-colors">Offer Zone</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">New Launches</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">EssentialistMakeupStore Man</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">EssentialistMakeupStore Fashion</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">EssentialistMakeupStore Pro</a></li>
              <li><a href="#" className="hover:text-pink-600 transition-colors">Sitemap</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Top Makeup Categories</h3>
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
              <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <FaTruck className="text-pink-500 text-xl" />
                  <span className="font-medium">Free Shipping</span>
                </div>
                <p className="text-xs text-gray-500">On Orders Above 50.000FCFA</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <FaUndo className="text-pink-500 text-xl" />
                  <span className="font-medium">Easy Returns</span>
                </div>
                <p className="text-xs text-gray-500">15-Day Return Policy</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <FaCheck className="text-pink-500 text-xl" />
                  <span className="font-medium">100% Authentic</span>
                </div>
                <p className="text-xs text-gray-500">Products Sourced Directly</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
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
            <a href="https://www.instagram.com/Essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
              <FaInstagram className="text-xl" />
            </a>
            <a href="https://www.facebook.com/Essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
              <FaFacebook className="text-xl" />
            </a>
            <a href="https://www.tiktok.com/@essentialistmakeupstore" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition-colors">
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
            <a href="#" className="hover:text-pink-600">Terms & Conditions</a>
            <a href="#" className="hover:text-pink-600">Shipping Policy</a>
            <a href="#" className="hover:text-pink-600">Cancellation Policy</a>
            <a href="#" className="hover:text-pink-600">Privacy Policy</a>
          </div>
          <p>© 2025 EssentialistMakeupStore E-RETAIL LIMITED All Rights Reserved.</p>
        </div>

        {/* Popular Links */}
        <div className="mt-8">
          <h4 className="text-sm font-medium mb-3 text-gray-700">Popular Makeup Links</h4>
          <div className="text-xs text-gray-500 flex flex-wrap gap-x-2 gap-y-1">
            <a href="#" className="hover:text-pink-600">lipstick</a>•
            <a href="#" className="hover:text-pink-600">highlighter</a>•
            <a href="#" className="hover:text-pink-600">concealer</a>•
            <a href="#" className="hover:text-pink-600">lip gloss</a>•
            <a href="#" className="hover:text-pink-600">eyeliner</a>•
            <a href="#" className="hover:text-pink-600">eyeshadow palette</a>•
            <a href="#" className="hover:text-pink-600">mascara</a>•
            <a href="#" className="hover:text-pink-600">mac foundation</a>•
            <a href="#" className="hover:text-pink-600">lip tint</a>•
            <a href="#" className="hover:text-pink-600">makeup pouch</a>•
            <a href="#" className="hover:text-pink-600">huda beauty foundation</a>•
            <a href="#" className="hover:text-pink-600">nyx</a>•
            <a href="#" className="hover:text-pink-600">bb cream</a>•
            <a href="#" className="hover:text-pink-600">insight cosmetics</a>•
            <a href="#" className="hover:text-pink-600">face foundation</a>•
            <a href="#" className="hover:text-pink-600">sugar lipstick</a>•
            <a href="#" className="hover:text-pink-600">compact powder</a>•
            <a href="#" className="hover:text-pink-600">setting spray</a>•
            <a href="#" className="hover:text-pink-600">makeup brushes</a>•
            <a href="#" className="hover:text-pink-600">kajal</a>•
            <a href="#" className="hover:text-pink-600">contour palette</a>•
            <a href="#" className="hover:text-pink-600">primer</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;