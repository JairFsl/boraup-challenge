import { useThemeColor } from "@/hooks/useThemeColor";
import { h, hp, w } from "@/services/utils/responsive";
import { StyleSheet, useColorScheme } from "react-native";


export const useStyles = () => {
  const theme = useColorScheme() ?? "light"
  const themedValue = useThemeColor

  const styles = StyleSheet.create({
    Container: {
      flexDirection: "column",
      gap: h(2),
    },

    InputContainer: {
      flexDirection: "row",
      alignItems: "center",

      height: hp(5),
      paddingLeft: w(12),
      paddingRight: w(10),
      borderRadius: 10,

      borderWidth: 1,
      borderColor: themedValue("border")
    },

    Input: {
      flex: 1,
      height: hp(4.5),
      color: themedValue("text"),
    },

    InputError: {
      color: "red",

    }
  })

  return {
    theme,
    styles
  }
}