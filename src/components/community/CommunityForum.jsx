import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Reply, 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Crown, 
  Star,
  Plus,
  Lock,
  Zap
} from 'lucide-react'

// Mock data for forum posts
const mockForumPosts = [
  {
    id: 1,
    title: "Tips for meal prep as a busy student?",
    author: "Sarah M.",
    avatar: "SM",
    category: "Meal Prep",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    isPinned: true,
    content: "I'm struggling to find time to meal prep with my busy schedule. Any quick tips?",
    tags: ["student", "meal-prep", "quick"],
    isExpert: false
  },
  {
    id: 2,
    title: "Protein sources for vegetarians - complete guide",
    author: "Dr. Alex Rivera",
    avatar: "AR",
    category: "Nutrition Science",
    replies: 67,
    likes: 142,
    timeAgo: "5 hours ago",
    isPinned: false,
    content: "Let's discuss the best plant-based protein sources and how to combine them effectively...",
    tags: ["vegetarian", "protein", "science"],
    isExpert: true
  },
  {
    id: 3,
    title: "Budget-friendly healthy shopping list",
    author: "Mike Chen",
    avatar: "MC",
    category: "Budget Nutrition",
    replies: 34,
    likes: 89,
    timeAgo: "1 day ago",
    isPinned: false,
    content: "Sharing my weekly shopping list that keeps costs under $50 while eating healthy.",
    tags: ["budget", "shopping", "tips"],
    isExpert: false
  },
  {
    id: 4,
    title: "Mediterranean diet success stories",
    author: "Elena K.",
    avatar: "EK",
    category: "Success Stories",
    replies: 15,
    likes: 56,
    timeAgo: "2 days ago",
    isPinned: false,
    content: "After 6 months on Mediterranean diet, here are my results and lessons learned...",
    tags: ["mediterranean", "success", "lifestyle"],
    isExpert: false
  },
  {
    id: 5,
    title: "Hydration myths vs facts",
    author: "Dr. Lisa Wong",
    avatar: "LW",
    category: "Hydration",
    replies: 41,
    likes: 78,
    timeAgo: "3 days ago",
    isPinned: false,
    content: "Let's debunk some common hydration myths and focus on evidence-based facts.",
    tags: ["hydration", "science", "myths"],
    isExpert: true
  }
]

const forumCategories = [
  { name: "All Topics", count: 234, color: "bg-sage-100 text-sage-700" },
  { name: "Meal Prep", count: 45, color: "bg-blue-100 text-blue-700" },
  { name: "Nutrition Science", count: 32, color: "bg-purple-100 text-purple-700" },
  { name: "Budget Nutrition", count: 28, color: "bg-green-100 text-green-700" },
  { name: "Success Stories", count: 67, color: "bg-coral-100 text-coral-700" },
  { name: "Recipes", count: 89, color: "bg-orange-100 text-orange-700" },
  { name: "Exercise & Nutrition", count: 23, color: "bg-red-100 text-red-700" }
]

const popularTags = [
  "meal-prep", "vegetarian", "budget", "protein", "weight-loss", 
  "muscle-gain", "student", "quick-recipes", "hydration", "supplements"
]

