import React from 'react';
import {
  FaFacebook, FaInstagram, FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCcStripe
} from "react-icons/fa";
import { FaTiktok } from 'react-icons/fa6';

// Payment partners, with color and initials or icon
const paymentPartners = [
  { name: 'MTN', label: 'MTN', color: '#ffcb05' },     // Yellow for MTN
  { name: 'Orange', label: 'OR', color: '#ff6600' },   // Orange for Orange
  { name: 'Stripe', icon: FaCcStripe, color: '#635bff' } // Stripe icon and color
];

// Delivery partners, with color and initials
const deliveryPartners = [
  { name: 'FedEx', label: 'FX', color: '#4d148c' },    // Purple for FedEx
  { name: 'DHL', label: 'DHL', color: '#ffcc00' },     // Yellow for DHL
  { name: 'TNT', label: 'TNT', color: '#ff6600' },     // Orange for TNT
  { name: 'UPS', label: 'UPS', color: '#351c15' },     // Brown for UPS
  { name: 'EMS', label: 'EMS', color: '#003399' }      // Blue for EMS
];

const PartnerIcon = ({ icon: Icon, color, label, name }) => (
  <div
    className="flex items-center justify-center w-8 h-8 rounded-full shadow bg-white dark:bg-neutral-800"
    style={{ backgroundColor: color }}
    title={name}
  >
    {Icon ? (
      <Icon className="text-white w-5 h-5" />
    ) : (
      <span className="font-bold text-xs text-white">{label}</span>
    )}
  </div>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-white via-pink-50/20 to-purple-50/20 dark:from-neutral-800 dark:via-purple-900 dark:to-pink-900 transition-colors duration-300 font-poppins border-t border-pink-100/50 mt-8 sm:mt-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="w-full max-w-md">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
              EssentialistmakeupStore
            </h3>
            <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-300 mb-3 sm:mb-4 font-light leading-relaxed">
              Elevating your beauty with premium cosmetics and expert care. Your destination for luxurious makeup essentials.
            </p>
            <div className="flex items-center space-x-2 text-sm sm:text-base text-neutral-500 dark:text-neutral-300">
              <FaHeart className="text-pink-400 animate-pulse w-4 h-4" />
              <span className="font-light">Crafted with beauty in mind</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
              Get in Touch
            </h3>
            <div className="space-y-3 sm:space-y-4">
              {[
                { icon: FaEnvelope, text: 'essentialistmakeup@gmail.com' },
                { icon: FaPhone, text: '+237 6 55 22 55 69' },
                { icon: FaMapMarkerAlt, text: 'Carrefour Macon, Bonamoussadi Douala Cameroon' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-neutral-500 dark:text-neutral-300 group">
                  <item.icon className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="font-light text-sm sm:text-base break-words">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Partners Column */}
          <div className="w-full max-w-md">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
              Delivery Partners
            </h3>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              {deliveryPartners.map((partner, idx) => (
                <PartnerIcon key={idx} color={partner.color} label={partner.label} name={partner.name} />
              ))}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-pink-500 dark:text-pink-400">
              Payment Partners
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              {paymentPartners.map((partner, idx) => (
                <PartnerIcon
                  key={idx}
                  icon={partner.icon}
                  color={partner.color}
                  label={partner.label}
                  name={partner.name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white-100/50 dark:border-white-700/50 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <p className="text-neutral-500 dark:text-neutral-300 font-light text-sm sm:text-base text-center sm:text-left">
              © {currentYear} EssentialistmakeupStore. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {[
                { icon: FaFacebook, href: 'https://www.facebook.com/Essentialistmakeupstore' },
                { icon: FaInstagram, href: 'https://www.instagram.com/Essentialistmakeupstore' },
                { icon: FaTiktok, href: 'https://www.tiktok.com/@essentialistmakeupstore' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-neutral-500 hover:text-pink-400 dark:text-neutral-300 dark:hover:text-pink-400 transition-colors duration-200 text-lg sm:text-xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;