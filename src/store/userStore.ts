import { create } from "zustand";
import { User } from "../utils/types";

export interface UserStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  setLoading: (value: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null as User | null,
  isLoading: false,

  setUser: (user: User) => set({ user }),
  setLoading: (value: boolean) => set({ isLoading: value }),
  logout: () => set({ user: null }),
}));
