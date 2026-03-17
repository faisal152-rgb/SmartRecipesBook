import { ChefHat, Heart, Users, BookOpen } from 'lucide-react';

export default function About() {
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #059669 100%)', padding: '4rem 0', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <ChefHat size={64} style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>About SmartRecipe</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Your personal culinary companion for discovering, creating, and sharing delicious recipes
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 0' }}>
        <div className="grid grid-3">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Heart size={40} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>10,000+</h3>
            <p style={{ color: 'var(--text-muted)' }}>Recipes</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--secondary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Users size={40} color="var(--secondary)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>50,000+</h3>
            <p style={{ color: 'var(--text-muted)' }}>Community Members</p>
          </div>

          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ width: '80px', height: '80px', background: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <BookOpen size={40} color="var(--primary)" />
            </div>
            <h3 style={{ marginBottom: '0.5rem' }}>1,000+</h3>
            <p style={{ color: 'var(--text-muted)' }}>Collections</p>
          </div>
        </div>
      </section>

      <section style={{ background: '#f9fafb', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>Our Story</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              SmartRecipe was born from a simple idea: cooking should be accessible, enjoyable, and inspiring for everyone. We believe that great food brings people together and that everyone has a recipe worth sharing.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Our platform combines modern technology with the timeless joy of cooking, making it easy to discover new recipes, organize your favorites, and share your culinary creations with a community of food lovers.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
              Whether you're a seasoned chef or just starting your cooking journey, SmartRecipe is here to support, inspire, and celebrate your love for food.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Join Our Community</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Start your culinary journey with thousands of food lovers
        </p>
        <button className="btn btn-primary btn-lg">Get Started</button>
      </section>
    </div>
  );
}
