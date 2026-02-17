import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ChatBubble from './ChatBubble'
import NuriAvatar from './NuriAvatar'
import GlassCard from './GlassCard'

/**
 * ChatInterface Component - Interactive Chat Demo
 * 
 * Features:
 * - Demonstrates ChatBubble functionality
 * - Shows incoming and outgoing messages
 * - Includes NuriAvatar with listening states
 * - Simple conversation flow
 */
export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, from: 'nuri', text: 'Hey there! I\'m Nuri, your AI wellness assistant. How can I help you today?', timestamp: '2:30 PM' },
    { id: 2, from: 'user', text: 'I want to track my macros today', timestamp: '2:31 PM' },
    { id: 3, from: 'nuri', text: 'Great! Let\'s set up your macro tracking. What are your goals?', timestamp: '2:31 PM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      from: 'user',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, userMessage])
    setNewMessage('')
    setIsTyping(true)

    // Simulate Nuri's response
    setTimeout(() => {
      const nuriResponse = {
        id: messages.length + 2,
        from: 'nuri',
        text: 'Thanks for sharing! I\'ll help you track that. What else would you like to know?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, nuriResponse])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <GlassCard className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <NuriAvatar size="sm" isListening={isTyping} />
        <div>
          <h3 className="font-semibold text-gray-800 font-nunito">Nuri Assistant</h3>
          <p className="text-sm text-gray-600 font-nunito">
            {isTyping ? 'Typing...' : 'Online'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <ChatBubble from={message.from} timestamp={message.timestamp}>
              {message.text}
            </ChatBubble>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/60 backdrop-blur-xs border border-white/40 rounded-2xl p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-sage rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-white/60 backdrop-blur-xs border border-white/40 rounded-xl px-4 py-2 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sage/50"
        />
        <motion.button
          onClick={handleSendMessage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sage/70 text-white px-4 py-2 rounded-xl hover:bg-sage/80 transition-colors"
        >
          Send
        </motion.button>
      </div>
    </GlassCard>
  )
} 