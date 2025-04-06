// app/about.tsx

// Importamos componentes de React Native para la vista y texto
import { View, Text } from "react-native";

// Importamos Link desde expo-router para navegación entre pantallas
import { Link } from "expo-router";

// Definimos y exportamos la pantalla "AboutScreen"
export default function AboutScreen() {
  return (
    // Contenedor centrado en pantalla
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Texto principal de esta pantalla */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Acerca de FacturApp
      </Text>

      {/* Enlace para regresar a la pantalla de inicio ("/") */}
      <Link href="/" style={{ fontSize: 18, color: "#007AFF" }}>
        ← Volver a inicio
      </Link>
    </View>
  );
}
