import { useThemeColor } from "@/hooks/useThemeColor";
import { fs, h, hp, w } from "@/services/utils/responsive";
import { StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
  const theme = useColorScheme() ?? "light"
  const themedValue = useThemeColor

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",

      gap: hp(7),
      paddingHorizontal: w(20),
    },

    HeaderView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      gap: h(20)
    },

    Image: {
      width: w(70),
      height: h(70)
    },

    Title: {
      height: hp(3),
      fontSize: fs(24),
      fontWeight: "bold",
      color: themedValue("text"),
      textAlign: "center",
    },

    Subtitle: {
      fontSize: fs(14),
      color: themedValue("text"),
      textAlign: "center",
      paddingHorizontal: w(20),
    },

    SectionView: {
      width: "100%",
      gap: h(15),
      paddingHorizontal: w(20),
    },

    BottomView: {
      width: "100%",
      paddingHorizontal: w(20),
    },

    Button: {
      alignItems: "center",
      justifyContent: "center",

      height: h(55),
      borderRadius: 10,

      backgroundColor: "#FF0135",
    },

    ButtonText: {
      fontSize: fs(16),
      color: "white",
      fontWeight: "bold",
    }
  })

  return {
    theme,
    styles
  }
}
