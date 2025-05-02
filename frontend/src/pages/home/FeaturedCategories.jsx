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

// 👉 Apply spring to the transformed width
const width = useSpring(transformWidth, {
  stiffness: 100,
  damping: 30,
});

    return (
      <div ref={sectionWrapperRef} className="relative min-h-screen">
        <div className="sticky top-0 z-10 p-4 text-[#ffce1a] text-4xl flex flex-col items-center">
          <h1>Featured Categories</h1>
          <motion.div style={{ width }} className="bg-white h-2.5 mt-4" />
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