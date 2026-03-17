import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, ChefHat, User, LogOut, Heart, PlusCircle, ShieldCheck } from 'lucide-react';
import { MOCK_USERS } from '../lib/mockData';
import '../styles/layout.css';

export default function Layout({ children }) {
  const [location, setLocation] = useLocation();
  const [user, setUser] = useState(MOCK_USERS[0]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setLocation('/auth');
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="container flex items-center justify-between" style={{ width: '100%' }}>
          {/* Logo */}
          <Link href="/" className="logo">
            <div className="logo-icon">
              <ChefHat size={24} />
            </div>
            <span>Smart<span style={{ color: 'var(--primary)' }}>Recipe</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden-mobile flex gap-8 items-center">
            <Link href="/" className={`nav-link ${location === '/' ? 'active' : ''}`}>
              Explore
            </Link>
            <Link href="/collections" className={`nav-link ${location === '/collections' ? 'active' : ''}`}>
              Collections
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden-mobile" style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search recipes..." 
                className="input" 
                style={{ paddingLeft: '35px', marginBottom: 0, width: '250px', borderRadius: '99px' }} 
              />
            </div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/add-recipe" className="hidden-mobile btn btn-secondary btn-sm" style={{ borderRadius: '99px', display: 'flex', gap: '0.5rem' }}>
                  <PlusCircle size={16} /> Add Recipe
                </Link>
                
                <div style={{ position: 'relative' }}>
                  <button 
                    className="btn btn-ghost btn-icon" 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      style={{ width: '32px', height: '32px', borderRadius: '50%' }} 
                    />
                  </button>

                  {showUserMenu && (
                    <div className="card" style={{ position: 'absolute', right: 0, top: '120%', width: '200px', padding: '0.5rem', zIndex: 100 }}>
                      <div style={{ padding: '0.5rem 1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                        <div style={{ fontWeight: 'bold' }}>{user.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.email}</div>
                      </div>
                      <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setLocation('/profile')}>
                        <User size={16} style={{ marginRight: '8px' }} /> Profile
                      </button>
                      <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={() => setLocation('/favorites')}>
                        <Heart size={16} style={{ marginRight: '8px' }} /> Favorites
                      </button>
                      {user.role === 'admin' && (
                        <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--primary)' }} onClick={() => setLocation('/admin')}>
                          <ShieldCheck size={16} style={{ marginRight: '8px' }} /> Admin
                        </button>
                      )}
                      <button className="btn btn-ghost btn-danger" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleLogout}>
                        <LogOut size={16} style={{ marginRight: '8px' }} /> Log out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link href="/auth" className="btn btn-ghost">
                  Login
                </Link>
                <Link href="/auth" className="btn btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
            
            {/* Mobile Menu Toggle */}
            <button className="btn btn-ghost btn-icon lg:hidden" style={{ display: 'none' }} onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '80px', minHeight: 'calc(100vh - 300px)' }}>
        {children}
      </main>

      <footer style={{ backgroundColor: '#f3f4f6', padding: '4rem 0', marginTop: '4rem' }}>
        <div className="container">
          <div className="grid grid-4">
            <div>
              <div className="logo" style={{ marginBottom: '1rem' }}>
                <div className="logo-icon"><ChefHat size={20} /></div>
                <span>SmartRecipe</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Discover, create, and share culinary masterpieces.
              </p>
            </div>
            <div>
              <h4>Platform</h4>
              <ul>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Browse Recipes</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Collections</a></li>
              </ul>
            </div>
            <div>
              <h4>Community</h4>
              <ul>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Events</a></li>
                <li><a href="#" style={{ color: 'var(--text-muted)' }}>Blog</a></li>
              </ul>
            </div>
            <div>
              <h4>Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Email" className="input" style={{ marginBottom: 0 }} />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
