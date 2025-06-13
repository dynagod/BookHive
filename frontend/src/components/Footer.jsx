import React from 'react';
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="px-4 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Side - Logo and Navigation */}
            <div className="space-y-6">
              <div>
                <img 
                  src={footerLogo} 
                  alt="BookHive Logo" 
                  className="w-32 sm:w-36 lg:w-40 mb-4 sm:mb-6" 
                />
                <p className="text-gray-300 text-sm sm:text-base max-w-md">
                  Your trusted online bookstore for discovering amazing books and educational resources.
                </p>
              </div>
              
              {/* Navigation Links */}
              <nav>
                <ul className="flex flex-wrap gap-4 sm:gap-6 lg:gap-8">
                  <li>
                    <a 
                      href="#home" 
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base hover:underline"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#services" 
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base hover:underline"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#about" 
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base hover:underline"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm sm:text-base hover:underline"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Right Side - Newsletter Subscription */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Subscribe to our newsletter to receive the latest updates, book recommendations, and exclusive offers!
                </p>
              </div>
              
              {/* Newsletter Form */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-500"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg text-white font-medium transition-colors duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-400">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700">
        <div className="px-4 py-6 sm:py-8">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
              {/* Left Side - Legal Links & Copyright */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
                  <a 
                    href="#privacy" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm hover:underline"
                  >
                    Privacy Policy
                  </a>
                  <a 
                    href="#terms" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm hover:underline"
                  >
                    Terms of Service
                  </a>
                  <a 
                    href="#cookies" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm hover:underline"
                  >
                    Cookie Policy
                  </a>
                </div>
                <div className="text-gray-400 text-xs sm:text-sm">
                  © 2025 BookHive. All rights reserved.
                </div>
              </div>

              {/* Right Side - Social Media Icons */}
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="text-gray-400 text-xs sm:text-sm hidden sm:block">
                  Follow us:
                </span>
                <div className="flex gap-4">
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Follow us on Facebook"
                  >
                    <FaFacebook size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Follow us on Twitter"
                  >
                    <FaTwitter size={20} className="sm:w-6 sm:h-6" />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                    aria-label="Follow us on Instagram"
                  >
                    <FaInstagram size={20} className="sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;