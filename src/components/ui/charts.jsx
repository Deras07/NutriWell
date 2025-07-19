import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
)

// Default theme colors from the app
const CHART_COLORS = {
  primary: '#5F9EA0', // primary-teal
  secondary: '#8FBC8F', // primary-sage
  accent: '#FF7F7F', // accent-coral
  success: '#90EE90', // success green
  warning: '#FFB347', // warning orange
  background: '#F5F5DC', // secondary-cream
}

// Chart options with app styling
const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          family: 'Inter, system-ui, sans-serif'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      cornerRadius: 8,
      padding: 12
    }
  }
}

export const MacroPieChart = ({ protein, carbs, fat, className = '' }) => {
  const total = protein + carbs + fat

  const data = {
    labels: ['Protein', 'Carbohydrates', 'Fat'],
    datasets: [{
      data: [protein, carbs, fat],
      backgroundColor: [
        '#FF6B6B', // Red for protein
        '#4ECDC4', // Blue for carbs  
        '#FFE66D', // Yellow for fat
      ],
      borderColor: [
        '#FF5252',
        '#26C6DA',
        '#FFCC02',
      ],
      borderWidth: 2,
      hoverOffset: 4
    }]
  }

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      tooltip: {
        ...defaultOptions.plugins.tooltip,
        callbacks: {
          label: function(context) {
            const percentage = ((context.parsed / total) * 100).toFixed(1)
            return `${context.label}: ${context.parsed}g (${percentage}%)`
          }
        }
      }
    }
  }

  return (
    <div className={`${className}`}>
      <Pie data={data} options={options} />
    </div>
  )
}

export const CalorieBarChart = ({ weekData, className = '' }) => {
  const data = {
    labels: weekData.map(d => d.day),
    datasets: [{
      label: 'Calories Consumed',
      data: weekData.map(d => d.calories),
      backgroundColor: CHART_COLORS.primary,
      borderColor: CHART_COLORS.primary,
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }, {
      label: 'Calorie Goal',
      data: weekData.map(d => d.goal),
      backgroundColor: CHART_COLORS.accent,
      borderColor: CHART_COLORS.accent,
      borderWidth: 1,
      borderRadius: 4,
      borderSkipped: false,
    }]
  }

  const options = {
    ...defaultOptions,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  }

  return (
    <div className={`${className}`}>
      <Bar data={data} options={options} />
    </div>
  )
}

export const WeightProgressChart = ({ weightData, className = '' }) => {
  const data = {
    labels: weightData.map(d => d.date),
    datasets: [{
      label: 'Weight (kg)',
      data: weightData.map(d => d.weight),
      borderColor: CHART_COLORS.secondary,
      backgroundColor: `${CHART_COLORS.secondary}20`,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: CHART_COLORS.secondary,
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
    }]
  }

  const options = {
    ...defaultOptions,
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      }
    }
  }

  return (
    <div className={`${className}`}>
      <Line data={data} options={options} />
    </div>
  )
}

export const MacroProgressBars = ({ protein, carbs, fat, goals, className = '' }) => {
  const getPercentage = (current, goal) => Math.min((current / goal) * 100, 100)
  const getColor = (current, goal) => {
    const percentage = (current / goal) * 100
    if (percentage >= 90 && percentage <= 110) return 'bg-green-500'
    if (percentage >= 80 && percentage <= 120) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const macros = [
    { name: 'Protein', current: protein, goal: goals.protein, unit: 'g', color: 'bg-red-400' },
    { name: 'Carbs', current: carbs, goal: goals.carbs, unit: 'g', color: 'bg-blue-400' },
    { name: 'Fat', current: fat, goal: goals.fat, unit: 'g', color: 'bg-yellow-400' }
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {macros.map((macro) => (
        <div key={macro.name}>
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-1">
            <span>{macro.name}</span>
            <span>{macro.current}g / {macro.goal}g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${getColor(macro.current, macro.goal)}`}
              style={{ width: `${getPercentage(macro.current, macro.goal)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getPercentage(macro.current, macro.goal).toFixed(0)}% of daily goal
          </div>
        </div>
      ))}
    </div>
  )
}

export const WaterIntakeVisual = ({ current, goal, className = '' }) => {
  const percentage = Math.min((current / goal) * 100, 100)
  
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-20 h-32 bg-blue-100 rounded-full border-4 border-blue-300 overflow-hidden">
        <div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-500 ease-out"
          style={{ height: `${percentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-blue-800 font-semibold text-sm">
            {Math.round(percentage)}%
          </div>
        </div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-sm font-medium text-gray-700">
          {current}ml / {goal}ml
        </div>
        <div className="text-xs text-gray-500">
          {goal - current > 0 ? `${goal - current}ml to go` : 'Goal reached!'}
        </div>
      </div>
    </div>
  )
}

export const GoalCompletionDonut = ({ completed, total, className = '' }) => {
  const percentage = (completed / total) * 100

  const data = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [completed, total - completed],
      backgroundColor: [
        CHART_COLORS.success,
        '#E5E7EB'
      ],
      borderColor: [
        CHART_COLORS.success,
        '#E5E7EB'
      ],
      borderWidth: 0,
      cutout: '70%'
    }]
  }

  const options = {
    ...defaultOptions,
    plugins: {
      ...defaultOptions.plugins,
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-gray-900">
          {Math.round(percentage)}%
        </div>
        <div className="text-sm text-gray-600">
          {completed}/{total} goals
        </div>
      </div>
    </div>
  )
} 