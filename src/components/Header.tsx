import React, { useState } from 'react';
import { Search, ShoppingBag, Heart, User, X, Menu } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-extralight text-[#503e28] tracking-[0.2em]">
              ZELIE
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#503e28]/20 focus:bg-white transition-all duration-300 text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#503e28] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <button className="hidden sm:block p-2 text-gray-700 hover:text-[#503e28] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            
            <button className="hidden sm:block p-2 text-gray-700 hover:text-[#503e28] transition-colors">
              <User className="w-5 h-5" />
            </button>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-[#503e28] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#503e28] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-light">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-[#503e28]/20 focus:bg-white transition-all duration-300 text-sm"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-6">
            <div className="flex space-x-6 justify-center">
              <button className="p-2 text-gray-700 hover:text-[#503e28] transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-700 hover:text-[#503e28] transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;