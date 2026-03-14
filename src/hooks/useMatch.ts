import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Match {
  id: string;
  player1_name: string;
  player2_name: string;
  player1_score: number;
  player2_score: number;
  player1_image: string | null;
  player2_image: string | null;
  race_to: number;
  is_active: boolean;
}

export function useMatch() {
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [scoreChanged, setScoreChanged] = useState<"p1" | "p2" | null>(null);

  const fetchMatch = useCallback(async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!error && data) {
      setMatch((prev) => {
        if (prev) {
          if (data.player1_score !== prev.player1_score) setScoreChanged("p1");
          else if (data.player2_score !== prev.player2_score) setScoreChanged("p2");
        }
        return data;
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMatch();

    const channel = supabase
      .channel("matches-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "matches" },
        () => fetchMatch()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchMatch]);

  useEffect(() => {
    if (scoreChanged) {
      const timer = setTimeout(() => setScoreChanged(null), 500);
      return () => clearTimeout(timer);
    }
  }, [scoreChanged]);

  const updateMatch = useCallback(
    async (updates: Partial<Match>) => {
      if (!match) return;
      await supabase.from("matches").update(updates).eq("id", match.id);
    },
    [match]
  );

  const resetMatch = useCallback(async () => {
    if (!match) return;
    await supabase
      .from("matches")
      .update({ player1_score: 0, player2_score: 0 })
      .eq("id", match.id);
  }, [match]);

  const swapPlayers = useCallback(async () => {
    if (!match) return;
    await supabase
      .from("matches")
      .update({
        player1_name: match.player2_name,
        player2_name: match.player1_name,
        player1_score: match.player2_score,
        player2_score: match.player1_score,
        player1_image: match.player2_image,
        player2_image: match.player1_image,
      })
      .eq("id", match.id);
  }, [match]);

  const newMatch = useCallback(async () => {
    if (match) {
      await supabase.from("matches").update({ is_active: false }).eq("id", match.id);
    }
    await supabase.from("matches").insert({
      player1_name: "Player 1",
      player2_name: "Player 2",
      player1_score: 0,
      player2_score: 0,
      race_to: match?.race_to ?? 5,
    });
  }, [match]);

  const uploadPlayerImage = useCallback(
    async (player: 1 | 2, file: File) => {
      if (!match) return;
      const ext = file.name.split(".").pop();
      const path = `${match.id}/player${player}.${ext}`;
      
      await supabase.storage.from("player-images").upload(path, file, { upsert: true });
      
      const { data } = supabase.storage.from("player-images").getPublicUrl(path);
      const url = data.publicUrl + "?t=" + Date.now();
      
      await supabase
        .from("matches")
        .update(player === 1 ? { player1_image: url } : { player2_image: url })
        .eq("id", match.id);
    },
    [match]
  );

  return {
    match,
    loading,
    scoreChanged,
    updateMatch,
    resetMatch,
    swapPlayers,
    newMatch,
    uploadPlayerImage,
  };
}
