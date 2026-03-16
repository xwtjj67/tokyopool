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
  const colorClass = player === "p1" ? "player1" : "player2";

  return (
    <div className={`flex flex-1 flex-col items-center gap-4 lg:gap-6 ${isWinner ? "winner-glow" : ""}`}>
      {/* Avatar */}
      <div
        className={`relative h-24 w-24 overflow-hidden rounded-full border-4 border-${colorClass} glow-${colorClass} lg:h-36 lg:w-36 transition-all duration-300`}
      >
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <User className={`h-10 w-10 text-${colorClass} lg:h-14 lg:w-14`} />
          </div>
        )}
      </div>

      {/* Name */}
      <h2
        className={`font-display text-xl font-bold uppercase tracking-wider text-${colorClass} lg:text-3xl`}
      >
        {name}
      </h2>

      {/* Score */}
      <div
        key={`${player}-${score}`}
        className={`font-display text-[14vh] font-bold leading-none text-foreground lg:text-[22vh] ${
          isScoreChanged ? "score-pop" : ""
        }`}
        style={{
          textShadow: `0 0 60px hsl(var(--${colorClass}) / 0.4)`,
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default PlayerPanel;
