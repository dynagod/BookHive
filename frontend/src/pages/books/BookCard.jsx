import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  return (
    <div className="rounded-2xl hover:scale-105 transition-transform hover:shadow-2xl shadow-md bg-white duration-300">
      <Link to={`/books/${book._id}`}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-56 object-contain rounded-t-2xl"
        />
      </Link>

      <div className="p-4 flex flex-col justify-between h-[calc(100%-224px)]">
        <Link to={`/books/${book._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
            {book.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
          {book.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <p className="text-base font-bold text-gray-800">
            ${book.newPrice}{' '}
            <span className="text-sm font-normal text-gray-400 line-through ml-2">
              {book.oldPrice ? `$${book.oldPrice}` : ""}
            </span>
          </p>

          <button
            onClick={handleAddToCart}
            className="bg-yellow-400 hover:bg-yellow-300 text-sm font-medium px-3 py-2 rounded-xl flex items-center gap-2 transition-colors"
          >
            <FiShoppingCart className="text-lg" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
