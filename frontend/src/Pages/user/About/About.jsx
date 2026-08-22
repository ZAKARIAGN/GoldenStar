import React, { useEffect } from 'react'
import Hero from './Hero'
import { Story } from './Story'
import { motion } from 'framer-motion'

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-[#050505] min-h-screen"
    >

      <Hero />


      <div className="relative">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#D4AF37]/40 to-transparent z-20"></div>
        
        <Story />
      </div>
      <section className="py-24 text-center">
        <div className="h-[1px] w-12 bg-[#D4AF37]/20 mx-auto mb-8"></div>
        <p className="text-[10px] font-black tracking-[0.8em] uppercase text-[#D4AF37]/30">
          L'Étoile d'Or — Une tradition d'excellence
        </p>
      </section>
    </motion.main>
  )
}

export default About