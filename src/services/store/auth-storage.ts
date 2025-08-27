import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  birthday: Date | null;
  documents: string[];
  verified: boolean;
  pixKey: string | null;
  address: string | null;
  userType: "consumer" | "otherType";
  createdAt: Date;
  updatedAt: Date;
  verifiedEmail: boolean
}

type AuthStorageDataType = {
  user?: UserType;
  hasLogin: boolean;
  loading: boolean;
}

type AuthStorageActionsType = {
  login: (data?: UserType) => void;
  logout: () => void;

  onLoading: () => void;
  offLoading: () => void;
}

const AuthStorage = create<AuthStorageDataType & AuthStorageActionsType>()(
  persist(
    (set) => ({
      user: undefined,
      hasLogin: false,
      loading: false,

      login: (data?: UserType): void => {
        if (data) set({ user: data })
        set({ hasLogin: true })
      },

      logout: (): void => {
        set({ user: undefined, hasLogin: false });
      },

      onLoading: (): void => {
        set({ loading: true })
      },
      offLoading: (): void => {
        set({ loading: false })
      }
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)

export default AuthStorage