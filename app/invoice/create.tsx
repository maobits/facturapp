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
import { saveInvoice } from "../../src/services/auth/invoice/invoiceService";

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

  const resetForm = () => {
    setClient("");
    setIdType("");
    setIdNumber("");
    setEmail("");
    setPhone("");
    setCurrency("USD");
    setDate(new Date());
    setItems([{ description: "", quantity: "", price: "" }]);
  };

  const handleSubmit = async () => {
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

    const payload = {
      client_name: client,
      id_type: idType,
      id_number: idNumber,
      email,
      phone,
      date: date.toISOString().split("T")[0],
      currency,
      total: calculateTotal(),
      items,
    };

    try {
      setSubmitting(true);
      const response = await saveInvoice(payload);

      if (response.success) {
        Alert.alert("✅ Factura guardada con éxito");
        resetForm(); // ← Limpia el formulario
      } else {
        Alert.alert("❌ Error", response.message || "No se pudo guardar.");
      }
    } catch (error) {
      Alert.alert("❌ Error", "Fallo la conexión con el servidor.");
    } finally {
      setSubmitting(false);
    }
  };

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
