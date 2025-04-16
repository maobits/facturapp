import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Platform } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { loginUser } from "../../src/services/auth/authService";
import { useUser } from "../../src/context/userProvider";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import config from "../../src/config/env"; // ✅ Asegúrate que este path esté bien

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUser();
  const { colors } = useTheme();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        Alert.alert("Campos requeridos", "Por favor completa los campos.");
        console.warn("🚨 Faltan campos por completar.");
        return;
      }

      console.log("🟡 Enviando solicitud de login a:", config.API_URL);
      const result = await loginUser(email, password);
      console.log("🟢 Respuesta recibida:", result);

      if (result.success) {
        console.log("✅ Sesión iniciada correctamente");
        login(result.user);
        Alert.alert("🎉 Bienvenido", `Hola, ${result.user.full_name}`);
        router.replace("/");
      } else {
        console.warn("⚠️ Error desde backend:", result.message);
        Alert.alert("❌ Error", result.message || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("🔴 Error al conectar con el servidor:", error);
      Alert.alert("Error", "No se pudo establecer conexión con el servidor.");
    }
  };

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <Text
          variant="headlineMedium"
          style={[
            styles.title,
            {
              color: colors.onSurface,
              fontFamily: "Montserrat-Bold",
              textAlign: "center",
            },
          ]}
        >
          Iniciar sesión
        </Text>

        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          mode="outlined"
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          style={[styles.button, { backgroundColor: colors.primary }]}
          contentStyle={{ paddingVertical: 6 }}
          labelStyle={{
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
            color: colors.onPrimary,
          }}
        >
          Ingresar
        </Button>

        <Button
          onPress={() => router.replace("/auth/register")}
          style={styles.link}
          labelStyle={{
            fontFamily: "Montserrat-Medium",
            color: colors.secondary,
          }}
        >
          ¿No tienes cuenta? Regístrate
        </Button>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#FFF", // sobrescrito por colors.surface
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 25,
    resizeMode: "contain",
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    width: "100%",
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
    width: "100%",
  },
  link: {
    marginTop: 15,
  },
});
