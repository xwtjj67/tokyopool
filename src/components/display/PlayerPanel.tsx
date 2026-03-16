import { User } from "lucide-react";
import { motion } from "framer-motion";

interface PlayerPanelProps {
  name: string;
  score: number;
  image: string | null;
  player: "p1" | "p2";
  isScoreChanged: boolean;
  isWinner: boolean;
}

const PlayerPanel = ({ name, score, image, player, isScoreChanged, isWinner }: PlayerPanelProps) => {
  const isP1 = player === "p1";

  return (
    <motion.div
      initial={{ opacity: 0, x: isP1 ? -60 : 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: isP1 ? 0.1 : 0.2 }}
      className={`relative flex flex-1 items-center gap-4 lg:gap-8 ${isP1 ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Player image - circular frame with neon border */}
      <div className="relative flex-shrink-0">
        <div
          className={`relative h-20 w-20 lg:h-32 lg:w-32 xl:h-36 xl:w-36 rounded-full overflow-hidden border-[3px] ${
            isP1 ? "border-player1" : "border-player2"
          } ${isWinner ? (isP1 ? "glow-player1" : "glow-player2") : ""}`}
          style={{
            boxShadow: isWinner
              ? undefined
              : `0 0 20px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.3), inset 0 0 15px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.1)`,
          }}
        >
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted/50">
              <User className={`h-10 w-10 lg:h-16 lg:w-16 ${isP1 ? "text-player1" : "text-player2"} opacity-40`} />
            </div>
          )}
        </div>

        {/* Ring glow effect */}
        <div
          className="absolute inset-0 rounded-full pulse-soft pointer-events-none"
          style={{
            boxShadow: `0 0 30px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.15)`,
          }}
        />
      </div>

      {/* Player name and score */}
      <div className={`flex flex-1 items-center gap-4 lg:gap-6 ${isP1 ? "flex-row" : "flex-row-reverse"}`}>
        {/* Name */}
        <div className={`flex flex-col ${isP1 ? "items-start" : "items-end"}`}>
          {/* Accent bar */}
          <div
            className={`h-[2px] w-10 lg:w-16 rounded-full mb-2 neon-line-glow ${isP1 ? "bg-player1" : "bg-player2"}`}
          />
          <h2
            className={`font-display text-sm lg:text-xl xl:text-2xl font-bold uppercase tracking-[0.15em] ${isP1 ? "text-player1" : "text-player2"}`}
            style={{
              textShadow: `0 0 25px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.6)`,
            }}
          >
            {name}
          </h2>
        </div>

        {/* Score */}
        <motion.div
          key={`${player}-${score}`}
          initial={isScoreChanged ? { scale: 1.4, opacity: 0.7 } : false}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className={`font-score text-7xl lg:text-[12vh] xl:text-[14vh] font-black leading-none ${isP1 ? "ml-auto" : "mr-auto"}`}
          style={{
            color: "hsl(var(--foreground))",
            textShadow: `0 0 60px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.5), 0 0 120px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.2), 0 2px 4px rgba(0,0,0,0.8)`,
          }}
        >
          {score}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlayerPanel;
