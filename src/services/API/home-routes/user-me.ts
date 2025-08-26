import API from "@/services/API";
import { AppRoutes } from "@/services/API/routes-enum";
import { UserType } from "@/services/store/auth-storage";


export default async function HomeRequest(): Promise<UserType> {
  try {
    const response = await API.get(AppRoutes.GET_USER)
    console.log("[LOG-HomeRequest]: ", response)
    return response.data
  } catch (error) {
    throw error
  }
}