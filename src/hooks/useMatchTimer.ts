import { useState, useEffect, useRef } from "react";

export function useMatchTimer(matchCreatedAt: string | null, isActive: boolean) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!matchCreatedAt || !isActive) {
      setElapsed(0);
      return;
    }

    const startTime = new Date(matchCreatedAt).getTime();

    const tick = () => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [matchCreatedAt, isActive]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;
  const formatted = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return { elapsed, formatted };
}
