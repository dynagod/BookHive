import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useFetchBookBySearchQuery } from "../redux/features/books/booksApi";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { FaAngleRight, FaX } from "react-icons/fa6";
import { useSearch } from "../context/SearchContext";

const InputSearch = () => {
  const { setShowSearch } = useSearch();

  const [search, setSearch] = useState("");
  const [matchingResults, setMatchingResults] = useState([]);

  const { data, isLoading } = useFetchBookBySearchQuery(search, {
    skip: search === "",
  });

  useEffect(() => {
    setMatchingResults(data?.data?.books || []);
    if (search === "") setMatchingResults([]);
  }, [search, data]);

  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className="w-full flex items-center justify-center gap-6 p-6 bg-[#F6F6F6] shadow-md relative">
      <div className="relative w-full max-w-lg">
        <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

        <input
          type="text"
          placeholder="Search books..."
          className="w-full py-2 pl-10 pr-4 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          onChange={handleChange}
          value={search}
        />

        {search && isLoading && (
          <div className="absolute bg-white mt-2 w-full rounded-md shadow-lg z-10 p-3 text-gray-600">
            <Loading height="h-80" />
          </div>
        )}

        {matchingResults.length > 0 && (
          <ul className="absolute bg-white mt-2 w-full rounded-xl shadow-2xl border border-gray-100 z-10 max-h-80 overflow-y-auto backdrop-blur-sm">
            {matchingResults.map((book, index) => (
              <li
                key={index}
                className="border-b border-gray-50 last:border-none"
              >
                <Link
                  to={`/books/${book._id}`}
                  onClick={() => setSearch("")}
                  className="flex items-center gap-4 px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ease-in-out group"
                >
                  {/* Book Image */}
                  <div className="flex-shrink-0 w-12 h-16 rounded-lg overflow-hidden shadow-md bg-gray-100">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-blue-700 transition-colors duration-200">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      by {book.author || "Unknown Author"}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <FaAngleRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        {search && !isLoading && !matchingResults.length && (
          <div className="absolute bg-white mt-2 w-full rounded-md shadow-lg z-10 p-3 text-gray-600">
            No results found.
          </div>
        )}
      </div>

      <button
        className="text-gray-600 hover:text-red-500 transition"
        onClick={() => setShowSearch(false)}
      >
        <FaX size={18} />
      </button>
    </div>
  );
};

export default InputSearch;