import { useMemo } from "react";

const ArenaBackground = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 1 + Math.random() * 3,
      opacity: 0.2 + Math.random() * 0.4,
      isGreen: Math.random() > 0.5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Diagonal neon light beams */}
      <div
        className="absolute -top-1/2 -left-1/4 h-[200%] w-1/3 rotate-[25deg] opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(160 100% 45%), transparent)",
        }}
      />
      <div
        className="absolute -top-1/2 -right-1/4 h-[200%] w-1/3 -rotate-[25deg] opacity-[0.03]"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(185 100% 50%), transparent)",
        }}
      />

      {/* Subtle fog layers */}
      <div
        className="absolute bottom-0 left-0 h-1/2 w-full opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, hsl(160 100% 45%), transparent 70%)",
        }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            bottom: "-2%",
            width: p.size,
            height: p.size,
            backgroundColor: p.isGreen ? "hsl(160, 100%, 45%)" : "hsl(185, 100%, 50%)",
            opacity: p.opacity,
            animation: `particleFloat ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.03) 2px, hsl(0 0% 100% / 0.03) 4px)",
        }}
      />
    </div>
  );
};

export default ArenaBackground;
