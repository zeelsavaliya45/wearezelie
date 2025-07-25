import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#503e28]"></div>
        <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-[#503e28]"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 rounded-full bg-[#503e28]"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-[#503e28]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-gray-900 leading-tight tracking-wider">
            ZELIE
          </h1>
          
          {/* Subtitle */}
          <div className="space-y-4">
            <p className="text-xl md:text-2xl font-light text-gray-600 tracking-wide max-w-3xl mx-auto leading-relaxed">
              Exquisite jewelry for every moment
            </p>
            <div className="w-24 h-px bg-[#503e28] mx-auto"></div>
            <p className="text-base md:text-lg font-light text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Discover our handcrafted collection where timeless elegance meets modern sophistication
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <button className="group bg-[#503e28] text-white px-8 py-4 font-light tracking-wide hover:bg-[#3d2f1f] transition-all duration-300 flex items-center space-x-3">
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button className="font-light text-gray-700 px-8 py-4 border border-gray-300 hover:border-[#503e28] hover:text-[#503e28] transition-all duration-300 tracking-wide">
              Custom Design
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-px h-16 bg-gradient-to-b from-[#503e28] to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;