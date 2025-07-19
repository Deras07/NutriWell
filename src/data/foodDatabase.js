// Mock food database for nutrition tracking
export const foodDatabase = [
  // Fruits
  { id: 1, name: 'Apple', category: 'fruits', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, fiber: 2.4, sugar: 10.4, serving: '1 medium (182g)' },
  { id: 2, name: 'Banana', category: 'fruits', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, fiber: 2.6, sugar: 12.2, serving: '1 medium (118g)' },
  { id: 3, name: 'Orange', category: 'fruits', calories: 47, protein: 0.9, carbs: 12, fat: 0.1, fiber: 2.4, sugar: 9.4, serving: '1 medium (154g)' },
  { id: 4, name: 'Strawberries', category: 'fruits', calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2, sugar: 4.9, serving: '1 cup (152g)' },
  { id: 5, name: 'Blueberries', category: 'fruits', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, fiber: 3.6, sugar: 15, serving: '1 cup (148g)' },
  
  // Vegetables
  { id: 6, name: 'Broccoli', category: 'vegetables', calories: 25, protein: 3, carbs: 5, fat: 0.3, fiber: 2.6, sugar: 1.5, serving: '1 cup chopped (91g)' },
  { id: 7, name: 'Spinach', category: 'vegetables', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, fiber: 0.7, sugar: 0.1, serving: '1 cup (30g)' },
  { id: 8, name: 'Carrots', category: 'vegetables', calories: 25, protein: 0.5, carbs: 6, fat: 0.1, fiber: 1.7, sugar: 2.9, serving: '1 medium (61g)' },
  { id: 9, name: 'Bell Pepper', category: 'vegetables', calories: 20, protein: 1, carbs: 5, fat: 0.2, fiber: 1.7, sugar: 2.5, serving: '1 medium (119g)' },
  { id: 10, name: 'Tomato', category: 'vegetables', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, serving: '1 medium (123g)' },
  
  // Proteins
  { id: 11, name: 'Chicken Breast', category: 'proteins', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 12, name: 'Salmon', category: 'proteins', calories: 208, protein: 22, carbs: 0, fat: 12, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 13, name: 'Eggs', category: 'proteins', calories: 155, protein: 13, carbs: 1.1, fat: 11, fiber: 0, sugar: 1.1, serving: '2 large eggs' },
  { id: 14, name: 'Greek Yogurt', category: 'proteins', calories: 100, protein: 17, carbs: 6, fat: 0.4, fiber: 0, sugar: 6, serving: '170g container' },
  { id: 15, name: 'Tofu', category: 'proteins', calories: 94, protein: 10, carbs: 2.3, fat: 6, fiber: 2, sugar: 0.6, serving: '100g' },
  
  // Grains
  { id: 16, name: 'Brown Rice', category: 'grains', calories: 112, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, serving: '100g cooked' },
  { id: 17, name: 'Quinoa', category: 'grains', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, sugar: 0.9, serving: '100g cooked' },
  { id: 18, name: 'Oats', category: 'grains', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, fiber: 1.7, sugar: 0.3, serving: '40g dry' },
  { id: 19, name: 'Whole Wheat Bread', category: 'grains', calories: 82, protein: 4, carbs: 14, fat: 1.9, fiber: 2.4, sugar: 1.4, serving: '1 slice (28g)' },
  { id: 20, name: 'Pasta', category: 'grains', calories: 131, protein: 5, carbs: 25, fat: 1.1, fiber: 1.8, sugar: 0.8, serving: '100g cooked' },
  
  // Dairy
  { id: 21, name: 'Milk', category: 'dairy', calories: 42, protein: 3.4, carbs: 5, fat: 1, fiber: 0, sugar: 5, serving: '100ml' },
  { id: 22, name: 'Cheddar Cheese', category: 'dairy', calories: 113, protein: 7, carbs: 1, fat: 9, fiber: 0, sugar: 0.5, serving: '28g' },
  { id: 23, name: 'Cottage Cheese', category: 'dairy', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, fiber: 0, sugar: 2.7, serving: '100g' },
  
  // Nuts & Seeds
  { id: 24, name: 'Almonds', category: 'nuts', calories: 164, protein: 6, carbs: 6, fat: 14, fiber: 3.5, sugar: 1.2, serving: '28g (23 nuts)' },
  { id: 25, name: 'Walnuts', category: 'nuts', calories: 185, protein: 4.3, carbs: 3.9, fat: 18, fiber: 1.9, sugar: 0.7, serving: '28g (14 halves)' },
  { id: 26, name: 'Chia Seeds', category: 'nuts', calories: 138, protein: 4.7, carbs: 12, fat: 8.7, fiber: 9.8, sugar: 0, serving: '28g (2 tbsp)' },
  { id: 27, name: 'Peanut Butter', category: 'nuts', calories: 188, protein: 8, carbs: 8, fat: 16, fiber: 2.6, sugar: 3.4, serving: '32g (2 tbsp)' },
  
  // Legumes
  { id: 28, name: 'Black Beans', category: 'legumes', calories: 132, protein: 8.9, carbs: 24, fat: 0.5, fiber: 8.7, sugar: 0.3, serving: '100g cooked' },
  { id: 29, name: 'Chickpeas', category: 'legumes', calories: 164, protein: 8.9, carbs: 27, fat: 2.6, fiber: 7.6, sugar: 4.8, serving: '100g cooked' },
  { id: 30, name: 'Lentils', category: 'legumes', calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 7.9, sugar: 1.8, serving: '100g cooked' },
  
  // Beverages
  { id: 31, name: 'Green Tea', category: 'beverages', calories: 2, protein: 0.5, carbs: 0, fat: 0, fiber: 0, sugar: 0, serving: '1 cup (240ml)' },
  { id: 32, name: 'Coffee', category: 'beverages', calories: 2, protein: 0.3, carbs: 0, fat: 0, fiber: 0, sugar: 0, serving: '1 cup (240ml)' },
  { id: 33, name: 'Orange Juice', category: 'beverages', calories: 112, protein: 1.7, carbs: 26, fat: 0.5, fiber: 0.5, sugar: 21, serving: '1 cup (248ml)' },
  
  // Snacks
  { id: 34, name: 'Dark Chocolate', category: 'snacks', calories: 155, protein: 2, carbs: 13, fat: 12, fiber: 3.1, sugar: 7, serving: '28g (1 oz)' },
  { id: 35, name: 'Popcorn', category: 'snacks', calories: 31, protein: 1, carbs: 6, fat: 0.4, fiber: 1.2, sugar: 0.1, serving: '8g air-popped' },
  
  // Oils & Fats
  { id: 36, name: 'Olive Oil', category: 'fats', calories: 119, protein: 0, carbs: 0, fat: 13.5, fiber: 0, sugar: 0, serving: '1 tbsp (13.5g)' },
  { id: 37, name: 'Avocado', category: 'fats', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, serving: '100g' },
  { id: 38, name: 'Coconut Oil', category: 'fats', calories: 121, protein: 0, carbs: 0, fat: 13.5, fiber: 0, sugar: 0, serving: '1 tbsp (13.5g)' },
  
  // Additional Common Foods
  { id: 39, name: 'Sweet Potato', category: 'vegetables', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, sugar: 4.2, serving: '100g baked' },
  { id: 40, name: 'Cucumber', category: 'vegetables', calories: 16, protein: 0.7, carbs: 4, fat: 0.1, fiber: 0.5, sugar: 1.7, serving: '100g' },
  { id: 41, name: 'Kale', category: 'vegetables', calories: 35, protein: 2.9, carbs: 7, fat: 0.4, fiber: 1.3, sugar: 0.8, serving: '100g' },
  { id: 42, name: 'Turkey Breast', category: 'proteins', calories: 135, protein: 30, carbs: 0, fat: 1, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 43, name: 'Tuna', category: 'proteins', calories: 132, protein: 28, carbs: 0, fat: 1.3, fiber: 0, sugar: 0, serving: '100g canned in water' },
  { id: 44, name: 'Shrimp', category: 'proteins', calories: 99, protein: 18, carbs: 0.2, fat: 1.4, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 45, name: 'Lean Beef', category: 'proteins', calories: 250, protein: 26, carbs: 0, fat: 15, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 46, name: 'Pork Tenderloin', category: 'proteins', calories: 143, protein: 26, carbs: 0, fat: 3.5, fiber: 0, sugar: 0, serving: '100g cooked' },
  { id: 47, name: 'White Rice', category: 'grains', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, sugar: 0.1, serving: '100g cooked' },
  { id: 48, name: 'Bagel', category: 'grains', calories: 245, protein: 10, carbs: 48, fat: 1.5, fiber: 2, sugar: 5, serving: '1 medium (89g)' },
  { id: 49, name: 'Cereal', category: 'grains', calories: 110, protein: 3, carbs: 22, fat: 2, fiber: 3, sugar: 6, serving: '30g with milk' },
  { id: 50, name: 'Honey', category: 'snacks', calories: 64, protein: 0.1, carbs: 17, fat: 0, fiber: 0, sugar: 16, serving: '1 tbsp (21g)' }
];

