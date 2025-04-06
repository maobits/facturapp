// app/index.tsx

// Importamos los componentes básicos de React Native
import { View, Text } from "react-native";

// Importamos Link desde expo-router para navegar entre pantallas
import { Link } from "expo-router";

// Creamos y exportamos una función llamada HomeScreen
export default function HomeScreen() {
  return (
    // View es el contenedor principal de la pantalla, con estilo centrado
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Texto grande que dice "Pantalla Principal" */}
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Pantalla Principal</Text>

      {/* Enlace que lleva a la ruta /about */}
      <Link href="/about" style={{ fontSize: 18, color: "#007AFF" }}>
        Ir a /about →
      </Link>
    </View>
  );
}
