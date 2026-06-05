import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ExternalLink, Github } from "lucide-react";
import React, { useState, useRef } from "react";

const projects = [
  {
    title: "NeuroSync AI",
    description: "Neural network orchestration platform for agentic workflows.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "PyTorch", "Tailwind"],
    link: "#",
    github: "#",
    category: "Web"
  },
  {
    title: "Ether Canvas",
    description: "Real-time 3D collaborative environment for creative teams.",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=800",
    tags: ["Three.js", "WebRTC", "Framer"],
    link: "#",
    github: "#",
    category: "Design"
  },
  {
    title: "Flux Mobile",
    description: "Quantum-safe mobile messaging app with encrypted end-to-end sync.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    tags: ["React Native", "Rust", "Firebase"],
    link: "#",
    github: "#",
    category: "Mobile"
  },
  {
    title: "Pulse Engine",
    description: "High-performance data automation for enterprise scale analytics.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    tags: ["Go", "Kubernetes", "Next.js"],
    link: "#",
    github: "#",
    category: "Web"
  }
];

const categories = ["All", "Web", "Mobile", "Design"];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number; key?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group glass-card hover:border-brand-cyan/50 hover:glow-cyan perspective-1000 gpu-accelerate"
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="aspect-[16/9] overflow-hidden relative"
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Aesthetic Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <a href={project.link} className="btn-neon-cyan flex items-center gap-2">
            <ExternalLink size={18} /> Live Demo
          </a>
          <a href={project.github} className="btn-neon-violet flex items-center gap-2">
            <Github size={18} /> Code
          </a>
        </div>
      </div>
      
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="p-8"
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-brand-cyan">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">{project.title}</h3>
        <p className="text-white/60 leading-relaxed">{project.description}</p>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 px-6 relative overflow-hidden">
      {/* Aesthetic Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-violet/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4 skew-x-[-10deg]"
            >
              Selected <span className="text-brand-cyan">Projects</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-brand-cyan to-brand-violet rounded-full glow-cyan"
            />
          </div>

          <div className="flex p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md relative overflow-hidden">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all relative z-10 ${
                  activeCategory === cat ? "text-brand-dark" : "text-white/60 hover:text-white"
                }`}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-cyan rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
          layout
        >
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
