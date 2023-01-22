import getInitialThemeScheme from '@utils/getInitialThemeScheme';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IThemeContextData {
  isDarkMode: boolean;
  handleThemeChange: (value: boolean) => void;
}

type IThemeContextProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext({} as IThemeContextData);

export const ThemeContextProvider = ({
  children,
}: IThemeContextProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(undefined);

  useEffect(() => {
    const isDarkScheme = getInitialThemeScheme();

    setIsDarkMode(isDarkScheme === 'dark');
  }, []);

  function handleThemeChange(isDarkScheme: boolean) {
    const root = window.document.documentElement;
    // 1. Update React color-mode state
    setIsDarkMode(isDarkScheme);
    // 2. Update localStorage
    localStorage.setItem('color-mode', isDarkScheme ? 'dark' : 'light');
    // 3. Update each color

    root.style.setProperty(
      '--theme-color',
      isDarkScheme ? '#161b3f' : '#fbfbfb',
    );

    root.style.setProperty(
      '--theme-color-light',
      isDarkScheme ? '#21285a' : '#fbfbfb',
    );

    root.style.setProperty(
      '--theme-text',
      isDarkScheme ? '#fbfbfb' : '#323232',
    );
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
