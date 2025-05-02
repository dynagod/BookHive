import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

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
      className="relative snap-start h-screen text-center py-16 bg-gradient-to-br from-[#1f2937] to-[#111827] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="max-w-5xl h-full m-auto flex flex-col md:flex-row items-center justify-center gap-12 px-6">
        <img
          src={category.img}
          alt=""
          className="w-full md:w-1/2 h-80 object-cover md:mb-0"
        />

        <motion.div
          style={{ y }}
          className="flex-1 flex flex-col items-center md:items-start md:text-left gap-6"
        >
          <h2 className="text-3xl md:text-5xl font-bold">{category.title}</h2>
          <p className="text-lg md:text-2xl text-gray-400">
            {category.description}
          </p>
          <button className="px-8 py-3 bg-[#ffce1a] text-black rounded-full hover:bg-yellow-300 transition cursor-pointer">
            Explore
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SingleCategory;