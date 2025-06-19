import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blackOpacity70: string;
      blackOpacity80: string;
      error: string;
      success: string;
      warning: string;
      info: string;
      primary: string;
      primaryDark: string;
      secondary: string;
      textSecondary: string;
      border: string;
      background: string;
      text: string;
      white: string;
    };
  }
}
