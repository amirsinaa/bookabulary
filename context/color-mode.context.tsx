import type {
  ColorModeType,
  ColorModeContextType,
  ColorModeProviderPropsType
} from '@/types/color-mode';
import useLocalStorage from '@/hooks/use-local-storage'
import { createContext, useContext } from 'react';

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: null,
  setColorMode: () => undefined
})

function ColorModeProvider({ children }: ColorModeProviderPropsType) {
  const [colorMode, setColorMode] = useLocalStorage<ColorModeType>('dark-mode', 'light')

  const value = { colorMode, setColorMode }

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  )
}

function useColorMode() {
  const context = useContext(ColorModeContext);
  if (context === undefined) {
    throw new Error('You have used colorMode in a wrong context')
  }
  return context
}

export { ColorModeProvider, useColorMode }