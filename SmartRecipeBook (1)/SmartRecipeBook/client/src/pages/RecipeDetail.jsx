import { useRoute, Link } from 'wouter';
import { Clock, Flame, Share2, Printer, Heart, ChevronLeft } from 'lucide-react';
import { MOCK_RECIPES } from '../lib/mockData';
import { useState } from 'react';
import '../styles/recipe-detail.css';

export default function RecipeDetail() {
  const [match, params] = useRoute('/recipe/:id');
  const recipe = MOCK_RECIPES.find(r => r.id === params?.id);
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}>Recipe not found</div>;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Header Image */}
      <div className="recipe-header">
        <div className="hero-bg">
           <img src={recipe.image} alt={recipe.title} />
           <div className="hero-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}></div>
        </div>
        
        <div className="container" style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Link href="/" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)' }}>
            <ChevronLeft size={16} style={{ marginRight: '4px' }} /> Back
          </Link>
        </div>
        
        <div className="container recipe-header-content">
          <span className="badge badge-secondary" style={{ marginBottom: '1rem' }}>{recipe.category}</span>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'white' }}>{recipe.title}</h1>
          
          <div className="recipe-stats">
            <div className="flex items-center gap-2">
              <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                {recipe.authorName.charAt(0)}
              </div>
              <span>By {recipe.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} /> {recipe.prepTime}
            </div>
            <div className="flex items-center gap-2">
              <Flame size={18} color="orange" /> {recipe.calories} kcal
            </div>
            <div className="flex items-center gap-2">
              <span style={{ color: '#fbbf24' }}>★★★★★</span> ({recipe.likes} reviews)
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="recipe-grid">
          
          {/* Left Column: Content */}
          <div className="detail-card">
             <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ margin: 0 }}>Description</h2>
                <div className="flex gap-2">
                  <button className="btn btn-outline btn-sm"><Share2 size={14} /> Share</button>
                  <button className="btn btn-outline btn-sm"><Printer size={14} /> Print</button>
                  <button className="btn btn-outline btn-sm" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>
                    <Heart size={14} fill="currentColor" /> Save
                  </button>
                </div>
             </div>
             
             <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
               {recipe.description}
             </p>

             <div className="tabs">
               <div 
                 className={`tab ${activeTab === 'ingredients' ? 'active' : ''}`}
                 onClick={() => setActiveTab('ingredients')}
               >
                 Ingredients
               </div>
               <div 
                 className={`tab ${activeTab === 'instructions' ? 'active' : ''}`}
                 onClick={() => setActiveTab('instructions')}
               >
                 Instructions
               </div>
             </div>
             
             {activeTab === 'ingredients' && (
               <div style={{ backgroundColor: '#f9fafb', padding: '2rem', borderRadius: 'var(--radius)' }}>
                 <h3 style={{ marginBottom: '1.5rem' }}>What you'll need</h3>
                 <ul>
                   {recipe.ingredients.map((ing, i) => (
                     <li key={i} className="ingredient-item">
                       <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                       <span style={{ fontSize: '1.05rem' }}>{ing}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
             
             {activeTab === 'instructions' && (
               <div>
                  {recipe.steps.map((step, i) => (
                    <div key={i} className="step-item">
                      <div className="step-number">{i + 1}</div>
                      <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#374151', marginTop: '2px' }}>{step}</p>
                    </div>
                  ))}
               </div>
             )}
          </div>

          {/* Right Column: Sidebar */}
          <div className="flex-col gap-4">
            <div className="card" style={{ padding: '1.5rem', backgroundColor: '#fff7ed', borderColor: '#fed7aa', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '1rem', marginBottom: '1rem' }}>Nutrition Facts</h3>
              <div className="flex justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Calories</span>
                 <span style={{ fontWeight: 'bold' }}>{recipe.calories}</span>
              </div>
              <div className="flex justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Protein</span>
                 <span style={{ fontWeight: 'bold' }}>24g</span>
              </div>
              <div className="flex justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Carbs</span>
                 <span style={{ fontWeight: 'bold' }}>45g</span>
              </div>
              <div className="flex justify-between" style={{ padding: '0.5rem 0' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Fat</span>
                 <span style={{ fontWeight: 'bold' }}>12g</span>
              </div>
            </div>

            <div className="card" style={{ padding: '1.5rem', textAlign: 'center', background: '#f0fdf4', borderColor: '#bbf7d0' }}>
              <h3 style={{ fontSize: '1.1rem' }}>AI Chef Tip 🤖</h3>
              <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                "Add a squeeze of lemon at the end to brighten up the flavors of this dish!"
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
