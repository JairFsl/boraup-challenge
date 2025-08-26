import { Feather } from "@expo/vector-icons";
import * as Haptics from 'expo-haptics';
import { Image } from "expo-image";
import { useCallback, useMemo, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import BasicInput from "@/components/basic-input";
import ThemedText from "@/components/themed-text";
import ThemedView from "@/components/themed-view";
import { Colors } from "@/constants/Colors";
import { useKeyboardControll } from "@/hooks/useKeyboardControll";
import LoginRequest from "@/services/API/auth-routes/login";
import AuthStorage from "@/services/store/auth-storage";
import { h, hp, w } from "@/services/utils/responsive";
import { useStyles } from "./styles";

import LoadingGif from "@/assets/images/app_load.gif";
import BoraUpLogo from "@/assets/images/splash-icon.png";
import { AxiosError } from "axios";

interface FormFields {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { height } = useKeyboardControll()
  const { styles, theme } = useStyles()
  const { onLoading, loading, offLoading, login } = AuthStorage()
  const [form, setForm] = useState<FormFields>({
    email: "",
    password: ""
  })
  const [secureText, setSecureText] = useState<boolean>(true)
  const [emailError, setEmailError] = useState<string>("")


  const keyboardPadding = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, []);


  const isValidEmail = (e: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(e)
  }

  const handleFormFields = useCallback(<T extends keyof FormFields>(field: keyof FormFields, value: FormFields[T]) => {
    if (field === "email") {
      setEmailError("")
    }

    setForm(prev => ({
      ...prev,
      [field]: value
    }))
  }, [setForm])

  const handleSubmit = useCallback(async () => {
    onLoading()
    try {
      await LoginRequest(form)
      login()

    } catch (error) {
      console.log("[ERROR-handleSubmit-Login]: ", error)
      if (error instanceof AxiosError) {
        handleFormFields("password", "")
        return Alert.alert("Ops!", error.response?.data.message)
      }
      return Alert.alert("Atenção!", "Um erro ocorreu, por favor tente novamente!")
    } finally {
      offLoading()
    }
  }, [form])

  const disabledButton = useMemo(() => {
    if (loading) {
      return false
    }
    if (form.email.length > 3 && isValidEmail(form.email) && form.password.length > 3) {
      return false
    }
    return true
  }, [form])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.Container}>
        <View style={styles.HeaderView}>
          <Image style={styles.Image} source={BoraUpLogo} />

          <View style={[styles.HeaderView, { gap: hp(1) }]}>
            <ThemedText style={styles.Title}>BoraUp App</ThemedText>
            <ThemedText style={styles.Subtitle}>Impulsione seu negócio com a melhor plataforma de gestão de vendas</ThemedText>
          </View>
        </View>

        <Animated.View style={[keyboardPadding, { width: "100%" }]}>
          <View style={styles.SectionView}>
            <BasicInput
              label="Email"
              placeholder="Digite seu email"
              value={form.email}
              error={emailError}
              autoCapitalize="none"
              inputMode="email"
              onChangeText={(e) => handleFormFields("email", e)}
              onBlur={() => {
                if (form.email.length > 0 && !isValidEmail(form.email)) {
                  setEmailError("Email inválido")
                  Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                  )
                }
              }}
              leftIcon={
                <Feather name="mail" size={h(15)} color={Colors[theme].icon} />
              }

            />
            <BasicInput
              label="Senha"
              placeholder="••••••••"
              value={form.password}
              secureTextEntry={secureText}
              autoCapitalize="none"
              onChangeText={(e) => handleFormFields("password", e)}
              leftIcon={
                <Feather name="lock" size={h(15)} color={Colors[theme].icon} />
              }
              rightIcon={
                <TouchableOpacity onPress={() => setSecureText(prev => !prev)}>
                  {secureText ? (
                    <Feather name="eye-off" size={h(15)} color={Colors[theme].icon} />
                  ) : (
                    <Feather name="eye" size={h(15)} color={Colors[theme].icon} />
                  )}
                </TouchableOpacity>
              }
            />
          </View>
        </Animated.View>

        <View style={styles.BottomView}>
          <TouchableOpacity onPress={handleSubmit} style={[styles.Button, { opacity: disabledButton ? 0.6 : 1 }]} disabled={disabledButton}>
            {loading ? (
              <Image source={LoadingGif} style={{ width: w(100), height: h(100) }} />
            ) : (
              <Text style={styles.ButtonText}>ENTRAR</Text>
            )}
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  )
}