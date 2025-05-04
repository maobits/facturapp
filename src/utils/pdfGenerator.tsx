import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { InvoiceData } from "../services/invoice/invoiceService";
import { generateInvoiceHtml } from "./invoiceHtmlTemplate"; // Debes tener esta función implementada

// 📄 Generar el PDF a partir de los datos de la factura
export async function generateInvoicePdf(invoice: InvoiceData) {
  try {
    // 🧾 Generar el contenido HTML
    const html = generateInvoiceHtml(invoice);

    // 🖨️ Generar el PDF en memoria (sin guardarlo aún)
    const { uri } = await Print.printToFileAsync({
      html,
      base64: false,
    });

    console.log("✅ PDF generado en:", uri);

    // 📩 Compartir el archivo generado
    await Sharing.shareAsync(uri);

    return {
      success: true,
      filePath: uri,
    };
  } catch (error) {
    console.error("❌ Error al generar PDF:", error);
    return {
      success: false,
      message: "No se pudo generar el PDF",
    };
  }
}
