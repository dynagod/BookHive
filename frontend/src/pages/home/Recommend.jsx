import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';


const Recommened = () => {
        const {data: books = []} = useFetchAllBooksQuery();

        return (
                <div className='py-16 px-4 bg-gradient-to-r from-[#e2f0ff] via-[#dcebff] to-[#c5e1ff]'>
                        <h2 className='text-[#1A1A1A] text-3xl font-semibold mb-6'>
                                Recommended for you
                        </h2>

                        <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                navigation={true}
                                breakpoints={{
                                        640: {
                                                slidesPerView: 1,
                                                spaceBetween: 20,
                                        },
                                        768: {
                                                slidesPerView: 2,
                                                spaceBetween: 40,
                                        },
                                        1024: {
                                                slidesPerView: 2,
                                                spaceBetween: 50,
                                        },
                                        1180: {
                                                slidesPerView: 3,
                                                spaceBetween: 50,
                                        }
                                }}
                                modules={[Pagination, Navigation]}
                                className="mySwiper px-6 py-8 rounded-xl bg-gradient-to-b from-[#DCEBFF]/80 via-[#00214D]/10 to-orange-50/40 shadow-lg"
                        >
                                {
                                        books.length > 0 && books.slice(8, 18).map((book, index) => (
                                                <SwiperSlide key={index} className="p-4">
                                                        <BookCard book={book} />
                                                </SwiperSlide>
                                        ))
                                }
                        </Swiper>
                </div>
        )
}

export default Recommened