import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useFetchBookBySearchQuery } from "../redux/features/books/booksApi";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const InputSearch = () => {
  const [search, setSearch] = useState("");
  const [matchingResults, setMatchingResults] = useState([]);

  const { data, isLoading, isError } = useFetchBookBySearchQuery(search, {
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
    <div className="relative sm:w-72 w-40 space-x-2">
      <IoSearchOutline className="absolute inline-block left-3 inset-y-2 text-gray-500" />

      <input
        type="text"
        placeholder="Search here"
        className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
        onChange={handleChange}
        value={search}
      />

      {search && isLoading && (
        <div className="absolute bg-white mt-1 w-full rounded-md shadow-lg z-10 p-2 text-gray-500">
          <Loading />
        </div>
      )}

      {matchingResults.length > 0 && (
        <ul className="absolute bg-white mt-1 w-full rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {matchingResults.map((book, index) => (
            <div key={index}>
              <Link to={`/books/${book._id}`} onClick={() => setSearch("")}>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {book.title}
                </li>
              </Link>
            </div>
          ))}
        </ul>
      )}

      {search && !isLoading && !matchingResults.length && (
        <div className="absolute bg-white mt-1 w-full rounded-md shadow-lg z-10 p-2 text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
};

export default InputSearch;
