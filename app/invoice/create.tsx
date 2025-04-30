// CreateInvoiceScreen.tsx
import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Platform,
  TextInput as RNTextInput,
} from "react-native";
import { Text, TextInput, Button, Menu, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import Invoice from "../../src/components/invoice/Invoice";
import DateTimePicker from "@react-native-community/datetimepicker";

// 🧾 Modelo de un ítem de factura
export interface InvoiceItem {
  description: string;
  quantity: string;
  price: string;
}

// 🌎 Lista de divisas comunes
const currencyOptions = ["USD", "EUR", "COP", "MXN", "ARS"];

// 🆔 Tipos de documento comunes
const idTypeOptions = [
  "Cédula de Ciudadanía",
  "NIT",
  "Cédula de Extranjería",
  "Pasaporte",
  "DNI",
  "RUC",
];

export default function CreateInvoiceScreen() {
  const [client, setClient] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [menuVisible, setMenuVisible] = useState(false);

  const [idType, setIdType] = useState("");
  const [idMenuVisible, setIdMenuVisible] = useState(false);

  const [idNumber, setIdNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: "", price: "" },
  ]);
  const [submitting, setSubmitting] = useState(false);
  const { colors } = useTheme();

  // Referencias para focus
  const clientRef = useRef<RNTextInput>(null);
  const idNumberRef = useRef<RNTextInput>(null);
  const emailRef = useRef<RNTextInput>(null);
  const phoneRef = useRef<RNTextInput>(null);

  const addItem = () => {
    setItems([...items, { description: "", quantity: "", price: "" }]);
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string
  ) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const calculateTotal = () =>
    items.reduce(
      (sum, item) =>
        sum + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0),
      0
    );

  const handleSubmit = () => {
    if (!client) {
      Alert.alert("❗ Nombre requerido", "Ingresa el nombre del cliente.");
      clientRef.current?.focus();
      return;
    }
    if (!idType) {
      Alert.alert("❗ Tipo de identificación", "Selecciona un tipo válido.");
      return;
    }
    if (!idNumber) {
      Alert.alert(
        "❗ Número requerido",
        "Ingresa el número de identificación."
      );
      idNumberRef.current?.focus();
      return;
    }
    if (!email) {
      Alert.alert("❗ Correo requerido", "Ingresa el correo electrónico.");
      emailRef.current?.focus();
      return;
    }
    if (!phone) {
      Alert.alert("❗ Celular requerido", "Ingresa el número de celular.");
      phoneRef.current?.focus();
      return;
    }

    const incomplete = items.some(
      (item) => !item.description || !item.quantity || !item.price
    );

    if (incomplete) {
      Alert.alert("❗ Error", "Todos los ítems deben estar completos.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert("✅ Factura creada", "¡Tu factura fue guardada con éxito!");
    }, 1500);
  };
  return (
    <LinearGradient
      colors={[colors.primary, colors.secondary]}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: colors.surface }]}>
          {/* Logo */}
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
          />

          {/* Título */}
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
            Crear Factura
          </Text>

          {/* Cliente */}
          <TextInput
            label="Nombre del Cliente"
            value={client}
            onChangeText={setClient}
            mode="outlined"
            style={styles.input}
            ref={clientRef}
          />

          {/* Tipo de Identificación */}
          <Menu
            visible={idMenuVisible}
            onDismiss={() => setIdMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIdMenuVisible(true)}
                style={styles.input}
                contentStyle={{ justifyContent: "space-between" }}
              >
                Tipo de Identificación: {idType || "Seleccionar"}
              </Button>
            }
          >
            {idTypeOptions.map((type) => (
              <Menu.Item
                key={type}
                onPress={() => {
                  setIdType(type);
                  setIdMenuVisible(false);
                }}
                title={type}
              />
            ))}
          </Menu>

          {/* Número de Identificación */}
          <TextInput
            label="Número de Identificación"
            value={idNumber}
            onChangeText={setIdNumber}
            keyboardType="numeric"
            mode="outlined"
            style={styles.input}
            ref={idNumberRef}
          />

          {/* Correo */}
          <TextInput
            label="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
            ref={emailRef}
          />

          {/* Celular */}
          <TextInput
            label="Celular"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
            ref={phoneRef}
          />

          {/* Divisa */}
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setMenuVisible(true)}
                style={styles.input}
                contentStyle={{ justifyContent: "space-between" }}
              >
                Divisa: {currency}
              </Button>
            }
          >
            {currencyOptions.map((c) => (
              <Menu.Item
                key={c}
                onPress={() => {
                  setCurrency(c);
                  setMenuVisible(false);
                }}
                title={c}
              />
            ))}
          </Menu>

          {/* Fecha */}
          <Button
            mode="outlined"
            onPress={() => setShowDatePicker(true)}
            style={styles.input}
            contentStyle={{ justifyContent: "space-between" }}
          >
            Fecha: {date.toLocaleDateString()}
          </Button>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              value={date}
              display="default"
              onChange={(_, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Lista de ítems */}
          {items.map((item, index) => (
            <Invoice
              key={index}
              index={index}
              item={item}
              currency={currency}
              onChange={updateItem}
            />
          ))}

          {/* Agregar ítem */}
          <Button
            mode="outlined"
            onPress={addItem}
            style={styles.button}
            labelStyle={{
              fontFamily: "Montserrat-Medium",
              color: colors.secondary,
            }}
          >
            + Agregar ítem
          </Button>

          {/* Total */}
          <Text
            style={[
              styles.total,
              {
                color: colors.onSurface,
                fontFamily: "Montserrat-Bold",
              },
            ]}
          >
            Total:{" "}
            {new Intl.NumberFormat("es", {
              style: "currency",
              currency: currency,
              minimumFractionDigits: 2,
            }).format(calculateTotal())}
          </Text>

          {/* Guardar Factura */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={submitting}
            disabled={submitting}
            style={[styles.button, { backgroundColor: colors.primary }]}
            labelStyle={{
              fontFamily: "Montserrat-Bold",
              fontSize: 16,
              color: colors.onPrimary,
            }}
          >
            Generar la factura
          </Button>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
    marginBottom: 24,
  },
  title: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    width: "100%",
  },
  button: {
    marginVertical: 8,
    width: "100%",
    borderRadius: 8,
    borderWidth: Platform.OS === "android" ? 0.6 : 1,
  },
  total: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
});
