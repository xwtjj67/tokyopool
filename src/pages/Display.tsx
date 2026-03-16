import { useMatch } from "@/hooks/useMatch";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";
import hexmenLogo from "@/assets/hexmen-logo.jpg";
import { Maximize } from "lucide-react";
import { playScoreSound } from "@/lib/sounds";
import IdleScreen from "@/components/display/IdleScreen";
import WinnerOverlay from "@/components/display/WinnerOverlay";
import PlayerPanel from "@/components/display/PlayerPanel";
import ArenaBackground from "@/components/display/ArenaBackground";

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
      <div className="arena-bg flex h-screen items-center justify-center">
        <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!match) {
    return <IdleScreen />;
  }

  return (
    <div className="arena-bg tv-hide-scrollbar tv-hide-cursor relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
      <ArenaBackground />

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
          className="absolute right-4 top-4 z-40 rounded-lg glass p-2 opacity-20 transition-opacity hover:opacity-100"
        >
          <Maximize className="h-5 w-5 text-foreground" />
        </button>
      )}

      {/* Top branding bar */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 flex w-full items-center justify-between px-8 lg:px-16 mb-4"
      >
        <img
          src={tokyoLogo}
          alt="Tokyo Pool"
          className="h-10 w-10 rounded-full object-cover lg:h-14 lg:w-14 ring-2 ring-primary/30"
        />
        <div className="flex flex-col items-center">
          <h1 className="font-display text-lg font-bold uppercase tracking-[0.3em] text-billiard glow-billiard lg:text-2xl">
            TOKYO POOL
          </h1>
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-cyan-accent glow-cyan lg:text-xs mt-0.5">
            Tournament Arena
          </p>
        </div>
        <img
          src={hexmenLogo}
          alt="HEX MEN"
          className="h-7 w-auto object-contain lg:h-10 opacity-80"
        />
      </motion.div>

      {/* Table number indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="z-10 mb-3"
      >
        <div className="glass-arena rounded-full px-5 py-1 border border-border/30">
          <p className="font-display text-[10px] tracking-[0.3em] uppercase text-muted-foreground lg:text-xs">
            Live Match
          </p>
        </div>
      </motion.div>

      {/* ═══════ MAIN SCOREBOARD BAR ═══════ */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0.85, y: 20 }}
        animate={{ opacity: 1, scaleX: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        className="z-10 w-[95%] max-w-[1600px]"
      >
        <div
          className="glass-arena relative flex items-center rounded-2xl lg:rounded-3xl overflow-hidden"
          style={{
            boxShadow:
              "0 0 60px hsl(var(--player1) / 0.08), 0 0 60px hsl(var(--player2) / 0.08), 0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Left neon edge accent */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] neon-line-glow"
            style={{ backgroundColor: "hsl(var(--player1))" }}
          />

          {/* Right neon edge accent */}
          <div
            className="absolute right-0 top-0 bottom-0 w-[3px] neon-line-glow"
            style={{ backgroundColor: "hsl(var(--player2))" }}
          />

          {/* Content */}
          <div className="flex w-full items-center px-5 py-4 lg:px-10 lg:py-6">
            {/* Player 1 side */}
            <PlayerPanel
              name={match.player1_name}
              score={match.player1_score}
              image={match.player1_image}
              player="p1"
              isScoreChanged={scoreChanged === "p1"}
              isWinner={winner === "p1"}
            />

            {/* VS Divider */}
            <div className="flex flex-col items-center justify-center mx-3 lg:mx-6 flex-shrink-0">
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-muted-foreground/20 to-transparent lg:h-10" />
              <div
                className="font-display text-base lg:text-2xl font-bold my-2"
                style={{
                  color: "hsl(var(--cyan))",
                  textShadow: "0 0 20px hsl(var(--cyan) / 0.5)",
                }}
              >
                VS
              </div>
              <div className="h-6 w-px bg-gradient-to-b from-transparent via-muted-foreground/20 to-transparent lg:h-10" />
            </div>

            {/* Player 2 side */}
            <PlayerPanel
              name={match.player2_name}
              score={match.player2_score}
              image={match.player2_image}
              player="p2"
              isScoreChanged={scoreChanged === "p2"}
              isWinner={winner === "p2"}
            />
          </div>
        </div>
      </motion.div>

      {/* Race-to indicator below scoreboard */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="z-10 mt-4"
      >
        <div
          className="glass-arena rounded-full px-6 py-1.5 border border-border/20"
          style={{
            boxShadow: "0 0 20px hsl(var(--cyan) / 0.1)",
          }}
        >
          <p className="font-display text-xs tracking-[0.25em] uppercase lg:text-sm">
            <span className="text-muted-foreground">Race to </span>
            <span
              className="font-bold"
              style={{
                color: "hsl(var(--cyan))",
                textShadow: "0 0 10px hsl(var(--cyan) / 0.5)",
              }}
            >
              {match.race_to}
            </span>
          </p>
        </div>
      </motion.div>

      {/* Bottom hint */}
      <div className="absolute bottom-3 z-10">
        <p className="font-body text-[9px] text-muted-foreground/20 tracking-wider">
          Press F for fullscreen
        </p>
      </div>
    </div>
  );
};

export default Display;
