import React from "react";
import { motion } from "framer-motion";
import quilPen from "../../assets/old-books-quill-pen.webp";

const HeroSection = () => {
  const variants = {
    initial: {
      x: -500,
      y: 100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="snap-start h-screen text-center py-16 bg-gradient-to-br from-[#1f2937] to-[#111827] text-white overflow-hidden">
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="animate"
        className="flex flex-col justify-between items-center h-full"
      >
        <motion.div className="self-end flex items-center gap-5">
          <p className="font-extralight text-xl text-right">
            We help you discover worlds <br /> between the pages
          </p>
          <hr className="w-md" />
        </motion.div>

        <motion.div
          variants={variants}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex items-center gap-12">
            <img
              src={quilPen}
              alt=""
              className="w-56 h-20 rounded-full object-cover"
            />
            <h1 className="text-6xl font-thin">
              <b className="hover:text-[#ffce1a] font-bold">Discover</b> Books
            </h1>
          </div>
          <div className="flex items-center gap-12">
            <h1 className="text-6xl font-thin">
              <b className="hover:text-[#ffce1a] font-bold">That Speak</b> To You
            </h1>
            <button className="w-56 h-20 rounded-full text-black bg-[#ffce1a] cursor-pointer border-none text-2xl">
              Shop
            </button>
          </div>
        </motion.div>

        <motion.div
          className="flex gap-2 justify-center max-w-7xl"
          variants={variants}
        >
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <motion.div
                key={index}
                style={{ backgroundColor: "transparent", color: "white" }}
                whileHover={{
                  backgroundColor: "lightgray",
                  color: "black",
                  scale: 1.05,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }}
                className="p-2.5 w-72 h-80 border-[0.5px] border-gray-500 flex flex-col justify-between"
              >
                <h2 className="font-bold">Branding</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
                  voluptatem beatae dignissimos commodi praesentium repellat
                  fuga iure, eaque ipsam veniam accusamus consectetur doloribus
                  nisi minus optio dolores exercitationem quaerat sint?
                </p>
                <button className="p-2.5 bg-[#ffce1a] text-black border-none cursor-pointer">
                  Go
                </button>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;