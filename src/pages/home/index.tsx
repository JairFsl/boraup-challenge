import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BasicInput from "@/components/basic-input";
import LoadingView from "@/components/loading-view";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { Colors } from "@/constants/Colors";
import HomeRequest from "@/services/API/home-routes/user-me";
import AuthStorage from "@/services/store/auth-storage";
import FormatPhone from "@/services/utils/format-phone";
import { w } from "@/services/utils/responsive";
import { Feather } from "@expo/vector-icons";
import { useStyles } from "./styles";


export default function HomePage() {
  const { styles, theme } = useStyles()
  const { logout } = AuthStorage()

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["home-data"],
    queryFn: HomeRequest,
    refetchInterval: 5000
  })

  const handleLogout = () => {
    logout()
    router.replace("/(auth)/login")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.Container}>
        {data && (
          <>
            <ThemedText type="title">Seu Usuário:</ThemedText>
            <View style={styles.infoView}>
              <Feather name="info" size={24} color={Colors[theme].icon} />
              <ThemedText type="default">Não é possível editar os campos abaixo</ThemedText>
            </View>
          </>
        )}

        {data ? (
          <View style={{ width: "100%" }}>
            <BasicInput
              label="Nome:"
              value={data.name}
              editable={false}
            />
            <BasicInput
              label="Email:"
              value={data.email}
              editable={false}
            />
            <View style={{ flexDirection: "row", gap: w(10) }}>
              <BasicInput
                label="Contato:"
                value={FormatPhone(data.phone) || ""}
                editable={false}
                containerStyle={{ flex: 1 }}
              />
              <BasicInput
                label="Data de Nascimento:"
                value={data.birthday ? format(data.birthday, "dd/MM/yyyy") : ""}
                editable={false}
                containerStyle={{ flex: 1 }}
              />
            </View>

            <BasicInput
              label="Chave do Pix:"
              value={data.pixKey || ""}
              editable={false}
            />
            <BasicInput
              label="Endereço:"
              value={data.address || ""}
              editable={false}
            />
          </View>
        ) : (
          <View style={styles.errorView}>
            <ThemedText type="subtitle">Falha ao buscar seus dados...</ThemedText>
            <TouchableOpacity onPress={() => refetch()} style={styles.button}>
              <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>SAIR</Text>
        </TouchableOpacity>
      </ThemedView>
      <LoadingView loading={isLoading} />
    </SafeAreaView>
  )
}