import { useTheme } from "react-native-paper";

import { theme as LightTheme } from "./Light";

export { LightTheme };

export type AppTheme = typeof LightTheme;
export const useAppTheme = () => useTheme<AppTheme>();
