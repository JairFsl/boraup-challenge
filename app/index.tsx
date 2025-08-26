import AuthStorage from "@/services/store/auth-storage";
import { Redirect } from "expo-router";

export default function InitialRoot() {
  const { hasLogin } = AuthStorage()

  if (!hasLogin) {
    return <Redirect href={"/(auth)/login"} />
  }

  return <Redirect href={"/(pages)/home"} />;
}