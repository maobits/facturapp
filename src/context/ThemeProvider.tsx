import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  MD3LightTheme,
  MD3DarkTheme,
  PaperProvider,
  configureFonts,
} from "react-native-paper";

// 🧩 Fuentes personalizadas compatibles con MD3 (con fontWeight corregido)
const fontConfig = {
  displayLarge: {
    fontFamily: "Raleway-Bold",
    fontWeight: "700" as "700",
    fontSize: 57,
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: "Raleway-Bold",
    fontWeight: "700" as "700",
    fontSize: 45,
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: "Raleway-Bold",
    fontWeight: "700" as "700",
    fontSize: 36,
    lineHeight: 44,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: "Montserrat-Bold",
    fontWeight: "700" as "700",
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500" as "500",
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: "Montserrat-Bold",
    fontWeight: "700" as "700",
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500" as "500",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: "Montserrat-Medium",
    fontWeight: "500" as "500",
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: "Montserrat-Regular",
    fontWeight: "400" as "400",
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
};

// 📏 Tamaños de fuente reutilizables (opcional)
export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 26,
};

// 🎨 Tema claro personalizado (colores del logo)
const LightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#FFA726", // Naranja principal del ícono
    secondary: "#2979FF", // Azul de textos principales
    background: "#FFFFFF", // Fondo blanco limpio
    surface: "#F5F5F5", // Superficies suaves
    text: "#222222", // Texto oscuro legible
    error: "#EF5350", // Rojo coral suave para errores
  },
  fonts: configureFonts({ config: fontConfig }),
};

// 🌙 Tema oscuro personalizado
const DarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FFA726",
    secondary: "#2979FF",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    error: "#EF5350",
  },
  fonts: configureFonts({ config: fontConfig }),
};

// 🌐 Contexto global para controlar el modo claro/oscuro
const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

// Hook para acceder fácilmente al contexto en cualquier componente
export const useThemeContext = () => useContext(ThemeContext);

// 🧱 Proveedor que aplica el tema a toda la app
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
}
