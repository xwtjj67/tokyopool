const audioCtx = () => new (window.AudioContext || (window as any).webkitAudioContext)();

export function playScoreSound(player: "p1" | "p2") {
  const ctx = audioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Player 1 = bright rising tone, Player 2 = deep rising tone
  const baseFreq = player === "p1" ? 520 : 380;
  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(baseFreq * 1.5, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.4);
}
