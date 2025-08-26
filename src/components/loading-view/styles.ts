import { h, w } from "@/services/utils/responsive";
import { StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
  const theme = useColorScheme() ?? "light"

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      flex: 1,
      width: "100%",
      height: "100%",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,

      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,

      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },

    image: {
      width: w(150),
      height: h(150)
    }
  });

  return {
    theme,
    styles
  }
}
