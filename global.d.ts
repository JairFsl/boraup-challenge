// Permite importar imagens com os tipos abaixo como um Componente qualquer
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.png";
declare module "*.gif";
declare module "*.webp";
declare module "*.svg" {
  import type React from "react";
  import type { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
