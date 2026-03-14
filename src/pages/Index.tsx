import { Link } from "react-router-dom";
import tokyoLogo from "@/assets/tokyo-pool-logo.jpg";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background p-6">
      <img
        src={tokyoLogo}
        alt="Tokyo Pool"
        className="h-32 w-32 rounded-full object-cover"
      />
      <h1 className="text-center font-display text-4xl font-extrabold tracking-wider text-gold glow-gold">
        TOKYO POOL
      </h1>
      <p className="text-center font-display text-lg text-muted-foreground">
        Live Scoreboard System
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Link to="/display">
          <Button
            size="lg"
            className="h-16 w-52 bg-primary font-display text-lg font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Monitor className="mr-2 h-5 w-5" /> TV Display
          </Button>
        </Link>
        <Link to="/admin">
          <Button
            size="lg"
            className="h-16 w-52 bg-gold font-display text-lg font-bold text-background hover:bg-gold/90"
          >
            <Smartphone className="mr-2 h-5 w-5" /> Control Panel
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;
