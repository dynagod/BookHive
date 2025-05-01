import { Link, NavLink } from "react-router-dom";
import {
  HiBookOpen,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import InputSearch from "./InputSearch";
import { useSearch } from "../context/SearchContext";
import { IoSearchOutline } from "react-icons/io5";

const navigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
  const { setShowSearch } = useSearch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  const token = localStorage.getItem("token");

  return (
    <header className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#FFF6D9] max-w-screen-2xl mx-auto px-16 py-6 shadow-lg text-[#FFF6D9]">
      <nav className="flex justify-between items-center">
        {/* left side */}
        <div>
          <Link to="/" className="flex items-center gap-4">
            <HiBookOpen className="size-10 p-2 bg-blue-600 rounded-md" />
            <div className="text-2xl font-bold">BookHive</div>
          </Link>
        </div>

        {/* Center side */}
        <div>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `ml-4 mr-4 cursor-pointer ${isActive ? "border-b-2" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              `ml-4 mr-4 cursor-pointer ${isActive ? "border-b-2" : ""}`
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `ml-4 mr-4 cursor-pointer ${isActive ? "border-b-2" : ""}`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `ml-4 mr-4 cursor-pointer ${isActive ? "border-b-2" : ""}`
            }
          >
            Contact
          </NavLink>
          <Link
            to="/dashboard"
            className="ml-4 mr-4 cursor-pointer p-2 border-[1px] text-[10px] rounded-full"
          >
            Admin Panel
          </Link>
        </div>

        {/* rigth side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <NavLink
            to="/shop"
            onClick={() => setShowSearch(true)}
            className="p-2 text-black rounded-full bg-gray-300"
          >
            <IoSearchOutline size={20} />
          </NavLink>

          <div>
            {currentUser ? (
              <>
                <HiOutlineUser
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                {/* show dropdowns */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#FFF6D9] shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-[#0a0a0a] hover:text-[#FFF6D9]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogOut}
                          className="block w-full text-left px-4 py-2 text-sm hover:bg-[#0a0a0a] hover:text-[#FFF6D9]"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                {" "}
                <HiOutlineUser className="size-6 text-[#FFF6D9]" />
              </Link>
            )}
          </div>

          <Link
            to="/cart"
            className="bg-[#FFF6D9] p-1 sm:px-6 px-2 flex items-center rounded-sm text-[#0a0a0a]"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
