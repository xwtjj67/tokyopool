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
    <div className="felt-bg tv-hide-scrollbar tv-hide-cursor relative flex h-screen w-screen flex-col overflow-hidden">
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
      <div className="z-10 flex w-full items-center justify-between px-6 pt-4 lg:px-10 lg:pt-6">
        <img
          src={tokyoLogo}
          alt="Tokyo Pool"
          className="h-12 w-12 rounded-full object-cover lg:h-16 lg:w-16"
        />
        <div className="flex flex-col items-center">
          <h1 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-billiard glow-billiard lg:text-3xl">
            TOKYO POOL
          </h1>
          <div className="glass mt-1 rounded-full px-4 py-0.5">
            <p className="font-display text-xs tracking-wider text-muted-foreground lg:text-sm">
              RACE TO {match.race_to}
            </p>
          </div>
        </div>
        <img
          src={hexmenLogo}
          alt="HEX MEN"
          className="h-8 w-auto object-contain lg:h-12"
        />
      </div>

      {/* Main scoreboard - takes remaining space */}
      <div className="z-10 flex flex-1 items-stretch gap-3 px-6 py-4 lg:gap-6 lg:px-10 lg:py-6">
        <PlayerPanel
          name={match.player1_name}
          score={match.player1_score}
          image={match.player1_image}
          player="p1"
          isScoreChanged={scoreChanged === "p1"}
          isWinner={winner === "p1"}
        />

        {/* VS Divider */}
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:h-24" />
          <span className="font-display text-2xl font-bold text-muted-foreground/60 lg:text-4xl">
            VS
          </span>
          <div className="h-16 w-px bg-gradient-to-b from-transparent via-border to-transparent lg:h-24" />
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
      <div className="z-10 flex w-full items-center justify-center pb-3">
        <p className="font-body text-[10px] text-muted-foreground/30">
          Press F for fullscreen
        </p>
      </div>
    </div>
  );
};

export default Display;
