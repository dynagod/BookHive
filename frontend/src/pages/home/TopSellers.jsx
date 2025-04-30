import React, { useEffect, useState } from 'react'
import BookCard from '../books/BookCard';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const { data: { data } = {} } = useFetchAllBooksQuery();
    const books = data?.books || [];

    const filteredBooks =
        selectedCategory === "Choose a genre"
            ? books
            : books?.filter(
                  (book) =>
                      book.category &&
                      book.category.toLowerCase() === selectedCategory.toLowerCase()
              );

    return (
        <div className="py-10 px-2 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-r from-[#e2f0ff] via-[#dcebff] to-[#c5e1ff] min-h-screen w-full">
            <h2 className="text-[#1A1A1A] text-3xl sm:text-4xl font-semibold mb-8 text-left">
                Top Sellers
            </h2>
            {/* category filtering */}
            <div className="mb-10 flex items-center">
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category"
                    id="category"
                    className="border bg-[#F8FAFF] border-gray-300 rounded-full px-5 py-3 focus:outline-none text-[#444444] 
                    hover:border-[#4B6BFB] hover:bg-[#e2f0ff] transition duration-300 shadow-md w-full max-w-xs"
                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{
                    paddingBottom: "40px",
                }}
            >
                {filteredBooks.length > 0 &&
                    filteredBooks.map((book, index) => (
                        <SwiperSlide key={index} className="flex justify-center items-stretch h-full">
                            <div className="w-full h-full flex">
                                <BookCard
                                    book={book}
                                    className="w-full h-full flex flex-col !rounded-none !bg-transparent shadow-none border-none"
                                    style={{
                                        background: "transparent",
                                        boxShadow: "none",
                                        borderRadius: "0px",
                                        overflow: "hidden",
                                        border: "none",
                                        width: "100%",
                                        height: "100%",
                                        margin: "0",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </div>
    );
};

export default TopSellers