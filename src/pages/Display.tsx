import { useMatch } from "@/hooks/useMatch";
import { useCallback, useEffect, useState } from "react";
import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";
import hexmenLogo from "@/assets/hexmen-logo.jpg";
import { Maximize } from "lucide-react";
import { playScoreSound } from "@/lib/sounds";
import IdleScreen from "@/components/display/IdleScreen";
import WinnerOverlay from "@/components/display/WinnerOverlay";
import PlayerPanel from "@/components/display/PlayerPanel";

const Display = () => {
  const { match, loading, scoreChanged, winner } = useMatch();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    if (scoreChanged) playScoreSound(scoreChanged);
  }, [scoreChanged]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "f" || e.key === "F") toggleFullscreen();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleFullscreen]);

  if (loading) {
    return (
      <div className="felt-bg flex h-screen items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!match) {
    return <IdleScreen />;
  }

  return (
    <div className="felt-bg tv-hide-scrollbar tv-hide-cursor relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden p-6 lg:p-10">
      {/* Winner overlay */}
      {winner && (
        <WinnerOverlay
          winnerName={winner === "p1" ? match.player1_name : match.player2_name}
          player={winner}
        />
      )}

      {/* Fullscreen button */}
      {!isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-40 rounded-lg glass p-2 opacity-30 transition-opacity hover:opacity-100"
        >
          <Maximize className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Top bar */}
      <div className="z-10 flex w-full max-w-7xl items-center justify-between">
        <img
          src={tokyoLogo}
          alt="Tokyo Pool"
          className="h-14 w-14 rounded-full object-cover lg:h-20 lg:w-20"
        />
        <div className="flex flex-col items-center">
          <h1 className="font-display text-2xl font-bold uppercase tracking-[0.2em] text-billiard glow-billiard lg:text-4xl">
            TOKYO POOL
          </h1>
          <div className="glass mt-1 rounded-full px-4 py-1">
            <p className="font-display text-sm tracking-wider text-muted-foreground lg:text-base">
              RACE TO {match.race_to}
            </p>
          </div>
        </div>
        <img
          src={hexmenLogo}
          alt="HEX MEN"
          className="h-10 w-auto object-contain lg:h-16"
        />
      </div>

      {/* Main scoreboard */}
      <div className="z-10 flex w-full max-w-7xl flex-1 items-center justify-center gap-4 lg:gap-8">
        <PlayerPanel
          name={match.player1_name}
          score={match.player1_score}
          image={match.player1_image}
          player="p1"
          isScoreChanged={scoreChanged === "p1"}
          isWinner={winner === "p1"}
        />

        {/* VS Divider */}
        <div className="flex flex-col items-center gap-3">
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:h-32" />
          <span className="font-display text-4xl font-bold text-muted-foreground lg:text-6xl">
            VS
          </span>
          <div className="h-20 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:h-32" />
        </div>

        <PlayerPanel
          name={match.player2_name}
          score={match.player2_score}
          image={match.player2_image}
          player="p2"
          isScoreChanged={scoreChanged === "p2"}
          isWinner={winner === "p2"}
        />
      </div>

      {/* Bottom bar */}
      <div className="z-10 flex w-full max-w-7xl items-center justify-center">
        <p className="font-body text-xs text-muted-foreground/50">
          Press F for fullscreen
        </p>
      </div>
    </div>
  );
};

export default Display;
