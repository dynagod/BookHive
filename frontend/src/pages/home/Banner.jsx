import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import bannerImg from "../../assets/banner.png";
import scrollPng from "../../assets/scroll.png";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";

const Banner = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("animate");
  }, [controls]);

  const textVariants = {
    initial: {
      x: -100,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    initial: {
      scale: 0.8,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const scrollButtonVariants = {
    initial: {
      opacity: 0.6,
      y: 0,
    },
    animate: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="snap-start h-screen relative overflow-hidden bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtMS4zNiAwLTIuNS0xLjE0LTIuNS0yLjVzMS4xNC0yLjUgMi41LTIuNSAyLjUgMS4xNCAyLjUgMi41LTEuMTQgMi41LTIuNSAyLjV6TTIxIDMyYy0xLjM2IDAtMi41LTEuMTQtMi41LTIuNXMxLjE0LTIuNSAyLjUtMi41IDIuNSAxLjE0IDIuNSAyLjUtMS4xNCAyLjUtMi41IDIuNXoiIGZpbGw9IiNGRkY2RDkiIG9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>

      <div className="relative z-10">
        {/* Let the navbar component handle itself */}
        <Navbar />
        
        <div className="container mx-auto px-6 lg:px-16 pt-16 md:pt-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Image Section */}
            <motion.div 
              className="md:w-1/2 w-full order-1 -mt-10 md:order-2"
              initial="initial"
              animate={controls}
              variants={imageVariants}
            >
              <div className="relative">
                
                {/* Image container */}
                  <img 
                    src={bannerImg} 
                    alt="New book releases" 
                    className="w-full max-w-[500px] sm:max-w-[400px] md:max-w-[400px] lg:max-w-[500px] sm:max-h-[200px] md:max-h-[300px] lg:h-auto h-[250px] object-contain mx-auto transform hover:scale-105 transition-transform duration-700"
                  />
              </div>
            </motion.div>

            {/* Text Section */}
            <motion.div 
              className="md:w-1/2 w-full order-2 md:order-1 text-[#FFF6D9]"
              initial="initial"
              animate={controls}
              variants={textVariants}
            >
              <motion.div variants={textVariants} className="space-y-6">
                <motion.h1 
                  variants={textVariants} 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                >
                  New Releases This Week
                </motion.h1>
                
                <motion.div 
                  variants={textVariants}
                  className="h-1 w-24 bg-blue-600 rounded-full"
                ></motion.div>
                
                <motion.p 
                  variants={textVariants} 
                  className="text-base md:text-lg text-gray-200 leading-relaxed max-w-lg"
                >
                  It's time to update your reading list with some of the latest and
                  greatest releases in the literary world. From heart-pumping
                  thrillers to captivating memoirs, this week's new releases offer
                  something for everyone.
                </motion.p>
                
                <motion.div variants={textVariants} className="pt-6 flex space-x-4">
                  <NavLink to='/shop' className="px-6 py-3 bg-blue-600 text-[#FFF6D9] rounded-md shadow-lg hover:bg-blue-700 transition-all duration-300 font-medium">
                    Browse Collection
                  </NavLink>
                  <NavLink to='/about' className="px-6 py-3 bg-[#FFF6D9] text-[#0a0a0a] rounded-md hover:bg-gray-300 transition-all duration-300">
                    Learn More
                  </NavLink>
                </motion.div>
              </motion.div>
              
              {/* Scroll Indicator */}
              <motion.div 
                className="hidden md:flex mt-12 justify-start"
                variants={scrollButtonVariants}
                initial="initial"
                animate="animate"
              >
                <img 
                  src={scrollPng} 
                  alt="Scroll down" 
                  className="w-8 opacity-80 hover:opacity-100 transition-opacity" 
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;