import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Loader2, UploadCloud, X, Plus, Trash } from 'lucide-react';
import { useLocation } from 'wouter';
import { MOCK_CATEGORIES } from '../lib/mockData';
import '../styles/add-recipe.css';

export default function AddRecipe() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Breakfast',
    description: '',
    prepTime: '',
    calories: ''
  });

  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image");
      return;
    }
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert("Recipe Published!");
      setLocation('/');
    }, 1500);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index) => setIngredients(ingredients.filter((_, i) => i !== index));
  const updateIngredient = (index, value) => {
    const newIngs = [...ingredients];
    newIngs[index] = value;
    setIngredients(newIngs);
  };

  const addStep = () => setSteps([...steps, '']);
  const removeStep = (index) => setSteps(steps.filter((_, i) => i !== index));
  const updateStep = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Share Your Recipe</h1>
      
      <form onSubmit={handleSubmit} className="card card-body">
        
        {/* Image Upload */}
        <div className="form-group">
          <label className="label">Recipe Photo</label>
          <div 
            {...getRootProps()} 
            className="dropzone"
            style={image ? { padding: 0, border: 'none', overflow: 'hidden' } : {}}
          >
            <input {...getInputProps()} />
            {image ? (
              <div style={{ position: 'relative' }}>
                <img src={image} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', opacity: 0, transition: 'opacity 0.2s' }} className="hover-overlay">
                  Click to change
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <UploadCloud size={40} />
                <p>Drag & drop an image here, or click to select</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-2 gap-4">
          <div className="form-group">
            <label className="label">Recipe Title</label>
            <input type="text" name="title" className="input" placeholder="e.g. Grandma's Apple Pie" required onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="label">Category</label>
            <select name="category" className="select" onChange={handleChange}>
              {MOCK_CATEGORIES.filter(c => c !== 'All').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="label">Description</label>
          <textarea name="description" className="textarea" rows={3} placeholder="Tell us about your dish..." required onChange={handleChange}></textarea>
        </div>

        <div className="grid grid-2 gap-4">
          <div className="form-group">
            <label className="label">Prep Time</label>
            <input type="text" name="prepTime" className="input" placeholder="e.g. 45 mins" required onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="label">Calories (kcal)</label>
            <input type="number" name="calories" className="input" required onChange={handleChange} />
          </div>
        </div>

        {/* Ingredients */}
        <div className="form-group">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <label className="label">Ingredients</label>
            <button type="button" className="btn btn-outline btn-sm" onClick={addIngredient}>
              <Plus size={14} style={{ marginRight: '4px' }} /> Add
            </button>
          </div>
          {ingredients.map((ing, i) => (
            <div key={i} className="flex gap-2" style={{ marginBottom: '0.5rem' }}>
              <input 
                type="text" 
                className="input" 
                style={{ marginBottom: 0 }}
                value={ing} 
                onChange={(e) => updateIngredient(i, e.target.value)}
                placeholder={`Ingredient ${i + 1}`}
              />
              {ingredients.length > 1 && (
                <button type="button" className="btn btn-ghost btn-icon" onClick={() => removeIngredient(i)}>
                  <Trash size={16} color="var(--text-muted)" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="form-group">
          <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
            <label className="label">Instructions</label>
            <button type="button" className="btn btn-outline btn-sm" onClick={addStep}>
              <Plus size={14} style={{ marginRight: '4px' }} /> Add Step
            </button>
          </div>
          {steps.map((step, i) => (
            <div key={i} className="flex gap-2" style={{ marginBottom: '0.5rem', alignItems: 'flex-start' }}>
              <span style={{ marginTop: '0.5rem', fontWeight: 'bold', color: 'var(--text-muted)', width: '20px' }}>{i + 1}.</span>
              <textarea 
                className="textarea" 
                style={{ marginBottom: 0 }}
                value={step} 
                onChange={(e) => updateStep(i, e.target.value)}
                placeholder={`Step ${i + 1}`}
                rows={2}
              />
              {steps.length > 1 && (
                <button type="button" className="btn btn-ghost btn-icon" onClick={() => removeStep(i)} style={{ marginTop: '0.5rem' }}>
                  <Trash size={16} color="var(--text-muted)" />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4" style={{ marginTop: '2rem' }}>
          <button type="button" className="btn btn-ghost" onClick={() => setLocation('/')}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isLoading} style={{ minWidth: '150px' }}>
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Publish Recipe'}
          </button>
        </div>

      </form>
    </div>
  );
}
