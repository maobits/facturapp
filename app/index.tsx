import React from "react";
import { View, StyleSheet, Platform, Image } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useUser } from "../src/context/userProvider";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen() {
  const { user, logout } = useUser();
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={[styles.card, { backgroundColor: colors.surface }]}>
        {/* Logo animado */}
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />

        {/* Bienvenida */}
        <Text
          variant="titleLarge"
          style={[styles.title, { color: colors.onSurface }]}
        >
          ¡Hola, {user?.full_name ?? "Invitado"}! 👋
        </Text>

        {/* Frase de impacto */}
        <Text
          variant="bodyMedium"
          style={{
            color: colors.onSurface,
            textAlign: "center",
            marginBottom: 20,
            lineHeight: 22,
          }}
        >
          Gestiona tus facturas de forma profesional, simple y segura. Con
          FacturApp, todo está al alcance de tu mano 📲.
        </Text>

        {/* Acciones */}
        {user ? (
          <Button
            mode="outlined"
            onPress={() => {
              logout();
              router.replace("/auth/login");
            }}
            style={styles.button}
            labelStyle={{
              fontSize: 16,
              color: colors.primary,
            }}
          >
            Cerrar sesión
          </Button>
        ) : (
          <>
            <Button
              mode="contained"
              onPress={() => router.replace("/auth/login")}
              style={[styles.button, { backgroundColor: colors.primary }]}
              labelStyle={{
                fontSize: 16,
                color: colors.onPrimary,
              }}
              contentStyle={{ paddingVertical: 6 }}
            >
              Iniciar sesión
            </Button>
            <Button
              mode="outlined"
              onPress={() => router.replace("/auth/register")}
              style={styles.button}
              labelStyle={{
                fontSize: 16,
                color: colors.primary,
              }}
            >
              Crear cuenta
            </Button>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "92%",
    padding: 30,
    borderRadius: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: "contain",
  },
  title: {
    marginBottom: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 10,
    borderWidth: Platform.OS === "android" ? 0.6 : 1,
  },
});
