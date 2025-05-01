import { Link, NavLink } from "react-router-dom";
import {
  HiBookOpen,
  HiOutlineHeart,
  HiOutlineShoppingCart,
} from "react-icons/hi2";
import { HiOutlineUser, HiX } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        setSearchResults([
          { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
          { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
          { id: 3, title: "1984", author: "George Orwell" },
        ].filter(
          (book) =>
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        ));
        setIsSearching(false);
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  const cartItems = useSelector((state) => state.cart.cartItems);
  const { currentUser, logout } = useAuth();

  const handleLogOut = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#FFF6D9] max-w-screen-2xl mx-auto px-16 py-6 shadow-lg text-[#FFF6D9]">
      <nav className="flex justify-between items-center">
        {/* Left side */}
        <div>
          <Link to="/" className="flex items-center gap-4">
            <HiBookOpen className="size-10 p-2 bg-blue-600 rounded-md" />
            <div className="text-2xl font-bold">BookHive</div>
          </Link>
        </div>

        {/* Center side */}
        <div className="flex items-center">
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
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `ml-4 mr-4 cursor-pointer ${isActive ? "border-b-2" : ""}`
            }
          >
            Admin Panel
          </NavLink>
        </div>

        {/* Right side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          {/* Search Input and Icon */}
          <div className="relative mr-2" ref={searchRef}>
            <div className="flex items-center bg-gradient-to-r from-[#FFF6D9] to-[#d4c9a1] rounded-full shadow-md">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-2 pl-4 text-black rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500 w-40"
              />
              <button
                className="p-2 rounded-r-full hover:opacity-80 transition-opacity"
                onClick={() => searchQuery && setShowSearch(true)}
              >
                <IoSearchOutline size={16} className="text-black" />
              </button>
            </div>

            {/* Search Results */}
            {searchQuery.length > 2 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg overflow-hidden z-50">
                {isSearching ? (
                  <div className="flex justify-center items-center p-4 text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((book) => (
                      <li key={book.id} className="border-b last:border-0">
                        <Link
                          to={`/book/${book.id}`}
                          className="block p-3 hover:bg-gray-100 transition-colors"
                          onClick={() => setSearchResults([])}
                        >
                          <div className="font-medium text-black">
                            {book.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {book.author}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Icon */}
          <div className="relative group">
            {currentUser ? (
              <>
                <div className="p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-full cursor-pointer hover:bg-gray-300 transition-colors">
                  <HiOutlineUser size={20} />
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-[#FFF6D9] shadow-lg rounded-md z-40 invisible group-hover:visible transition-all opacity-0 group-hover:opacity-100">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FFF6D9]"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm text-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#FFF6D9]"
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
                className="p-2 bg-[#FFF6D9] text-[#0a0a0a] rounded-full hover:bg-gray-300 transition-colors"
              >
                <HiOutlineUser size={20} />
              </Link>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="bg-[#FFF6D9] p-1 sm:px-6 px-2 flex items-center rounded-sm text-[#0a0a0a]"
          >
            <HiOutlineShoppingCart />
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