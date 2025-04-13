// app/index.tsx

// Importamos View desde React Native
import { View } from "react-native";

// Importamos Text desde react-native-paper para aplicar el tema global
import { Text } from "react-native-paper";

// Importamos Link desde expo-router para navegación
import { Link } from "expo-router";

// Pantalla principal
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Texto estilizado con fuente y tamaño desde el tema */}
      <Text variant="headlineLarge" style={{ marginBottom: 20 }}>
        Pantalla Principal
      </Text>

      {/* Enlace de navegación con estilo base */}
      <Link href="/about">
        <Text variant="bodyLarge" style={{ color: "#007AFF" }}>
          Ir a /about →
        </Text>
      </Link>
    </View>
  );
}
