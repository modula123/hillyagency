"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

const stats = [
  { val: "1K+", label: "Happy Clients" },
  { val: "25+", label: "Guided Tours" },
  { val: "100+", label: "Hotels & Stays" },
  { val: "50+", label: "Organized Events" },
  { val: "95%", label: "Client Satisfaction" },
];

export default function Cta2() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="py-16 bg-[var(--bg2)]">
      <div className="container mx-auto px-5 xl:px-0 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Stats */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {stats.map(({ val, label }) => (
              <div key={label} className="text-center p-4 rounded-2xl bg-[var(--bg)] border border-[var(--border)]">
                <h3 className="text-3xl font-black text-[var(--accent)]">{val}</h3>
                <p className="text-sm text-[var(--subtext)] mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Video thumbnail */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="/images/img/vid.png"
                alt="Rwanda travel video"
                width={500}
                height={320}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <Play size={24} fill="white" className="text-white ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="video-modal-overlay" onClick={() => setShowVideo(false)}>
          <div
            className="video-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => setShowVideo(false)}
              aria-label="Close video"
            >
              <X size={18} />
            </button>
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/KeVu_7ptnL8?autoplay=1"
                title="Hilly Agency Rwanda"
                allow="autoplay; encrypted-media; "
                allowFullScreen 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
