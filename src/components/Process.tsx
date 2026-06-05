import { motion, useScroll, useTransform } from "motion/react";
import { 
  Search, 
  PenTool, 
  Code, 
  ShieldCheck, 
  Rocket 
} from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into your requirements, target audience, and business goals to define a clear roadmap.",
    icon: <Search className="w-6 h-6" />
  },
  {
    number: "02",
    title: "Design",
    description: "Creating wireframes and high-fidelity glassmorphic designs that push the boundaries of UI/UX.",
    icon: <PenTool className="w-6 h-6" />
  },
  {
    number: "03",
    title: "Development",
    description: "Building production-ready code with React, Node.js and a focus on performance and scalability.",
    icon: <Code className="w-6 h-6" />
  },
  {
    number: "04",
    title: "Testing",
    description: "Rigorous automated and manual testing to ensure total system integrity and bug-free delivery.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    number: "05",
    title: "Launch",
    description: "Deployment to optimized cloud infrastructure with monitoring and ongoing support.",
    icon: <Rocket className="w-6 h-6" />
  }
];

export default function Process() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" ref={containerRef} className="py-40 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-display font-bold tracking-tight mb-4"
          >
            My <span className="text-gradient">Process</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 max-w-lg mx-auto"
          >
            A systematic engineering approach to building premium digital products.
          </motion.p>
        </div>

        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block">
            <motion.div 
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-brand-cyan via-brand-violet to-brand-cyan glow-cyan gpu-accelerate"
            />
          </div>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col md:flex-row items-center gap-12 ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Step Card */}
                <div className="flex-1 w-full relative z-10">
                  <div className="glass-card p-10 hover:border-brand-violet/30 group transition-all duration-500">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-brand-cyan group-hover:bg-brand-cyan/20 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                        {step.icon}
                      </div>
                      <span className="text-4xl font-black text-white/10 font-display italic">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-white/50 leading-relaxed font-medium">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="flex-shrink-0 relative z-20">
                  <div className="w-12 h-12 bg-brand-dark border-4 border-white/10 rounded-full flex items-center justify-center glow-cyan group-hover:scale-110 transition-transform">
                     <div className="w-3 h-3 bg-brand-cyan rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Empty spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
