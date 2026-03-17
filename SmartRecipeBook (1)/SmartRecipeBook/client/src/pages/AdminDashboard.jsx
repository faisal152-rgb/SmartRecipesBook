import { useState } from 'react';
import { MOCK_USERS, MOCK_RECIPES } from '../lib/mockData';
import { Users, BookOpen, AlertCircle, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import '../styles/admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState(MOCK_USERS);
  const [recipes, setRecipes] = useState(MOCK_RECIPES);

  const handleDeleteUser = (id) => {
    if(confirm('Are you sure?')) setUsers(users.filter(u => u.id !== id));
  };

  const handleDeleteRecipe = (id) => {
    if(confirm('Are you sure?')) setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage users, recipes, and system settings</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">Export Report</button>
          <button className="btn btn-primary">System Settings</button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-3" style={{ marginBottom: '2rem' }}>
        <div className="card card-body">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Total Users</div>
            <Users size={16} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{users.length}</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+20.1% from last month</p>
        </div>
        <div className="card card-body">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Active Recipes</div>
            <BookOpen size={16} color="var(--text-muted)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{recipes.length}</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>+15 new this week</p>
        </div>
        <div className="card card-body">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>Pending Approvals</div>
            <AlertCircle size={16} color="var(--secondary)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>3</div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Requires attention</p>
        </div>
      </div>

      <div className="tabs">
        <div className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users Management</div>
        <div className={`tab ${activeTab === 'recipes' ? 'active' : ''}`} onClick={() => setActiveTab('recipes')}>Recipes Management</div>
        <div className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Categories</div>
      </div>

      {activeTab === 'users' && (
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3>Registered Users</h3>
            <input type="text" placeholder="Search users..." className="input" style={{ width: '250px', marginBottom: 0 }} />
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <img src={user.avatar} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        {user.name}
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-secondary'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: 'green', background: '#dcfce7', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem' }}>Active</span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-icon" title="Delete" onClick={() => handleDeleteUser(user.id)}>
                        <Trash2 size={16} color="var(--danger)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'recipes' && (
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3>All Recipes</h3>
            <input type="text" placeholder="Search recipes..." className="input" style={{ width: '250px', marginBottom: 0 }} />
          </div>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Category</th>
                  <th>Likes</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>{recipe.title}</td>
                    <td>{recipe.authorName}</td>
                    <td><span className="badge badge-secondary">{recipe.category}</span></td>
                    <td>{recipe.likes}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-icon">
                        <Eye size={16} />
                      </button>
                      <button className="btn btn-ghost btn-icon" onClick={() => handleDeleteRecipe(recipe.id)}>
                        <Trash2 size={16} color="var(--danger)" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'categories' && (
        <div className="card card-body">
          <h3>Manage Categories</h3>
          <p>Category management UI placeholder.</p>
        </div>
      )}
    </div>
  );
}
