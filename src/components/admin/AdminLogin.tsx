import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock } from "lucide-react";

interface AdminLoginProps {
  onLogin: () => void;
}

const ADMIN_PASSWORD = "ADMIN123";

const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="felt-bg flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="glass-strong flex flex-col items-center gap-6 rounded-2xl p-8 w-full max-w-sm">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
          <Lock className="h-8 w-8 text-primary" />
        </div>
        <h1 className="font-display text-2xl font-bold uppercase tracking-wider text-foreground">
          Staff Login
        </h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`h-12 rounded-xl text-center font-display text-lg ${error ? "border-destructive animate-shake" : ""}`}
            autoFocus
          />
          {error && (
            <p className="text-center text-sm text-destructive font-display">
              Wrong password
            </p>
          )}
          <Button
            type="submit"
            className="h-12 rounded-xl bg-primary font-display text-base font-bold text-primary-foreground"
          >
            Enter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
