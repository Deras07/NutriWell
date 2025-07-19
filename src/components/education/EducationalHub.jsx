import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

// Mock educational content database
const EDUCATIONAL_CONTENT = {
  // Free articles (5 featured)
  freeArticles: [
    {
      id: 1,
      title: "Understanding Macronutrients: The Building Blocks of Nutrition",
      excerpt: "Learn the essential roles of carbohydrates, proteins, and fats in your diet and how to balance them for optimal health.",
      readTime: "8 min read",
      category: "Basics",
      source: "Health Canada",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=250&fit=crop",
      featured: true,
      content: `
        <h2>What Are Macronutrients?</h2>
        <p>Macronutrients are the three main types of nutrients that provide energy (calories) to our bodies: carbohydrates, proteins, and fats. Understanding these nutrients is fundamental to making informed dietary choices.</p>
        
        <h3>Carbohydrates: Your Body's Primary Energy Source</h3>
        <p>Carbohydrates should make up 45-65% of your total daily calories. They're found in foods like fruits, vegetables, grains, and legumes. Choose complex carbohydrates like whole grains for sustained energy.</p>
        
        <h3>Proteins: Building and Repairing Tissues</h3>
        <p>Protein should comprise 10-35% of your daily calories. Essential for muscle growth, immune function, and hormone production. Sources include lean meats, fish, eggs, dairy, beans, and nuts.</p>
        
        <h3>Fats: Essential for Health</h3>
        <p>Healthy fats should make up 20-35% of your calories. Focus on unsaturated fats from sources like olive oil, avocados, nuts, and fatty fish while limiting saturated and trans fats.</p>
        
        <h3>Balancing Your Macros</h3>
        <p>The key is finding the right balance for your individual needs, activity level, and health goals. Consider working with a registered dietitian for personalized recommendations.</p>
      `
    },
    {
      id: 2,
      title: "How to Read Nutrition Labels Like a Pro",
      excerpt: "Master the art of decoding food labels to make healthier choices at the grocery store. Learn what to look for and what to avoid.",
      readTime: "6 min read",
      category: "Shopping",
      source: "FDA",
      image: "https://images.unsplash.com/photo-1556909114-b05f7b4c0b31?w=400&h=250&fit=crop",
      featured: true,
      content: `
        <h2>Nutrition Label Basics</h2>
        <p>Learning to read nutrition labels is one of the most powerful tools for making healthy food choices. Here's what you need to know.</p>
        
        <h3>Start with Serving Size</h3>
        <p>Always check the serving size first - all nutritional information is based on this amount. Many packages contain multiple servings.</p>
        
        <h3>Check Total Calories</h3>
        <p>Consider how many calories you're consuming per serving and how it fits into your daily caloric needs.</p>
        
        <h3>Limit These Nutrients</h3>
        <ul>
          <li>Saturated fat: Limit to less than 10% of daily calories</li>
          <li>Trans fat: Avoid completely when possible</li>
          <li>Cholesterol: Limit to less than 300mg per day</li>
          <li>Sodium: Limit to less than 2,300mg per day</li>
          <li>Added sugars: Limit to less than 10% of daily calories</li>
        </ul>
        
        <h3>Get Enough of These</h3>
        <ul>
          <li>Dietary fiber: Aim for 25-35g per day</li>
          <li>Vitamin D, calcium, iron, potassium</li>
        </ul>
        
        <h3>The Ingredient List</h3>
        <p>Ingredients are listed in order of weight. Choose foods with whole, recognizable ingredients near the top of the list.</p>
      `
    },
    {
      id: 3,
      title: "Healthy Cooking Methods That Preserve Nutrients",
      excerpt: "Discover cooking techniques that maximize the nutritional value of your food while enhancing flavor and texture.",
      readTime: "7 min read",
      category: "Cooking",
      source: "Mayo Clinic",
      image: "https://images.unsplash.com/photo-1556909909-f3e8490fa67a?w=400&h=250&fit=crop",
      featured: true,
      content: `
        <h2>Cooking for Maximum Nutrition</h2>
        <p>The way you prepare food can significantly impact its nutritional value. Here are the best methods to preserve nutrients while creating delicious meals.</p>
        
        <h3>Steaming: Gentle and Nutritious</h3>
        <p>Steaming vegetables preserves water-soluble vitamins like vitamin C and B vitamins. It also maintains the vegetable's natural color, texture, and flavor.</p>
        
        <h3>Sautéing: Quick and Flavorful</h3>
        <p>Use minimal oil and cook quickly over medium-high heat. This method works well for vegetables and lean proteins while preserving nutrients.</p>
        
        <h3>Roasting: Concentrates Flavors</h3>
        <p>Roasting vegetables caramelizes their natural sugars, creating rich flavors. Use a light coating of olive oil and avoid overcooking.</p>
        
        <h3>Grilling: Healthy and Delicious</h3>
        <p>Grilling allows fat to drip away from food and adds smoky flavor without extra calories. Great for lean proteins and vegetables.</p>
        
        <h3>Avoid These Methods</h3>
        <ul>
          <li>Deep frying: Adds unnecessary calories and unhealthy fats</li>
          <li>Overcooking: Destroys heat-sensitive vitamins</li>
          <li>Boiling vegetables: Leaches water-soluble vitamins into cooking water</li>
        </ul>
      `
    },
    {
      id: 4,
      title: "Portion Control: A Visual Guide to Healthy Serving Sizes",
      excerpt: "Learn to estimate proper portion sizes using everyday objects and your hands as measuring tools.",
      readTime: "5 min read",
      category: "Portions",
      source: "Health Canada",
      image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=250&fit=crop",
      featured: true,
      content: `
        <h2>Mastering Portion Control</h2>
        <p>Portion control is crucial for maintaining a healthy weight and getting proper nutrition. Here's how to estimate serving sizes without measuring tools.</p>
        
        <h3>Using Your Hands as Guides</h3>
        <ul>
          <li><strong>Protein:</strong> Palm-sized portion (3-4 oz)</li>
          <li><strong>Carbohydrates:</strong> Cupped hand (1/2 to 1 cup)</li>
          <li><strong>Vegetables:</strong> Fist-sized portion (1 cup)</li>
          <li><strong>Fats:</strong> Thumb-sized portion (1 tablespoon)</li>
        </ul>
        
        <h3>Everyday Object Comparisons</h3>
        <ul>
          <li><strong>3 oz meat:</strong> Deck of cards</li>
          <li><strong>1 cup pasta:</strong> Tennis ball</li>
          <li><strong>1 oz cheese:</strong> Four dice</li>
          <li><strong>1 tsp oil:</strong> One poker chip</li>
          <li><strong>1 medium fruit:</strong> Baseball</li>
        </ul>
        
        <h3>Plate Method</h3>
        <p>Fill half your plate with vegetables, one quarter with lean protein, and one quarter with whole grains or starchy vegetables.</p>
        
        <h3>Tips for Success</h3>
        <ul>
          <li>Use smaller plates to make portions look larger</li>
          <li>Eat slowly and mindfully</li>
          <li>Stop eating when you feel satisfied, not full</li>
          <li>Pre-portion snacks to avoid overeating</li>
        </ul>
      `
    },
    {
      id: 5,
      title: "Building a Balanced Plate: Canada's Food Guide Simplified",
      excerpt: "Follow Canada's updated food guide recommendations to create nutritious, balanced meals every day.",
      readTime: "6 min read",
      category: "Guidelines",
      source: "Health Canada",
      image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop",
      featured: true,
      content: `
        <h2>Canada's Food Guide: Your Path to Healthy Eating</h2>
        <p>Canada's Food Guide provides evidence-based recommendations for healthy eating. Here's how to apply these guidelines to your daily meals.</p>
        
        <h3>Fill Half Your Plate with Vegetables and Fruits</h3>
        <p>Choose a variety of colorful vegetables and fruits. Fresh, frozen, canned, and dried options all count. Aim for different colors to get a range of nutrients.</p>
        
        <h3>Make One Quarter Whole Grains</h3>
        <p>Choose whole grain foods like brown rice, quinoa, oats, and whole wheat bread. These provide more fiber and nutrients than refined grains.</p>
        
        <h3>Include Protein Foods in One Quarter</h3>
        <p>Include a variety of protein foods such as legumes, nuts, seeds, tofu, fish, seafood, eggs, poultry, and lean red meat.</p>
        
        <h3>Choose Water as Your Drink of Choice</h3>
        <p>Water supports health and promotes hydration without adding calories to your diet.</p>
        
        <h3>Additional Recommendations</h3>
        <ul>
          <li>Limit foods high in sodium, sugars, or saturated fat</li>
          <li>Be mindful of your eating habits</li>
          <li>Cook more often</li>
          <li>Enjoy your food</li>
          <li>Eat meals with others</li>
        </ul>
      `
    }
  ],

  // Premium articles preview (non-functional)
  premiumArticles: [
    {
      id: 6,
      title: "Advanced Meal Prep Strategies for Busy Professionals",
      excerpt: "Master time-saving techniques for preparing a week's worth of healthy meals in just 2 hours.",
      readTime: "12 min read",
      category: "Meal Prep",
      premium: true
    },
    {
      id: 7,
      title: "Sports Nutrition: Fueling Your Workouts for Maximum Performance",
      excerpt: "Learn what, when, and how much to eat before, during, and after exercise for optimal results.",
      readTime: "15 min read",
      category: "Sports",
      premium: true
    },
    {
      id: 8,
      title: "Managing Diabetes Through Nutrition: A Comprehensive Guide",
      excerpt: "Evidence-based strategies for blood sugar management through proper food choices and timing.",
      readTime: "18 min read",
      category: "Health Conditions",
      premium: true
    }
  ],

  // Infographics
  infographics: [
    {
      id: 1,
      title: "Vitamin D Sources and Benefits",
      description: "Essential information about vitamin D, its sources, and health benefits.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=600&fit=crop",
      downloadUrl: "#",
      premium: false
    },
    {
      id: 2,
      title: "Hydration Guidelines for Active Adults",
      description: "How much water you need based on activity level and environmental factors.",
      image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=600&fit=crop",
      downloadUrl: "#",
      premium: false
    }
  ]
}

