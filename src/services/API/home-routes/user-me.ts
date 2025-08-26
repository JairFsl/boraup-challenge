import { UserType } from "@/services/store/auth-storage";


export default async function HomeRequest(): Promise<UserType> {
  const mockUser: UserType = {
    id: "b4c1f2a8-3d6a-4e52-b9c1-9a5f4f89c123",
    name: "João Silva",
    email: "joao.silva@example.com",
    phone: "+55 11 98765-4321",
    birthday: "1990-05-15",
    documents: ["123.456.789-00", "MG-12.345.678"],
    verified: true,
    pixKey: "joao.silva@nubank.com.br",
    address: "Rua das Flores, 123 - São Paulo/SP",
    userType: "consumer",
    createdAt: new Date("2024-01-10T12:00:00Z"),
    updatedAt: new Date("2024-08-20T18:30:00Z"),
    verifiedEmail: true,
  }

  try {
    // const response = await API.get(AppRoutes.GET_USER)
    // console.log("[LOG-HomeRequest]: ", response)

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUser)
      }, 5000)
    })
  } catch (error) {
    throw error
  }
}