export interface Profile {
  id: string;
  display_name: string | null;
  birth_date: string | null;
  birth_time: string | null;
  birth_place: string | null;
  birth_lat: number | null;
  birth_lng: number | null;
  gender: "male" | "female" | "other" | null;
  preferred_language: "th" | "en";
  free_readings_today: number;
  last_reading_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface Reading {
  id: string;
  user_id: string | null;
  session_id: string;
  messages: unknown[];
  systems_used: string[];
  birth_data: Record<string, unknown> | null;
  summary: string | null;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  title: string;
  source: string;
  system: string;
  language: string;
  content: string;
  chunk_index: number;
  metadata: Record<string, unknown>;
  created_at: string;
}
