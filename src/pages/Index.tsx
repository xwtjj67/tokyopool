import { Link } from "react-router-dom";
import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="felt-bg flex min-h-screen flex-col items-center justify-center gap-10 p-6">
      <img
        src={tokyoLogo}
        alt="Tokyo Pool"
        className="h-36 w-36 rounded-full object-cover shadow-2xl"
        style={{ boxShadow: "0 0 60px hsl(145 80% 42% / 0.3)" }}
      />
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center font-display text-5xl font-bold uppercase tracking-[0.2em] text-billiard glow-billiard">
          TOKYO POOL
        </h1>
        <p className="text-center font-body text-lg text-muted-foreground">
          Live Scoreboard System
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to="/display">
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-56 rounded-xl glass font-display text-lg font-bold transition-transform hover:scale-105"
          >
            <Monitor className="mr-3 h-5 w-5" /> TV Display
          </Button>
        </Link>
        <Link to="/admin">
          <Button
            size="lg"
            className="h-16 w-56 rounded-xl bg-primary font-display text-lg font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
          >
            <Smartphone className="mr-3 h-5 w-5" /> Control Panel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
