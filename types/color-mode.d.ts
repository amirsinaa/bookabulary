export type ColorModeType = 'dark' | 'light' | null;

export type ColorModeContextType = {
  colorMode: ColorModeType,
  setColorMode: React.Dispatch<React.SetStateAction<ColorModeType>>
}

export type ColorModeProviderPropsType = { children: React.ReactNode };