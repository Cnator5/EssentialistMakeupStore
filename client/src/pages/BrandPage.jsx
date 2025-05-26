import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { valideURLConvert } from '../utils/valideURLConvert'
import { Helmet } from 'react-helmet'

const makeupProducts = [
  { product: "Total control drop", genre: "foundation", brand: "NYX", bulk: 9000, sell: 13000 },
  { product: "Dou chromatic", genre: "lip gloss", brand: "NYX", bulk: 4000, sell: 6000 },
  { product: "Worth the hype", genre: "Mascara", brand: "NYX", bulk: 4000, sell: 6000 },
  { product: "LA girl", genre: "Lip/eye liner pencil 3 in 1", brand: "LA girl", bulk: 5000, sell: 6500 },
  { product: "Stay matte but not flat", genre: "Powder foundation", brand: "NYX", bulk: 10000, sell: 13000 },
  { product: "Stay matte but not flat", genre: "Liquid Foundation", brand: "NYX", bulk: 12000, sell: 14000 },
  { product: "NYX eye brow cake powder", genre: "Eye brow cake powder", brand: "NYX", bulk: 3000, sell: 4500 },
  { product: "NYX Mineral stick foundation", genre: "Stick foundation", brand: "NYX", bulk: 7000, sell: 10000 },
  { product: "NYX illuminator", genre: "Matte bronzer", brand: "NYX", bulk: 7000, sell: 9000 },
  { product: "Away we glow", genre: "liquid highlighter", brand: "NYX", bulk: 4000, sell: 6000 },
  { product: "NYX Glitter goals", genre: "liquid eyes hadow", brand: "NYX", bulk: 3000, sell: 5000 },
  { product: "NYX dark circle concealer", genre: "Dark circle concealer", brand: "NYX", bulk: 5000, sell: 7000 },
  { product: "Abit jelly gel", genre: "illuminator", brand: "NYX", bulk: 5000, sell: 7000 },
  { product: "NYX Bright light", genre: "High definition Blush", brand: "NYX", bulk: 6000, sell: 8500 },
  { product: "NYX baked blush", genre: "baked blush", brand: "NYX", bulk: 5000, sell: 7500 },
  { product: "sweet cheeks", genre: "blush", brand: "NYX", bulk: 5000, sell: 7500 },
  { product: "slip tease", genre: "lip lacquer", brand: "NYX", bulk: 4500, sell: 6500 },
  { product: "NYX Matte lipstick", genre: "matte lip sticks", brand: "NYX", bulk: 4000, sell: 5500 },
  { product: "Filler instincts", genre: "Lip color", brand: "NYX", bulk: 4000, sell: 5500 },
  { product: "HD Studio photogenic", genre: "foundation", brand: "NYX", bulk: 9000, sell: 13000 },
  { product: "Smookey Fume", genre: "Eye shadow palette", brand: "NYX", bulk: 4500, sell: 6500 },
  { product: "Total control PRO", genre: "foundation", brand: "NYX", bulk: 10000, sell: 12500 },
  { product: "Tango with", genre: "Bronzing powder", brand: "NYX", bulk: 5000, sell: 7000 },
  { product: "Ultimate Edit", genre: "Eye shadow pallette", brand: "NYX", bulk: 6000, sell: 8500 },
  { product: "Trio love in Rio", genre: "Eye shadow", brand: "NYX", bulk: 5000, sell: 7000 },
  { product: "NYX Pro lip cream", genre: "Lip cream pallette", brand: "NYX", bulk: 5000, sell: 6500 },
  { product: "NYX Lip sticks", genre: "Mat n butter lipsticks", brand: "NYX", bulk: 3500, sell: 4500 },
  { product: "NYX Lingerie", genre: "lip stick", brand: "NYX", bulk: 4000, sell: 5000 },
  { product: "NYX eye brow powder pencil", genre: "eye brow powder pencil", brand: "NYX", bulk: 2500, sell: 3500 },
  { product: "Control freak", genre: "eye brow gel 3 IN 1", brand: "NYX", bulk: 4000, sell: 5000 },
  { product: "NYX auto eye brow pencil", genre: "Eye pencils with brush", brand: "NYX", bulk: 2500, sell: 3500 },
  { product: "NYX above and beyond concealer", genre: "Concealer", brand: "NYX", bulk: 4000, sell: 6000 },
  { product: "NYX", genre: "pigments", brand: "NYX", bulk: 3000, sell: 3500 },
  { product: "Cosmic metals", genre: "Lip cream", brand: "NYX", bulk: 2500, sell: 3500 },
  { product: "Lingerie Push up", genre: "Long lasting lipstick", brand: "NYX", bulk: 4000, sell: 4500 },
  { product: "Powder Puff Lippie", genre: "powder lip cream", brand: "NYX", bulk: 4000, sell: 4500 },
  { product: "Born to glow large", genre: "Naturally Radiant foundation", brand: "NYX", bulk: 8000, sell: 11000 },
  { product: "Born to glow small", genre: "Radiant concealer", brand: "NYX", bulk: 4500, sell: 6000 },
  { product: "Mineral matte", genre: "Finishing powder", brand: "NYX", bulk: 8000, sell: 10000 },
  { product: "Can't stop,won't stop", genre: "Setting powder", brand: "NYX", bulk: 8000, sell: 11000 },
  { product: "HD Studio photogenic", genre: "Finishing powder", brand: "NYX", bulk: 8000, sell: 11000 },
  { product: "Filler instincts", genre: "lip gloss", brand: "NYX", bulk: 2500, sell: 3500 },
  { product: "Studio touch photo loving", genre: "Primer", brand: "NYX", bulk: 6500, sell: 7500 },
  { product: "Glitter goals", genre: "Cream glitter pallette", brand: "NYX", bulk: 6000, sell: 7500 },
  { product: "Ultimate multi finish", genre: "Shadow pallette", brand: "NYX", bulk: 7000, sell: 10000 },
  { product: "Tripple shadow for sexy babe's eyes only", genre: "Eye shadow palette", brand: "NYX", bulk: 5000, sell: 6500 },
  { product: "NYX Whipped", genre: "lip n cheek cream", brand: "NYX", bulk: 3500, sell: 4500 },
  { product: "Keeping it tight", genre: "Eye liner pencil", brand: "NYX", bulk: 3500, sell: 4500 },
  { product: "Dip,shape,go", genre: "brow pomade", brand: "NYX", bulk: 3500, sell: 4500 },
  { product: "NYX 3 in 1", genre: "Brow pencils", brand: "NYX", bulk: 4000, sell: 6500 },
  { product: "Supper Skinny", genre: "Eye markers", brand: "NYX", bulk: 4000, sell: 4500 },
  { product: "NYX Wonder stick", genre: "Highligh and contour stick", brand: "NYX", bulk: 4000, sell: 5000 },
  { product: "Lip of the day", genre: "Liquid lip liner", brand: "NYX", bulk: 3000, sell: 4000 },
  { product: "line and load 2 in 1 lippie", genre: "Lip liner n cream", brand: "NYX", bulk: 3500, sell: 4000 },
  { product: "Hydratouch", genre: "oil primer", brand: "NYX", bulk: 6500, sell: 8000 },
  { product: "Bare with me", genre: "Radiant perfecting primer", brand: "NYX", bulk: 7000, sell: 8500 },
  { product: "Bare with me", genre: "jelly primer", brand: "NYX", bulk: 7000, sell: 8500 },
  { product: "Bare with me", genre: "Tinted skin veil tube", brand: "NYX", bulk: 6000, sell: 7500 },
  { product: "Bare with me", genre: "Brow setter", brand: "NYX", bulk: 4000, sell: 5000 },
  { product: "Liquid suede", genre: "lip cream", brand: "NYX", bulk: 2500, sell: 3000 },
  { product: "BB beauty", genre: "Balm/Primer", brand: "NYX", bulk: 5000, sell: 6500 },
  { product: "Cant stop,wont stop", genre: "Full coverage foundation", brand: "NYX", bulk: 10000, sell: 13000 },
  { product: "NYX super fat", genre: "eye marker", brand: "NYX", bulk: 3500, sell: 4500 },
  { product: "NYX Liquid lipstick", genre: "liquid lipstick", brand: "NYX", bulk: 3500, sell: 4500 }
]

