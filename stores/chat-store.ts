/**
 * Zustand store for chat-related client state.
 *
 * Manages birth data, form visibility, and language preference.
 */

import { create } from "zustand";

export interface BirthData {
  date: string;
  time: string;
  place: string;
  lat: number;
  lng: number;
}

interface ChatState {
  birthData: BirthData | null;
  setBirthData: (data: BirthData) => void;
  showBirthForm: boolean;
  setShowBirthForm: (show: boolean) => void;
  language: "th" | "en";
  setLanguage: (lang: "th" | "en") => void;
}

export const useChatStore = create<ChatState>((set) => ({
  birthData: null,
  setBirthData: (data) => set({ birthData: data, showBirthForm: false }),
  showBirthForm: true,
  setShowBirthForm: (show) => set({ showBirthForm: show }),
  language: "th",
  setLanguage: (lang) => set({ language: lang }),
}));
