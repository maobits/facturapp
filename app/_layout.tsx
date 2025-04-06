// app/_layout.tsx

// Importamos Slot para renderizar dinámicamente las rutas hijas
import { Slot } from "expo-router";

// Importamos SafeAreaView para respetar las zonas seguras del dispositivo
import { SafeAreaView } from "react-native";

// Importamos el proveedor de temas de react-native-paper
import { PaperProvider } from "react-native-paper";

// Definimos y exportamos el layout principal de la app
export default function Layout() {
  return (
    // Proveedor del tema de Material Design (react-native-paper)
    <PaperProvider>
      {/* Contenedor que respeta el área segura del dispositivo */}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Slot representa y muestra la pantalla activa según la ruta */}
        <Slot />
      </SafeAreaView>
    </PaperProvider>
  );
}
