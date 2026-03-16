import { useEffect, useMemo } from "react";
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
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 3,
      color: player === "p1"
        ? `hsl(145, 80%, ${40 + Math.random() * 30}%)`
        : `hsl(38, 90%, ${40 + Math.random() * 30}%)`,
      size: 4 + Math.random() * 8,
    }));
  }, [player]);

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
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

      {/* Winner text */}
      <div className="flex flex-col items-center gap-6 winner-bounce">
        <div className="font-display text-3xl font-bold uppercase tracking-widest text-muted-foreground lg:text-4xl">
          🏆 WINNER 🏆
        </div>
        <div
          className={`font-display text-6xl font-bold uppercase tracking-wider lg:text-9xl winner-glow ${
            player === "p1" ? "text-player1" : "text-player2"
          }`}
        >
          {winnerName}
        </div>
      </div>
    </div>
  );
};

export default WinnerOverlay;
