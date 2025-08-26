import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, useColorScheme } from "react-native";

export const useStyles = () => {
  const theme = useColorScheme() ?? "light"
  const themedValue = useThemeColor

  const styles = StyleSheet.create({
    default: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaultSemiBold: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 32,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    },
  });

  return {
    theme,
    styles
  }
}
