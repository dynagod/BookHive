import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

const SingleCategory = ({ category, containerRef }) => {
  const ref = useRef();

  const { scrollYProgress } = useScroll({
    target: ref,
    container: containerRef,
    layoutEffect: false,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [300, -300]);

  return (
    <section
      ref={ref}
      className="relative snap-start h-screen text-center py-16 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-[#FFF6D9] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjE0LTIuNS0yLjVzMS4xNC0yLjUgMi41LTIuNSAyLjUgMS4xNCAyLjUgMi41LTEuMTQgMi41LTIuNSAyLjV6TTIxIDMyYy0xLjM2IDAtMi41LTEuMTQtMi41LTIuNXMxLjE0LTIuNSAyLjUtMi41IDIuNSAxLjE0IDIuNSAyLjUtMS4xNCAyLjUtMi41IDIuNXoiIGZpbGw9IiNGRkY2RDkiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
      
      <div className="max-w-5xl h-full m-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6 lg:px-16 relative z-10">
        {/* Image with decorative effect */}
        <div className="w-full md:w-1/2 relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/30 to-blue-500/20 rounded-lg blur-sm"></div>
          <img
            src={category.img}
            alt={category.title}
            className="w-full h-80 object-cover relative shadow-xl hover:shadow-blue-900/30 transition-shadow duration-500 rounded-md"
          />
        </div>

        <motion.div
          style={{ y }}
          className="flex-1 flex flex-col items-center md:items-start md:text-left gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold">{category.title}</h2>
          <div className="h-1 w-16 bg-blue-600 rounded-full md:self-start"></div>
          <p className="text-lg md:text-2xl text-gray-300">
            {category.description}
          </p>
          <Link to='/shop' className="px-8 py-3 bg-[#FFF6D9] text-[#0a0a0a] rounded-md hover:bg-gray-300 transition-colors duration-300 cursor-pointer shadow-lg flex items-center gap-2">
            Explore
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Decorative lines */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
    </section>
  );
};

export default SingleCategory;