import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SecondPage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, 
    [0, window.innerHeight], 
    [window.innerHeight, 0]
  );

  return (
    <motion.div
      style={{ y }}
      className="fixed inset-0 bg-[#ECE5F0] origin-bottom"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1.000]
      }}
    >
      <div className="min-h-screen overflow-auto">
        <div className="container mx-auto px-6 pt-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-5xl font-bold text-[#1b1f27] mb-6">
              The average YNABer saves $600 in 2 months
            </h2>
            <p className="text-[#1b1f27]/70 text-xl mb-12">
              And we don't like to play favorites or anything, but you seem well above average to us.
              Are you ready to be our next success story?
            </p>
          </motion.div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="flex gap-2 mb-4">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="text-[#1b1f27] font-semibold mb-2">
                I took the plunge and am loving it!
              </h3>
              <p className="text-[#1b1f27]/70">
                It's increased my personal financial awareness
              </p>
            </motion.div>
            
            {/* Add more testimonial cards similarly */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SecondPage;