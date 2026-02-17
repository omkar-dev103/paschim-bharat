// src/store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";

interface UserData {
  uid: string;
  name: string;
  email: string;
  profilePicture: string;
  bookmarks: string[];
}

interface AuthState {
  user: User | null;
  userData: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setUserData: (userData: UserData | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  addBookmark: (placeId: string) => void;
  removeBookmark: (placeId: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userData: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          isLoading: false,
        }),

      setUserData: (userData) => set({ userData }),

      setLoading: (loading) => set({ isLoading: loading }),

      logout: () =>
        set({
          user: null,
          userData: null,
          isAuthenticated: false,
        }),

      addBookmark: (placeId) => {
        const { userData } = get();
        if (userData) {
          set({
            userData: {
              ...userData,
              bookmarks: [...userData.bookmarks, placeId],
            },
          });
        }
      },

      removeBookmark: (placeId) => {
        const { userData } = get();
        if (userData) {
          set({
            userData: {
              ...userData,
              bookmarks: userData.bookmarks.filter((id) => id !== placeId),
            },
          });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        userData: state.userData,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);