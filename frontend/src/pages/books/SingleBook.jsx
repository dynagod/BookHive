import React from 'react';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { useFetchBookByIdQuery } from '../../redux/features/books/booksApi';
import Loading from '../../components/Loading';

// Helper function to generate a consistent random rating based on book ID
const generateRandomRating = (id) => {
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const random = (seed % 20) / 10 + 3.0; // Generates a number between 3.0 and 5.0
  return Math.min(5.0, Math.max(3.0, random)).toFixed(1);
};

const SingleBook = () => {
  const { id } = useParams();
  const { 
    data: { data } = {}, 
    isLoading, 
    isError 
  } = useFetchBookByIdQuery(id);
  
  const book = data?.book;
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x450.png?text=Book+Cover';
  };

  const renderRatingStars = (rating) => {
    return (
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar 
            key={star}
            className={`h-5 w-5 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} 
          />
        ))}
        <span className="ml-2 text-sm font-medium text-gray-600">{rating} / 5</span>
      </div>
    );
  };

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center py-16 text-rose-500 font-medium text-lg">Failed to load book information</div>;

  // Use book.rating if available, otherwise generate a random rating
  const rating = book?.rating ? parseFloat(book.rating).toFixed(1) : generateRandomRating(id);

  return (
    <div className="max-w-4xl mx-auto my-12 bg-white rounded-lg">
      {/* Image Section */}
      <div className="flex justify-center mb-6 pt-6">
        <div className="relative">
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x450.png?text=Book+Cover'}
            alt={book.title}
            onError={handleImageError}
            className="h-72 object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Book Details Section */}
      <div className="px-6 pb-6 space-y-4 font-sans">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">{book.title}</h1>
          <p className="text-base text-gray-500 mb-3">by {book.author || 'Unknown Author'}</p>
        </div>

        {renderRatingStars(rating)}

        <div className="flex space-x-8 text-gray-600 border-b border-gray-200 pb-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Date Added</p>
            <p className="text-sm">{new Date(book?.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Category</p>
            <p className="text-sm capitalize">{book?.category || 'Uncategorized'}</p>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-1">Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{book.description || 'No description available.'}</p>
        </div>

        <div className="flex items-center space-x-4">
          {book.price && (
            <div className="text-xl font-semibold text-gray-900">
              ${book.price.toFixed(2)}
            </div>
          )}
          
          <button 
            onClick={() => handleAddToCart(book)} 
            className="flex items-center space-x-2 py-1 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;