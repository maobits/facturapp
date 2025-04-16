import React, { useState } from "react";
import { View, StyleSheet, Image, Alert, Platform } from "react-native";
import { TextInput, Button, Text, useTheme } from "react-native-paper";
import { registerUser } from "../../src/services/auth/authService";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();

  const handleRegister = async () => {
    // 1. Validar campos vacíos
    if (!fullName || !email || !password) {
      Alert.alert("❗ Faltan campos", "Por favor completa todos los campos.");
      return;
    }

    // 2. Validar formato del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "📧 Correo inválido",
        "Ingresa un correo electrónico válido."
      );
      return;
    }

    // 3. Validar longitud mínima de contraseña
    if (password.length < 6) {
      Alert.alert(
        "🔒 Contraseña débil",
        "La contraseña debe tener al menos 6 caracteres."
      );
      return;
    }

    // 4. Enviar datos al backend
    const result = await registerUser(fullName, email, password);
    if (result.success) {
      Alert.alert("✅ Registro exitoso", "Ahora puedes iniciar sesión");
      router.replace("/auth/login");
    } else {
      Alert.alert("❌ Error", result.message);
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
          Crear Cuenta
        </Text>

        <TextInput
          label="Nombre completo"
          value={fullName}
          onChangeText={setFullName}
          mode="outlined"
          style={styles.input}
        />

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
          onPress={handleRegister}
          style={[styles.button, { backgroundColor: colors.primary }]}
          contentStyle={{ paddingVertical: 6 }}
          labelStyle={{
            fontFamily: "Montserrat-Bold",
            fontSize: 16,
            color: colors.onPrimary,
          }}
        >
          Registrarse
        </Button>

        <Button
          onPress={() => router.replace("/auth/login")}
          style={styles.link}
          labelStyle={{
            fontFamily: "Montserrat-Medium",
            color: colors.secondary,
          }}
        >
          ¿Ya tienes cuenta? Inicia sesión
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
    alignItems: "center",
    backgroundColor: "#FFF", // sobrescrito por colors.surface
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 24,
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
