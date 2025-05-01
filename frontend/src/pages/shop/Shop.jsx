import React, { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import InputSearch from '../../components/InputSearch';
import { catagories } from '../../utils/catagories';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';
import BookCard from '../books/BookCard';

const Shop = () => {
  const { showSearch } = useSearch();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relevant');

  const { data: { data } = {} } = useFetchAllBooksQuery();
  const books = data?.books || [];

  let filteredBooks = selectedCategories.length > 0
  ? books.filter(book =>
      selectedCategories
        .map(cat => cat.toLowerCase())
        .includes(book.category.toLowerCase())
    )
  : books;

  if (sortOption === 'low-high') {
    filteredBooks = [...filteredBooks].sort((a, b) => a.newPrice - b.newPrice);
  } else if (sortOption === 'high-low') {
    filteredBooks = [...filteredBooks].sort((a, b) => b.newPrice - a.newPrice);
  }

  const handleCheckboxChange = (title) => {
    setSelectedCategories((prev) =>
      prev.includes(title)
        ? prev.filter((cat) => cat !== title)
        : [...prev, title]
    );
  };
  
  return (
    <div>
      <div>
        { showSearch && <InputSearch />}
      </div>

      <div className="py-4 px-16 md:flex gap-6">
      {/* Left Sidebar - Filters */}
      <aside className="md:w-1/4 w-full md:mb-0 mb-6">
        <h2 className="text-lg font-bold mb-2">FILTERS</h2>
        <div className="space-y-2 border-2 border-gray-200 p-4">
          <div className='font-semibold'>CATEGORIES</div>
          {catagories.map(({ title }, index) => (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(title)}
                onChange={() => handleCheckboxChange(title)}
                className="accent-blue-500"
              />
              <span>{title}</span>
            </label>
          ))}
        </div>
      </aside>

      {/* Right Side - Content */}
      <main className="md:w-3/4 w-full">
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <div className="inline-flex gap-2 items-center mb-3">
            <p className='text-gray-500'>ALL <span className='text-gray-700 font-medium'>COLLECTIONS</span></p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
          </div>
          <select className="border-2 border-gray-300 text-sm px-2" value={sortOption} onChange={e => setSortOption(e.target.value)}>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredBooks.length > 0 &&
            filteredBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))
          }
        </div>
      </main>
    </div>
    </div>
  )
}

export default Shop;