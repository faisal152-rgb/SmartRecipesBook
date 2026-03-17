import { useState } from 'react';
import { Link } from 'wouter';
import { Clock, Flame, Heart, ChevronRight, Star, ChefHat } from 'lucide-react';
import { MOCK_RECIPES, MOCK_CATEGORIES } from '../lib/mockData';
import heroImage from '@assets/generated_images/a_beautiful,_modern_kitchen_counter_with_fresh_ingredients_and_a_recipe_book..png';
import '../styles/home.css';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes = selectedCategory === 'All' 
    ? MOCK_RECIPES 
    : MOCK_RECIPES.filter(r => r.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img src={heroImage} alt="Kitchen" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <span className="badge badge-secondary" style={{ marginBottom: '1rem', fontSize: '1rem', padding: '0.5rem 1.5rem' }}>
            Welcome to the Kitchen
          </span>
          <h1 className="hero-title">
            Discover & Share <br/>
            <span style={{ color: 'var(--secondary)' }}>Culinary Masterpieces</span>
          </h1>
          <p className="hero-subtitle">
            Your personal recipe library. Organize favorites, create collections, and share your journey.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/auth" className="btn btn-primary btn-lg" style={{ borderRadius: '99px' }}>
              Join the Community
            </Link>
            <button className="btn btn-outline btn-lg" style={{ color: 'white', borderColor: 'white', borderRadius: '99px' }}>
              View Collections
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container" style={{ marginBottom: '2rem' }}>
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2>Explore Categories</h2>
          <a href="#" style={{ color: 'var(--primary)', fontWeight: 500 }}>View All</a>
        </div>
        
        <div className="flex gap-2" style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          {MOCK_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '99px', whiteSpace: 'nowrap' }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="container" style={{ marginBottom: '4rem' }}>
        <div className="grid grid-4">
          {filteredRecipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipe/${recipe.id}`}>
              <div className="card" style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative' }}>
                  <img src={recipe.image} alt={recipe.title} className="recipe-img" />
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'white', padding: '6px', borderRadius: '50%', display: 'flex' }}>
                    <Heart size={16} color={recipe.isFavorite ? 'red' : 'gray'} fill={recipe.isFavorite ? 'red' : 'none'} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '10px', left: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={12} fill="yellow" color="yellow" /> {recipe.likes}
                  </div>
                </div>
                
                <div className="recipe-content">
                  <span className="badge badge-secondary" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
                    {recipe.category}
                  </span>
                  <h3 className="recipe-title">{recipe.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', flex: 1 }}>
                    {recipe.description.substring(0, 60)}...
                  </p>
                  
                  <div className="recipe-meta">
                    <div className="flex items-center gap-1">
                      <Clock size={14} /> {recipe.prepTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={14} color="orange" /> {recipe.calories} kcal
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Feature */}
      <section style={{ backgroundColor: '#ecfdf5', padding: '4rem 0' }}>
        <div className="container">
          <div className="flex items-center gap-8 flex-col lg:flex-row" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <span className="badge badge-secondary" style={{ marginBottom: '1rem' }}>New AI Feature</span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Smart Ingredient Matching</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Don't know what to cook? Tell our AI what ingredients you have in your fridge, and we'll suggest the perfect recipe for you.
              </p>
              <button className="btn btn-primary btn-lg" style={{ borderRadius: '99px' }}>
                Try AI Chef <ChevronRight size={20} style={{ marginLeft: '0.5rem' }} />
              </button>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div className="card" style={{ padding: '2rem', maxWidth: '400px', width: '100%', position: 'relative' }}>
                 <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'var(--secondary)', color: 'white', padding: '1rem', borderRadius: '50%', boxShadow: 'var(--shadow)' }}>
                   <ChefHat size={32} />
                 </div>
                 <div className="flex gap-2" style={{ flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                   {['Tomatoes', 'Eggs', 'Cheese', 'Basil'].map(i => (
                     <span key={i} style={{ border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem' }}>{i}</span>
                   ))}
                 </div>
                 <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                   <div style={{ background: '#f9fafb', padding: '1rem', borderRadius: '8px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                     <div style={{ background: '#d1fae5', padding: '0.5rem', borderRadius: '8px' }}>
                       <Star size={24} color="var(--primary)" />
                     </div>
                     <div>
                       <div style={{ fontWeight: 'bold' }}>Suggested: Caprese Omelette</div>
                       <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Match: 98%</div>
                     </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