export const CommunityForum = ({ userPlan = 'free' }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Topics')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('recent')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState(mockForumPosts)

  useEffect(() => {
    let filtered = mockForumPosts

    // Filter by category
    if (selectedCategory !== 'All Topics') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Sort posts
    if (sortBy === 'popular') {
      filtered = [...filtered].sort((a, b) => b.likes - a.likes)
    } else if (sortBy === 'replies') {
      filtered = [...filtered].sort((a, b) => b.replies - a.replies)
    } else {
      // Keep original order (recent)
    }

    setFilteredPosts(filtered)
  }, [selectedCategory, searchQuery, sortBy])

  const handlePostClick = () => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
    }
  }

  const handleLike = (postId) => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
    }
  }

  const handleReply = (postId) => {
    if (userPlan === 'free') {
      setShowUpgradeModal(true)
    }
  }

  const UpgradeModal = () => {
    if (!showUpgradeModal) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full">
          <div className="text-center">
            <Crown className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-charcoal mb-2">Join the Conversation!</h3>
            <p className="text-gray-600 mb-6">
              Upgrade to Premium to post, reply, like, and fully participate in our community discussions.
            </p>
            
            <div className="bg-gradient-to-r from-sage-50 to-coral-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-charcoal mb-2">Premium Community Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Post your own discussion topics</li>
                <li>• Reply to any discussion</li>
                <li>• Like and react to posts</li>
                <li>• Direct message other members</li>
                <li>• Access to expert-only discussions</li>
                <li>• Priority support from nutritionists</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1"
              >
                Continue Browsing
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white"
                onClick={() => {
                  setShowUpgradeModal(false)
                  // Handle upgrade logic
                }}
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 to-sage-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-charcoal mb-4">
            Community Forum
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Connect with fellow nutrition enthusiasts, share experiences, and learn from experts in our supportive community.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="p-4">
              <Users className="h-8 w-8 text-sage-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">2,847</div>
              <div className="text-sm text-gray-600">Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <MessageCircle className="h-8 w-8 text-teal-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">1,234</div>
              <div className="text-sm text-gray-600">Discussions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <TrendingUp className="h-8 w-8 text-coral-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">89</div>
              <div className="text-sm text-gray-600">Active Today</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Star className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-charcoal">15</div>
              <div className="text-sm text-gray-600">Expert Contributors</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* New Post Button */}
            <Button 
              onClick={handlePostClick}
              className={`w-full bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white ${
                userPlan === 'free' ? 'opacity-75' : ''
              }`}
            >
              <Plus className="h-4 w-4 mr-2" />
              New Discussion
              {userPlan === 'free' && <Lock className="h-4 w-4 ml-2" />}
            </Button>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {forumCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-sage-100 text-sage-700 font-medium'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline" 
                      className="cursor-pointer hover:bg-sage-100 hover:border-sage-300"
                      onClick={() => setSearchQuery(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search discussions, tags, or keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="popular">Most Popular</option>
                      <option value="replies">Most Replies</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Forum Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold ${
                          post.isExpert ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-sage-500 to-teal-500'
                        }`}>
                          {post.avatar}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold text-charcoal hover:text-sage-600 transition-colors">
                              {post.title}
                              {post.isPinned && (
                                <Badge variant="secondary" className="ml-2 text-xs">
                                  Pinned
                                </Badge>
                              )}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <span className="font-medium">{post.author}</span>
                              {post.isExpert && (
                                <Badge className="bg-amber-100 text-amber-700 text-xs">
                                  <Crown className="h-3 w-3 mr-1" />
                                  Expert
                                </Badge>
                              )}
                              <span>•</span>
                              <Clock className="h-3 w-3" />
                              <span>{post.timeAgo}</span>
                              <span>•</span>
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleLike(post.id)
                              }}
                              className={`flex items-center gap-1 text-sm hover:text-coral-500 transition-colors ${
                                userPlan === 'free' ? 'opacity-60' : ''
                              }`}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                              {userPlan === 'free' && <Lock className="h-3 w-3 ml-1" />}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleReply(post.id)
                              }}
                              className={`flex items-center gap-1 text-sm hover:text-teal-500 transition-colors ${
                                userPlan === 'free' ? 'opacity-60' : ''
                              }`}
                            >
                              <Reply className="h-4 w-4" />
                              <span>{post.replies} replies</span>
                              {userPlan === 'free' && <Lock className="h-3 w-3 ml-1" />}
                            </button>
                          </div>

                          {userPlan === 'free' && (
                            <Badge 
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowUpgradeModal(true)
                              }}
                              className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 cursor-pointer hover:from-amber-200 hover:to-orange-200"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Upgrade to interact
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline" className="px-8">
                Load More Discussions
              </Button>
            </div>
          </div>
        </div>

        {/* Free Plan Notice */}
        {userPlan === 'free' && (
          <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6 text-center">
              <Crown className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-charcoal mb-2">
                Viewing in Free Mode
              </h3>
              <p className="text-gray-600 mb-4">
                You can browse discussions and learn from the community. Upgrade to Premium to actively participate!
              </p>
              <Button 
                onClick={() => setShowUpgradeModal(true)}
                className="bg-gradient-to-r from-sage-500 to-teal-500 hover:from-sage-600 hover:to-teal-600 text-white"
              >
                <Crown className="h-4 w-4 mr-2" />
                Unlock Full Community Access
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <UpgradeModal />
    </div>
  )
} 