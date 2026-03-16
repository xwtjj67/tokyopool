import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";

const IdleScreen = () => {
  return (
    <div className="felt-bg tv-hide-cursor flex h-screen w-screen flex-col items-center justify-center gap-8">
      <img
        src={tokyoLogo}
        alt="Tokyo Pool"
        className="h-40 w-40 rounded-full object-cover pulse-soft"
        style={{ animation: "float 4s ease-in-out infinite, pulseSoft 3s ease-in-out infinite" }}
      />
      <h1
        className="font-display text-6xl font-bold uppercase tracking-[0.3em] text-billiard glow-billiard"
      >
        TOKYO POOL
      </h1>
      <p className="font-body text-lg text-muted-foreground pulse-soft">
        Waiting for next match...
      </p>
      <div className="mt-8 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-primary"
            style={{
              animation: `pulseSoft 1.5s ease-in-out ${i * 0.3}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default IdleScreen;
