// Importaciones necesarias desde React y React Native
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TextInput as RNTextInput } from "react-native"; // RNTextInput se usa para manejar referencias directas (focus)
import { TextInput, Text, useTheme } from "react-native-paper"; // Componentes de Paper con diseño Material Design

// 🎯 Definición del tipo de props que recibirá este componente
type InvoiceProps = {
  index: number; // Posición del ítem en la lista (1, 2, 3, etc.)
  item: {
    description: string; // Descripción del producto o servicio
    quantity: string; // Cantidad en formato texto (convertible a número)
    price: string; // Precio unitario en formato texto
  };
  currency: string; // Símbolo de la moneda a usar (USD, COP, etc.)
  onChange: (
    // Función que se ejecuta cada vez que un campo se edita
    index: number,
    field: keyof InvoiceProps["item"],
    value: string
  ) => void;
};

// Componente funcional que representa un ítem de factura
export default function Invoice({
  index,
  item,
  onChange,
  currency,
}: InvoiceProps) {
  const { colors } = useTheme(); // 🎨 Acceso al tema de colores global del sistema
  // Refs para enfocar campos si están inválidos
  const descRef = useRef<RNTextInput>(null);
  const qtyRef = useRef<RNTextInput>(null);
  const priceRef = useRef<RNTextInput>(null);

  // Estado para manejar errores individuales por campo
  const [errors, setErrors] = useState({
    description: "",
    quantity: "",
    price: "",
  });

  // Estado que indica si un campo ha sido "tocado" (pierde foco al menos una vez)
  const [touched, setTouched] = useState({
    description: false,
    quantity: false,
    price: false,
  });

  // Validaciones globales por campo (útil para mostrar iconos de validación)
  const isValid = {
    description: !errors.description,
    quantity: !errors.quantity,
    price: !errors.price,
  };

  // Función que valida un campo dependiendo de su tipo
  const validateField = (
    field: keyof InvoiceProps["item"],
    value: string
  ): string => {
    if (value.trim() === "") return "Requerido"; // Campo vacío
    if (["quantity", "price"].includes(field)) {
      const num = Number(value);
      if (isNaN(num) || num < 0) return "Inválido"; // No es número o menor a 0
      if (field === "quantity" && num === 0) return "Inválido"; // Cantidad no puede ser 0
    }
    return ""; // Sin error
  };

  // Manejador cuando el usuario deja de enfocar un campo
  const handleBlur = (field: keyof InvoiceProps["item"]) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const value = item[field];
    const error = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Subtotal calculado por ítem (cantidad * precio)
  const subtotal =
    (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0);

  // Subtotal formateado según la moneda elegida
  const formattedSubtotal = new Intl.NumberFormat("es", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(subtotal);

  // Exposición de función global para validar el ítem desde el padre (CreateInvoiceScreen)
  useEffect(() => {
    (globalThis as any)[`validateInvoice_${index}`] = () => {
      const newErrors = {
        description: validateField("description", item.description),
        quantity: validateField("quantity", item.quantity),
        price: validateField("price", item.price),
      };
      setErrors(newErrors);
      setTouched({
        description: true,
        quantity: true,
        price: true,
      });

      // Enfoca automáticamente el campo con error
      if (newErrors.description) descRef.current?.focus();
      else if (newErrors.quantity) qtyRef.current?.focus();
      else if (newErrors.price) priceRef.current?.focus();

      // Devuelve true si todos los campos son válidos
      return !newErrors.description && !newErrors.quantity && !newErrors.price;
    };
  }, [item]);
  return (
    <View style={[styles.itemContainer, { borderColor: colors.outline }]}>
      <Text style={[styles.itemTitle, { color: colors.onSurface }]}>
        Ítem #{index + 1}
      </Text>

      {/* Campo: Descripción */}
      <TextInput
        label="Descripción"
        value={item.description}
        onChangeText={(text) => onChange(index, "description", text)}
        onBlur={() => handleBlur("description")}
        mode="outlined"
        style={styles.input}
        error={touched.description && !!errors.description}
        ref={descRef}
        placeholder="Ej: Servicio de diseño"
        right={
          touched.description && isValid.description ? (
            <TextInput.Icon icon="check-circle" color={colors.primary} />
          ) : undefined
        }
      />
      {touched.description && errors.description ? (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errors.description}
        </Text>
      ) : null}

      {/* Campo: Cantidad */}
      <TextInput
        label="Cantidad"
        value={item.quantity}
        onChangeText={(text) => onChange(index, "quantity", text)}
        onBlur={() => handleBlur("quantity")}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
        error={touched.quantity && !!errors.quantity}
        ref={qtyRef}
        placeholder="Ej: 2"
        right={
          touched.quantity && isValid.quantity ? (
            <TextInput.Icon icon="check-circle" color={colors.primary} />
          ) : undefined
        }
      />
      {touched.quantity && errors.quantity ? (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errors.quantity}
        </Text>
      ) : null}

      {/* Campo: Precio unitario */}
      <TextInput
        label="Precio unitario"
        value={item.price}
        onChangeText={(text) => onChange(index, "price", text)}
        onBlur={() => handleBlur("price")}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
        error={touched.price && !!errors.price}
        ref={priceRef}
        placeholder="Ej: 100"
        right={
          touched.price && isValid.price ? (
            <TextInput.Icon icon="check-circle" color={colors.primary} />
          ) : undefined
        }
      />
      {touched.price && errors.price ? (
        <Text style={[styles.errorText, { color: colors.error }]}>
          {errors.price}
        </Text>
      ) : null}

      {/* Línea de subtotal */}
      <Text
        style={[
          styles.totalLine,
          {
            color: colors.secondary,
            fontFamily: "Montserrat-Bold",
          },
        ]}
      >
        Subtotal: {formattedSubtotal}
      </Text>
    </View>
  );
}

// 🎨 Estilos personalizados para el ítem
const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    width: "100%",
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
  },
  input: {
    marginBottom: 6,
    width: "100%",
  },
  totalLine: {
    textAlign: "right",
    marginTop: 12,
    fontSize: 14,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 6,
    fontFamily: "Montserrat-Medium",
  },
});
