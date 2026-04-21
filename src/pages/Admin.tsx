import { useState } from 'react';
import { motion } from 'motion/react';
import { addModel } from '../services/modelService';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, Image as ImageIcon, Box } from 'lucide-react';

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    category: 'Props' as any,
    thumbnail: '',
    modelUrl: '',
    polycount: '',
    software: '',
    description: '',
    renderImages: '',
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '3d-0815') {
      setIsAuthorized(true);
      setError(null);
    } else {
      setError('Falsches Passwort');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const modelData = {
        ...formData,
        software: formData.software.split(',').map(s => s.trim()).filter(Boolean),
        renderImages: formData.renderImages.split(',').map(s => s.trim()).filter(Boolean),
      };

      await addModel(modelData);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 text-center"
        >
          <Box className="mx-auto mb-6 text-cyan-accent" size={48} />
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input 
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors text-center"
              placeholder="Passwort eingeben"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button type="submit" className="w-full btn-primary">
              Anmelden
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-display font-bold">Admin Panel</h1>
        <p className="text-white/40 text-sm">Neues Modell hinzufügen</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">ID (Eindeutig)</label>
              <input 
                required
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
                placeholder="z.B. sci-fi-helmet" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Titel</label>
              <input 
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
                placeholder="Modell Name" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Kategorie</label>
              <select 
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors appearance-none"
              >
                <option value="Characters">Characters</option>
                <option value="Props">Props</option>
                <option value="Environments">Environments</option>
                <option value="Doodles">Doodles</option>
                <option value="Speedsculpts">Speedsculpts (30 Min)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Thumbnail URL</label>
            <input 
              required
              name="thumbnail"
              value={formData.thumbnail}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
              placeholder="https://..." 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Model URL (.GLB)</label>
            <input 
              required
              name="modelUrl"
              value={formData.modelUrl}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
              placeholder="https://..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Polycount</label>
              <input 
                name="polycount"
                value={formData.polycount}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
                placeholder="z.B. 15k Tris" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40">Software (Komma-getrennt)</label>
              <input 
                name="software"
                value={formData.software}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
                placeholder="Blender, ZBrush, ..." 
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Beschreibung (Markdown)</label>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors resize-none" 
              placeholder="Projekt Beschreibung..." 
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Render Bilder URLs (Komma-getrennt)</label>
            <input 
              name="renderImages"
              value={formData.renderImages}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" 
              placeholder="https://url1.jpg, https://url2.jpg" 
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            type="submit"
            disabled={loading}
            className="flex-grow btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Plus className="animate-spin" /> : <Save size={20} />}
            Modell Speichern
          </button>
          <button 
            type="button"
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}
