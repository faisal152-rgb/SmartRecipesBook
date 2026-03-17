import pastaImg from '@assets/stock_images/delicious_pasta_dish_e41d936c.jpg';
import avocadoImg from '@assets/stock_images/healthy_avocado_toas_8a6d8911.jpg';
import cakeImg from '@assets/stock_images/chocolate_lava_cake__38b89144.jpg';
import biryaniImg from '@assets/stock_images/traditional_pakistan_59cd8b18.jpg';

export const MOCK_USERS = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  }
];

export const MOCK_CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Healthy',
  'Pakistani',
  'Italian',
  'Fast Food'
];

export const MOCK_RECIPES = [
  {
    id: '1',
    title: 'Classic Tomato Basil Pasta',
    description: 'A simple yet delicious Italian classic made with fresh tomatoes and basil.',
    image: pastaImg,
    category: 'Italian',
    calories: 450,
    prepTime: '25 mins',
    ingredients: [
      '400g Spaghetti',
      '4 large ripe tomatoes',
      'Fresh basil leaves',
      '2 cloves garlic',
      'Olive oil',
      'Parmesan cheese'
    ],
    steps: [
      'Boil the pasta in salted water until al dente.',
      'Sauté minced garlic in olive oil until fragrant.',
      'Add chopped tomatoes and cook until soft.',
      'Toss pasta with the sauce and fresh basil.',
      'Serve with grated Parmesan.'
    ],
    authorId: '1',
    authorName: 'John Doe',
    likes: 124,
    createdAt: '2024-03-15'
  },
  {
    id: '2',
    title: 'Avocado & Egg Toast',
    description: 'The perfect healthy breakfast to start your day with energy.',
    image: avocadoImg,
    category: 'Breakfast',
    calories: 320,
    prepTime: '10 mins',
    ingredients: [
      '2 slices sourdough bread',
      '1 ripe avocado',
      '2 eggs',
      'Red chili flakes',
      'Salt and pepper',
      'Lemon juice'
    ],
    steps: [
      'Toast the sourdough bread slices.',
      'Mash the avocado with lemon juice, salt, and pepper.',
      'Fry or poach the eggs to your liking.',
      'Spread avocado on toast and top with eggs.',
      'Sprinkle with chili flakes.'
    ],
    authorId: '2',
    authorName: 'Admin User',
    likes: 89,
    isFavorite: true,
    createdAt: '2024-03-14'
  },
  {
    id: '3',
    title: 'Molten Chocolate Lava Cake',
    description: 'Decadent chocolate dessert with a gooey center.',
    image: cakeImg,
    category: 'Dessert',
    calories: 550,
    prepTime: '30 mins',
    ingredients: [
      '100g Dark chocolate',
      '100g Butter',
      '2 Eggs',
      '2 Egg yolks',
      '100g Sugar',
      '30g Flour'
    ],
    steps: [
      'Melt chocolate and butter together.',
      'Whisk eggs, yolks, and sugar until pale.',
      'Fold in chocolate mixture and flour.',
      'Pour into greased ramekins.',
      'Bake at 200°C for 10-12 minutes.'
    ],
    authorId: '1',
    authorName: 'John Doe',
    likes: 256,
    createdAt: '2024-03-10'
  },
  {
    id: '4',
    title: 'Traditional Chicken Biryani',
    description: 'Aromatic basmati rice cooked with spices and tender chicken.',
    image: biryaniImg,
    category: 'Pakistani',
    calories: 650,
    prepTime: '1 hr 15 mins',
    ingredients: [
      '500g Basmati rice',
      '500g Chicken',
      'Biryani masala',
      'Yogurt',
      'Onions',
      'Saffron milk'
    ],
    steps: [
      'Marinate chicken in yogurt and spices.',
      'Fry onions until golden brown.',
      'Cook chicken until tender.',
      'Parboil rice with whole spices.',
      'Layer chicken and rice, top with saffron milk.',
      'Steam (dum) for 20 minutes.'
    ],
    authorId: '2',
    authorName: 'Admin User',
    likes: 432,
    isFavorite: true,
    createdAt: '2024-03-08'
  }
];
