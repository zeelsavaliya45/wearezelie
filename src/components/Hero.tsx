import React from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg"
            alt="Zelie Jewelry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="space-y-8">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight text-white leading-tight tracking-[0.3em] drop-shadow-2xl">
              ZELIE
            </h1>
            
            {/* Subtitle */}
            <div className="space-y-6">
              <p className="text-xl md:text-2xl font-light text-white/90 tracking-wide max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                Exquisite jewelry for every moment
              </p>
              <div className="w-24 h-px bg-white/60 mx-auto"></div>
              <p className="text-base md:text-lg font-light text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Discover our handcrafted collection where timeless elegance meets modern sophistication
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <button className="group bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-4 font-light tracking-wide hover:bg-white hover:text-[#503e28] transition-all duration-500 flex items-center space-x-3 mx-auto">
                <span>Explore Collection</span>
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-px h-16 bg-gradient-to-b from-white/60 to-transparent"></div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-[#503e28] text-white py-3 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </span>
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </span>
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </span>
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </span>
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </span>
          <span className="text-sm font-light tracking-wide mx-8">
            Waterproof · Anti-tarnish · Skin-friendly · Order above ₹599 for FREE delivery
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;