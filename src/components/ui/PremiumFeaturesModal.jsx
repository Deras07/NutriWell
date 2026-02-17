import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Leaf, BarChart3, Heart } from 'lucide-react';

const PremiumFeaturesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <motion.div
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <div className="bg-gradient-to-br from-[#2C5530]/95 to-[#4A7C59]/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-200"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Personal Health Symphony
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Unlock AI-tailored meal plans, advanced analytics, and Zen Mode. Join an elite circle of 10,000+ thriving users.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* AI Meal Crafting */}
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="icon-container">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title">AI Meal Crafting</h3>
                <p className="feature-description">Personalized recipes daily based on your preferences, goals, and available ingredients.</p>
                <button className="feature-btn">Explore Recipes</button>
              </motion.div>

              {/* Deep Health Insights */}
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="icon-container">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title">Deep Health Insights</h3>
                <p className="feature-description">Real-time nutrient tracking with advanced analytics and personalized recommendations.</p>
                <button className="feature-btn">View Analytics</button>
              </motion.div>

              {/* Zen Mode */}
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="icon-container">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="feature-title">Zen Mode</h3>
                <p className="feature-description">Stress-eating guidance and mindfulness practices for emotional wellness.</p>
                <button className="feature-btn">Start Zen Journey</button>
              </motion.div>
            </div>

            {/* Testimonial */}
            <motion.div
              className="testimonial-section mb-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                <p className="text-lg text-white/90 italic mb-2" style={{ fontFamily: 'Cursive, serif' }}>
                  "Nutriwell Premium harmonized my life. I've never felt better."
                </p>
                <p className="text-white/70 font-medium">– Alex, 29</p>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button className="cta-button">
                Unveil Your Symphony Now
              </button>
              <p className="text-sm text-white/70 mt-3">
                Unlock 50% off your first month – ends September 1, 2025
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PremiumFeaturesModal;
