export type NuriMode = 'coach' | 'companion' | 'nerd' | 'default'

export interface NuriPersonality {
  tone: 'empathetic' | 'encouraging' | 'analytical' | 'casual'
  style: 'formal' | 'friendly' | 'technical' | 'relaxed'
  emoji: string
  greeting: string
  responsePattern: 'question' | 'statement' | 'suggestion' | 'observation'
}

export const NURI_MODES: Record<NuriMode, NuriPersonality> = {
  coach: {
    tone: 'encouraging',
    style: 'friendly',
    emoji: '💪',
    greeting: "Hey there! Ready to crush your health goals today?",
    responsePattern: 'suggestion'
  },
  companion: {
    tone: 'empathetic',
    style: 'relaxed',
    emoji: '🌟',
    greeting: "Hi friend! How are you feeling today?",
    responsePattern: 'question'
  },
  nerd: {
    tone: 'analytical',
    style: 'technical',
    emoji: '🧠',
    greeting: "Hello! Let's analyze your health data together.",
    responsePattern: 'observation'
  },
  default: {
    tone: 'empathetic',
    style: 'friendly',
    emoji: '✨',
    greeting: "Hi! I'm Nuri, your health companion. How can I help you today?",
    responsePattern: 'question'
  }
}

export type UserMood = 'energetic' | 'tired' | 'stressed' | 'happy' | 'neutral' | 'anxious' | 'motivated'

export interface MoodResponse {
  tone: string
  suggestions: string[]
  encouragement: string
}

export const MOOD_RESPONSES: Record<UserMood, MoodResponse> = {
  energetic: {
    tone: 'excited',
    suggestions: ['Great time for a workout!', 'Try that new recipe you wanted to make'],
    encouragement: "Your energy is contagious! Let's channel it into something amazing."
  },
  tired: {
    tone: 'gentle',
    suggestions: ['Take it easy today', 'Focus on gentle movement', 'Prioritize rest'],
    encouragement: "It's okay to slow down. Your body knows what it needs."
  },
  stressed: {
    tone: 'calming',
    suggestions: ['Deep breathing exercises', 'Light stretching', 'Mindful eating'],
    encouragement: "You're doing great. Let's find some peace in the small moments."
  },
  happy: {
    tone: 'cheerful',
    suggestions: ['Share your joy with movement', 'Try something new', 'Connect with others'],
    encouragement: "Your positive energy is beautiful! Keep spreading that joy."
  },
  neutral: {
    tone: 'balanced',
    suggestions: ['Check in with your body', 'Try something new', 'Maintain your routine'],
    encouragement: "Sometimes steady is exactly what we need. You're doing great."
  },
  anxious: {
    tone: 'soothing',
    suggestions: ['Grounding exercises', 'Gentle movement', 'Comfort foods'],
    encouragement: "You're safe. Let's find some calm together."
  },
  motivated: {
    tone: 'inspiring',
    suggestions: ['Set a new goal', 'Push your boundaries', 'Share your progress'],
    encouragement: "That motivation is your superpower! Let's make the most of it."
  }
}

export interface HealthTip {
  id: string
  category: 'nutrition' | 'exercise' | 'mindfulness' | 'sleep' | 'general'
  title: string
  content: string
  mood?: UserMood[]
  mode?: NuriMode[]
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: 'hydration-001',
    category: 'nutrition',
    title: 'Hydration Reminder',
    content: "Your body is about 60% water! Try adding a slice of lemon or cucumber to make water more appealing.",
    mood: ['energetic', 'neutral', 'motivated']
  },
  {
    id: 'mindful-eating-001',
    category: 'mindfulness',
    title: 'Mindful Eating',
    content: "Try eating without distractions today. Notice the flavors, textures, and how your body feels.",
    mood: ['stressed', 'anxious', 'neutral']
  },
  {
    id: 'movement-001',
    category: 'exercise',
    title: 'Gentle Movement',
    content: "Even 5 minutes of stretching can boost your mood and energy. Start small!",
    mood: ['tired', 'stressed', 'neutral']
  },
  {
    id: 'sleep-001',
    category: 'sleep',
    title: 'Sleep Hygiene',
    content: "Try dimming your lights an hour before bed. Your body will thank you tomorrow!",
    mood: ['tired', 'anxious', 'stressed']
  },
  {
    id: 'gratitude-001',
    category: 'mindfulness',
    title: 'Gratitude Practice',
    content: "Take a moment to appreciate something about your body today. It does amazing things for you!",
    mood: ['happy', 'motivated', 'neutral']
  }
]

export interface ProFeature {
  id: string
  name: string
  description: string
  category: 'chronic' | 'menstrual' | 'allergies' | 'mood' | 'journaling' | 'insights'
  enabled: boolean
}

export const PRO_FEATURES: ProFeature[] = [
  {
    id: 'chronic-conditions',
    name: 'Chronic Condition Support',
    description: 'Personalized recommendations for managing chronic health conditions',
    category: 'chronic',
    enabled: false
  },
  {
    id: 'menstrual-health',
    name: 'Menstrual Health Tracking',
    description: 'Cycle-aware nutrition and wellness recommendations',
    category: 'menstrual',
    enabled: false
  },
  {
    id: 'allergies-intolerances',
    name: 'Allergies & Intolerances',
    description: 'Custom meal planning around dietary restrictions',
    category: 'allergies',
    enabled: false
  },
  {
    id: 'advanced-mood',
    name: 'Advanced Mood Analysis',
    description: 'Deep mood tracking and pattern recognition',
    category: 'mood',
    enabled: false
  },
  {
    id: 'journaling',
    name: 'Health Journaling',
    description: 'Text and voice journaling with sentiment analysis',
    category: 'journaling',
    enabled: false
  },
  {
    id: 'longitudinal-insights',
    name: 'Longitudinal Insights',
    description: 'Progress tracking and pattern recognition over time',
    category: 'insights',
    enabled: false
  }
] 