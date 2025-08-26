import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = PixelRatio.roundToNearestPixel(width);
const guidelineBaseHeight = PixelRatio.roundToNearestPixel(height);

export const getScreenWidth = PixelRatio.roundToNearestPixel(width);
export const getScreenHeight = PixelRatio.roundToNearestPixel(height);

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

const SMALL_DEVICE_MAX_WIDTH = 375;
const MEDIUM_DEVICE_MAX_WIDTH = 414;
const LARGE_DEVICE_MIN_WIDTH = 415;

export const isSmallDevice =
  PixelRatio.roundToNearestPixel(width) <= SMALL_DEVICE_MAX_WIDTH;
export const isMediumDevice =
  PixelRatio.roundToNearestPixel(width) > SMALL_DEVICE_MAX_WIDTH &&
  width <= MEDIUM_DEVICE_MAX_WIDTH;
export const isLargeDevice =
  PixelRatio.roundToNearestPixel(width) >= LARGE_DEVICE_MIN_WIDTH;

export const fs = (size: number) => {
  let adjustedSize = size;

  const scale = width / guidelineBaseWidth;
  adjustedSize = size * scale;

  if (isIOS) {
    if (isSmallDevice) {
      adjustedSize *= 0.95;
    } else if (isLargeDevice) {
      adjustedSize *= 1.05;
    }
  } else if (isAndroid) {
    if (isSmallDevice) {
      adjustedSize *= 0.9;
    } else if (isLargeDevice) {
      adjustedSize *= 1.08;
    }
  }

  return (
    Math.round(PixelRatio.roundToNearestPixel(adjustedSize)) /
    PixelRatio.getFontScale()
  );
};

export const hfs = (size: number) => {
  let adjustedSize = size;
  const scale = width / guidelineBaseWidth;
  adjustedSize = size * scale;

  if (isAndroid) {
    adjustedSize *= 0.98;
  }

  return Math.round(PixelRatio.roundToNearestPixel(adjustedSize));
};

export const wp = (percentage: number) => {
  let adjustedWidth = (percentage / 100) * guidelineBaseWidth;
  const scale = width / guidelineBaseWidth;
  adjustedWidth = adjustedWidth * scale;

  if (isAndroid) {
    if (isSmallDevice) {
      adjustedWidth *= 0.98;
    }
  }

  return Math.round(PixelRatio.roundToNearestPixel(adjustedWidth));
};

export const w = (value: number) => {
  let adjustedValue = value;
  const scale = width / guidelineBaseWidth;
  adjustedValue = value * scale;

  if (isAndroid) {
    if (isSmallDevice) {
      adjustedValue *= 0.98;
    } else if (isLargeDevice) {
    }
  } else if (isIOS) {
    if (isSmallDevice) {
    }
  }

  return Math.round(PixelRatio.roundToNearestPixel(adjustedValue));
};

export const hp = (percentage: number) => {
  let adjustedHeight = (percentage / 100) * guidelineBaseHeight;
  const scale = height / guidelineBaseHeight;
  adjustedHeight = adjustedHeight * scale;

  if (isAndroid) {
    if (isSmallDevice) {
      adjustedHeight *= 0.98;
    }
  }

  return Math.round(PixelRatio.roundToNearestPixel(adjustedHeight));
};

export const h = (value: number) => {
  let adjustedValue = value;
  const scale = height / guidelineBaseHeight;
  adjustedValue = value * scale;

  if (isIOS) {
    if (isSmallDevice) {
      adjustedValue *= 0.97;
    } else if (isLargeDevice) {
      adjustedValue *= 1.03;
    }
  } else if (isAndroid) {
    if (isSmallDevice) {
      adjustedValue *= 0.95;
    } else if (isLargeDevice) {
      adjustedValue *= 1.05;
    }
  }

  return Math.round(PixelRatio.roundToNearestPixel(adjustedValue));
};
