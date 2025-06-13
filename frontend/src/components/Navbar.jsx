import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiBookOpen,
  HiOutlineShoppingCart,
  HiBars3,
  HiXMark,
} from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext";
import { IoSearchOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Profile", href: "/profile" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setShowSearch } = useSearch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = async () => {
    await logout();
    toast.success('Logout successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const token = localStorage.getItem("token");

  return (
    <header className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#FFF6D9] max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-16 py-4 lg:py-6 shadow-lg text-[#FFF6D9]">
      <nav className="flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 sm:gap-4">
            <HiBookOpen className="size-8 sm:size-10 p-1 sm:p-2 bg-blue-600 rounded-md" />
            <div className="text-xl sm:text-2xl font-bold">BookHive</div>
          </Link>
        </div>

        {/* Desktop Navigation - Center */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `cursor-pointer transition-colors hover:text-blue-300 ${
                isActive ? "border-b-2 border-blue-400 text-blue-300" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `cursor-pointer transition-colors hover:text-blue-300 ${
                isActive ? "border-b-2 border-blue-400 text-blue-300" : ""
              }`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `cursor-pointer transition-colors hover:text-blue-300 ${
                isActive ? "border-b-2 border-blue-400 text-blue-300" : ""
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `cursor-pointer transition-colors hover:text-blue-300 ${
                isActive ? "border-b-2 border-blue-400 text-blue-300" : ""
              }`
            }
          >
            Contact
          </NavLink>
          <Link
            to="/dashboard"
            className="cursor-pointer p-2 border border-[#FFF6D9] text-xs rounded-full hover:bg-[#FFF6D9] hover:text-[#0a0a0a] transition-colors"
          >
            Admin Panel
          </Link>
        </div>

        {/* Right side - Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Icon */}
          <NavLink
            onClick={() => setShowSearch(true)}
            to="/shop"
            className="p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-full cursor-pointer hover:bg-gray-300 transition-colors"
          >
            <IoSearchOutline size={16} className="sm:w-5 sm:h-5" />
          </NavLink>

          {/* User Profile Dropdown */}
          <div className="relative group">
            {currentUser ? (
              <>
                <div className="p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
                  <HiOutlineUser size={16} className="sm:w-5 sm:h-5" />
                </div>
                {/* Desktop Dropdown */}
                <div className="absolute right-0 mt-2 w-48 bg-[#FFF6D9] shadow-lg rounded-md z-50 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FFF6D9] transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FFF6D9] transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-full cursor-pointer hover:bg-gray-300 transition-colors flex items-center justify-center"
              >
                <HiOutlineUser size={16} className="sm:w-5 sm:h-5" />
              </Link>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="bg-[#FFF6D9] p-1 sm:p-2 px-2 sm:px-4 lg:px-6 flex items-center rounded-sm text-[#0a0a0a] hover:bg-gray-300 transition-colors"
          >
            <HiOutlineShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm font-semibold ml-1">
              {cartItems.length > 0 ? cartItems.length : 0}
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-md hover:bg-gray-300 transition-colors"
          >
            {isMobileMenuOpen ? (
              <HiXMark size={20} />
            ) : (
              <HiBars3 size={20} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 border-t border-gray-600 pt-4">
          <div className="flex flex-col space-y-3">
            {/* Mobile Navigation Links */}
            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-[#FFF6D9]" 
                    : "text-[#FFF6D9] hover:bg-gray-700"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-[#FFF6D9]" 
                    : "text-[#FFF6D9] hover:bg-gray-700"
                }`
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-[#FFF6D9]" 
                    : "text-[#FFF6D9] hover:bg-gray-700"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `block py-2 px-4 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-[#FFF6D9]" 
                    : "text-[#FFF6D9] hover:bg-gray-700"
                }`
              }
            >
              Contact
            </NavLink>
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className="block py-2 px-4 rounded-md text-[#FFF6D9] hover:bg-gray-700 transition-colors border border-[#FFF6D9] text-center"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;