// Common foods for quick-add buttons
export const commonFoods = [
  { id: 1, name: 'Apple', calories: 52 },
  { id: 2, name: 'Banana', calories: 89 },
  { id: 11, name: 'Chicken Breast', calories: 165 },
  { id: 16, name: 'Brown Rice', calories: 112 },
  { id: 21, name: 'Milk', calories: 42 },
  { id: 24, name: 'Almonds', calories: 164 },
  { id: 14, name: 'Greek Yogurt', calories: 100 },
  { id: 18, name: 'Oats', calories: 68 }
];

// Meal categories
export const mealCategories = [
  { id: 'breakfast', name: 'Breakfast', icon: '🌅' },
  { id: 'lunch', name: 'Lunch', icon: '☀️' },
  { id: 'dinner', name: 'Dinner', icon: '🌙' },
  { id: 'snacks', name: 'Snacks', icon: '🍎' }
];

// Search function for food database
export const searchFoods = (query, limit = 10) => {
  if (!query) return [];
  
  const searchTerm = query.toLowerCase();
  return foodDatabase
    .filter(food => 
      food.name.toLowerCase().includes(searchTerm) ||
      food.category.toLowerCase().includes(searchTerm)
    )
    .slice(0, limit);
};

// Get food by ID
export const getFoodById = (id) => {
  return foodDatabase.find(food => food.id === id);
};

// Get foods by category
export const getFoodsByCategory = (category) => {
  return foodDatabase.filter(food => food.category === category);
};
