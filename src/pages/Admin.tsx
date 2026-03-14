import { useMatch } from "@/hooks/useMatch";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Minus,
  RotateCcw,
  ArrowLeftRight,
  Sparkles,
  Upload,
  User,
} from "lucide-react";

const Admin = () => {
  const {
    match,
    loading,
    updateMatch,
    resetMatch,
    swapPlayers,
    newMatch,
    uploadPlayerImage,
  } = useMatch();

  const p1FileRef = useRef<HTMLInputElement>(null);
  const p2FileRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!match) return;
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "1") updateMatch({ player1_score: match.player1_score + 1 });
      if (e.key === "2") updateMatch({ player2_score: match.player2_score + 1 });
      if (e.key === "q") updateMatch({ player1_score: Math.max(0, match.player1_score - 1) });
      if (e.key === "w") updateMatch({ player2_score: Math.max(0, match.player2_score - 1) });
      if (e.key === "r") resetMatch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [match, updateMatch, resetMatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="font-display text-xl text-gold">Loading...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background p-4">
        <p className="font-display text-xl text-muted-foreground">No active match</p>
        <Button onClick={newMatch} size="lg" className="bg-gold font-display text-lg font-bold text-background hover:bg-gold/90">
          <Sparkles className="mr-2 h-5 w-5" /> Start New Match
        </Button>
      </div>
    );
  }

  const handleFileUpload = async (player: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadPlayerImage(player, file);
  };

  return (
    <div className="min-h-screen bg-background p-4 pb-8">
      <h1 className="mb-6 text-center font-display text-2xl font-bold text-gold">
        TOKYO POOL • CONTROL
      </h1>

      <div className="mx-auto flex max-w-md flex-col gap-4">
        {/* Player 1 Card */}
        <PlayerCard
          label="PLAYER 1"
          name={match.player1_name}
          score={match.player1_score}
          image={match.player1_image}
          colorClass="border-player1 text-player1"
          onNameChange={(name) => updateMatch({ player1_name: name })}
          onScoreUp={() => updateMatch({ player1_score: match.player1_score + 1 })}
          onScoreDown={() =>
            updateMatch({ player1_score: Math.max(0, match.player1_score - 1) })
          }
          onImageClick={() => p1FileRef.current?.click()}
        />
        <input
          ref={p1FileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(1, e)}
        />

        {/* Player 2 Card */}
        <PlayerCard
          label="PLAYER 2"
          name={match.player2_name}
          score={match.player2_score}
          image={match.player2_image}
          colorClass="border-player2 text-player2"
          onNameChange={(name) => updateMatch({ player2_name: name })}
          onScoreUp={() => updateMatch({ player2_score: match.player2_score + 1 })}
          onScoreDown={() =>
            updateMatch({ player2_score: Math.max(0, match.player2_score - 1) })
          }
          onImageClick={() => p2FileRef.current?.click()}
        />
        <input
          ref={p2FileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(2, e)}
        />

        {/* Race To */}
        <div className="rounded-lg border border-border bg-card p-4">
          <label className="mb-2 block font-display text-sm font-semibold text-muted-foreground">
            RACE TO
          </label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => updateMatch({ race_to: Math.max(1, match.race_to - 1) })}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="min-w-[3rem] text-center font-display text-3xl font-bold text-gold">
              {match.race_to}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12"
              onClick={() => updateMatch({ race_to: match.race_to + 1 })}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={resetMatch}
            variant="outline"
            size="lg"
            className="h-14 font-display text-base font-semibold"
          >
            <RotateCcw className="mr-2 h-5 w-5" /> Reset Scores
          </Button>
          <Button
            onClick={swapPlayers}
            variant="outline"
            size="lg"
            className="h-14 font-display text-base font-semibold"
          >
            <ArrowLeftRight className="mr-2 h-5 w-5" /> Swap Players
          </Button>
          <Button
            onClick={newMatch}
            size="lg"
            className="h-14 bg-gold font-display text-base font-bold text-background hover:bg-gold/90"
          >
            <Sparkles className="mr-2 h-5 w-5" /> New Match
          </Button>
        </div>

        {/* Keyboard shortcuts hint */}
        <p className="mt-2 text-center font-body text-xs text-muted-foreground">
          Shortcuts: 1/2 = +score • Q/W = -score • R = reset
        </p>
      </div>
    </div>
  );
};

interface PlayerCardProps {
  label: string;
  name: string;
  score: number;
  image: string | null;
  colorClass: string;
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
  colorClass,
  onNameChange,
  onScoreUp,
  onScoreDown,
  onImageClick,
}: PlayerCardProps) => {
  return (
    <div className={`rounded-xl border-2 bg-card p-4 ${colorClass.split(" ")[0]}`}>
      <div className="mb-3 flex items-center gap-3">
        {/* Player image */}
        <button
          onClick={onImageClick}
          className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 ${colorClass.split(" ")[0]}`}
        >
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <User className={`h-7 w-7 ${colorClass.split(" ")[1]}`} />
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity hover:opacity-100">
            <Upload className="h-5 w-5 text-foreground" />
          </div>
        </button>

        <div className="flex-1">
          <p className={`font-display text-xs font-semibold ${colorClass.split(" ")[1]}`}>
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
          className="h-16 w-16 text-xl font-bold"
        >
          <Minus className="h-6 w-6" />
        </Button>

        <span className="min-w-[4rem] text-center font-display text-5xl font-black text-gold">
          {score}
        </span>

        <Button
          onClick={onScoreUp}
          className="h-20 w-20 bg-primary text-2xl font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </div>
    </div>
  );
};

export default Admin;
