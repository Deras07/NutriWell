import { useState, useCallback, useMemo } from 'react'
import { 
  NURI_MODES, 
  MOOD_RESPONSES, 
  HEALTH_TIPS,
  PRO_FEATURES
} from '../constants/nuriModes'



export const useNuriLogic = () => {
  const [nuriState, setNuriState] = useState({
    currentMode: 'default',
    userMood: null,
    dailyCheckIn: false,
    lastInteraction: new Date(),
    streakDays: 0,
    proEnabled: false // This would be controlled by user subscription
  })

  // Update Nuri's state
  const updateNuriState = useCallback((updates) => {
    setNuriState(prev => ({ ...prev, ...updates }))
  }, [])

  // Get current personality based on mode
  const currentPersonality = useMemo(() => {
    return NURI_MODES[nuriState.currentMode]
  }, [nuriState.currentMode])

  // Simple mood parsing from text input
  const parseMoodFromText = useCallback((text) => {
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes('tired') || lowerText.includes('exhausted') || lowerText.includes('sleepy')) {
      return 'tired'
    }
    if (lowerText.includes('stressed') || lowerText.includes('overwhelmed') || lowerText.includes('busy')) {
      return 'stressed'
    }
    if (lowerText.includes('happy') || lowerText.includes('great') || lowerText.includes('good')) {
      return 'happy'
    }
    if (lowerText.includes('anxious') || lowerText.includes('worried') || lowerText.includes('nervous')) {
      return 'anxious'
    }
    if (lowerText.includes('motivated') || lowerText.includes('excited') || lowerText.includes('ready')) {
      return 'motivated'
    }
    if (lowerText.includes('energetic') || lowerText.includes('pumped') || lowerText.includes('alive')) {
      return 'energetic'
    }
    
    return 'neutral'
  }, [])

  // Generate adaptive response based on mood and mode
  const generateResponse = useCallback((
    userInput, 
    context
  ) => {
    const mood = parseMoodFromText(userInput) || nuriState.userMood || 'neutral'
    const moodResponse = MOOD_RESPONSES[mood]
    const personality = currentPersonality

    // Update state with new mood
    updateNuriState({ userMood: mood })

    // Check if daily check-in is needed
    const shouldCheckIn = !nuriState.dailyCheckIn && 
      new Date().getDate() !== nuriState.lastInteraction.getDate()

    // Select appropriate health tip
    const relevantTips = HEALTH_TIPS.filter(tip => 
      !tip.mood || tip.mood.includes(mood)
    )
    const healthTip = relevantTips[Math.floor(Math.random() * relevantTips.length)]

    // Generate contextual response
    let message = personality.greeting
    
    if (context?.macroData) {
      message += ` I see you've been tracking your nutrition. ${moodResponse.encouragement}`
    } else if (context?.exerciseToday) {
      message += ` Great job moving your body today! ${moodResponse.encouragement}`
    } else {
      message += ` ${moodResponse.encouragement}`
    }

    // Add mode-specific response
    switch (personality.responsePattern) {
      case 'question':
        message += ` How are you feeling about your health goals today?`
        break
      case 'suggestion':
        message += ` ${moodResponse.suggestions[0]}`
        break
      case 'observation':
        message += ` I notice you're in a ${mood} state. This is a great time to ${moodResponse.suggestions[0].toLowerCase()}.`
        break
      default:
        message += ` ${moodResponse.suggestions[0]}`
    }

    return {
      message,
      tone: moodResponse.tone,
      suggestions: moodResponse.suggestions,
      healthTip,
      shouldCheckIn,
      proFeature: nuriState.proEnabled ? PRO_FEATURES.find(f => f.enabled) : undefined
    }
  }, [nuriState, currentPersonality, parseMoodFromText, updateNuriState])

  // Handle daily check-in
  const handleDailyCheckIn = useCallback((mood, notes) => {
    updateNuriState({
      dailyCheckIn: true,
      userMood: mood,
      lastInteraction: new Date(),
      streakDays: nuriState.streakDays + 1
    })

    const moodResponse = MOOD_RESPONSES[mood]
    return {
      message: `Thanks for checking in! ${moodResponse.encouragement}`,
      tone: moodResponse.tone,
      suggestions: moodResponse.suggestions,
      streakDays: nuriState.streakDays + 1
    }
  }, [nuriState.streakDays, updateNuriState])

  // Generate macro tracking insights
  const generateMacroInsights = useCallback((macroData) => {
    const { protein, carbs, fats } = macroData
    
    let insight = "Looking at your nutrition today: "
    
    if (protein.percent >= 30) {
      insight += "Great protein intake! This will help with muscle maintenance and satiety. "
    } else if (protein.percent < 20) {
      insight += "Consider adding more protein to your meals for better energy and recovery. "
    }
    
    if (carbs.percent >= 45) {
      insight += "Your carb intake looks good for energy. "
    } else if (carbs.percent < 30) {
      insight += "You might need more carbs for optimal energy levels. "
    }
    
    if (fats.percent >= 25) {
      insight += "Good fat balance for hormone health. "
    } else if (fats.percent < 15) {
      insight += "Consider adding healthy fats for better nutrient absorption. "
    }

    return {
      message: insight,
      tone: 'analytical',
      suggestions: ['Try adding nuts to your snacks', 'Include avocado in your meals', 'Consider Greek yogurt for protein']
    }
  }, [])

  // Mock journaling functionality
  const processJournalEntry = useCallback((entry) => {
    const mood = parseMoodFromText(entry)
    const sentiment = entry.length > 50 ? 'detailed' : 'brief'
    
    let response = "Thanks for sharing that with me. "
    
    if (sentiment === 'detailed') {
      response += "I can see you're really reflecting on your health journey. "
    }
    
    if (mood) {
      const moodResponse = MOOD_RESPONSES[mood]
      response += moodResponse.encouragement
    } else {
      response += "Every entry helps me understand you better. Keep up the great work!"
    }

    return {
      message: response,
      tone: 'empathetic',
      mood: mood || 'neutral'
    }
  }, [parseMoodFromText])

  // Pro feature gating
  const isProFeatureAvailable = useCallback((featureId) => {
    if (!nuriState.proEnabled) return false
    const feature = PRO_FEATURES.find(f => f.id === featureId)
    return feature?.enabled || false
  }, [nuriState.proEnabled])

  // Get pro upgrade suggestions
  const getProUpgradeSuggestions = useCallback(() => {
    if (nuriState.proEnabled) return null
    
    const suggestions = [
      "Unlock advanced mood tracking and pattern recognition",
      "Get personalized recommendations for chronic conditions",
      "Access cycle-aware nutrition planning",
      "Try voice journaling with sentiment analysis"
    ]
    
    return {
      message: "I have some advanced features that could help you even more!",
      suggestions,
      isPro: true
    }
  }, [nuriState.proEnabled])

  return {
    nuriState,
    currentPersonality,
    generateResponse,
    handleDailyCheckIn,
    generateMacroInsights,
    processJournalEntry,
    isProFeatureAvailable,
    getProUpgradeSuggestions,
    updateNuriState
  }
} 