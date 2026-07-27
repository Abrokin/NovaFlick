import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* Base */}
      <div className="absolute inset-0 bg-[#0b0a14]" />

      {/* Purple Orb */}
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[140px]"
      />

      {/* Pink Orb */}
      <motion.div
        animate={{
          x: [0, -100, 60, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-150px] top-[120px] h-[420px] w-[420px] rounded-full bg-fuchsia-500/15 blur-[130px]"
      />

      {/* Bottom Glow */}
      <motion.div
        animate={{
          x: [0, 80, -50, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-220px] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[170px]"
      />
     {/* Grid */}
<div
  className="absolute inset-0 opacity-100"
  style={{
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
    `,
    backgroundSize: "60px 60px",
    maskImage:
      "radial-gradient(circle at center, black 35%, transparent 90%)",
    WebkitMaskImage:
      "radial-gradient(circle at center, black 35%, transparent 90%)",
  }}
/>


      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />
    </div>
  );
}