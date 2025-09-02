/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '1rem',
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1440px'
  		}
  	},
  	extend: {
  		colors: {
  			teal: {
  				'50': '#E1F5F4',
  				'100': '#B8E4E2',
  				'200': '#8ED3CF',
  				'300': '#6CC7C4',
  				'400': '#4EB1AE',
  				'500': '#40A4A0',
  				'600': '#2F868F',
  				'700': '#206D79',
  				'800': '#0E4F5A',
  				'900': '#0E4F5A'
  			},
  			coral: {
  				'300': '#FF9A8B'
  			},
  			green: {
  				'50': '#F0FDF4',
  				'100': '#DCFCE7',
  				'200': '#BBF7D0',
  				'300': '#86EFAC',
  				'400': '#4ADE80',
  				'500': '#22C55E',
  				'600': '#16A34A',
  				'700': '#15803D',
  				'800': '#166534',
  				'900': '#14532D'
  			},
  			'mint-green': '#B8E6B8',
  			'deep-leaf-green': '#4A7C59',
  			'fern-green': '#2E4E3F',
  			mint: '#A7C7A3',
  			cream: {
  				'300': '#FFF8DC'
  			},
  			sage: '#A7C7A3',
  			misty: '#B3DFF5',
  			lavender: '#D8C8EB',
  			blush: '#F5C6C6',
  			neutral: '#F5F5F5',
  			brandStart: '#4EB1AE',
  			brandEnd: '#FF9A8B',
  			brandMid: '#8ED3CF',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			featureMint: '#8fe4c5',
  			featureLavender: '#e8e9ff',
  			featurePeach: '#fff5e8',
  						primary: {
				sage: '#8fe4c5',
				teal: '#37c8b4',
				'sage-light': '#b7efcc',
				'sage-dark': '#6db991',
				'teal-light': '#5dd3c2',
				'teal-dark': '#2ba896',
				DEFAULT: '#3FB37F',
				foreground: '#053B2E',
				fg: '#053B2E'
			},
			leaf: '#38A169',
			mint: '#E6F6EF',
			neutral: {
				50: '#FAFAFA',
				100: '#F5F5F5',
				200: '#E5E5E5',
				300: '#D4D4D4',
				600: '#525252',
				800: '#262626',
				900: '#171717'
			},
  			secondary: {
  				cream: '#FFF8E7',
  				white: '#FAFAFA',
  				peach: '#fff5e8',
  				mint: '#f0faf0',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				coral: '#fd818b',
  				'coral-light': '#feb3ba',
  				'coral-dark': '#f4535e',
  				golden: '#FFA726',
  				orange: '#FF8C42',
  				lime: '#8BC34A',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			text: {
  				charcoal: '#2C3E50',
  				light: '#64748B',
  				dark: '#1E293B'
  			},
  			success: '#4CAF50',
  			warning: '#FF9800',
  			error: '#F44336',
  			info: '#2196F3',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			heading: [
  				'Poppins',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			nunito: [
  				'Nunito',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			'dm-sans': [
  				'DM Sans',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			body: [
  				'Nunito',
  				'ui-sans-serif',
  				'system-ui'
  			],
  			title: [
  				'Poppins',
  				'ui-sans-serif',
  				'system-ui'
  			]
  		},
  		backdropBlur: {
  			xs: '2px'
  		},
  				fontSize: {
			xs: '0.75rem',
			sm: '0.875rem',
			base: '1rem',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '3.75rem',
			'display-1': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
			'display-2': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
			'heading-1': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
			'heading-2': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
			'heading-3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
			'body': ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
			'small': ['clamp(0.875rem, 1vw, 1rem)', { lineHeight: '1.5' }]
		},
  		spacing: {
  			xs: '0.25rem',
  			sm: '0.5rem',
  			md: '1rem',
  			lg: '1.5rem',
  			xl: '2rem',
  			'2xl': '3rem',
  			'3xl': '4rem'
  		},
  				borderRadius: {
			sm: 'calc(var(--radius) - 4px)',
			md: 'calc(var(--radius) - 2px)',
			lg: 'var(--radius)',
			xl: '1rem',
			'2xl': '1.25rem'
		},
  				boxShadow: {
			sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
			md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
			xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
			soft: '0 6px 20px rgba(0,0,0,0.08)'
		},
  		screens: {
  			xs: '320px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1440px'
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
  			float: 'float 6s ease-in-out infinite',
  			wiggle: 'wiggle 1s ease-in-out infinite',
  			gradient: 'gradient 4s ease infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideDown: {
  				'0%': {
  					transform: 'translateY(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideLeft: {
  				'0%': {
  					transform: 'translateX(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			slideRight: {
  				'0%': {
  					transform: 'translateX(-20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.9)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			pulseSlow: {
  				'0%, 100%': {
  					opacity: '1'
  				},
  				'50%': {
  					opacity: '0.7'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			wiggle: {
  				'0%, 100%': {
  					transform: 'rotate(-3deg)'
  				},
  				'50%': {
  					transform: 'rotate(3deg)'
  				}
  			},
  						gradient: {
				'0%, 100%': {
					backgroundPosition: '0% 50%'
				},
				'50%': {
					backgroundPosition: '100% 50%'
				}
			}
		},
		zIndex: {
			base: 0,
			header: 50,
			dropdown: 60,
			toast: 70,
			modal: 80,
			tooltip: 90
		}
	}
},
  plugins: [require("tailwindcss-animate")],
} 