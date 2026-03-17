import { Link } from 'wouter';
import { BookOpen, Heart, Clock, Star } from 'lucide-react';

export default function Collections() {
  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Recipe Collections</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          Organize your favorite recipes into collections
        </p>
      </div>

      <div className="grid grid-3">
        <div className="card">
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 'var(--radius)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={48} color="white" />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>My Favorites</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>12 recipes</p>
          <Link href="/" className="btn btn-outline btn-sm">
            View Collection
          </Link>
        </div>

        <div className="card">
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: 'var(--radius)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={48} color="white" />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Quick Meals</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>8 recipes</p>
          <Link href="/" className="btn btn-outline btn-sm">
            View Collection
          </Link>
        </div>

        <div className="card">
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: 'var(--radius)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Star size={48} color="white" />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Top Rated</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>15 recipes</p>
          <Link href="/" className="btn btn-outline btn-sm">
            View Collection
          </Link>
        </div>

        <div className="card">
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: 'var(--radius)', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={48} color="white" />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>Want to Try</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>20 recipes</p>
          <Link href="/" className="btn btn-outline btn-sm">
            View Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
