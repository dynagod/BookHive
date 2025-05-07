import React, { useRef } from "react";
import SingleCategory from "./SingleCategory";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { catagories } from "../../utils/catagories";

const FeaturedCategories = ({ containerRef }) => {
  const sectionWrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: sectionWrapperRef,
    offset: ["end end", "start start"],
    layoutEffect: false
  });

  const transformWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Apply spring to the transformed width
  const width = useSpring(transformWidth, {
    stiffness: 100,
    damping: 30,
  });

  return (
    <div ref={sectionWrapperRef} className="relative min-h-screen">
      <div className="sticky top-0 z-10 p-4 text-[#FFF6D9] text-4xl flex flex-col items-center bg-gradient-to-r from-[#0a0a0a]/90 via-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-sm">
        <h1 className="font-bold">Featured Categories</h1>
        <motion.div style={{ width }} className="bg-blue-600 h-2.5 mt-4 rounded-full" />
      </div>
  
      <div>
        {catagories.map((category) => (
          <SingleCategory containerRef={containerRef} category={category} key={category.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;