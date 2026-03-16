let sharedCtx: AudioContext | null = null;

function getCtx() {
  if (!sharedCtx || sharedCtx.state === "closed") {
    sharedCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (sharedCtx.state === "suspended") sharedCtx.resume();
  return sharedCtx;
}

export function playScoreSound(player: "p1" | "p2") {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const baseFreq = player === "p1" ? 520 : 420;
  osc.type = "sine";
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(baseFreq * 1.4, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.35);
}

export function playWinnerSound() {
  const ctx = getCtx();
  const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = freq;

    const start = ctx.currentTime + i * 0.15;
    gain.gain.setValueAtTime(0.3, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.5);

    osc.start(start);
    osc.stop(start + 0.5);
  });
}
