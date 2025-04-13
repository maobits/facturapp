// app/_layout.tsx

// 🎯 Slot es el componente de expo-router que renderiza la pantalla activa
import { Slot } from "expo-router";

// 📦 SafeAreaView asegura que el contenido respete los bordes seguros del dispositivo
import { SafeAreaView } from "react-native";

// 🌐 Importamos nuestro ThemeProvider personalizado (modo oscuro/claro y fuentes)
import { ThemeProvider } from "../src/context/ThemeProvider"; // Usa "../src/context/ThemeProvider" si no tienes alias

// 🧱 Layout global que envuelve toda la app
export default function Layout() {
  return (
    // 🌍 Envolvemos todo en nuestro ThemeProvider (incluye PaperProvider por dentro)
    <ThemeProvider>
      {/* 🛟 Contenedor que evita superposiciones con la barra de estado */}
      <SafeAreaView style={{ flex: 1 }}>
        <Slot />
      </SafeAreaView>
    </ThemeProvider>
  );
}
