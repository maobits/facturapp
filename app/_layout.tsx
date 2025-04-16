// app/_layout.tsx

// 🎯 Slot es el componente de expo-router que renderiza la pantalla activa según la ruta
import { Slot } from "expo-router";

// 📦 SafeAreaView asegura que el contenido respete los bordes seguros del dispositivo
import { SafeAreaView } from "react-native";

// 🌐 ThemeProvider gestiona el tema global (modo claro/oscuro, fuentes, colores)
import { ThemeProvider } from "../src/context/ThemeProvider";

// 👤 UserProvider gestiona la sesión del usuario en toda la app
import { UserProvider } from "../src/context/userProvider";

// 🧱 Layout global que envuelve toda la aplicación con el contexto de usuario y tema
export default function Layout() {
  return (
    // 🌐 Proveedor del contexto de usuario (manejo de sesión)
    <UserProvider>
      {/* 🎨 Proveedor del contexto de tema global */}
      <ThemeProvider>
        {/* 🛟 Asegura que el contenido no se solape con el notch, barra de estado, etc. */}
        <SafeAreaView style={{ flex: 1 }}>
          {/* 🔄 Muestra dinámicamente la pantalla activa según la navegación */}
          <Slot />
        </SafeAreaView>
      </ThemeProvider>
    </UserProvider>
  );
}
