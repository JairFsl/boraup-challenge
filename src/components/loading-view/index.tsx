import { Image } from "expo-image";
import { View } from "react-native";
import { useStyles } from "./styles";

import GifImage from "@/assets/images/app_load.gif";

type LoadingScreenProps = {
  loading: boolean;
}

export default function LoadingView({ loading }: LoadingScreenProps) {
  const { styles } = useStyles()
  return (
    loading && (
      <View style={styles.container}>
        <Image source={GifImage} style={styles.image} />
      </View>
    )
  );
}