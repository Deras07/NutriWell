import React, { useState } from 'react'
import { Button } from './button'
import { Card, CardContent } from './card'

export const Calendar = ({ 
  selectedDate = new Date(),
  onDateSelect,
  view = 'week', // 'week' or 'month'
  mealPlans = {},
  onMealPlanClick,
  className = ''
}) => {
  const [currentDate, setCurrentDate] = useState(selectedDate)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getWeekDays = (date) => {
    const startOfWeek = new Date(date)
    const dayOfWeek = startOfWeek.getDay()
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek)
    
    const weekDays = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      weekDays.push(day)
    }
    return weekDays
  }

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction * 7))
    setCurrentDate(newDate)
  }

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isSameDay = (date1, date2) => {
    return date1.toDateString() === date2.toDateString()
  }

  const weekDays = getWeekDays(currentDate)

  return (
    <div className={`w-full ${className}`}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <p className="text-gray-600">Plan your weekly meals</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigateWeek(-1)}
            className="flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => setCurrentDate(new Date())}
          >
            Today
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={() => navigateWeek(1)}
            className="flex items-center gap-1"
          >
            Next
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Day Headers */}
        {daysOfWeek.map((day, index) => (
          <div key={day} className="text-center pb-2 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {day}
            </div>
          </div>
        ))}

        {/* Calendar Days */}
        {weekDays.map((date, index) => (
          <CalendarDay
            key={formatDate(date)}
            date={date}
            isToday={isToday(date)}
            isSelected={isSameDay(date, selectedDate)}
            mealPlan={mealPlans[formatDate(date)]}
            onDateSelect={onDateSelect}
            onMealPlanClick={onMealPlanClick}
          />
        ))}
      </div>
    </div>
  )
}

const CalendarDay = ({ 
  date, 
  isToday, 
  isSelected, 
  mealPlan, 
  onDateSelect, 
  onMealPlanClick 
}) => {
  const handleDateClick = () => {
    onDateSelect?.(date)
  }

  const handleMealClick = (meal, mealType) => {
    onMealPlanClick?.(meal, mealType, date)
  }

  return (
    <div className="min-h-32">
      <Card 
        className={`h-full cursor-pointer transition-all duration-200 hover:shadow-md ${
          isSelected ? 'ring-2 ring-primary-teal' : ''
        } ${isToday ? 'bg-primary-teal/5' : ''}`}
        onClick={handleDateClick}
      >
        <CardContent className="p-3">
          {/* Date Number */}
          <div className="flex items-center justify-between mb-2">
            <span className={`text-lg font-semibold ${
              isToday ? 'text-primary-teal' : 'text-gray-900'
            }`}>
              {date.getDate()}
            </span>
            {isToday && (
              <div className="w-2 h-2 bg-primary-teal rounded-full"></div>
            )}
          </div>

          {/* Meal Plans */}
          {mealPlan && (
            <div className="space-y-1">
              {mealPlan.breakfast && (
                <MealPlanItem
                  meal={mealPlan.breakfast}
                  type="breakfast"
                  icon="🌅"
                  onClick={() => handleMealClick(mealPlan.breakfast, 'breakfast')}
                />
              )}
              {mealPlan.lunch && (
                <MealPlanItem
                  meal={mealPlan.lunch}
                  type="lunch"
                  icon="☀️"
                  onClick={() => handleMealClick(mealPlan.lunch, 'lunch')}
                />
              )}
              {mealPlan.dinner && (
                <MealPlanItem
                  meal={mealPlan.dinner}
                  type="dinner"
                  icon="🌙"
                  onClick={() => handleMealClick(mealPlan.dinner, 'dinner')}
                />
              )}
            </div>
          )}

          {/* Add Meal Button */}
          {!mealPlan && (
            <div className="text-center">
              <button className="text-xs text-gray-400 hover:text-primary-teal transition-colors">
                + Add meals
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

const MealPlanItem = ({ meal, type, icon, onClick }) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className="p-1 bg-white rounded border hover:shadow-sm transition-shadow cursor-pointer"
    >
      <div className="flex items-center space-x-1">
        <span className="text-xs">{icon}</span>
        <span className="text-xs font-medium text-gray-700 truncate">
          {meal.name || meal}
        </span>
      </div>
      {meal.calories && (
        <div className="text-xs text-gray-500">{meal.calories} cal</div>
      )}
    </div>
  )
}

export const WeeklyMealPlanner = ({ 
  mealPlans = {}, 
  onPlanUpdate,
  className = '' 
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedMeal, setSelectedMeal] = useState(null)

  const handleMealPlanClick = (meal, mealType, date) => {
    setSelectedMeal({ meal, mealType, date })
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className={`${className}`}>
      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        mealPlans={mealPlans}
        onMealPlanClick={handleMealPlanClick}
      />
      
      {/* Meal Detail Modal/Sidebar would go here */}
      {selectedMeal && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            {selectedMeal.mealType} - {selectedMeal.date.toLocaleDateString()}
          </h3>
          <p className="text-gray-600">{selectedMeal.meal.name || selectedMeal.meal}</p>
        </div>
      )}
    </div>
  )
} 