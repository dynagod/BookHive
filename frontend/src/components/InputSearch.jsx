import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useFetchBookBySearchQuery } from "../redux/features/books/booksApi";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { FaX } from "react-icons/fa6";
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
            <Loading />
          </div>
        )}

        {matchingResults.length > 0 && (
          <ul className="absolute bg-white mt-2 w-full rounded-md shadow-lg z-10 max-h-64 overflow-y-auto">
            {matchingResults.map((book, index) => (
              <li key={index} className="border-b last:border-none">
                <Link
                  to={`/books/${book._id}`}
                  onClick={() => setSearch("")}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                >
                  {book.title}
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
