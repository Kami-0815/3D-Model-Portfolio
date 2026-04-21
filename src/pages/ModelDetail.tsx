import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ModelData } from '../data/models';
import { fetchModels } from '../services/modelService';
import { ArrowLeft, Download, Maximize, Box, Layers, Cpu, Loader2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import Markdown from 'react-markdown';
import '@google/model-viewer';

export default function ModelDetail() {
  const ModelViewer = 'model-viewer' as any;
  const viewerRef = useRef<any>(null);
  const { id } = useParams();
  const [model, setModel] = useState<ModelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    fetchModels()
      .then(models => {
        const found = models.find(m => m.id === id);
        if (found) {
          setModel(found);
          setActiveImage(found.thumbnail);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) {
      const handleLoad = () => setModelLoaded(true);
      viewer.addEventListener('load', handleLoad);
      
      // Fallback: If it takes too long or is already loaded
      const timeout = setTimeout(() => {
        if (!modelLoaded) setModelLoaded(true);
      }, 5000);

      return () => {
        viewer.removeEventListener('load', handleLoad);
        clearTimeout(timeout);
      };
    }
  }, [model]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-cyan-accent" size={40} />
        <p className="text-white/40">Lade Projektdetails...</p>
      </div>
    );
  }

  if (!model) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Model nicht gefunden</h2>
        <Link to="/" className="btn-primary">Zurück zur Galerie</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-cyan-accent transition-colors mb-8">
        <ArrowLeft size={16} /> Zurück zur Galerie
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: 3D Viewer & Gallery */}
        <div className="lg:col-span-8 space-y-8">
          <div className="aspect-video glass-card relative bg-white/2 overflow-hidden group">
            {!modelLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-bg/50 backdrop-blur-sm z-10 gap-4">
                <Loader2 className="animate-spin text-cyan-accent" size={48} />
                <p className="text-sm font-bold tracking-widest text-cyan-accent animate-pulse">
                  INITIALISIERE 3D ENGINE...
                </p>
              </div>
            )}
            <ModelViewer
              ref={viewerRef}
              src={model.modelUrl}
              alt={model.title}
              auto-rotate
              camera-controls
              shadow-intensity="1"
              environment-image="neutral"
              exposure="1"
              loading="lazy"
              ar
              style={{ width: '100%', height: '100%' }}
            >
              <div className="absolute bottom-6 right-6 flex gap-2">
                <button className="p-3 bg-bg/60 backdrop-blur-md rounded-full border border-white/10 hover:bg-cyan-accent hover:text-bg transition-all">
                  <Maximize size={20} />
                </button>
              </div>
            </ModelViewer>
          </div>

          {/* Render Gallery */}
          <div className="grid grid-cols-4 gap-4">
            {[model.thumbnail, ...model.renderImages].map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-cyan-accent scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Render" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            ))}
          </div>

          {/* Description */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">Über das Projekt</h2>
            <div className="prose prose-invert max-w-none text-white/70">
              <Markdown>{model.description}</Markdown>
            </div>
          </div>
        </div>

        {/* Right Column: Info & Specs */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-8 space-y-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-accent mb-2 block">
                {model.category === 'Speedsculpts' ? '30 Min' : model.category}
              </span>
              <h1 className="text-4xl font-display font-bold">{model.title}</h1>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 text-white/60">
                  <Box size={18} />
                  <span className="text-sm">Polycount</span>
                </div>
                <span className="font-mono text-sm">{model.polycount}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 text-white/60">
                  <Layers size={18} />
                  <span className="text-sm">Textur-Sets</span>
                </div>
                <span className="font-mono text-sm">4x 4K PBR</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                <div className="flex items-center gap-3 text-white/60">
                  <Cpu size={18} />
                  <span className="text-sm">Software</span>
                </div>
                <div className="flex gap-2">
                  {model.software.map(s => (
                    <span key={s} className="text-[10px] px-2 py-1 bg-white/10 rounded uppercase">{s}</span>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full btn-primary flex items-center justify-center gap-2 group">
              <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              Model herunterladen (.GLB)
            </button>
            
            <p className="text-center text-[10px] text-white/20 uppercase tracking-widest">
              Lizenz: CC BY 4.0
            </p>
          </div>

          {/* Quick Contact Card */}
          <div className="glass-card p-8 bg-gradient-to-br from-magenta-accent/10 to-transparent border-magenta-accent/20">
            <h3 className="text-lg font-bold mb-2">Interesse an Custom Assets?</h3>
            <p className="text-sm text-white/60 mb-6">Ich nehme aktuell Aufträge für Game-Ready Props und Charaktere an.</p>
            <Link to="/about" className="text-sm font-bold text-magenta-accent hover:underline">
              Anfrage senden →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
