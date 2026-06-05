import { motion } from "motion/react";
import { 
  Code2, 
  Database, 
  Cloud, 
  Terminal, 
  Cpu, 
  Layout, 
  Server, 
  Globe 
} from "lucide-react";

const stack = [
  {
    category: "Frontend",
    items: [
      { name: "React", icon: <Layout className="w-6 h-6" /> },
      { name: "TypeScript", icon: <Code2 className="w-6 h-6" /> },
      { name: "Next.js", icon: <Globe className="w-6 h-6" /> },
      { name: "Tailwind", icon: <Layout className="w-6 h-6" /> },
    ]
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", icon: <Server className="w-6 h-6" /> },
      { name: "PostgreSQL", icon: <Database className="w-6 h-6" /> },
      { name: "Rust", icon: <Terminal className="w-6 h-6" /> },
      { name: "Go", icon: <Cpu className="w-6 h-6" /> },
    ]
  },
  {
    category: "Cloud",
    items: [
      { name: "AWS", icon: <Cloud className="w-6 h-6" /> },
      { name: "Vercel", icon: <Globe className="w-6 h-6" /> },
      { name: "Docker", icon: <Database className="w-6 h-6" /> },
      { name: "PostHog", icon: <Terminal className="w-6 h-6" /> },
    ]
  }
];

export default function TechStack() {
  return (
    <section id="stack" className="py-32 px-6 relative overflow-hidden bg-brand-surface/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4">
            Forged with <span className="text-brand-violet">Modern Tech</span>
          </h2>
          <div className="h-1 w-24 bg-brand-violet rounded-full glow-violet" />
        </motion.div>

        <div className="space-y-16">
          {stack.map((group, groupIdx) => (
            <div key={group.category}>
              <h3 className="text-white/40 text-xs font-bold uppercase tracking-widest mb-8 ml-2">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (groupIdx * 0.2) + (i * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    <div className="glass flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 hover:border-brand-violet/50 hover:glow-violet transition-all duration-500 overflow-hidden">
                      <div className="relative z-10 text-white/60 group-hover:text-brand-violet transition-colors mb-4 transform group-hover:rotate-12 duration-500">
                        {item.icon}
                      </div>
                      <span className="relative z-10 text-sm font-bold tracking-tight text-white/50 group-hover:text-white transition-colors">
                        {item.name}
                      </span>
                      
                      {/* Animated Pulse Ring */}
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0, 0.2, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 border-2 border-brand-violet/30 rounded-2xl opacity-0 group-hover:opacity-100"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Placeholder/Subtle Background Ticker */}
        <div className="mt-32 relative overflow-hidden h-12 flex items-center bg-white/[0.02] border-y border-white/5">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.5em] text-white/10 gpu-accelerate"
          >
            {[...Array(10)].map((_, i) => (
                <span key={i}>Innovation through architecture • Design with intent • Scale with purpose • Engineering excellence • </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
