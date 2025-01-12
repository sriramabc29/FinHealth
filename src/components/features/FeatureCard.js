import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ title, description, icon, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.2 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group"
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-raisin group-hover:text-dodger transition-colors">
      {title}
    </h3>
    <p className="text-raisin/70">{description}</p>
    <div className="mt-4 flex items-center text-dodger">
      <span className="group-hover:translate-x-2 transition-transform">
        Learn more →
      </span>
    </div>
  </motion.div>
);

export default FeatureCard;