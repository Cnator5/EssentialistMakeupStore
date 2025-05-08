// import React from "react";

// const adTexts = [
//   "💄 Up to 50% OFF on Lipsticks! Shop Now!",
//   "🌟 Flash Sale: Free Mascara on orders above $50!",
//   "🎁 Buy 2 Get 1 Free on all Makeup Kits!",
//   "✨ Exclusive: New Arrivals in Skincare! Explore Now!",
//   "🛍️ Weekend Special: Extra 10% OFF with code BEAUTY10!",
//   "🌸 Summer Glow Essentials - Grab Yours!",
// ];

// const AdMarquee = () => (
//   <div style={{
//     width: "100%",
//     overflow: "hidden",
//     background: "linear-gradient(90deg, #fbcfe8 0%, #f5f3ff 50%, #fbcfe8 100%)",
//     borderBottom: "1px solid #f472b6",
//     height: "40px",
//     display: "flex",
//     alignItems: "center",
//     fontWeight: "600",
//     color: "#db2777",
//     fontSize: "0.875rem",
//     position: "relative",
//     fontFamily: "system-ui, -apple-system, sans-serif"
//   }}>
//     <div className="marquee" style={{
//       display: "inline-block",
//       whiteSpace: "nowrap",
//       animation: "marquee 35s linear infinite"
//     }}>
//       {adTexts.concat(adTexts).map((text, idx) => (
//         <span key={idx} style={{ 
//           margin: "0 2rem",
//           padding: "0.25rem 0.75rem",
//           borderRadius: "4px",
//           background: "rgba(244, 114, 182, 0.08)"
//         }}>{text}</span>
//       ))}
//     </div>
//     <style>
//       {`
//         @keyframes marquee {
//           0%   { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .marquee:hover {
//           animation-play-state: paused;
//         }
//       `}
//     </style>
//   </div>
// );

// export default AdMarquee;