import { useState } from 'react';
import { useLocation } from 'wouter';
import { ChefHat, Mail, Lock, User, Loader2 } from 'lucide-react';

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [, setLocation] = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.elements.namedItem('email').value;
    
    setTimeout(() => {
      setIsLoading(false);
      if (email.includes('admin')) {
        setLocation('/admin');
      } else {
        setLocation('/');
      }
    }, 1500);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created! Please login.");
      setActiveTab('login');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f3f4f6', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '12px', margin: '0 auto 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', transform: 'rotate(3deg)' }}>
            <ChefHat size={28} />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome to SmartRecipe</h1>
          <p style={{ color: 'var(--text-muted)' }}>Join our community of food lovers</p>
        </div>

        <div className="card">
          <div className="tabs" style={{ marginBottom: '1.5rem', borderBottom: 'none', padding: '0 1.5rem', paddingTop: '1.5rem' }}>
             <button 
               className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-ghost'}`} 
               style={{ flex: 1, borderRadius: '8px' }}
               onClick={() => setActiveTab('login')}
             >
               Login
             </button>
             <button 
               className={`btn ${activeTab === 'register' ? 'btn-secondary' : 'btn-ghost'}`} 
               style={{ flex: 1, borderRadius: '8px' }}
               onClick={() => setActiveTab('register')}
             >
               Register
             </button>
          </div>

          <div className="card-body" style={{ paddingTop: 0 }}>
            {activeTab === 'login' ? (
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="label">Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                    <input type="email" name="email" placeholder="john@example.com" className="input" style={{ paddingLeft: '40px' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <div className="flex justify-between">
                     <label className="label">Password</label>
                     <a href="#" style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>Forgot password?</a>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                    <input type="password" name="password" placeholder="••••••" className="input" style={{ paddingLeft: '40px' }} required />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '45px' }} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Sign In'}
                </button>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Try demo: <code>admin@example.com</code> (Admin)
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                 <div className="form-group">
                  <label className="label">Full Name</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                    <input type="text" name="name" placeholder="John Doe" className="input" style={{ paddingLeft: '40px' }} required />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} />
                    <input type="email" name="email" placeholder="john@example.com" className="input" style={{ paddingLeft: '40px' }} required />
                  </div>
                </div>
                <div className="grid grid-2 gap-4" style={{ marginBottom: '1.5rem' }}>
                  <div>
                    <label className="label">Password</label>
                    <input type="password" name="password" placeholder="••••••" className="input" required />
                  </div>
                  <div>
                    <label className="label">Confirm</label>
                    <input type="password" name="confirmPassword" placeholder="••••••" className="input" required />
                  </div>
                </div>
                <button type="submit" className="btn btn-secondary" style={{ width: '100%', height: '45px' }} disabled={isLoading}>
                  {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Create Account'}
                </button>
              </form>
            )}
          </div>
          
          <div style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid var(--border)', background: '#f9fafb', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
             By continuing, you agree to our Terms of Service.
          </div>
        </div>
      </div>
    </div>
  );
}
