import { useMatch } from "@/hooks/useMatch";
import { useMatchTimer } from "@/hooks/useMatchTimer";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import AdminLogin from "@/components/admin/AdminLogin";
import {
  Plus,
  Minus,
  RotateCcw,
  ArrowLeftRight,
  Sparkles,
  RefreshCw,
  Timer,
  Trophy,
} from "lucide-react";
import PlayerCard from "@/components/admin/PlayerCard";

const Admin = () => {
  const {
    match,
    loading,
    winner,
    updateMatch,
    resetMatch,
    swapPlayers,
    newMatch,
    rematch,
    uploadPlayerImage,
  } = useMatch();

  const { formatted: timerFormatted } = useMatchTimer(
    match?.created_at ?? null,
    match?.is_active ?? false
  );

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
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-4">
        <div className="text-6xl">🎱</div>
        <p className="font-display text-xl text-muted-foreground">No active match</p>
        <Button
          onClick={() => newMatch()}
          size="lg"
          className="h-14 bg-primary font-display text-lg font-bold text-primary-foreground hover:bg-primary/90"
        >
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
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="font-display text-xl font-bold uppercase tracking-wider text-billiard">
          TOKYO POOL
        </h1>
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="font-display text-sm text-foreground">{timerFormatted}</span>
        </div>
      </div>

      {/* Winner banner */}
      {winner && (
        <div className="glass-strong mb-4 flex items-center justify-center gap-3 rounded-xl p-4">
          <Trophy className={`h-6 w-6 ${winner === "p1" ? "text-player1" : "text-player2"}`} />
          <span className="font-display text-lg font-bold text-foreground">
            {winner === "p1" ? match.player1_name : match.player2_name} WINS!
          </span>
          <Trophy className={`h-6 w-6 ${winner === "p1" ? "text-player1" : "text-player2"}`} />
        </div>
      )}

      <div className="mx-auto flex max-w-md flex-col gap-4">
        {/* Player cards */}
        <PlayerCard
          label="Player 1"
          name={match.player1_name}
          score={match.player1_score}
          image={match.player1_image}
          playerColor="player1"
          onNameChange={(name) => updateMatch({ player1_name: name })}
          onScoreUp={() => updateMatch({ player1_score: match.player1_score + 1 })}
          onScoreDown={() => updateMatch({ player1_score: Math.max(0, match.player1_score - 1) })}
          onImageClick={() => p1FileRef.current?.click()}
        />
        <input
          ref={p1FileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileUpload(1, e)}
        />

        <PlayerCard
          label="Player 2"
          name={match.player2_name}
          score={match.player2_score}
          image={match.player2_image}
          playerColor="player2"
          onNameChange={(name) => updateMatch({ player2_name: name })}
          onScoreUp={() => updateMatch({ player2_score: match.player2_score + 1 })}
          onScoreDown={() => updateMatch({ player2_score: Math.max(0, match.player2_score - 1) })}
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
        <div className="glass-strong rounded-xl p-4">
          <label className="mb-2 block font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Race To
          </label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl"
              onClick={() => updateMatch({ race_to: Math.max(1, match.race_to - 1) })}
            >
              <Minus className="h-5 w-5" />
            </Button>
            <span className="min-w-[3rem] text-center font-display text-3xl font-bold text-primary">
              {match.race_to}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-xl"
              onClick={() => updateMatch({ race_to: match.race_to + 1 })}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={resetMatch}
              variant="outline"
              className="h-14 rounded-xl font-display text-sm font-semibold transition-transform active:scale-95"
            >
              <RotateCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button
              onClick={swapPlayers}
              variant="outline"
              className="h-14 rounded-xl font-display text-sm font-semibold transition-transform active:scale-95"
            >
              <ArrowLeftRight className="mr-2 h-4 w-4" /> Swap
            </Button>
          </div>

          {winner && (
            <Button
              onClick={rematch}
              className="h-14 rounded-xl bg-secondary font-display text-base font-bold text-secondary-foreground hover:bg-secondary/90 transition-transform active:scale-95"
            >
              <RefreshCw className="mr-2 h-5 w-5" /> Quick Rematch
            </Button>
          )}

          <Button
            onClick={() => newMatch()}
            className="h-14 rounded-xl bg-primary font-display text-base font-bold text-primary-foreground hover:bg-primary/90 transition-transform active:scale-95"
          >
            <Sparkles className="mr-2 h-5 w-5" /> New Match
          </Button>
        </div>

        {/* Shortcuts hint */}
        <p className="mt-2 text-center font-body text-xs text-muted-foreground">
          Shortcuts: 1/2 = +score • Q/W = -score • R = reset
        </p>
      </div>
    </div>
  );
};

export default Admin;
