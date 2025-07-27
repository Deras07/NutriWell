import React from 'react'
import { motion } from 'framer-motion'
import { Lock, Sparkles, Zap, Brain, Heart, Moon, Leaf, TrendingUp, Clock, Sun } from 'lucide-react'

const ComingSoonFeatures = () => {
  const features = [
    {
      title: "Micronutrient Synergy",
      subtitle: "Discover vitamin & mineral pairings that unlock your full potential.",
      icon: Sparkles,
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50",
      comingSoon: "Q2 2024"
    },
    {
      title: "Circadian Nutrition",
      subtitle: "Time your meals with your internal clock for peak energy & sleep.",
      icon: Clock,
      gradient: "from-blue-400 to-cyan-400",
      bgGradient: "from-blue-50 to-cyan-50",
      comingSoon: "Q3 2024"
    },
    {
      title: "Anti-Inflammatory Meals",
      subtitle: "Plans tailored to your genetics and inflammatory markers.",
      icon: Heart,
      gradient: "from-red-400 to-orange-400",
      bgGradient: "from-red-50 to-orange-50",
      comingSoon: "Q2 2024"
    },
    {
      title: "Gut Diversity Analyzer",
      subtitle: "Boost your microbiome through smarter food variety.",
      icon: Leaf,
      gradient: "from-green-400 to-emerald-400",
      bgGradient: "from-green-50 to-emerald-50",
      comingSoon: "Q3 2024"
    },
    {
      title: "Brain Boosting Foods",
      subtitle: "Eat for sharper focus, clarity, and memory retention.",
      icon: Brain,
      gradient: "from-indigo-400 to-purple-400",
      bgGradient: "from-indigo-50 to-purple-50",
      comingSoon: "Q4 2024"
    },
    {
      title: "Sleep Nutrition Optimizer",
      subtitle: "Evening meals designed for deeper, restorative sleep.",
      icon: Moon,
      gradient: "from-slate-400 to-blue-400",
      bgGradient: "from-slate-50 to-blue-50",
      comingSoon: "Q3 2024"
    },
    {
      title: "Longevity Planner",
      subtitle: "Inspired by Blue Zones. Live longer, healthier, happier.",
      icon: TrendingUp,
      gradient: "from-teal-400 to-green-400",
      bgGradient: "from-teal-50 to-green-50",
      comingSoon: "Q4 2024"
    },
    {
      title: "Climate-Ready Nutrition",
      subtitle: "Adapt your meals to shifting weather and seasons.",
      icon: Sun,
      gradient: "from-yellow-400 to-orange-400",
      bgGradient: "from-yellow-50 to-orange-50",
      comingSoon: "2025"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-muted via-white to-featurePeach overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-brandStart/10 to-brandEnd/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-brandStart animate-pulse" />
            <span className="text-brandStart font-semibold">Coming Soon</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-brandStart to-brandEnd bg-clip-text text-transparent mb-4">
            The Future of Personalized Health
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building something extraordinary. Get ready for cutting-edge features that will transform how you think about nutrition and wellness.
          </p>
        </motion.div>

        {/* Scrollable Feature Cards */}
        <div className="relative">
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              
              return (
                <motion.div
                  key={feature.title}
                  className="flex-shrink-0 w-80 group cursor-pointer"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`
                    relative h-full p-6 rounded-2xl border-2 border-gray-200 
                    bg-gradient-to-br ${feature.bgGradient} 
                    transition-all duration-300 
                    hover:border-brandStart hover:shadow-2xl 
                    overflow-hidden group-hover:from-white group-hover:to-white
                  `}>
                    {/* Background glow effect */}
                    <div className={`
                      absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 
                      group-hover:opacity-10 transition-opacity duration-300
                    `} />
                    
                    {/* Coming Soon Badge */}
                    <div className="absolute top-4 right-4 flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-gray-400 group-hover:text-brandStart transition-colors duration-300" />
                      <span className="text-xs font-semibold text-gray-500 bg-white px-2 py-1 rounded-full group-hover:text-brandStart transition-colors duration-300">
                        {feature.comingSoon}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`
                      w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} 
                      flex items-center justify-center mb-6 
                      group-hover:scale-110 transition-transform duration-300
                      shadow-lg group-hover:shadow-xl
                    `}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-brandStart transition-colors duration-300">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                        {feature.subtitle}
                      </p>

                      {/* Hover reveal content */}
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className={`
                          text-xs font-medium bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent
                        `}>
                          ✨ Early access available for beta testers
                        </div>
                      </div>
                    </div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-brandStart to-brandEnd opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                         style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 bg-gradient-to-r from-brandStart/5 to-brandEnd/5 rounded-2xl border border-brandStart/20">
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-semibold text-gray-800 mb-1">
                ✨ Want early access?
              </h4>
              <p className="text-gray-600 text-sm">
                Join our insider group — first 100 users get exclusive previews
              </p>
            </div>
            
            <button className="
              px-6 py-3 bg-gradient-to-r from-brandStart to-brandEnd 
              text-white font-semibold rounded-xl shadow-lg hover:shadow-xl 
              transition-all duration-300 hover:-translate-y-1 hover:scale-105
              whitespace-nowrap group
            ">
              <span className="flex items-center space-x-2">
                <span>Join Waitlist</span>
                <Zap className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
      

    </section>
  )
}

export default ComingSoonFeatures 