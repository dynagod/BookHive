import React from "react";
import { motion } from "framer-motion";
import quilPen from "../../assets/old-books-quill-pen.webp";
import { NavLink } from "react-router-dom";

const HeroSection = () => {
  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const topLineVariants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const headingVariants = {
    initial: {
      y: 50,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const cardServices = [
    {
      title: "New Arrivals",
      description:
        "Discover the latest additions to our collection. Fresh titles from acclaimed authors and emerging voices that are making waves in the literary world.",
    },
    {
      title: "Bestsellers",
      description:
        "Explore our curated selection of reader favorites and critically acclaimed works that have captivated audiences worldwide.",
    },
    {
      title: "Rare Finds",
      description:
        "Uncover hidden literary treasures and collector's items. Limited editions, signed copies, and out-of-print classics await.",
    },
    {
      title: "Book Club",
      description:
        "Join our community of passionate readers. Monthly selections, thoughtful discussions, and exclusive events designed to enhance your reading experience.",
    },
  ];

  return (
    <div className="snap-start h-screen text-center py-16 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a] text-[#FFF6D9] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjE0LTIuNS0yLjVzMS4xNC0yLjUgMi41LTIuNSAyLjUgMS4xNCAyLjUgMi41LTEuMTQgMi41LTIuNSAyLjV6TTIxIDMyYy0xLjM2IDAtMi41LTEuMTQtMi41LTIuNXMxLjE0LTIuNSAyLjUtMi41IDIuNSAxLjE0IDIuNSAyLjUtMS4xNCAyLjUtMi41IDIuNXoiIGZpbGw9IiNGRkY2RDkiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col justify-between items-center h-full max-w-7xl mx-auto px-6 lg:px-16 relative z-10"
      >
        {/* Top tagline */}
        <motion.div
          className="self-end flex items-center gap-5"
          variants={topLineVariants}
        >
          <p className="font-light text-xl text-right italic tracking-wide">
            We help you discover worlds <br /> between the pages
          </p>
          <hr className="w-16 border-blue-600" />
        </motion.div>

        {/* Main heading section */}
        <motion.div
          variants={headingVariants}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="relative">
              <div className="absolute -inset-1 bg-blue-600 rounded-full blur-sm opacity-50"></div>
              <img
                src={quilPen}
                alt="Quill pen and old books"
                className="w-56 h-20 rounded-full object-cover relative"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-light">
              <b className="hover:text-blue-600 transition-colors duration-300 font-bold">
                Discover
              </b>{" "}
              Books
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <h1 className="text-4xl md:text-6xl font-light">
              <b className="hover:text-blue-600 transition-colors duration-300 font-bold">
                That Speak
              </b>{" "}
              To You
            </h1>
            <NavLink to='/shop' className="w-56 h-20 rounded-full text-[#0a0a0a] bg-[#FFF6D9] hover:bg-gray-300 transition-colors duration-300 cursor-pointer border-none text-2xl flex items-center justify-center font-medium shadow-lg">
              Shop
            </NavLink>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full"
          variants={containerVariants}
        >
          {cardServices.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="p-6 border border-gray-700 hover:border-blue-600 bg-[#1a1a1a]/50 backdrop-blur-sm flex flex-col justify-between h-72 transition-all duration-300 group"
            >
              <h2 className="font-bold text-xl mb-4 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h2>

              <p className="text-gray-300 text-sm md:text-base mb-6">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;