export const EducationalHub = ({ userPlan = 'free', className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedInfographic, setSelectedInfographic] = useState(null)

  const categories = ['all', 'basics', 'shopping', 'cooking', 'portions', 'guidelines']

  const filteredArticles = EDUCATIONAL_CONTENT.freeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           article.category.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className={`max-w-6xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Educational Content Hub
        </h1>
        <p className="text-xl text-gray-600">
          Expert-backed nutrition knowledge to support your health journey
        </p>
        {userPlan === 'free' && (
          <div className="mt-4">
            <Badge variant="warning" size="large">
              Free Plan: 5 featured articles + 2 infographics
            </Badge>
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              label="Search articles"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for nutrition topics..."
            />
          </div>
          <div className="sm:w-48">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Articles */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
          <Badge variant="success" size="small">Free Access</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => setSelectedArticle(article)}
            />
          ))}
        </div>
      </section>

      {/* Premium Articles Preview */}
      {userPlan === 'free' && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Premium Content</h2>
            <Badge variant="primary" size="small">Premium Only</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EDUCATIONAL_CONTENT.premiumArticles.map((article) => (
              <PremiumArticleCard
                key={article.id}
                article={article}
              />
            ))}
          </div>
          
          <div className="text-center mt-8 p-6 bg-accent-coral/5 rounded-lg border border-accent-coral/20">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Unlock 30+ Premium Articles
            </h3>
            <p className="text-gray-600 mb-4">
              Get access to in-depth guides, meal prep strategies, and specialized nutrition content
            </p>
            <Button variant="primary" className="bg-accent-coral hover:bg-accent-coral/90">
              Upgrade to Premium - $29/month
            </Button>
          </div>
        </section>
      )}

      {/* Infographics */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Nutrition Infographics</h2>
          <Badge variant="success" size="small">Free Downloads</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATIONAL_CONTENT.infographics.map((infographic) => (
            <InfographicCard
              key={infographic.id}
              infographic={infographic}
              onClick={() => setSelectedInfographic(infographic)}
            />
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}

      {/* Infographic Modal */}
      {selectedInfographic && (
        <InfographicModal
          infographic={selectedInfographic}
          onClose={() => setSelectedInfographic(null)}
        />
      )}
    </div>
  )
}

const ArticleCard = ({ article, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="primary" size="small">
            {article.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" size="small" className="bg-white/90 text-gray-700">
            {article.readTime}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6" onClick={onClick}>
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {article.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-500">{article.source}</span>
          </div>
          <Button variant="tertiary" size="small">
            Read Article →
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const PremiumArticleCard = ({ article }) => {
  return (
    <Card className="opacity-60 border-primary-teal/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-teal/10 to-transparent pointer-events-none" />
      <div className="absolute top-4 right-4 z-10">
        <Badge variant="primary" size="small">Premium</Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm">
            {article.excerpt}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="small">
              {article.category}
            </Badge>
            <span className="text-xs text-gray-500">{article.readTime}</span>
          </div>
          <Button variant="tertiary" size="small" disabled>
            🔒 Premium
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

const InfographicCard = ({ infographic, onClick }) => {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <img 
          src={infographic.image} 
          alt={infographic.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white font-semibold mb-1">{infographic.title}</h3>
          <p className="text-white/90 text-sm">{infographic.description}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <Button 
          variant="primary" 
          size="small" 
          className="w-full"
          onClick={onClick}
        >
          View & Download
        </Button>
      </CardContent>
    </Card>
  )
}

const ArticleModal = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Badge variant="primary" size="small">
                {article.category}
              </Badge>
              <Badge variant="secondary" size="small">
                {article.readTime}
              </Badge>
            </div>
            <Button variant="secondary" size="small" onClick={onClose}>
              ✕
            </Button>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{article.title}</h1>
          <p className="text-gray-600">{article.excerpt}</p>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto prose prose-gray max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm text-gray-600">Source: {article.source}</span>
            </div>
            <Button variant="primary" onClick={onClose}>
              Close Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const InfographicModal = ({ infographic, onClose }) => {
  const handleDownload = () => {
    // In a real app, this would trigger a download
    alert('Download started! (This is a demo)')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900">{infographic.title}</h1>
            <Button variant="secondary" size="small" onClick={onClose}>
              ✕
            </Button>
          </div>
          <p className="text-gray-600">{infographic.description}</p>
        </div>

        <div className="p-6">
          <img 
            src={infographic.image} 
            alt={infographic.title}
            className="w-full h-auto rounded-lg"
          />
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Close
            </Button>
            <Button variant="primary" onClick={handleDownload} className="flex-1">
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
