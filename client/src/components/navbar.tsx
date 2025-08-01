import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

export default function Navbar() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsOpen } = useCart();
  const cartItemsCount = getTotalItems();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/shop?category=mens-wear", label: "Men" },
    { href: "/shop?category=womens-wear", label: "Women" },
    { href: "/shop?category=footwear", label: "Footwear" },
    { href: "/shop?sale=true", label: "Sale", className: "text-brand-red" }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" data-testid="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" data-testid="logo-link">
            <h1 className="text-2xl font-bold text-charcoal">LUXE</h1>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a 
                    className={`text-charcoal hover:text-brand-red transition-colors duration-200 font-medium ${
                      location === link.href ? 'text-brand-red' : ''
                    } ${link.className || ''}`}
                    data-testid={`nav-link-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-charcoal hover:text-brand-red"
              data-testid="search-button"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="text-charcoal hover:text-brand-red"
              data-testid="auth-button"
            >
              <User className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="relative text-charcoal hover:text-brand-red"
              onClick={() => setIsOpen(true)}
              data-testid="cart-button"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span 
                  className="absolute -top-2 -right-2 bg-brand-red text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium"
                  data-testid="cart-count"
                >
                  {cartItemsCount}
                </span>
              )}
            </Button>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-charcoal"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200" data-testid="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  className={`block px-3 py-2 text-charcoal hover:text-brand-red font-medium ${
                    location === link.href ? 'text-brand-red' : ''
                  } ${link.className || ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
