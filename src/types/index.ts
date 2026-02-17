// Core application types

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'premium'
  preferences?: UserPreferences
}

export interface UserPreferences {
  dietaryRestrictions: string[]
  allergies: string[]
  goals: string[]
  activityLevel: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active'
  age: number
  height: number // cm
  weight: number // kg
  targetWeight?: number // kg
  targetCalories: number
}

export interface NavigationItem {
  label: string
  href?: string
  active: boolean
  onClick?: () => void
  dropdown?: DropdownItem[]
}

export interface DropdownItem {
  label: string
  onClick: () => void
}

export interface Ingredient {
  id: string
  name: string
  category: string
  calories: number // per 100g
  protein: number // per 100g
  carbs: number // per 100g
  fat: number // per 100g
  quantity?: number // grams used in recipe
}

export interface Recipe {
  id: string
  name: string
  description?: string
  ingredients: RecipeIngredient[]
  instructions: string[]
  servings: number
  cookingTime: number // minutes
  difficulty: 'Easy' | 'Medium' | 'Hard'
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  image?: string
  tags: string[]
  createdBy: string
  createdAt: Date
}

export interface RecipeIngredient extends Ingredient {
  quantity: number // grams
}

export interface MealPlan {
  id: string
  name: string
  userId: string
  startDate: Date
  endDate: Date
  meals: DayMeal[]
  totalCalories: number
  averageMacros: {
    protein: number
    carbs: number
    fat: number
  }
}

export interface DayMeal {
  date: string // YYYY-MM-DD
  breakfast?: Recipe[]
  lunch?: Recipe[]
  dinner?: Recipe[]
  snacks?: Recipe[]
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
}

export interface NutritionLog {
  id: string
  userId: string
  date: string // YYYY-MM-DD
  meals: LoggedMeal[]
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
  water: number // ml
  notes?: string
}

export interface LoggedMeal {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  foods: LoggedFood[]
  totalCalories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
}

export interface LoggedFood {
  ingredient: Ingredient
  quantity: number // grams
  calories: number
  macros: {
    protein: number
    carbs: number
    fat: number
  }
}

export interface GroceryList {
  id: string
  name: string
  userId: string
  items: GroceryItem[]
  mealPlanId?: string
  createdAt: Date
  completed: boolean
}

export interface GroceryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  checked: boolean
  estimatedPrice?: number
}

export interface ActivityLog {
  id: string
  userId: string
  date: string // YYYY-MM-DD
  activities: Activity[]
  totalCaloriesBurned: number
  totalDuration: number // minutes
}

export interface Activity {
  type: string
  duration: number // minutes
  caloriesBurned: number
  intensity: 'low' | 'moderate' | 'high'
  notes?: string
}

// Form validation types
export interface ValidationError {
  field: string
  message: string
}

export interface FormState<T> {
  data: T
  errors: Record<keyof T, string | null>
  touched: Record<keyof T, boolean>
  isValid: boolean
  isSubmitting: boolean
}

// UI Component Props
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface InputProps extends BaseComponentProps {
  label?: string
  type?: string
  value?: string
  placeholder?: string
  error?: string
  success?: boolean
  loading?: boolean
  required?: boolean
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onValidate?: (value: string) => void
  validateOnBlur?: boolean
  validateOnChange?: boolean
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'filled'
  hover?: boolean
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
  errors?: ValidationError[]
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// Application state types
export interface AppState {
  currentPage: string
  userPlan: 'free' | 'premium'
  user?: User
  onboardingData?: UserPreferences
  showUpgradeModal: boolean
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
}

// Chart data types
export interface ChartData {
  labels: string[]
  datasets: Dataset[]
}

export interface Dataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
}

export interface MacroData {
  protein: number
  carbs: number
  fat: number
}

export interface CalorieData {
  date: string
  calories: number
  goal: number
}

export interface WeightData {
  date: string
  weight: number
}