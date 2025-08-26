import { create } from "zustand";

export type UserType = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  birthday: string | null;
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

/**
 * A parte comentada permite a persistência de dados integrando com a biblioteca AsyncStorage.
 * Prefiro utilizar o AsyncStorage apenas para dados não sensíveis.
 * Como só é necessário a parte de autenticação para este desafio, então não utilizarei o AsyncStorage.
 */
const AuthStorage = create<AuthStorageDataType & AuthStorageActionsType>()(
  // persist(
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
  // {
  //   name: "auth-store",
  //   storage: createJSONStorage(() => AsyncStorage)
  // }
  // )
)

export default AuthStorage