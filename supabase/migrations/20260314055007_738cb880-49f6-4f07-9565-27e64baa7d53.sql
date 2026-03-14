
-- Create matches table
CREATE TABLE public.matches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player1_name TEXT NOT NULL DEFAULT 'Player 1',
  player2_name TEXT NOT NULL DEFAULT 'Player 2',
  player1_score INTEGER NOT NULL DEFAULT 0,
  player2_score INTEGER NOT NULL DEFAULT 0,
  player1_image TEXT,
  player2_image TEXT,
  race_to INTEGER NOT NULL DEFAULT 5,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read matches (display page needs this)
CREATE POLICY "Anyone can view matches" ON public.matches FOR SELECT USING (true);

-- Allow anyone to insert matches (no auth for simplicity)
CREATE POLICY "Anyone can insert matches" ON public.matches FOR INSERT WITH CHECK (true);

-- Allow anyone to update matches
CREATE POLICY "Anyone can update matches" ON public.matches FOR UPDATE USING (true);

-- Allow anyone to delete matches
CREATE POLICY "Anyone can delete matches" ON public.matches FOR DELETE USING (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;

-- Create storage bucket for player images
INSERT INTO storage.buckets (id, name, public) VALUES ('player-images', 'player-images', true);

CREATE POLICY "Anyone can view player images" ON storage.objects FOR SELECT USING (bucket_id = 'player-images');
CREATE POLICY "Anyone can upload player images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'player-images');
CREATE POLICY "Anyone can update player images" ON storage.objects FOR UPDATE USING (bucket_id = 'player-images');
CREATE POLICY "Anyone can delete player images" ON storage.objects FOR DELETE USING (bucket_id = 'player-images');

-- Insert a default active match
INSERT INTO public.matches (player1_name, player2_name, player1_score, player2_score, race_to)
VALUES ('Player 1', 'Player 2', 0, 0, 5);
