import "dotenv/config";
import mongoose from "mongoose";
import BlogModel from "../models/blog.model.js";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ Missing MONGODB_URI");
  process.exit(1);
}

const stripHtml = (html = "") => html.replace(/<[^>]*>/g, " ");

const readingTime = (content = "") => {
  const words = stripHtml(content).split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Using Pexels API for high-quality free images
// Format: https://images.pexels.com/photos/{id}/pexels-photo-{id}.jpeg?auto=compress&cs=tinysrgb&w=600
const PEXELS_IMAGES = {
  makeup_general: "https://images.pexels.com/photos/3045687/pexels-photo-3045687.jpeg?auto=compress&cs=tinysrgb&w=1200",
  foundation: "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=1200",
  lipstick: "https://images.pexels.com/photos/3966575/pexels-photo-3966575.jpeg?auto=compress&cs=tinysrgb&w=1200",
  bridal: "https://images.pexels.com/photos/3622622/pexels-photo-3622622.jpeg?auto=compress&cs=tinysrgb&w=1200",
  eyeshadow: "https://images.pexels.com/photos/3622621/pexels-photo-3622621.jpeg?auto=compress&cs=tinysrgb&w=1200",
  beauty: "https://images.pexels.com/photos/1065438/pexels-photo-1065438.jpeg?auto=compress&cs=tinysrgb&w=1200",
  skincare: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1200",
  blush: "https://images.pexels.com/photos/3622624/pexels-photo-3622624.jpeg?auto=compress&cs=tinysrgb&w=1200",
  highlighter: "https://images.pexels.com/photos/3622623/pexels-photo-3622623.jpeg?auto=compress&cs=tinysrgb&w=1200",
  wedding: "https://images.pexels.com/photos/3628036/pexels-photo-3628036.jpeg?auto=compress&cs=tinysrgb&w=1200",
  makeup_artist: "https://images.pexels.com/photos/3622625/pexels-photo-3622625.jpeg?auto=compress&cs=tinysrgb&w=1200",
  cosmetics: "https://images.pexels.com/photos/3622626/pexels-photo-3622626.jpeg?auto=compress&cs=tinysrgb&w=1200",
  face: "https://images.pexels.com/photos/3622627/pexels-photo-3622627.jpeg?auto=compress&cs=tinysrgb&w=1200",
  brush: "https://images.pexels.com/photos/3622628/pexels-photo-3622628.jpeg?auto=compress&cs=tinysrgb&w=1200",
  mirror: "https://images.pexels.com/photos/3622629/pexels-photo-3622629.jpeg?auto=compress&cs=tinysrgb&w=1200",
  professional: "https://images.pexels.com/photos/3622630/pexels-photo-3622630.jpeg?auto=compress&cs=tinysrgb&w=1200",
  glow: "https://images.pexels.com/photos/3622631/pexels-photo-3622631.jpeg?auto=compress&cs=tinysrgb&w=1200",
  studio: "https://images.pexels.com/photos/3622632/pexels-photo-3622632.jpeg?auto=compress&cs=tinysrgb&w=1200",
  natural: "https://images.pexels.com/photos/1065439/pexels-photo-1065439.jpeg?auto=compress&cs=tinysrgb&w=1200",
  glamour: "https://images.pexels.com/photos/1065440/pexels-photo-1065440.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

// Cloudinary backup images (your existing setup)
const CLOUDINARY_IMAGES = {
  primary_1: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748247970/glamourglow/bt4uhftifsa2gpe9azyv.jpg",
  primary_2: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748247773/glamourglow/odemdzbu71anqoohdtjq.jpg",
  primary_3: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748247754/glamourglow/pcbfvwbnvxw8acmc1csv.jpg",
  primary_4: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748211626/glamourglow/dhkwymdwlflypgbqxl7q.jpg",
  primary_5: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748247736/glamourglow/fzua6rxrq2undbmffalm.jpg",
  primary_6: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748211405/glamourglow/syt0vrfndhxfiwpsxnzq.jpg",
  primary_7: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748211595/glamourglow/qhtpofp3raqyzomhjwrf.jpg",
  primary_8: "https://res.cloudinary.com/dvpweiur3/image/upload/v1748211006/glamourglow/qxmho3dafk4dre3nhgzi.jpg"
};

const basePosts = [
  {
    "title": "Where to Buy Original Makeup Products in Cameroon (2026 Guide)",
    "slug": "where-to-buy-original-makeup-products-in-cameroon-2026",
    "excerpt": "A practical, Cameroon-focused guide to finding authentic makeup in Douala, Yaoundé, and beyond, with tips to avoid counterfeits and shop safely online.",
    "coverImage": CLOUDINARY_IMAGES.primary_1,
    "content": `<p>Finding authentic makeup in Cameroon is easier when you know what to look for. Counterfeit products often appear in informal markets and can lead to irritation, poor color payoff, and short wear time. A trusted online store helps you verify brands, shade ranges, and batch details before purchase. Always check for proper packaging seals, clear ingredient lists, and consistent brand logos.</p><p>In cities like Douala and Yaoundé, demand for long-wear and humidity-resistant formulas is high. Look for sellers who specialize in curated beauty selections rather than random mixed inventory. If an item is priced far below the usual market rate, that is often a red flag. Authentic products also have reliable texture and pigmentation that match brand standards, which is especially important for deeper skin tones common across Cameroon.</p><p><img src="${PEXELS_IMAGES.makeup_general}" alt="Original Makeup Products" style="max-width:100%; height:auto;"/></p><p>For a safe and convenient experience, shopping online is the smartest option. esmakeupstore.com delivers authentic makeup nationwide with clear product descriptions and shade guidance. This makes it easy to compare finishes, check ingredients, and order with confidence whether you are in Limbe, Bafoussam, or Garoua.</p><p><img src="${PEXELS_IMAGES.cosmetics}" alt="Makeup Store Display" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for verified beauty brands and fast delivery across Cameroon.</p>`,
    "tags": ["buy makeup Cameroon", "original beauty products", "Douala makeup store", "Cameroon beauty"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Where to Buy Original Makeup in Cameroon (2026) | esmakeupstore.com",
    "metaDescription": "Learn how to buy authentic makeup in Cameroon, avoid counterfeits, and shop trusted beauty products with nationwide delivery."
  },
  {
    "title": "Best Foundations for Oily Skin in Cameroon's Humid Climate",
    "slug": "best-foundations-for-oily-skin-in-cameroon-humid-climate",
    "excerpt": "Discover long-wear, oil-controlling foundations that stay fresh in Cameroon's heat and humidity.",
    "coverImage": CLOUDINARY_IMAGES.primary_2,
    "content": `<p>Cameroon's climate can be challenging for oily skin, especially in humid coastal cities like Douala and Limbe. The key is choosing a foundation that is oil-free, breathable, and designed for long wear. Matte or soft-matte finishes help reduce shine without looking flat, and formulas labeled "sweat resistant" or "transfer resistant" give better performance through the day.</p><p>For the best results, start with a mattifying primer focused on the T-zone, then apply foundation in thin layers. Build coverage only where needed to avoid caking. Setting with a finely milled translucent powder helps lock in coverage while keeping texture smooth. A light mist of setting spray adds extra durability for long days and evening events.</p><p><img src="${PEXELS_IMAGES.foundation}" alt="Foundation Application" style="max-width:100%; height:auto;"/></p><p>At esmakeupstore.com, you'll find foundations tailored for tropical wear and a wide shade range for Cameroonian skin tones. Whether you want full coverage for events or lightweight coverage for daily wear, you can shop with confidence and get fast nationwide delivery.</p><p><img src="${PEXELS_IMAGES.beauty}" alt="Beauty Products" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for oil-control foundations built for Cameroon's climate.</p>`,
    "tags": ["foundation Cameroon", "oily skin makeup", "humidity proof makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Best Foundations for Oily Skin in Cameroon | esmakeupstore.com",
    "metaDescription": "Explore sweat-resistant, oil-controlling foundations perfect for Cameroon's humid climate and deeper skin tones."
  },
  {
    "title": "Top 10 Lipstick Shades Trending in Cameroon Right Now",
    "slug": "top-10-lipstick-shades-trending-in-cameroon-right-now",
    "excerpt": "From bold reds to rich plums, these are the lipstick colors Cameroonian beauty lovers are wearing this season.",
    "coverImage": CLOUDINARY_IMAGES.primary_3,
    "content": `<p>Cameroon's lipstick trends celebrate warmth, richness, and confidence. Classic reds remain a favorite for formal events, while terracotta nudes and caramel browns are popular for everyday elegance. Deep plums and berry shades are dominating evening looks in Yaoundé and Bamenda, complementing melanin-rich skin beautifully.</p><p>When choosing a lipstick for tropical wear, prioritize formulas that balance pigment with comfort. Matte lip creams give long wear, while satin finishes offer hydration without excessive shine. Pair your lip color with a matching liner for shape definition and to prevent feathering in humidity.</p><p><img src="${PEXELS_IMAGES.lipstick}" alt="Trending Lipstick Shades" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com carries a curated selection of trending shades with consistent pigment and skin-flattering undertones. Whether you are shopping for bridal looks, office wear, or weekend glam, you can find colors that suit your style.</p><p><img src="${PEXELS_IMAGES.face}" alt="Lip Color Application" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for Cameroon's most loved lipstick shades.</p>`,
    "tags": ["lipstick Cameroon", "trending makeup", "Cameroon beauty trends"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Top Lipstick Shades in Cameroon | esmakeupstore.com",
    "metaDescription": "Discover the top lipstick shades trending in Cameroon, from classic reds to deep plums and warm nudes."
  },
  {
    "title": "How to Make Your Makeup Last in Douala's Humidity",
    "slug": "how-to-make-your-makeup-last-in-doualas-humidity",
    "excerpt": "Humidity-proof your makeup routine with pro layering techniques and product picks made for Douala weather.",
    "coverImage": CLOUDINARY_IMAGES.primary_4,
    "content": `<p>Douala's coastal humidity can melt makeup fast if your base isn't properly layered. Start with oil-free skincare and a lightweight moisturizer so your products don't slide. A gripping primer is essential—focus on the T-zone and smile lines where makeup breaks down first.</p><p>Choose a long-wear foundation and apply in thin layers using a damp sponge for a smooth finish. Set with a finely milled powder, then add cream blush and bronzer for color that fuses into the skin. Finish with a setting spray that locks makeup without heaviness.</p><p><img src="${PEXELS_IMAGES.glow}" alt="Long-wear Makeup Base" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com offers humidity-resistant foundations, primers, and setting sprays tailored for Cameroonian weather. With nationwide delivery, you can keep your makeup fresh from morning commute to evening outing.</p><p><img src="${PEXELS_IMAGES.makeup_artist}" alt="Professional Makeup Application" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com and keep your Douala makeup flawless all day.</p>`,
    "tags": ["Douala makeup", "humidity proof", "long wear makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Makeup That Lasts in Douala's Humidity | esmakeupstore.com",
    "metaDescription": "Learn how to make your makeup last in Douala's humid climate with pro tips and product recommendations."
  },
  {
    "title": "Best Bridal Makeup Looks for Cameroon Weddings",
    "slug": "best-bridal-makeup-looks-for-cameroon-weddings",
    "excerpt": "Elegant bridal makeup ideas designed for Cameroon weddings, from traditional ceremonies to modern receptions.",
    "coverImage": CLOUDINARY_IMAGES.primary_5,
    "content": `<p>Bridal makeup in Cameroon blends tradition and modern glam. Brides often need makeup that photographs well in daylight and remains flawless through evening celebrations. A soft matte base with radiant highlights is ideal for humid venues, and peach or berry blush adds warmth across different skin tones.</p><p>For eyes, neutral brown tones with a touch of gold shimmer pair beautifully with traditional attire. Waterproof eyeliner and mascara are essential for long hours and emotional moments. For lips, opt for a long-wear satin or matte formula in deep rose, classic red, or mocha nude—colors that stay elegant in photos.</p><p><img src="${PEXELS_IMAGES.bridal}" alt="Bridal Makeup Look" style="max-width:100%; height:auto;"/></p><p>At esmakeupstore.com you can build a bridal kit with reliable formulas for base, eyes, and lips. This ensures the look remains consistent from engagement session to final dance.</p><p><img src="${PEXELS_IMAGES.wedding}" alt="Wedding Celebration" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com to create your perfect Cameroon bridal makeup look.</p>`,
    "tags": ["bridal makeup Cameroon", "wedding beauty", "Cameroon bridal"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Cameroon Bridal Makeup Looks | esmakeupstore.com",
    "metaDescription": "Explore elegant bridal makeup looks for Cameroon weddings with tips on long-wear base, eyes, and lips."
  },
  {
    "title": "Everyday Makeup Routine for Busy Women in Yaoundé",
    "slug": "everyday-makeup-routine-for-busy-women-in-yaounde",
    "excerpt": "A fast, polished makeup routine designed for Yaoundé's pace and climate.",
    "coverImage": CLOUDINARY_IMAGES.primary_6,
    "content": `<p>In Yaoundé, many women need a quick makeup routine that looks professional but feels light. Start with a tinted moisturizer or light-coverage foundation to even out skin tone without heaviness. Spot conceal where needed, then set the T-zone with a small amount of powder.</p><p>Add warmth with a soft bronzer or blush in peach or rose-brown. For eyes, a single neutral shadow and mascara opens the face without extra steps. Finish with a moisturizing lip tint or satin lipstick in a natural shade.</p><p><img src="${PEXELS_IMAGES.natural}" alt="Everyday Makeup Routine" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com provides easy, everyday essentials that suit Cameroonian skin tones and withstand daily heat. Build a simple, reliable kit you can use in 10 minutes or less.</p><p><img src="${PEXELS_IMAGES.skincare}" alt="Skincare and Makeup" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for quick, polished Yaoundé makeup essentials.</p>`,
    "tags": ["Yaounde makeup", "everyday makeup", "work makeup Cameroon"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Everyday Makeup Routine in Yaoundé | esmakeupstore.com",
    "metaDescription": "Discover a fast, polished makeup routine for busy women in Yaoundé with products suited to Cameroon's climate."
  },
  {
    "title": "Best Makeup for Dark Skin Tones in Cameroon",
    "slug": "best-makeup-for-dark-skin-tones-in-cameroon",
    "excerpt": "Learn how to choose shades and finishes that enhance deep skin tones with confidence.",
    "coverImage": CLOUDINARY_IMAGES.primary_2,
    "content": `<p>Deep skin tones deserve rich pigment and undertones that complement natural warmth. When choosing foundation, look for brands that offer true deep shades without looking ashy. Undertones matter—golden, red, or neutral undertones should match your neck and chest to prevent color mismatch.</p><p>Blush shades like berry, deep rose, and warm terracotta enhance melanin beautifully. For highlighter, go for gold, bronze, or copper instead of icy tones, which can appear chalky. Lip shades such as deep plum, chocolate nude, and bold red create stunning contrast and elegance.</p><p><img src="${PEXELS_IMAGES.highlighter}" alt="Deep Skin Tone Makeup" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com curates inclusive shades that flatter Cameroon's diverse complexion range. Whether you prefer natural glam or bold statements, you can shop confidently for products that truly match your tone.</p><p><img src="${PEXELS_IMAGES.blush}" alt="Makeup Shades for Deep Skin" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for inclusive makeup made for Cameroonian skin tones.</p>`,
    "tags": ["dark skin makeup", "Cameroon beauty", "inclusive makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Best Makeup for Dark Skin in Cameroon | esmakeupstore.com",
    "metaDescription": "Find the best foundation, blush, and lip shades for dark skin tones in Cameroon with expert tips."
  },
  {
    "title": "Makeup for the Harmattan Season in Northern Cameroon",
    "slug": "makeup-for-the-harmattan-season-in-northern-cameroon",
    "excerpt": "Protect your skin and keep makeup smooth during Harmattan dryness in Garoua and Maroua.",
    "coverImage": CLOUDINARY_IMAGES.primary_3,
    "content": `<p>Harmattan season brings dry winds and dusty air to northern Cameroon, which can make makeup look patchy if skin isn't properly prepped. Begin with a hydrating cleanser and a rich, non-greasy moisturizer to prevent flaking. A dewy primer can help makeup adhere while keeping skin comfortable.</p><p>Switch to cream-based products for blush and bronzer to avoid dry texture. If you prefer powder, choose finely milled formulas and apply lightly. Finish with a hydrating setting spray to keep the face fresh and prevent makeup from cracking in dry air.</p><p><img src="${PEXELS_IMAGES.mirror}" alt="Makeup Application in Dry Climate" style="max-width:100%; height:auto;"/></p><p>At esmakeupstore.com, you can find moisture-friendly primers, foundation, and setting sprays that work well in Harmattan conditions. This helps you maintain a smooth, radiant finish without sacrificing comfort.</p><p><img src="${PEXELS_IMAGES.professional}" alt="Professional Makeup Setup" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for Harmattan-ready makeup essentials.</p>`,
    "tags": ["Harmattan makeup", "dry skin Cameroon", "Northern Cameroon beauty"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Makeup for Harmattan Season in Cameroon | esmakeupstore.com",
    "metaDescription": "Keep makeup smooth during Harmattan with hydrating prep and long-wear products for northern Cameroon."
  },
  {
    "title": "Best Waterproof Makeup for Rainy Season in Cameroon",
    "slug": "best-waterproof-makeup-for-rainy-season-in-cameroon",
    "excerpt": "Rainy season essentials to keep your makeup intact from morning to night.",
    "coverImage": CLOUDINARY_IMAGES.primary_4,
    "content": `<p>Cameroon's rainy season demands makeup that resists water and humidity. Waterproof mascara and eyeliner prevent smudging, while long-wear foundation formulas help maintain coverage during unexpected downpours. A setting spray labeled "water resistant" provides extra protection.</p><p>To prevent cakiness, avoid heavy layering. Instead, use a gripping primer, apply foundation in thin layers, and set lightly with powder. Cream products often hold better than powder in damp conditions, so consider a cream blush with a setting spray to lock it in.</p><p><img src="${PEXELS_IMAGES.eyeshadow}" alt="Waterproof Makeup Application" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com stocks waterproof essentials designed for Cameroon's weather. You can build a rainy-season kit with confidence and enjoy reliable wear all day.</p><p><img src="${PEXELS_IMAGES.glamour}" alt="Long-wear Makeup Products" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for waterproof makeup that lasts through Cameroon's rainy season.</p>`,
    "tags": ["waterproof makeup", "rainy season Cameroon", "long wear makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Waterproof Makeup for Cameroon Rainy Season | esmakeupstore.com",
    "metaDescription": "Discover waterproof makeup essentials to keep your look intact during Cameroon's rainy season."
  },
  {
    "title": "Soft Glam Makeup Look for Office Wear in Cameroon",
    "slug": "soft-glam-makeup-look-for-office-wear-in-cameroon",
    "excerpt": "Professional soft glam tips for Cameroonian offices, from base to lips.",
    "coverImage": CLOUDINARY_IMAGES.primary_5,
    "content": `<p>Soft glam is perfect for office settings in Cameroon because it looks polished without being heavy. Start with a medium-coverage foundation that evens out complexion, then add a gentle contour or bronzer to warm the face. Use a neutral blush shade that flatters your skin tone.</p><p>For eyes, use warm browns and soft shimmer to create depth without harsh lines. A thin eyeliner and lengthening mascara define lashes while keeping the look professional. Finish with a satin or creamy lipstick in nude-brown or rose to maintain an elegant finish.</p><p><img src="${PEXELS_IMAGES.studio}" alt="Office Makeup" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com offers curated soft-glam essentials that are easy to wear and long lasting. Perfect for professionals in Douala, Yaoundé, or Buea who need dependable daily makeup.</p><p><img src="${PEXELS_IMAGES.makeup_general}" alt="Professional Soft Glam" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for soft glam office essentials.</p>`,
    "tags": ["soft glam", "office makeup Cameroon", "work makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Soft Glam Office Makeup in Cameroon | esmakeupstore.com",
    "metaDescription": "Create a polished soft glam look for office wear in Cameroon with long-lasting products and pro tips."
  },
  {
    "title": "Beginner Makeup Kit Essentials for Cameroon Beauty Lovers",
    "slug": "beginner-makeup-kit-essentials-for-cameroon-beauty-lovers",
    "excerpt": "A complete beginner's guide to building a basic makeup kit tailored to Cameroon's climate.",
    "coverImage": CLOUDINARY_IMAGES.primary_1,
    "content": `<p>Starting your makeup journey can feel overwhelming, but a simple kit makes everything easier. Begin with a lightweight foundation or tinted moisturizer that matches your undertone. Add a concealer for under-eye brightness and blemish coverage, plus a pressed powder for oil control in humid areas.</p><p>Include a neutral eyeshadow palette, mascara, and a brow pencil for definition. A blush and a versatile lip color complete the look. Choose products that suit Cameroon's weather, such as sweat-resistant formulas and long-wear finishes.</p><p><img src="${PEXELS_IMAGES.brush}" alt="Makeup Kit Essentials" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com helps beginners by offering curated collections, shade guidance, and authentic products. This makes it easier to start with confidence and build skills over time.</p><p><img src="${PEXELS_IMAGES.cosmetics}" alt="Beauty Product Collection" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com to build your perfect beginner makeup kit.</p>`,
    "tags": ["beginner makeup", "makeup kit Cameroon", "beauty essentials"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Beginner Makeup Kit Essentials in Cameroon | esmakeupstore.com",
    "metaDescription": "Learn which makeup essentials every beginner in Cameroon should own for easy, everyday beauty."
  },
  {
    "title": "How to Choose the Right Foundation Shade in Cameroon",
    "slug": "how-to-choose-the-right-foundation-shade-in-cameroon",
    "excerpt": "A practical shade-matching guide for Cameroonian skin tones and undertones.",
    "coverImage": CLOUDINARY_IMAGES.primary_2,
    "content": `<p>Choosing the right foundation shade starts with identifying your undertone. Golden or warm undertones are common in Cameroon, but neutral and red undertones also exist. Test foundation along the jawline in daylight and allow it to oxidize for a few minutes before deciding.</p><p>In humid climates, some foundations darken slightly as they set. This is why testing oxidation matters, especially in cities like Douala. If you are between shades, choose the one that matches your neck and chest for the most natural blend.</p><p><img src="${PEXELS_IMAGES.face}" alt="Foundation Shade Matching" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com provides shade descriptions and undertone guidance to make online shopping easier. With a broad shade range, you can find a match that looks seamless and natural.</p><p><img src="${PEXELS_IMAGES.beauty}" alt="Foundation Application Guide" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for accurate shade matching and authentic foundation choices.</p>`,
    "tags": ["foundation shade", "undertone Cameroon", "makeup tips"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "How to Choose Foundation Shade in Cameroon | esmakeupstore.com",
    "metaDescription": "Learn how to match foundation to your undertone in Cameroon and avoid common shade mistakes."
  },
  {
    "title": "Makeup for University Students in Buea: Budget & Long Wear",
    "slug": "makeup-for-university-students-in-buea-budget-and-long-wear",
    "excerpt": "Affordable, long-lasting makeup picks for students in Buea's humid campus environment.",
    "coverImage": CLOUDINARY_IMAGES.primary_6,
    "content": `<p>University students in Buea often need makeup that is affordable, light, and long-wearing. A simple base with a skin tint or light foundation keeps you fresh through lectures. Pair it with a concealer for bright under-eyes and a compact powder for quick touch-ups.</p><p>A multipurpose blush that doubles as lip color saves both money and space. A mascara and brow pencil define your face without a full glam routine. With Buea's humidity, choose products labeled long wear or sweat resistant for better performance.</p><p><img src="${PEXELS_IMAGES.natural}" alt="Student Makeup" style="max-width:100%; height:auto;"/></p><p>At esmakeupstore.com, students can find budget-friendly options that are still authentic and reliable. This makes it easier to build a quality routine without overspending.</p><p><img src="${PEXELS_IMAGES.makeup_general}" alt="Affordable Beauty Products" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for student-friendly makeup essentials.</p>`,
    "tags": ["Buea makeup", "student makeup", "budget beauty Cameroon"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Student Makeup in Buea | esmakeupstore.com",
    "metaDescription": "Affordable, long-wear makeup tips for university students in Buea and across Cameroon."
  },
  {
    "title": "Best Makeup for Outdoor Events in Kribi and Limbe",
    "slug": "best-makeup-for-outdoor-events-in-kribi-and-limbe",
    "excerpt": "Heat- and humidity-proof makeup tips for beach weddings, outings, and outdoor parties.",
    "coverImage": CLOUDINARY_IMAGES.primary_3,
    "content": `<p>Outdoor events in Kribi and Limbe often combine sun, sea breeze, and high humidity. Your makeup needs to be lightweight yet durable. Start with SPF in your skincare and then apply a matte or semi-matte foundation that won't slide in heat.</p><p>Use cream blush and bronzer for a natural, sun-kissed finish, then set with a light powder. Waterproof mascara and liner help prevent smudging, and a transfer-resistant lipstick keeps color intact during meals and photos.</p><p><img src="${PEXELS_IMAGES.glow}" alt="Outdoor Event Makeup" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com offers long-wear products designed for Cameroon's coastal weather. With the right base and sealing products, your look stays fresh from beach ceremony to evening reception.</p><p><img src="${PEXELS_IMAGES.glamour}" alt="Beach Event Ready" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for outdoor event makeup that lasts.</p>`,
    "tags": ["Kribi makeup", "Limbe makeup", "outdoor makeup Cameroon"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Outdoor Event Makeup for Kribi & Limbe | esmakeupstore.com",
    "metaDescription": "Get heat- and humidity-proof makeup tips for outdoor events in Kribi and Limbe."
  },
  {
    "title": "Cameroon Makeup Trends 2026: What's New This Year",
    "slug": "cameroon-makeup-trends-2026-whats-new-this-year",
    "excerpt": "From soft glam to bold lips, explore the top makeup trends emerging across Cameroon.",
    "coverImage": CLOUDINARY_IMAGES.primary_4,
    "content": `<p>Makeup trends in Cameroon for 2026 focus on healthy skin finishes, bold lips, and soft sculpting. Many beauty lovers are embracing medium-coverage foundations that allow skin texture to show naturally, paired with strategic highlighting for glow.</p><p>Color trends include plum, terracotta, and rich red lip shades, while eyes remain soft with warm browns and subtle shimmer. Another growing trend is the "single product look," where a cream product is used on cheeks, eyes, and lips for harmony.</p><p><img src="${PEXELS_IMAGES.professional}" alt="2026 Makeup Trends" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com updates its catalog with modern formulas and trending shades so Cameroonian beauty lovers can stay current without compromising on authenticity.</p><p><img src="${PEXELS_IMAGES.glamour}" alt="Trend-Forward Makeup" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for the newest makeup trends in Cameroon.</p>`,
    "tags": ["makeup trends Cameroon", "beauty 2026", "Cameroon makeup"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Cameroon Makeup Trends 2026 | esmakeupstore.com",
    "metaDescription": "Explore the top makeup trends in Cameroon for 2026, including bold lips and soft-glow skin."
  },
  {
    "title": "How to Build a Long‑Wear Base for Cameroon Heat",
    "slug": "how-to-build-a-long-wear-base-for-cameroon-heat",
    "excerpt": "A step-by-step base routine to keep your makeup fresh in Cameroon's heat.",
    "coverImage": CLOUDINARY_IMAGES.primary_5,
    "content": `<p>Long-wear makeup starts with proper skin preparation. Cleanse, moisturize lightly, and apply a primer that targets your skin type. If you have oily skin, focus on mattifying formulas, while dry skin types should use hydrating primers.</p><p>Apply foundation in thin layers and blend well. Conceal only where needed to avoid heavy buildup. Set the face with a loose powder, pressing it into areas that tend to shine. Finally, lock everything in with a setting spray designed for long wear.</p><p><img src="${PEXELS_IMAGES.makeup_artist}" alt="Base Building Steps" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com carries primers, foundations, and setting sprays tested for Cameroon's heat. With the right products, your base can stay smooth and radiant all day.</p><p><img src="${PEXELS_IMAGES.studio}" alt="Professional Base Application" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for long-wear base essentials.</p>`,
    "tags": ["long wear makeup", "Cameroon heat", "makeup base"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Long-Wear Makeup Base for Cameroon Heat | esmakeupstore.com",
    "metaDescription": "Learn how to build a long-wear makeup base that withstands Cameroon's heat and humidity."
  },
  {
    "title": "Top Makeup Mistakes to Avoid in Cameroon's Climate",
    "slug": "top-makeup-mistakes-to-avoid-in-cameroons-climate",
    "excerpt": "Avoid common heat and humidity mistakes that cause makeup to melt or look patchy.",
    "coverImage": CLOUDINARY_IMAGES.primary_6,
    "content": `<p>One major mistake in Cameroon's climate is applying heavy layers of foundation. Thick coverage can break apart quickly in heat and humidity. Instead, build thin layers and only add coverage where needed. Another mistake is skipping primer, which helps makeup grip and last longer.</p><p>Using the wrong powder can also cause dryness or flashback in photos. Choose finely milled powders that match your skin tone and apply lightly. Lastly, forgetting a setting spray can reduce your makeup's longevity, especially during long outdoor events.</p><p><img src="${PEXELS_IMAGES.face}" alt="Makeup Mistakes to Avoid" style="max-width:100%; height:auto;"/></p><p>esmakeupstore.com offers climate-friendly products that help you avoid these issues. With the right formulas, you can achieve a fresh, long-lasting look with minimal effort.</p><p><img src="${PEXELS_IMAGES.cosmetics}" alt="Correct Makeup Application" style="max-width:100%; height:auto;"/></p><p>Shop now at esmakeupstore.com for products that work with Cameroon's weather.</p>`,
    "tags": ["makeup mistakes", "Cameroon climate", "beauty tips"],
    "status": "published",
    "author": null,
    "publishedAt": "2026-02-22T10:00:00.000Z",
    "metaTitle": "Makeup Mistakes to Avoid in Cameroon | esmakeupstore.com",
    "metaDescription": "Avoid common makeup mistakes in Cameroon's heat and humidity with expert guidance."
  }
];

const run = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected");

    for (const post of basePosts) {
      await BlogModel.updateOne(
        { slug: post.slug },
        {
          $set: {
            ...post,
            readingTime: readingTime(post.content)
          }
        },
        { upsert: true }
      );
    }

    console.log("✅ Seed complete - All blog posts updated with optimized API images");
    console.log(`📝 Total posts: ${basePosts.length}`);
    console.log("🖼️ Images sourced from: Pexels API + Cloudinary");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

run();