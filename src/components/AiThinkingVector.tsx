import { motion } from "motion/react";
import { useState } from "react";

// Predefined node coordinates for the high-tech AI cerebral synapse map
const nodes = [
  { id: "core", cx: 100, cy: 100, r: 8, label: "Core AI Engine", color: "from-brand-cyan to-brand-violet" },
  { id: "front", cx: 100, cy: 45, r: 5, label: "Cognitive Layer", color: "from-brand-cyan to-blue-400" },
  { id: "left-inner", cx: 70, cy: 75, r: 5, label: "Synaptic Storage", color: "from-brand-cyan to-teal-400" },
  { id: "right-inner", cx: 130, cy: 75, r: 5, label: "Semantic Synthesis", color: "from-brand-violet to-fuchsia-400" },
  { id: "left-outer", cx: 45, cy: 100, r: 4, label: "Perception Node", color: "from-brand-cyan to-emerald-400" },
  { id: "right-outer", cx: 155, cy: 100, r: 4, label: "Generative Node", color: "from-brand-violet to-pink-400" },
  { id: "left-bottom", cx: 65, cy: 130, r: 5, label: "Neural Network Loop", color: "from-brand-cyan to-indigo-500" },
  { id: "right-bottom", cx: 135, cy: 130, r: 5, label: "Continuous Context", color: "from-brand-violet to-purple-500" },
  { id: "base", cx: 100, cy: 155, r: 6, label: "Inference Root", color: "from-brand-violet to-brand-cyan" },
];

const connections = [
  // Links to central core
  { from: "core", to: "front", speed: 2, delay: 0 },
  { from: "core", to: "left-inner", speed: 2.5, delay: 0.3 },
  { from: "core", to: "right-inner", speed: 2.2, delay: 0.6 },
  { from: "core", to: "left-bottom", speed: 2.8, delay: 0.2 },
  { from: "core", to: "right-bottom", speed: 2.4, delay: 0.7 },
  
  // High-tech curved temporal circuits
  { from: "front", to: "left-inner", speed: 3, delay: 0.5 },
  { from: "front", to: "right-inner", speed: 3.2, delay: 0.1 },
  { from: "left-inner", to: "left-outer", speed: 2.7, delay: 0.4 },
  { from: "right-inner", to: "right-outer", speed: 2.9, delay: 0.8 },
  { from: "left-outer", to: "left-bottom", speed: 2.3, delay: 0.2 },
  { from: "right-outer", to: "right-bottom", speed: 2.1, delay: 0.9 },
  { from: "left-bottom", to: "base", speed: 2.6, delay: 0.5 },
  { from: "right-bottom", to: "base", speed: 2.4, delay: 0.3 },
];

export default function AiThinkingVector() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative flex flex-col items-center justify-center p-8 bg-brand-surface/40 rounded-3xl border border-white/5 backdrop-blur-2xl shadow-2xl overflow-visible max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredNode(null);
      }}
    >
      {/* Decorative cybernetic ambient rings */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.06)_0%,transparent_70%)] animate-pulse" />
      
      {/* Animated SVG Vector */}
      <motion.div
        animate={{
          y: [0, -6, 0],
          rotate: [0, 0.5, -0.5, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-full aspect-square max-w-[280px]"
      >
        <svg 
          viewBox="0 0 200 200" 
          fill="none" 
          className="w-full h-full overflow-visible"
        >
          {/* Cyber-Cerebral outer circuit boundaries */}
          <circle cx="100" cy="100" r="88" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
          <circle cx="100" cy="100" r="72" stroke="rgba(0, 245, 255, 0.05)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="54" stroke="rgba(124, 58, 237, 0.04)" strokeWidth="1" />

          {/* Core high-tech coordinate crosshairs */}
          <line x1="100" y1="12" x2="100" y2="188" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />
          <line x1="12" y1="100" x2="188" y2="100" stroke="rgba(255, 255, 255, 0.02)" strokeWidth="0.5" />

          {/* Glowing synaptic paths (Connections) */}
          {connections.map((conn, idx) => {
            const start = nodes.find(n => n.id === conn.from);
            const end = nodes.find(n => n.id === conn.to);
            if (!start || !end) return null;

            const isPathActive = hoveredNode === conn.from || hoveredNode === conn.to || isHovered;

            return (
              <g key={`connection-${idx}`}>
                {/* Main wire path */}
                <motion.line
                  x1={start.cx}
                  y1={start.cy}
                  x2={end.cx}
                  y2={end.cy}
                  stroke={isPathActive ? "rgba(0, 245, 255, 0.25)" : "rgba(255, 255, 255, 0.08)"}
                  strokeWidth="1.5"
                  transition={{ duration: 0.3 }}
                />
                
                {/* High-contrast pulsing double paths */}
                <line
                  x1={start.cx}
                  y1={start.cy}
                  x2={end.cx}
                  y2={end.cy}
                  stroke="rgba(124, 58, 237, 0.08)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                {/* Aesthetic flowing light pulse particles */}
                <motion.circle
                  r="2"
                  fill="#00f5ff"
                  className="glow-cyan"
                  animate={{
                    cx: [start.cx, end.cx],
                    cy: [start.cy, end.cy],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{
                    duration: isHovered ? conn.speed * 0.5 : conn.speed,
                    repeat: Infinity,
                    delay: conn.delay,
                    ease: "easeInOut"
                  }}
                />
              </g>
            );
          })}

          {/* Interactive Core Nodes */}
          {nodes.map((node) => {
            const isTarget = hoveredNode === node.id;
            const sizeMultiplier = isTarget ? 1.4 : isHovered ? 1.1 : 1.0;

            return (
              <g 
                key={node.id} 
                className="cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Ambient breathing neon drop-ring around each synapse node */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * 2.4}
                  fill={node.id === "core" ? "rgba(0, 245, 255, 0.1)" : "rgba(124, 58, 237, 0.04)"}
                  animate={{
                    scale: isTarget ? [1, 1.3, 1] : [1, 1.15, 1],
                    opacity: isTarget ? [0.4, 0.8, 0.4] : [0.2, 0.5, 0.2]
                  }}
                  transition={{
                    duration: node.id === "core" ? 2.5 : 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Inner solid high-tech node circle */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r={node.r * sizeMultiplier}
                  className={node.id === "core" ? "fill-brand-cyan" : "fill-white/90"}
                  stroke={node.id === "core" ? "#7000ff" : "#00f5ff"}
                  strokeWidth="2"
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                />

                {/* Additional micro ring to represent active AI computation state */}
                {node.id === "core" && (
                  <motion.circle
                    cx={node.cx}
                    cy={node.cy}
                    r={node.r * 3.8}
                    stroke="rgba(0, 245, 255, 0.3)"
                    strokeWidth="0.75"
                    strokeDasharray="4 2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </motion.div>

      {/* Modern Status indicator showing live telemetry details when hovering nodes */}
      <div className="mt-6 w-full text-center h-10 flex flex-col justify-center">
        {hoveredNode ? (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono"
          >
            <span className="text-brand-cyan font-bold tracking-widest text-[10px] uppercase block mb-1">
              {nodes.find(n => n.id === hoveredNode)?.label}
            </span>
            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">
              Computation Engine: Active
            </span>
          </motion.div>
        ) : (
          <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2">
            <span className="w-1 px-1 flex inline-block h-1 rounded-full bg-brand-cyan animate-pulse" />
            Hover nodes to trace synaptics
          </div>
        )}
      </div>
    </div>
  );
}
