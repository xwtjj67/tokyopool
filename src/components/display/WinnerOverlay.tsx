import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { playWinnerSound } from "@/lib/sounds";

interface WinnerOverlayProps {
  winnerName: string;
  player: "p1" | "p2";
}

const WinnerOverlay = ({ winnerName, player }: WinnerOverlayProps) => {
  useEffect(() => {
    playWinnerSound();
  }, []);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: player === "p1"
        ? `hsl(160, 100%, ${40 + Math.random() * 30}%)`
        : `hsl(30, 95%, ${40 + Math.random() * 30}%)`,
      size: 4 + Math.random() * 8,
    }));
  }, [player]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-md"
    >
      {/* Confetti */}
      {confettiPieces.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.left}%`,
            top: "-5%",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confettiFall ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Winner content */}
      <motion.div
        initial={{ scale: 0.3, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-display text-2xl font-bold uppercase tracking-[0.3em] text-muted-foreground lg:text-4xl"
        >
          🏆 WINNER 🏆
        </motion.div>
        <div
          className={`font-display text-5xl font-black uppercase tracking-wider lg:text-9xl winner-glow ${
            player === "p1" ? "text-player1" : "text-player2"
          }`}
          style={{
            textShadow: `0 0 40px hsl(var(--${player === "p1" ? "player1" : "player2"}) / 0.7), 0 0 100px hsl(var(--${player === "p1" ? "player1" : "player2"}) / 0.3)`,
          }}
        >
          {winnerName}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WinnerOverlay;
