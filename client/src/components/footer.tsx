import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4" data-testid="footer-logo">LUXE</h3>
            <p className="text-gray-300 mb-4" data-testid="footer-description">
              Premium fashion for the modern lifestyle. Discover quality craftsmanship and contemporary design.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white"
                data-testid="social-facebook"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-gray-300 hover:text-white"
                data-testid="social-twitter"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4" data-testid="footer-quicklinks-title">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-about">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-contact">Contact</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-sizeguide">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-shipping">Shipping Info</a></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-medium mb-4" data-testid="footer-service-title">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-faq">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-returns">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-privacy">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200" data-testid="footer-link-terms">Terms of Service</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4" data-testid="footer-newsletter-title">Stay Updated</h4>
            <p className="text-gray-300 mb-4" data-testid="footer-newsletter-description">
              Subscribe to our newsletter for exclusive offers and style updates.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 rounded-r-none text-charcoal"
                data-testid="newsletter-input"
              />
              <Button 
                className="bg-brand-red text-white rounded-l-none hover:bg-red-700"
                data-testid="newsletter-submit"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-300" data-testid="footer-copyright">
            &copy; 2024 LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
