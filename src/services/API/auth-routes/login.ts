import API from "@/services/API";
import { SECURE_STORE_KEYS } from "@/services/store/secure-keys-enum";
import { SecureStorage } from "@/services/store/secure-storage";
import { AppRoutes } from "../routes-enum";

interface LoginRequestProps {
  email: string;
  password: string;
}

interface LoginRequestReturn {
  accessToken: string;
  refreshToken: string;
}


export default async function LoginRequest({ email, password }: LoginRequestProps): Promise<LoginRequestReturn> {
  try {
    const response = await API.post(AppRoutes.LOGIN, { email, password })
    console.log("[LOG-LoginRequest]: ", response)

    if (response.status === 200) {
      const secureStorage = new SecureStorage()
      secureStorage.set(SECURE_STORE_KEYS.TOKEN, response.data.accessToken)
      secureStorage.set(SECURE_STORE_KEYS.REFRESH_TOKEN, response.data.refreshToken)
    }

    return response.data
  } catch (error) {
    throw error
  }
}