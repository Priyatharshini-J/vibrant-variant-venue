
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10',
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md py-4 shadow-sm' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-2xl tracking-tight transition-opacity hover:opacity-80"
          >
            Elegance
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="btn-hover text-sm font-medium">Home</Link>
            <Link to="/shop" className="btn-hover text-sm font-medium">Shop</Link>
            <Link to="/collections" className="btn-hover text-sm font-medium">Collections</Link>
            <Link to="/about" className="btn-hover text-sm font-medium">About</Link>
          </div>

          {/* Desktop Navigation Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="hover:text-primary/70 transition-colors">
              <Search size={20} />
            </button>
            <Link to="/account" className="hover:text-primary/70 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/cart" className="hover:text-primary/70 transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                3
              </span>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                3
              </span>
            </Link>
            <button 
              className="text-primary" 
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 top-[64px] z-40 bg-background transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-8 space-y-6">
          <Link 
            to="/" 
            className="text-2xl font-medium py-2 border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className="text-2xl font-medium py-2 border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className="text-2xl font-medium py-2 border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className="text-2xl font-medium py-2 border-b border-border"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <div className="flex space-x-6 pt-4">
            <Link 
              to="/search" 
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link 
              to="/account" 
              className="flex items-center space-x-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <User size={18} />
              <span>Account</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
