import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Database, ExternalLink, X } from 'lucide-react'

const DataSources = ({ isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  <h2 className="text-xl font-semibold">Data Sources & Trust</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <h3 className="font-semibold text-gray-800">Trusted Sources</h3>
                </div>
                <p className="text-sm text-gray-600">
                  Nuri uses official government nutrition databases to provide you with accurate, reliable information.
                </p>
              </div>

              {/* Data Sources */}
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Our Data Sources
                </h4>
                
                <div className="space-y-2">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-blue-800">Health Canada</h5>
                        <p className="text-xs text-blue-600">Canadian Nutrient File</p>
                      </div>
                      <div className="text-xs text-blue-600">© Government of Canada</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-green-800">USDA FoodData Central</h5>
                        <p className="text-xs text-green-600">Comprehensive nutrition database</p>
                      </div>
                      <div className="text-xs text-green-600">Public Domain</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Disclaimers */}
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Important Information</h4>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• This app is not affiliated with or endorsed by Health Canada or USDA</p>
                  <p>• Data used under fair use and public access provisions</p>
                  <p>• Information provided is for educational purposes only</p>
                  <p>• Always consult healthcare professionals for medical advice</p>
                </div>
              </div>

              {/* Expandable Details */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center justify-between w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <span>View detailed disclaimers</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ▼
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg text-xs text-gray-600 space-y-2">
                        <p><strong>Data Usage:</strong> Nutritional information sourced from government databases under public access provisions.</p>
                        <p><strong>Accuracy:</strong> While we strive for accuracy, data may vary and should not replace professional medical advice.</p>
                        <p><strong>Liability:</strong> This app is provided "as is" without warranties of any kind.</p>
                        <p><strong>Updates:</strong> Data sources are regularly updated, but information may not reflect the most recent changes.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>Your privacy and trust are our priority</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default DataSources 