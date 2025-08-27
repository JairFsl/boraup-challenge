import { fs, h, hp, w } from "@/services/utils/responsive";
import { StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
  const theme = useColorScheme() ?? "light"

  const styles = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",

      gap: h(20),
      paddingHorizontal: w(20),
    },

    Title: {
      fontSize: fs(22),
      fontWeight: "bold"
    },

    infoView: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",

      gap: w(5)
    },

    JsonContainer: {
      width: "100%",
      height: hp(50),
      paddingHorizontal: w(20),
      paddingVertical: h(20),
      borderRadius: 15,

      backgroundColor: "black"
    },

    JsonContent: {
      width: "70%",
      gap: h(5)
    },

    Indent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: w(20),
    },

    Text: {
      color: '#d4d4d4',
      fontSize: fs(16),
    },

    errorView: {
      width: "100%",
      alignItems: "center",
      justifyContent: "center",

      gap: h(20)
    },

    button: {
      alignItems: "center",
      justifyContent: "center",

      width: "100%",
      height: h(55),
      borderRadius: 10,

      backgroundColor: "#FF0135",

    },

    buttonText: {
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