// Currency symbol for FCFA (Central African CFA franc)
const FCFA = (amount) => `${amount.toLocaleString()} FCFA`

function getSubCatInfoByName(allSubCategory, genreName) {
  return allSubCategory.find(sub =>
    sub.name.trim().toLowerCase() === genreName.trim().toLowerCase()
  )
}

function getMainAndSubCat(allCategory, allSubCategory, genreName) {
  const subCat = getSubCatInfoByName(allSubCategory, genreName)
  if (!subCat || !subCat.category?.length) return null
  const mainCat = allCategory.find(cat => cat._id === subCat.category[0]._id)
  if (!mainCat) return null
  return { mainCat, subCat }
}

const BuildAndBrand = () => {
  const allCategory = useSelector(state => state.product.allCategory)
  const allSubCategory = useSelector(state => state.product.allSubCategory)
  const navigate = useNavigate()

  const handleGoToSubCat = (genreName) => {
    const found = getMainAndSubCat(allCategory, allSubCategory, genreName)
    if (!found) return
    const { mainCat, subCat } = found
    const url = `/${valideURLConvert(mainCat.name)}-${mainCat._id}/${valideURLConvert(subCat.name)}-${subCat._id}`
    navigate(url)
  }

  return (
    <div className="bg-gradient-to-b from-pink-50 to-white min-h-screen py-10 px-2 md:px-10">
      <Helmet>
        {/* SEO: Focus on Makeup Brands, Cameroon, and Shopping */}
        <title>Top Makeup Brands in Cameroon | NYX, LA Girl & More | Essentialist Makeup Store</title>
        <meta name="description" content="Discover and shop authentic makeup brands in Cameroon including NYX and LA Girl at Essentialist Makeup Store. Explore a curated selection of foundations, lipsticks, powders, and more from the best global and African makeup brands. Fast delivery, competitive prices in FCFA, and reliable service!" />
        <meta name="keywords" content="makeup brands, Cameroon makeup, NYX Cameroon, LA Girl makeup, Cameroon beauty brands, buy makeup Cameroon, Cameroonian makeup brands, Douala makeup store, authentic NYX Cameroon, best makeup brands Cameroon, FCFA makeup price, cosmetics Douala, professional makeup Cameroon, beauty brands Africa, Cameroonian cosmetics, Essentialist Makeup Store, trending makeup Cameroon, wholesale makeup Cameroon, FCFA makeup deals, makeup shop Douala, cosmetic brands Cameroon, top makeup brands Cameroon, NYX products Cameroon, LA Girl Douala, FCFA beauty brands" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.esmakeupstore.com/brands" />

        {/* Favicons & Mobile */}
        <link rel="icon" type="image/avif" href="/icon.avif" />
        <link rel="apple-touch-icon" href="/icon.avif" />
        <meta name="theme-color" content="#faf6f3" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Open Graph */}
        <meta property="og:title" content="Top Makeup Brands in Cameroon | NYX, LA Girl & More | Essentialist Makeup Store" />
        <meta property="og:description" content="Authentic makeup brands in Cameroon: NYX, LA Girl, and more. Shop the latest beauty products at Essentialist Makeup Store for the best prices in FCFA." />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Essentialist Makeup Store" />
        <meta property="og:url" content="https://www.esmakeupstore.com/" />
        <meta property="og:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="NYX and LA Girl Makeup Cameroon" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="fr_CM" />

        {/* Twitter Card */}
        <meta name="twitter:title" content="Top Makeup Brands in Cameroon | NYX, LA Girl & More | Essentialist Makeup Store" />
        <meta name="twitter:description" content="Shop top makeup brands in Cameroon, including NYX and LA Girl, at Essentialist Makeup Store. Explore authentic cosmetics at the best FCFA prices." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg" />
        <meta name="twitter:image:alt" content="Makeup Brands Cameroon" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "Essentialist Makeup Store",
            "url": "https://www.esmakeupstore.com/",
            "logo": "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg",
            "image": [
              "https://www.esmakeupstore.com/assets/staymattebutnotflatpowderfoundationmain.jpg",
              "https://www.esmakeupstore.com/assets/NYX-PMU-Makeup-Lips-Liquid-Lipstick-LIP-LINGERIE-XXL-LXXL28-UNTAMABLE-0800897132187-OpenSwatch.webp",
              "https://www.esmakeupstore.com/assets/800897085421_duochromaticilluminatingpowder_twilighttint_alt2.jpg"
            ],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Douala",
              "addressLocality": "Douala",
              "addressCountry": "CM"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+237 6 77 00 00 00",
              "contactType": "customer support",
              "areaServed": "CM"
            },
            "sameAs": [
              "https://www.facebook.com/esmakeupstore",
              "https://www.instagram.com/esmakeupstore"
            ]
          }
          `}
        </script>
      </Helmet>
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-pink-500 mb-2 tracking-tight">ESSENTIALIST MAKEUP STORE</h1>
        <h2 className="text-xl md:text-3xl text-gray-700 font-bold mb-1">Build & Brand — Makeup Brands Price List</h2>
        <p className="text-pink-500 font-bold">Discover authentic NYX and LA Girl makeup brands at the best prices in Cameroon!</p>
      </header>

      <div className="overflow-x-auto rounded-lg border border-pink-200 shadow-lg bg-white">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="bg-pink-100 text-black">
              <th className="py-3 px-2 md:px-4 font-bold text-left">Product</th>
              <th className="py-3 px-2 md:px-4 font-bold text-left">Subcategory</th>
              <th className="py-3 px-2 md:px-4 font-bold text-left">Brand</th>
              <th className="py-3 px-2 md:px-4 font-bold text-right">Bulk Price (FCFA)</th>
              <th className="py-3 px-2 md:px-4 font-bold text-right">Selling Price (FCFA)</th>
            </tr>
          </thead>
          <tbody>
            {makeupProducts.map((item, idx) => {
              const found = getMainAndSubCat(allCategory, allSubCategory, item.genre)
              const clickable = !!found
              return (
                <tr key={item.product + idx} className={idx % 2 === 0 ? "bg-white" : "bg-pink-50"}>
                  <td className="py-2 px-2 md:px-4 font-bold md:font-normal">{item.product}</td>
                  <td className="py-2 px-2 md:px-4">
                    {clickable ? (
                      <button
                        onClick={() => handleGoToSubCat(item.genre)}
                        className="underline text-blue-700 hover:text-pink-400 transition font-medium cursor-pointer bg-transparent border-0 p-0"
                        style={{ outline: "none" }}
                        type="button"
                      >
                        {item.genre}
                      </button>
                    ) : (
                      <span className="text-gray-400">{item.genre}</span>
                    )}
                  </td>
                  <td className="py-2 px-2 md:px-4 text-black font-bold md:font-normal">{item.brand}</td>
                  <td className="py-2 px-2 md:px-4 text-right font-bold  text-green-500">{FCFA(item.bulk)}</td>
                  <td className="py-2 px-2 md:px-4 text-right font-bold text-pink-500">{FCFA(item.sell)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* SEO-Optimized Contact Section */}
      <section className="mt-12 md:mt-16 bg-pink-100 rounded-lg shadow-lg p-6 md:p-10 max-w-2xl mx-auto text-center font-bold">
        <h3 className="text-2xl font-bold text-pink-500 mb-2">Contact Us — Buy Top Makeup Brands in Cameroon</h3>
        <p className="text-gray-700 mb-4">
          For orders, business enquiries, or partnership with authentic makeup brands in Cameroon (NYX, LA Girl, and more), reach out to Essentialist Makeup Store. We supply genuine international and Cameroonian makeup brands at the best FCFA prices in Douala and nationwide.
        </p>
        <div className="flex flex-col items-center gap-2">
          <a
            href="tel:+237 655 22 55 69"
            className="font-bold text-pink-500 hover:text-pink-400 underline"
            title="Call Essentialist Makeup Store"
          >
            Call/WhatsApp: +237 655 22 55 69
          </a>
          <a
            href="mailto:esssmakeup@gmail.com"
            className="font-bold text-pink-500 hover:text-pink-400 underline"
            title="Email Essentialist Makeup Store"
          >
            Email: info@esmakeupstore.com
          </a>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          Visit us in Douala or shop online for the widest range of makeup, cosmetics, and beauty brands in Cameroon. Fast delivery, secure payment, and expert advice on all major makeup brands!
        </p>
      </section>
    </div>
  )
}

export default BuildAndBrand