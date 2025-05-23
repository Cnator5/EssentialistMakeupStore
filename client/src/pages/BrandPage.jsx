import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaMoon, FaSun, FaExternalLinkAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

// --- Brand Data (add more brands as needed) ---
const BRANDS = [
  {
    id: "nyx",
    name: "NYX",
    logo: "https://picsum.photos/id/1062/200/200", // Replace with NYX logo if available
    tagline: "Professional makeup with bold innovation.",
    accent: "from-fuchsia-400 to-fuchsia-700",
  },
  {
    id: "la-girl",
    name: "LA Girl",
    logo: "https://picsum.photos/id/1011/200/200", // Replace with LA Girl logo if available
    tagline: "Affordable luxury beauty for everyone.",
    accent: "from-yellow-400 to-yellow-600",
  },
];

// Utility: Convert brand names to URL slugs
function valideURLConvert(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// --- BrandCard Component ---
function BrandCard({ brand, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03, boxShadow: "0 8px 28px 0 rgba(0,0,0,0.17)" }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className={clsx(
        "rounded-2xl cursor-pointer shadow-xl overflow-hidden group",
        "transition-all duration-300",
        "bg-white/70 dark:bg-zinc-900/70",
        "backdrop-blur-xl border border-zinc-100 dark:border-zinc-800",
        "relative"
      )}
      tabIndex={0}
      aria-label={`View products from ${brand.name}`}
      onClick={() => onClick(brand)}
      onKeyDown={e => e.key === "Enter" && onClick(brand)}
    >
      {/* Top Gradient Accent */}
      <div
        className={clsx(
          "absolute top-0 left-0 w-full h-1",
          `bg-gradient-to-r ${brand.accent}`
        )}
        aria-hidden
      />
      <div className="flex flex-col items-center p-7 gap-3">
        <img
          src={brand.logo}
          alt={`${brand.name} logo`}
          className="rounded-full w-24 h-24 object-cover shadow-lg border-4 border-white dark:border-zinc-800 bg-zinc-100"
          loading="lazy"
        />
        <h3 className="font-bold text-2xl text-zinc-800 dark:text-zinc-100 tracking-wide">
          {brand.name}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-300 text-center text-base">
          {brand.tagline}
        </p>
        <button
          className={clsx(
            "mt-2 px-5 py-2 rounded-full font-semibold flex items-center gap-2",
            "bg-gradient-to-r",
            brand.accent,
            "text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-xl"
          )}
          aria-label={`See all products from ${brand.name}`}
        >
          View Products <FaExternalLinkAlt size={15} />
        </button>
      </div>
    </motion.div>
  );
}

// --- BrandGrid Component ---
function BrandGrid({ brands, onBrandClick }) {
  return (
    <motion.div
      className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto py-10"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15
          }
        }
      }}
    >
      {brands.map(brand => (
        <BrandCard key={brand.id} brand={brand} onClick={onBrandClick} />
      ))}
    </motion.div>
  );
}

// --- DarkModeToggle Component ---
function DarkModeToggle() {
  const [dark, setDark] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return (
    <button
      className="fixed z-50 top-5 right-5 bg-white/90 dark:bg-zinc-900/90 shadow-lg rounded-full p-2 transition-all duration-300 border border-zinc-200 dark:border-zinc-800"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setDark(d => !d)}
    >
      {dark ? <FaSun size={22} className="text-yellow-400" /> : <FaMoon size={22} className="text-zinc-700" />}
    </button>
  );
}

// --- Subtle Animated Background ---
function BrandBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="bg-grad" cx="50%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#f9f4ef" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffe9f9" stopOpacity="0.15" />
          </radialGradient>
        </defs>
        <rect fill="url(#bg-grad)" width="100%" height="100%" />
      </svg>
      {/* Optionally, add subtle floating dots or lines with CSS animation */}
      <div className="absolute inset-0 animate-gradient-move pointer-events-none" />
    </div>
  );
}

// --- Main BrandPage ---
const BrandPage = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brand) => {
    const url = `/brand/${valideURLConvert(brand.name)}-${brand.id}`;
    navigate(url);
  };

  return (
    <>
      <Helmet>
        <title>Essentialist Makeup Store | Best Beauty Brands in Cameroon</title>
        <meta name="description" content="Explore premium makeup brands like NYX and LA Girl at Essentialist Makeup Store Cameroon. Find foundations, lipsticks, eyeshadows, and more. Shop top brands, enjoy exclusive deals, and experience free shipping & cash on delivery!" />
        <meta name="keywords" content="makeup, NYX, LA Girl, beauty, cosmetics, Cameroon, best brands, buy makeup online" />
        <link rel="icon" type="image/avif" href="/icon.avif" />
        <meta name="theme-color" content="#faf6f3" />
      </Helmet>
      <BrandBackground />
      <DarkModeToggle />
      <main className="min-h-screen bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 transition-all">
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="container mx-auto px-4 py-12"
        >
          <h1 className="text-center text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 via-pink-600 to-orange-400 dark:from-fuchsia-300 dark:to-pink-400 tracking-tight mb-4 drop-shadow-lg">
            Shop by Brand
          </h1>
          <p className="text-center max-w-xl mx-auto text-zinc-600 dark:text-zinc-300 mb-10 text-lg">
            Discover the best from NYX and LA Girl. Click a brand to explore their best-selling makeup products!
          </p>
          <BrandGrid brands={BRANDS} onBrandClick={handleBrandClick} />
        </motion.section>
      </main>
      {/* --- Subtle floating animation for background --- */}
      <style>
        {`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-move {
          background: linear-gradient(120deg,#f9f4ef66 0%,#ffe9f988 100%);
          background-size: 200% 200%;
          animation: gradient-move 12s ease-in-out infinite;
        }
        `}
      </style>
    </>
  );
};

export default BrandPage;