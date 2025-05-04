// 📦 Importa la configuración base del entorno (dev/prod)
import config from "../../config/env";

// 🌐 Ruta del endpoint del servidor para guardar la factura
const BASE_URL = config.API_URL + "/invoices/save_invoice.php";

// 🧾 Tipos de datos esperados para la factura y sus ítems
export interface InvoiceItem {
  description: string;
  quantity: string;
  price: string;
}

export interface InvoiceData {
  client_name: string;
  id_type: string;
  id_number: string;
  email: string;
  phone: string;
  date: string; // formato: YYYY-MM-DD
  currency: string;
  total: number;
  items: InvoiceItem[];
}

// 🛠️ Función para guardar una factura en el backend
export async function saveInvoice(data: InvoiceData) {
  const url = BASE_URL;
  console.log("📤 Enviando factura al backend:", data);
  console.log("🌐 URL de conexión:", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), // ✅ Serializa la factura completa en JSON
    });

    const response = await res.json();
    console.log("✅ Respuesta del servidor:", response);

    return response;
  } catch (error) {
    console.error("❌ Error al guardar la factura:", error);
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
}
