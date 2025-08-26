import ThemedText from "@/components/themed-text";
import { Colors } from "@/constants/Colors";
import { w } from "@/services/utils/responsive";
import { StyleProp, Text, TextInputProps, View, ViewStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useStyles } from "./styles";

interface BasicInputProps extends TextInputProps {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;

  containerStyle?: StyleProp<ViewStyle>
}

export default function BasicInput({ label, leftIcon, rightIcon, error, containerStyle, ...otherProps }: BasicInputProps) {
  const { styles, theme } = useStyles()

  return (
    <View style={[styles.Container, containerStyle]}>
      {label && (
        <ThemedText>{label}</ThemedText>
      )}
      <View style={[styles.InputContainer, error && { borderColor: "red" }]}>
        {leftIcon}
        <TextInput style={[styles.Input, { paddingLeft: leftIcon ? w(10) : 0 }]} placeholderTextColor={Colors[theme].icon} {...otherProps} />
        {rightIcon}
      </View>

      <Text style={styles.InputError}>{error}</Text>
    </View>
  )
}