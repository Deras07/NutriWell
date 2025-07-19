# NutriWell - Modern Nutrition App Design System

## 🎨 Phase 1: Design System & Core Components - COMPLETED

A modern, responsive nutrition application built with React, Vite, and Tailwind CSS, featuring an elegant design system targeting users aged 18-35.

## ✨ Features

### 🎯 Design System
- **Modern Color Palette**: Soft sage green, warm cream, coral pink accents
- **Typography**: Inter (body) + Poppins (headings) for clean, readable text
- **Responsive**: Mobile-first design (320px+) with breakpoints for tablet, desktop, and large screens
- **Accessibility**: High contrast ratios, focus states, screen reader support

### 🧩 Component Library

#### Layout Components
- **Header/Navigation**: Responsive navbar with mobile hamburger menu, user profiles, auth actions
- **Footer**: Clean footer with links, contact info, newsletter signup, social media

#### Form Components
- **Input**: Floating label inputs with validation states and error handling
- **NumberInput**: +/- button controls for numeric values
- **Select**: Custom dropdown with search and keyboard navigation
- **Radio & Checkbox**: Styled form controls with consistent design
- **Textarea**: Multi-line text input with validation

#### UI Components
- **Button**: 6 variants (primary, secondary, tertiary, success, warning, danger) with loading states
- **Card**: Multiple variants (default, elevated, outlined, filled) with hover effects
- **Badge**: Status indicators with color coding
- **Tag**: Removable tags for categories and filters
- **ProgressBar**: Animated progress tracking with color variants
- **Tooltip**: Hoverable help text with positioning options

#### Specialized Cards
- **FeatureCard**: Icon + title + description for feature showcases
- **MealCard**: Food image + nutrition info + difficulty rating
- **RecipeCard**: Recipe display with ratings and preparation time

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Development
The app runs on `http://localhost:3000` with hot reload enabled.

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── select.jsx
│   │   ├── badge.jsx
│   │   └── textarea.jsx
│   ├── layout/             # Layout components
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   └── demo/               # Demo page
│       └── ModernNutritionApp.jsx
├── assets/                 # Images and static files
└── main.jsx               # App entry point
```

## 🎨 Design Tokens

### Colors
```css
/* Primary Colors */
--primary-sage: #8FBC8F
--primary-teal: #5F9EA0

/* Secondary Colors */
--secondary-cream: #F5F5DC
--secondary-white: #FAFAFA

/* Accent Colors */
--accent-coral: #FF7F7F
--accent-golden: #FFD700

/* Text Colors */
--text-charcoal: #36454F
--text-light: #6B7280
--text-dark: #1F2937

/* Status Colors */
--success: #90EE90
--warning: #FFB347
--error: #FFB6C1
--info: #87CEEB
```

### Typography Scale
```css
--text-xs: 0.75rem
--text-sm: 0.875rem
--text-base: 1rem
--text-lg: 1.125rem
--text-xl: 1.25rem
--text-2xl: 1.5rem
--text-3xl: 1.875rem
--text-4xl: 2.25rem
--text-5xl: 3rem
--text-6xl: 3.75rem
```

### Spacing Scale
```css
--space-xs: 0.25rem
--space-sm: 0.5rem
--space-md: 1rem
--space-lg: 1.5rem
--space-xl: 2rem
--space-2xl: 3rem
--space-3xl: 4rem
```

## 📱 Responsive Breakpoints

```css
xs: '320px'    /* Mobile first */
sm: '640px'    /* Small tablets */
md: '768px'    /* Tablets */
lg: '1024px'   /* Desktop */
xl: '1280px'   /* Large desktop */
2xl: '1440px'  /* Extra large */
```

## 🧩 Component Usage Examples

### Button Component
```jsx
import { Button } from './src/components/ui/button'

// Basic usage
<Button variant="primary" size="large">
  Get Started
</Button>

// With loading state
<Button variant="primary" loading>
  Processing...
</Button>

// Different variants
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="danger">Delete</Button>
```

### Input Component
```jsx
import { Input } from './src/components/ui/input'

// Floating label input
<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={handleChange}
  required
  error={errors.email}
  helpText="We'll never share your email"
/>
```

### Card Component
```jsx
import { Card, CardHeader, CardTitle, CardContent } from './src/components/ui/card'

<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here...
  </CardContent>
</Card>
```

## 🔧 Customization

### Adding New Color Variants
1. Update `tailwind.config.js` with new color definitions
2. Add variants to component props
3. Update CSS classes in component files

### Creating New Components
1. Follow existing component patterns
2. Use design tokens from `tailwind.config.js`
3. Include proper TypeScript props (if using TS)
4. Add accessibility attributes

## 🎯 Design Principles

- **Clean**: Generous whitespace, uncluttered layouts
- **Modern**: Current design trends, rounded corners, subtle shadows
- **Accessible**: High contrast, keyboard navigation, screen reader support
- **Engaging**: Smooth animations, hover effects, micro-interactions
- **Consistent**: Standardized spacing, colors, typography throughout

## 🚀 Next Phases

- **Phase 2**: User onboarding and nutrition planning features
- **Phase 3**: Tracking, community, and dashboard functionality
- **Phase 4**: Advanced features and integrations

## 🛠 Tech Stack

- **Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.4.4
- **Icons**: Lucide React 0.395.0
- **Fonts**: Inter (body), Poppins (headings)

## 📄 License

MIT License - feel free to use this design system in your own projects!

---

## 🎨 Demo Sections

The demo application showcases:

1. **Hero Section**: Gradient backgrounds, large typography, call-to-action buttons
2. **Features**: Icon-based feature cards with hover effects
3. **Interactive Form**: All form components with validation
4. **Progress Tracking**: Progress bars, badges, and achievement cards
5. **Meal Cards**: Food-focused card designs with ratings
6. **Component Showcase**: All UI components demonstrated

Visit `http://localhost:3000` to see the complete design system in action!
