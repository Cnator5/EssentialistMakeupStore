import React from "react";

// TikTok-style videos (local mp4 files, must be in public folder)
const tiktokVideos = [
  "/Download (2).mp4",
  "/Download (1).mp4",
  "/Download.mp4",
  "/Download (3).mp4",
  "/Download (4).mp4",
  "/essentialist-video.mp4",
];

// Utility to detect mobile device (simple version)
const isMobile = () => {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
};

const TikTokGallery = ({ videos = tiktokVideos }) => (
  <section className="my-16">
    <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">
      Watch Some Of Our Makeup Samples
    </h2>
    <div
      className="
        grid gap-8
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        max-w-7xl
        mx-auto
        px-2
      "
    >
      {videos.map((url, i) => (
        <div
          key={url}
          className="
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-lg
            flex
            flex-col
            items-center
            border border-gray-100
            transition-transform
            hover:scale-[1.025]
            hover:shadow-2xl
            aspect-[9/16]
          "
          style={{
            minHeight: "350px",
            background: "linear-gradient(130deg,#f8fafc 0%, #fff 100%)",
            width: "100%",
            maxWidth: 400,
            margin: "0 auto",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            controls={isMobile()}
            className="w-full h-full object-cover bg-gray-100"
            style={{
              aspectRatio: "9 / 16",
              maxHeight: "100%",
              width: "100%",
              display: "block",
            }}
            aria-label={`Makeup video demo ${i + 1}`}
            poster="" // optionally add a fallback image path here
          >
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
    <style>
      {`
        @media (max-width: 600px) {
          .aspect-\\[9\\/16\\] {
            min-height: 180px !important;
            height: 60vw !important;
            max-height: 90vw !important;
          }
        }
      `}
    </style>
  </section>
);

export default TikTokGallery;