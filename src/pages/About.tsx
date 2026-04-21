import { motion } from 'motion/react';
import { Instagram, Linkedin, Github, Mail, Send, ExternalLink, Award, Coffee, Code } from 'lucide-react';

export default function About() {
  const skills = [
    { name: 'High-Poly Modeling', level: 95 },
    { name: 'Retopology & UVs', level: 90 },
    { name: 'PBR Texturing', level: 85 },
    { name: 'Environment Design', level: 80 },
    { name: 'Lighting & Rendering', level: 75 },
    { name: 'Character Sculpting', level: 70 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Profile Section */}
        <div className="lg:col-span-5 space-y-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden glass-card border-2 border-cyan-accent/20">
              <img 
                src="https://picsum.photos/seed/artist/800/800" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-magenta-accent/20 blur-3xl rounded-full" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-accent/20 blur-3xl rounded-full" />
          </motion.div>

          <div className="space-y-6">
            <h1 className="text-4xl font-display font-bold">Max Mustermann</h1>
            <p className="text-white/60 leading-relaxed">
              Ich bin ein leidenschaftlicher 3D-Artist mit über 5 Jahren Erfahrung in der Spieleindustrie. 
              Mein Fokus liegt auf der Erstellung von immersiven Umgebungen und detaillierten Props, 
              die Geschichten erzählen.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-cyan-accent transition-colors"><Instagram /></a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-cyan-accent transition-colors"><Linkedin /></a>
              <a href="#" className="p-3 bg-white/5 rounded-xl hover:text-cyan-accent transition-colors"><Github /></a>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="lg:col-span-7 space-y-16">
          {/* Skills */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Code className="text-cyan-accent" /> Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-white/80">{skill.name}</span>
                    <span className="text-cyan-accent font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-cyan-accent to-magenta-accent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Experience / Awards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-6 space-y-4">
              <Award className="text-magenta-accent" />
              <h3 className="font-bold">Best Environment 2025</h3>
              <p className="text-sm text-white/40">Auszeichnung für "Deep Space Corridor" beim Virtual Art Festival.</p>
            </div>
            <div className="glass-card p-6 space-y-4">
              <Coffee className="text-cyan-accent" />
              <h3 className="font-bold">Freelance Ready</h3>
              <p className="text-sm text-white/40">Verfügbar für Remote-Projekte und Kollaborationen weltweit.</p>
            </div>
          </section>

          {/* Contact Form */}
          <section id="contact">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Mail className="text-magenta-accent" /> Sag Hallo
            </h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" placeholder="Dein Name" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors" placeholder="deine@email.de" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Nachricht</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-accent outline-none transition-colors resize-none" placeholder="Erzähl mir von deinem Projekt..."></textarea>
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                <Send size={18} /> Nachricht senden
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
