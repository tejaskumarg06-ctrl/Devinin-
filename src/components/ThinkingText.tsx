import { motion, useSpring, useMotionValue } from "motion/react";
import React, { useState } from "react";

interface PathSegment {
  from: { x: number; y: number };
  to: { x: number; y: number };
  speed: number;
  delay: number;
}

export default function ThinkingText() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  // Position coordinates of nodes relative to letters in standard 600x100 viewBox
  // T: 50, H: 150, I: 250, N: 350, K: 450, S: 550
  const letterNodes = [
    { cx: 50, cy: 50, char: "T", label: "Transmit" },
    { cx: 150, cy: 50, char: "H", label: "Hypothesis" },
    { cx: 250, cy: 50, char: "I", label: "Inference" },
    { cx: 350, cy: 50, char: "N", label: "Network" },
    { cx: 450, cy: 50, char: "K", label: "Kernel" },
    { cx: 550, cy: 50, char: "S", label: "Synthesis" }
  ];

  // Intermediary circuit path coordinates (high-tech cyber zig-zag junctions)
  const joints = [
    { cx: 100, cy: 20 },
    { cx: 200, cy: 80 },
    { cx: 300, cy: 20 },
    { cx: 400, cy: 80 },
    { cx: 500, cy: 20 }
  ];

  // Combined path segments for speed packet animation
  const segments: PathSegment[] = [
    { from: { x: 50, y: 50 }, to: { x: 100, y: 20 }, speed: 1.2, delay: 0 },
    { from: { x: 100, y: 20 }, to: { x: 150, y: 50 }, speed: 1.1, delay: 0.2 },
    { from: { x: 150, y: 50 }, to: { x: 200, y: 80 }, speed: 1.3, delay: 0.4 },
    { from: { x: 200, y: 80 }, to: { x: 250, y: 50 }, speed: 1.0, delay: 0.6 },
    { from: { x: 250, y: 50 }, to: { x: 300, y: 20 }, speed: 1.2, delay: 0.8 },
    { from: { x: 300, y: 20 }, to: { x: 350, y: 50 }, speed: 1.1, delay: 1.0 },
    { from: { x: 350, y: 50 }, to: { x: 400, y: 80 }, speed: 1.4, delay: 1.2 },
    { from: { x: 400, y: 80 }, to: { x: 450, y: 50 }, speed: 1.0, delay: 1.4 },
    { from: { x: 450, y: 50 }, to: { x: 500, y: 20 }, speed: 1.2, delay: 1.6 },
    { from: { x: 500, y: 20 }, to: { x: 550, y: 50 }, speed: 1.3, delay: 1.8 }
  ];

  return (
    <span 
      className="relative inline-block cursor-default select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveNode(null);
      }}
    >
      {/* Background neon soft glow behind the word */}
      <span 
        className={`absolute inset-0 blur-2xl transition-all duration-700 pointer-events-none opacity-30 ${
          isHovered ? "bg-brand-cyan/40 scale-110" : "bg-brand-cyan/10"
        }`} 
      />

      {/* Styled text itself */}
      <span className="relative z-10 text-gradient text-glow tracking-widest px-2 font-display font-black">
        THINKS
      </span>

      {/* Overlay SVG Vector Canvas */}
      <svg 
        viewBox="0 0 600 100" 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-20"
      >
        <defs>
          <linearGradient id="vectorLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00f5ff" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Underlying continuous motherboard circuit traces combining letters */}
        <path
          d="M 50,50 L 100,20 L 150,50 L 200,80 L 250,50 L 300,20 L 350,50 L 400,80 L 450,50 L 500,20 L 550,50"
          fill="none"
          stroke="url(#vectorLineGrad)"
          strokeWidth={isHovered ? 2 : 1.2}
          className="transition-all duration-500"
        />

        {/* 2. Cyber Joint Connectors */}
        {joints.map((joint, index) => (
          <circle
            key={`joint-${index}`}
            cx={joint.cx}
            cy={joint.cy}
            r="2.5"
            className="fill-brand-violet/50 stroke-brand-cyan/30"
            strokeWidth="0.5"
          />
        ))}

        {/* 3. Fast synaptical data packet flowing circles */}
        {segments.map((seg, idx) => (
          <g key={`data-pulse-${idx}`}>
            <motion.circle
              r={isHovered ? "3" : "2"}
              fill="#00f5ff"
              className="glow-cyan"
              animate={{
                cx: [seg.from.x, seg.to.x],
                cy: [seg.from.y, seg.to.y],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: isHovered ? seg.speed * 0.4 : seg.speed,
                repeat: Infinity,
                delay: seg.delay,
                ease: "linear"
              }}
            />
          </g>
        ))}

        {/* 4. Active Synapse node points on each specific letter */}
        {letterNodes.map((node, idx) => {
          const isActive = activeNode === idx || isHovered;
          
          return (
            <g key={`l-node-${idx}`} className="pointer-events-auto cursor-pointer">
              {/* Pulsing visual aura on active node */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r={isActive ? 16 : 8}
                fill="url(#nodeGlow)"
                animate={{
                  scale: isActive ? [1, 1.25, 1] : 1,
                  opacity: isActive ? [0.6, 0.9, 0.6] : 0.3
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Central high-tech node core */}
              <motion.circle
                cx={node.cx}
                cy={node.cy}
                r="4.5"
                fill={isActive ? "#00f5ff" : "rgba(255,255,255,0.4)"}
                stroke={isActive ? "#7c3aed" : "rgba(0,245,255,0.2)"}
                strokeWidth="1.5"
                whileHover={{ scale: 1.5 }}
                onMouseEnter={() => setActiveNode(idx)}
                onMouseLeave={() => setActiveNode(null)}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              />

              {/* Precise tech vector circle rings */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r="9"
                stroke={isActive ? "rgba(0, 245, 255, 0.4)" : "rgba(255, 255, 255, 0.05)"}
                strokeWidth="0.75"
                strokeDasharray="2 1"
              />
            </g>
          );
        })}
      </svg>
    </span>
  );
}
