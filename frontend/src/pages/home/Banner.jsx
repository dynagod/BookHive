import React from "react";
import { motion } from "framer-motion";
import bannerImg from "../../assets/banner.png";
import scrollPng from "../../assets/scroll.png";
import Navbar from "../../components/Navbar";

const Banner = () => {
  const textVaiants = {
    initial: {
      x: -500,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.1,
      },
    },
    scrollButton: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <>
      <div className="snap-start h-screen bg-gradient-to-br from-[#1f2937] to-[#111827]">
        <div>
          <Navbar />
        </div>

        <div className="mt-24 flex flex-col md:flex-row-reverse px-16 text-white pb-16 justify-between items-center gap-12 ">
          <div className="md:w-1/2 w-full flex items-center md:justify-end">
            <img src={bannerImg} alt="" />
          </div>

          <motion.div
            className="md:w-1/2 w-full"
            variants={textVaiants}
            initial="initial"
            whileInView="animate"
          >
            <motion.h1
              variants={textVaiants}
              className="md:text-5xl text-2xl font-medium mb-10"
            >
              New Releases This Week
            </motion.h1>

            <motion.p variants={textVaiants} className="mb-13">
              It's time to update your reading list with some of the latest and
              greatest releases in the literary world. From heart-pumping
              thrillers to captivating memoirs, this week's new releases offer
              something for everyone
            </motion.p>

            <motion.button
              variants={textVaiants}
              className="bg-[#ffce1a] px-12 py-2 rounded-md text-base font-secondary font-bold hover:bg-[#080842] cursor-pointer text-black"
            >
              Subscribe
            </motion.button>

            <motion.img
              variants={textVaiants}
              animate="scrollButton"
              src={scrollPng}
              className="w-12 mt-5"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Banner;
