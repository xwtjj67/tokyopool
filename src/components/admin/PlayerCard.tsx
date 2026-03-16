import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Upload, User } from "lucide-react";

interface PlayerCardProps {
  label: string;
  name: string;
  score: number;
  image: string | null;
  playerColor: "player1" | "player2";
  onNameChange: (name: string) => void;
  onScoreUp: () => void;
  onScoreDown: () => void;
  onImageClick: () => void;
}

const PlayerCard = ({
  label,
  name,
  score,
  image,
  playerColor,
  onNameChange,
  onScoreUp,
  onScoreDown,
  onImageClick,
}: PlayerCardProps) => {
  return (
    <div className={`glass-strong rounded-2xl p-4 border-${playerColor}`} style={{ borderWidth: 2 }}>
      <div className="mb-4 flex items-center gap-3">
        {/* Avatar */}
        <button
          onClick={onImageClick}
          className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-${playerColor} transition-transform active:scale-95`}
        >
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className={`h-7 w-7 text-${playerColor}`} />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 transition-opacity hover:opacity-100 active:opacity-100">
            <Upload className="h-5 w-5 text-foreground" />
          </div>
        </button>

        <div className="flex-1">
          <p className={`font-display text-xs font-semibold uppercase tracking-wider text-${playerColor}`}>
            {label}
          </p>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="mt-1 h-10 border-border bg-muted font-display text-base font-semibold text-foreground"
          />
        </div>
      </div>

      {/* Score controls */}
      <div className="flex items-center justify-between gap-3">
        <Button
          variant="outline"
          onClick={onScoreDown}
          className="h-16 w-16 rounded-xl text-xl font-bold transition-transform active:scale-95"
        >
          <Minus className="h-6 w-6" />
        </Button>

        <span className={`min-w-[4rem] text-center font-display text-5xl font-bold text-${playerColor}`}>
          {score}
        </span>

        <Button
          onClick={onScoreUp}
          className={`h-20 w-20 rounded-xl bg-primary text-2xl font-bold text-primary-foreground transition-transform active:scale-95 hover:bg-primary/90`}
        >
          <Plus className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default PlayerCard;
