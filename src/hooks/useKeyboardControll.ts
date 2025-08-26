import { useEffect } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";
import { runOnUI, useSharedValue } from "react-native-reanimated";

const OFFSET = 150;

export const useKeyboardControll = () => {
  const height = useSharedValue(OFFSET);

  useEffect(() => {
    let currentKeyboardHeight = 0;

    const updateHeight = (keyboardHeight: number) => {
      runOnUI(() => {
        "worklet";
        height.value = Math.max(keyboardHeight, OFFSET);
      })();
      currentKeyboardHeight = keyboardHeight;
    };

    const onKeyboardShow = (e: KeyboardEvent) => {
      updateHeight(e.endCoordinates.height);
    };

    const onKeyboardChange = (e: KeyboardEvent) => {
      if (e.endCoordinates.height !== currentKeyboardHeight) {
        updateHeight(e.endCoordinates.height);
      }
    };

    const onKeyboardHide = () => {
      runOnUI(() => {
        "worklet";
        height.value = OFFSET;
      })();
      currentKeyboardHeight = 0;
    };

    const listeners = [
      Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
        onKeyboardShow
      ),
      Keyboard.addListener("keyboardWillChangeFrame", onKeyboardChange),
      Keyboard.addListener(
        Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
        onKeyboardHide
      ),
    ];

    return () => {
      listeners.forEach((l) => l.remove());
    };
  }, []);

  return { height };
};
