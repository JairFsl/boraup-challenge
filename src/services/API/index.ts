import axios, { InternalAxiosRequestConfig } from "axios";
import { SECURE_STORE_KEYS } from "../store/secure-keys-enum";
import { SecureStorage } from "../store/secure-storage";
import { AppRoutes } from "./routes-enum";

const secureStorage = new SecureStorage()

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
})

const refreshAPI = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  }
})

const refreshLogin = async () => {
  try {
    const currentRefreshToken = await secureStorage.get(SECURE_STORE_KEYS.REFRESH_TOKEN)

    if (!currentRefreshToken) {
      throw new Error("Refresh token indisponível!")
    }

    const responseRefresh = await refreshAPI.post(AppRoutes.REFRESH_TOKEN, {
      refreshToken: currentRefreshToken
    })

    if (!responseRefresh.data.accessToken || !responseRefresh.data.refreshToken) {
      throw new Error("Falha ao obter novos tokens da API!")
    }

    await Promise.all([
      secureStorage.set(SECURE_STORE_KEYS.TOKEN, responseRefresh.data.accessToken),
      secureStorage.set(SECURE_STORE_KEYS.REFRESH_TOKEN, responseRefresh.data.refreshToken)
    ])

    return responseRefresh.data.accessToken
  } catch (error) {
    console.log("[RefreshLogin]: ", error)
    await secureStorage.removeKeys([
      SECURE_STORE_KEYS.TOKEN,
      SECURE_STORE_KEYS.REFRESH_TOKEN,
      SECURE_STORE_KEYS.CURRENT_USER_DATA,
    ]);
    throw error
  }
}

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("[ERROR-AxiosInterceptor-Response]: ", error);
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 403 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshLogin()

        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `${!newToken.includes("Bearer") ? `Bearer ${newToken}` : newToken}`;
        }

        return API(originalRequest);
      } catch (error) {
        console.log("[Refresh Token]: ", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default API