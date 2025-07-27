/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New vibrant brand palette
        brandStart: '#37c8b4',  // teal
        brandEnd: '#fd818b',    // coral-pink
        brandMid: '#8fe4c5',    // pastel green
        muted: '#f5f7fa',       // light background
        
        // Feature card colors
        featureMint: '#8fe4c5',    // green-mint
        featureLavender: '#e8e9ff', // lavender
        featurePeach: '#fff5e8',    // peach
        
        // Primary Colors - Updated with brand colors
        primary: {
          sage: '#8fe4c5',     // Brand mid (pastel green)
          teal: '#37c8b4',     // Brand start (teal)
          'sage-light': '#b7efcc',
          'sage-dark': '#6db991',
          'teal-light': '#5dd3c2', 
          'teal-dark': '#2ba896',
        },
        // Secondary Colors  
        secondary: {
          cream: '#FFF8E7',    // Warmer cream
          white: '#FAFAFA',
          peach: '#fff5e8',    // Updated to feature peach
          mint: '#f0faf0',     // Soft mint for backgrounds
        },
        // Accent Colors - Updated with brand colors
        accent: {
          coral: '#fd818b',    // Brand end (coral-pink)
          'coral-light': '#feb3ba',
          'coral-dark': '#f4535e',
          golden: '#FFA726',   // More orange-toned gold
          orange: '#FF8C42',   // New energetic orange
          lime: '#8BC34A',     // Fresh lime accent
        },
        // Text Colors
        text: {
          charcoal: '#2C3E50', // Slightly lighter, more readable
          light: '#64748B',    // Better contrast
          dark: '#1E293B',     // Warmer dark
        },
        // Status Colors - More vibrant
        success: '#4CAF50',   // Standard Material green
        warning: '#FF9800',   // Material orange
        error: '#F44336',     // Material red
        info: '#2196F3',      // Material blue
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'heading': ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem', 
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
      },
      borderRadius: {
        'sm': '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient': 'gradient 4s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
} 