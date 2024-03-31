import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface IUser {
  user_id: string;
  name: string;
  email: string;
}

interface IUserStore extends IUser {
  updateUserDetails: (userData: Partial<IUser>) => void;
  logoutUser: () => void;
}

export const useUserStore = create<IUserStore>()(
  persist(
    (set, get) => ({
      email: "",
      name: "",
      user_id: "",
      updateUserDetails: (userData) =>
        set((state) => ({
          ...state,
          ...userData,
        })),
      logoutUser: () =>
        set(() => ({
          user_id: "",
          name: "",
          email: "",
        })),
    }),
    {
      name: "user-session-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        user_id: state.user_id,
        name: state.name,
        email: state.email,
      }),
    }
  )
);
