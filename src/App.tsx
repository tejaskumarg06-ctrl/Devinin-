/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  ArrowRight, 
  Layers, 
  Zap, 
  Github, 
  Twitter, 
  Linkedin, 
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Bot,
  Database
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Lenis from "lenis";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Process from "./components/Process";
import AiThinkingVector from "./components/AiThinkingVector";
import ThinkingText from "./components/ThinkingText";

// --- Custom Hooks ---

const useMousePosition = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY };
};

// --- Sub-components ---

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative active:scale-95 transition-transform ${className}`}
    >
      {children}
    </motion.button>
  );
};

const CustomCursor = () => {
  const { mouseX, mouseY } = useMousePosition();
  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-cyan-500/30 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
    >
      <div className="w-1 h-1 bg-cyan-400 rounded-full" />
    </motion.div>
  );
};

const Logo = ({ scrolled }: { scrolled: boolean }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 group cursor-pointer"
    >
      <div className="relative">
        <motion.div 
          animate={{ 
            rotate: scrolled ? 360 : 0,
            scale: scrolled ? 0.8 : 1,
            borderRadius: scrolled ? "50%" : "8px"
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="w-10 h-10 bg-brand-cyan flex items-center justify-center glow-cyan transition-transform group-hover:scale-110"
        >
          <motion.div
            animate={{ rotate: scrolled ? -360 : 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          >
            <Layers size={22} className="text-brand-dark" />
          </motion.div>
        </motion.div>
        {/* Advanced animated orbits */}
        {[0, 1, 2].map((i) => (
          <motion.div 
            key={i}
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: scrolled ? 0.4 : 0.1
            }}
            transition={{ 
              duration: 4 + i * 2, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute inset-[-6px] border border-brand-cyan/20 rounded-full"
            style={{ padding: i * 4 }}
          />
        ))}
      </div>
      <motion.span 
        animate={{ 
          letterSpacing: scrolled ? "0.2em" : "0px",
          color: scrolled ? "#00f5ff" : "#fff" 
        }}
        className="font-display font-black text-2xl tracking-tighter"
      >
        DEVINI
      </motion.span>
    </motion.div>
  );
};

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const characters = text.split("");
  
  return (
    <motion.span>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.1,
            delay: delay + i * 0.03,
            ease: "easeIn"
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 gpu ${
        scrolled ? "py-3 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-brand-cyan/5" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo scrolled={scrolled} />

        <div className="hidden md:flex items-center gap-12">
          {["Services", "Projects", "Stack", "Process"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-semibold tracking-wide text-white/50 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-brand-cyan transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <MagneticButton className="px-6 py-2.5 rounded-full bg-white text-brand-dark text-sm font-bold hover:bg-brand-cyan transition-colors">
            Get Started
          </MagneticButton>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            style={{ originY: 0 }}
            className="md:hidden bg-brand-surface border-b border-white/5"
          >
            <div className="p-8 flex flex-col gap-6">
              {["Services", "Projects", "Stack", "Process"].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-white/80"
                >
                  {item}
                </a>
              ))}
              <MagneticButton className="w-full py-4 rounded-2xl bg-white text-brand-dark font-bold mt-4">
                Get Started
              </MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FloatingVector = ({ delay = 0, className = "" }: { delay?: number; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0.1, 0.3, 0.1],
        y: [0, -30, 0],
        rotate: [0, 10, 0]
      }}
      transition={{ 
        duration: 10 + delay, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className={`absolute pointer-events-none z-0 ${className}`}
    >
      <svg width="120" height="120" viewBox="0 0 100 100" fill="none" className="text-brand-cyan/20">
        <path d="M10 50L50 90L90 50L50 10Z" stroke="currentColor" strokeWidth="0.5" fill="rgba(0,245,255,0.02)" />
        <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.2" strokeDasharray="2 2" />
        <motion.circle 
          cx="50" cy="50" r="2" 
          fill="currentColor"
          animate={{ scale: [1, 2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>
    </motion.div>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yValue = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center pt-20 overflow-hidden bg-brand-dark">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(112,0,255,0.05)_0%,transparent_60%)]" />
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px]" />
      </div>

      <FloatingVector delay={0} className="top-1/4 left-20" />
      <FloatingVector delay={3} className="bottom-1/4 right-20" />
      <FloatingVector delay={6} className="top-1/3 right-1/4 scale-125" />
      <FloatingVector delay={9} className="bottom-1/3 left-1/4 scale-75" />

      <motion.div 
        style={{ y: yValue, opacity: opacityValue }}
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading, description, CTA */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.22, 1, 0.36, 1],
                scale: { type: "spring", stiffness: 100 }
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-bold tracking-[0.2em] uppercase mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
              PROTOCOL v2.4 ENGINE ACTIVE
            </motion.div>

            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[0.9] tracking-tighter cursor-default"
              >
                AI THAT <br /> 
                <ThinkingText /> IN <br /> 
                YOUR STACK
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base md:text-xl text-white/50 max-w-2xl lg:max-w-none mb-10 font-medium leading-relaxed"
            >
              <TypewriterText delay={1} text="AI-Powered Automation + Robust Backend Architecture + Premium 3D Web Experiences that eliminate bottlenecks and drive measurable growth." />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6 w-full sm:w-auto"
            >
              <MagneticButton className="btn-neon-cyan px-8 md:px-10 py-4 md:py-5 border-none bg-brand-cyan text-brand-dark rounded-xl font-bold text-lg md:text-xl shadow-[0_0_25px_rgba(34,211,238,0.35)] hover:bg-brand-cyan/80 w-full sm:w-auto">
                <span className="flex items-center gap-2 justify-center">
                  Initialize Environment <ChevronRight size={22} />
                </span>
              </MagneticButton>
              <MagneticButton className="px-8 md:px-10 py-4 md:py-5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all font-bold text-lg md:text-xl w-full sm:w-auto">
                View Live Demo
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right Column: High-tech Animated AI Thinking Synapse SVG Vector */}
          <div className="lg:col-span-5 flex items-center justify-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="w-full max-w-[340px] md:max-w-[380px]"
            >
              <AiThinkingVector />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Discover more</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-16 bg-gradient-to-b from-brand-cyan/50 to-transparent" 
        />
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-32 px-6 border-t border-white/5 bg-brand-dark relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-9xl font-display font-bold mb-12"
          >
            LET&apos;S <span className="text-gradient">BUILD</span>
          </motion.h2>
          <MagneticButton className="px-12 py-6 rounded-full bg-white text-brand-dark font-bold text-2xl group hover:glow-cyan">
            <span className="flex items-center gap-3">Contact Us <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" /></span>
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-brand-cyan rounded-xl flex items-center justify-center">
                <Layers size={20} className="text-brand-dark" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter">DEVINI</span>
            </div>
            <p className="text-white/40 text-lg max-w-sm font-medium leading-relaxed">
              Premium AI automation, architecture, and immersive design for the next generation of digital leaders.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="flex flex-col gap-5 text-white/40 font-bold text-sm">
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Stack</a></li>
              <li><a href="#" className="hover:text-brand-cyan transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-8 uppercase tracking-widest text-xs">Social</h4>
            <div className="flex gap-4">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <div key={i}>
                  <MagneticButton className="w-12 h-12 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all">
                    <Icon size={20} />
                  </MagneticButton>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[10px] font-bold tracking-[0.3em] uppercase">
          <span>&copy; {new Date().getFullYear()} DEVINI AGENCY. PROTOCOL V2.0</span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-10 gpu-accelerate">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_0%,#050505_80%)]" />
      <div className="absolute inset-0 noise" />
    </div>
  );
};

const NeuralNetwork = () => {
  return (
    <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
      <svg width="100%" height="100%" className="text-white/5">
        <pattern id="neural-net" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="currentColor" />
          <path d="M2 2 L98 98" stroke="currentColor" strokeWidth="0.1" />
          <path d="M98 2 L2 98" stroke="currentColor" strokeWidth="0.1" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#neural-net)" />
      </svg>
    </div>
  );
};

const CyberShield = ({ className }: { className?: string }) => {
  return (
    <motion.div
      animate={{ 
        rotate: [0, 360],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`absolute pointer-events-none opacity-20 -z-10 gpu-accelerate ${className}`}
    >
      <svg width="400" height="400" viewBox="0 0 100 100" className="text-brand-cyan/20">
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.1" strokeDasharray="5 5" />
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.1" strokeDasharray="2 2" />
        <path d="M50 2 L50 98 M2 50 L98 50" stroke="currentColor" strokeWidth="0.1" />
      </svg>
    </motion.div>
  );
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-brand-dark selection:bg-brand-cyan selection:text-black cursor-none relative">
      <NeuralNetwork />
      <GeometricBackground />
      <CustomCursor />
      <Navbar />
      <Hero />
      <div className="relative z-10">
        <CyberShield className="top-1/3 -left-40" />
        <CyberShield className="top-2/3 -right-40" />
        <Projects />
        <TechStack />
        <Process />
        <Footer />
      </div>
    </div>
  );
}
