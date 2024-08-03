import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext({ theme: "light" });

const LOCALE_STORAGE_THEME_KEY = "colorScheme";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const isDark = theme === "dark";
  const isLight = theme === "light";

  useEffect(() => {
    const savedColorScheme = localStorage.getItem(LOCALE_STORAGE_THEME_KEY);

    if (savedColorScheme) {
      setTheme(savedColorScheme);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    handleChange();

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem(LOCALE_STORAGE_THEME_KEY, newTheme);
    setTheme(newTheme);
  };

  const values = { theme, isDark, isLight, toggleTheme };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
