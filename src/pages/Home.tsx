import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MODELS } from '../data/models';
import { ArrowRight, Filter } from 'lucide-react';

export default function Home() {
  const [filter, setFilter] = useState<'All' | 'Characters' | 'Props' | 'Environments' | 'Doodles'>('All');

  const filteredModels = filter === 'All' 
    ? MODELS 
    : MODELS.filter(m => m.category === filter);

  const categories: ('All' | 'Characters' | 'Props' | 'Environments' | 'Doodles')[] = ['All', 'Characters', 'Props', 'Environments', 'Doodles'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight"
        >
          Digitale Welten in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-accent to-magenta-accent">3D</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg max-w-2xl mx-auto mb-10"
        >
          Portfolio von 3D-Assets, Charakteren und immersiven Umgebungen. 
          Entwickelt mit Leidenschaft für Details und technische Präzision.
        </motion.p>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10 overflow-x-auto max-w-full no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                filter === cat 
                  ? 'bg-cyan-accent text-bg shadow-lg shadow-cyan-accent/20' 
                  : 'hover:bg-white/5 text-white/60'
              }`}
            >
              {cat === 'All' ? 'Alle' : cat}
            </button>
          ))}
        </div>
        <div className="text-sm text-white/40 flex items-center gap-2">
          <Filter size={14} />
          Zeige {filteredModels.length} Projekte
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/model/${model.id}`} className="block glass-card neon-glow-cyan">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={model.thumbnail} 
                  alt={model.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-sm font-bold flex items-center gap-2">
                    Details ansehen <ArrowRight size={16} />
                  </span>
                </div>
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 bg-bg/60 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                    {model.category}
                  </span>
                  {model.timeSpent && (
                    <span className="px-3 py-1 bg-magenta-accent/80 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 text-white">
                      ⏱ {model.timeSpent}
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-accent transition-colors">{model.title}</h3>
                <div className="flex gap-2">
                  {model.software.slice(0, 2).map(s => (
                    <span key={s} className="text-[10px] text-white/40 uppercase tracking-tighter">{s}</span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
