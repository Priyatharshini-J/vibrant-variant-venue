
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
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
            <Link 
              to="/" 
              className={cn("btn-hover text-sm font-medium", isActive('/') && "after:w-full")}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className={cn("btn-hover text-sm font-medium", isActive('/shop') && "after:w-full")}
            >
              Shop
            </Link>
            <Link 
              to="/collections" 
              className={cn("btn-hover text-sm font-medium", isActive('/collections') && "after:w-full")}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className={cn("btn-hover text-sm font-medium", isActive('/about') && "after:w-full")}
            >
              About
            </Link>
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
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex md:hidden items-center space-x-4">
            <Link to="/cart" className="relative">
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-primary text-primary-foreground text-xs rounded-full">
                  {itemCount}
                </span>
              )}
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
            className={cn(
              "text-2xl font-medium py-2 border-b border-border",
              isActive('/') && "text-primary"
            )}
          >
            Home
          </Link>
          <Link 
            to="/shop" 
            className={cn(
              "text-2xl font-medium py-2 border-b border-border",
              isActive('/shop') && "text-primary"
            )}
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className={cn(
              "text-2xl font-medium py-2 border-b border-border",
              isActive('/collections') && "text-primary"
            )}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-2xl font-medium py-2 border-b border-border",
              isActive('/about') && "text-primary"
            )}
          >
            About
          </Link>
          <div className="flex space-x-6 pt-4">
            <Link 
              to="/search" 
              className="flex items-center space-x-2"
            >
              <Search size={18} />
              <span>Search</span>
            </Link>
            <Link 
              to="/account" 
              className="flex items-center space-x-2"
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
