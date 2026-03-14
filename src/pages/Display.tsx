import { useMatch } from "@/hooks/useMatch";
import { useCallback, useEffect, useState } from "react";
import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";
import hexmenLogo from "@/assets/hexmen-logo.jpg";
import { User, Maximize } from "lucide-react";
import { playScoreSound } from "@/lib/sounds";

const Display = () => {
  const { match, loading, scoreChanged } = useMatch();
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
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="font-display text-2xl text-gold">Loading...</p>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="font-display text-2xl text-muted-foreground">No active match</p>
      </div>
    );
  }

  return (
    <div className="tv-hide-scrollbar relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-background p-6 lg:p-10">
      {/* Fullscreen button */}
      {!isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-50 rounded-lg bg-muted p-2 opacity-50 transition-opacity hover:opacity-100"
        >
          <Maximize className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Top: Title + Logo */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-display text-3xl font-extrabold tracking-widest text-gold glow-gold lg:text-5xl">
          TOKYO POOL • LIVE
        </h1>
        <img
          src={tokyoLogo}
          alt="Tokyo Pool"
          className="h-16 w-16 rounded-full object-cover lg:h-24 lg:w-24"
        />
        <p className="font-display text-sm tracking-wider text-muted-foreground lg:text-base">
          RACE TO {match.race_to}
        </p>
      </div>

      {/* Main scoreboard */}
      <div className="flex w-full max-w-7xl flex-1 items-center justify-center gap-4 lg:gap-8">
        {/* Player 1 */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-player1 glow-player1 lg:h-40 lg:w-40">
            {match.player1_image ? (
              <img
                src={match.player1_image}
                alt={match.player1_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <User className="h-12 w-12 text-player1 lg:h-16 lg:w-16" />
              </div>
            )}
          </div>
          <h2 className="font-display text-xl font-bold tracking-wide text-player1 lg:text-3xl">
            {match.player1_name}
          </h2>
          <div
            key={`p1-${match.player1_score}`}
            className={`font-display text-[12vh] font-black leading-none text-gold lg:text-[20vh] ${
              scoreChanged === "p1" ? "score-pop" : ""
            }`}
            style={{ textShadow: "0 0 40px hsl(192 100% 50% / 0.5)" }}
          >
            {match.player1_score}
          </div>
        </div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <span
            className="font-display text-5xl font-black text-gold glow-gold lg:text-8xl"
            style={{
              background: "linear-gradient(180deg, hsl(51 100% 60%), hsl(51 100% 40%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VS
          </span>
        </div>

        {/* Player 2 */}
        <div className="flex flex-1 flex-col items-center gap-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-player2 glow-player2 lg:h-40 lg:w-40">
            {match.player2_image ? (
              <img
                src={match.player2_image}
                alt={match.player2_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <User className="h-12 w-12 text-player2 lg:h-16 lg:w-16" />
              </div>
            )}
          </div>
          <h2 className="font-display text-xl font-bold tracking-wide text-player2 lg:text-3xl">
            {match.player2_name}
          </h2>
          <div
            key={`p2-${match.player2_score}`}
            className={`font-display text-[12vh] font-black leading-none text-gold lg:text-[20vh] ${
              scoreChanged === "p2" ? "score-pop" : ""
            }`}
            style={{ textShadow: "0 0 40px hsl(270 91% 65% / 0.5)" }}
          >
            {match.player2_score}
          </div>
        </div>
      </div>

      {/* Bottom: Sponsor logo */}
      <div className="flex flex-col items-center gap-1">
        <img
          src={hexmenLogo}
          alt="HEX MEN ERACHIDIA"
          className="h-12 w-auto object-contain lg:h-16"
        />
        <p className="font-body text-xs text-muted-foreground">Sponsored by HEX MEN ERACHIDIA</p>
      </div>
    </div>
  );
};

export default Display;
