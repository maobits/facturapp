// 📦 Importa la configuración base del entorno (desarrollo o producción)
import config from "../../../config/env";

// 📌 Define la URL del endpoint para guardar la factura
const BASE_URL = config.API_URL + "/invoices/save_invoice.php";

// 🧾 Tipos de datos esperados para los ítems de la factura
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

// 🧾 Estructura de los datos generales de la factura
export interface InvoiceData {
  client_name: string;
  id_type: string;
  id_number: string;
  email: string;
  phone: string;
  date: string; // Formato: YYYY-MM-DD
  currency: string;
  total: number;
  items: InvoiceItem[];
}

// 🛠️ Función que guarda una factura en el servidor
export async function saveInvoice(data: InvoiceData) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("❌ Error al guardar la factura:", error);
    return {
      success: false,
      message: "No se pudo conectar con el servidor",
    };
  }
}
