import { User } from "lucide-react";

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
    <div className={`relative flex flex-1 flex-col items-center justify-center gap-3 lg:gap-5 overflow-hidden rounded-3xl ${isWinner ? "winner-glow" : ""}`}>
      {/* Large background player image */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {image ? (
          <>
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover"
            />
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/30">
            <User className={`h-32 w-32 lg:h-48 lg:w-48 ${isP1 ? "text-player1" : "text-player2"} opacity-10`} />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}
      </div>

      {/* Player info overlay at bottom */}
      <div className="relative z-10 flex flex-col items-center gap-2 lg:gap-4 mt-auto pb-4 lg:pb-6 pt-16 lg:pt-24 w-full">
        {/* Colored accent bar */}
        <div
          className={`h-1 w-16 lg:w-24 rounded-full ${isP1 ? "bg-player1" : "bg-player2"}`}
          style={{
            boxShadow: `0 0 20px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.6)`,
          }}
        />

        {/* Name */}
        <h2
          className={`font-display text-xl font-bold uppercase tracking-[0.15em] lg:text-3xl ${isP1 ? "text-player1" : "text-player2"}`}
          style={{
            textShadow: `0 0 30px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.5)`,
          }}
        >
          {name}
        </h2>

        {/* Score */}
        <div
          key={`${player}-${score}`}
          className={`font-display text-[16vh] font-bold leading-none text-foreground lg:text-[22vh] ${
            isScoreChanged ? "score-pop" : ""
          }`}
          style={{
            textShadow: `0 0 80px hsl(var(--${isP1 ? "player1" : "player2"}) / 0.5), 0 2px 4px rgba(0,0,0,0.5)`,
          }}
        >
          {score}
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;
