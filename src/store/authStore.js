import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userId: null,           
      setToken: (token) => set({ token }),
      setUserId: (id) => set({ userId: id }), 
      clearToken: () => set({ token: null, userId: null }), 
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
