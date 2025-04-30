import React from 'react'

import bannerImg from "../../assets/banner.png"

const Banner = () => {
  return (
    <div className='bg-gradient-to-r from-[#0a0a0a] to-[#1a1a1a] flex flex-col md:flex-row-reverse px-16 py-20 text-[#FFFBEF] pb-16 justify-between items-center gap-12'>
         <div className='md:w-1/2 w-full flex items-center md:justify-end p-4'>
            <img src={bannerImg} alt="" className='rounded-lg shadow-xl' />
        </div>
        
        <div className='md:w-1/2 w-full p-6'>
            <h1 className='md:text-5xl text-2xl font-medium mb-7 text-[#FFFBEF]'>New Releases This Week</h1>
            <p className='mb-10 text-[#FFFBEF]/90'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>

            <button className='btn-primary bg-[#FFFBEF] text-black hover:bg-[#FFFBEF]/90 px-8 py-3 rounded-lg transition-all duration-300'>Subscribe</button>
        </div>
    </div>
  )
}

export default Banner