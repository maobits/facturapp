import { InvoiceData } from "../services/invoice/invoiceService";

// 🧾 Función que genera el HTML de la factura con estilo personalizado
export function generateInvoiceHtml(invoice: InvoiceData) {
  const itemsHtml = invoice.items
    .map(
      (item) => `
      <tr>
        <td>${item.description}</td>
        <td style="text-align: center;">${item.quantity}</td>
        <td style="text-align: right;">$${parseFloat(item.price).toFixed(
          2
        )}</td>
        <td style="text-align: right;">$${(
          parseFloat(item.quantity) * parseFloat(item.price)
        ).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  return `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: 'Montserrat', sans-serif;
            padding: 24px;
            color: #222222;
            background-color: #FFFFFF;
          }
          h1 {
            color: #FFA726;
            font-family: 'Raleway', sans-serif;
            font-size: 28px;
            margin-bottom: 8px;
          }
          p {
            font-size: 14px;
            margin: 2px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            font-size: 14px;
          }
          th {
            background-color: #2979FF;
            color: #FFFFFF;
            padding: 10px;
            border: 1px solid #ccc;
            text-align: left;
          }
          td {
            padding: 10px;
            border: 1px solid #ccc;
          }
          .total {
            text-align: right;
            font-size: 18px;
            margin-top: 20px;
            font-family: 'Montserrat', sans-serif;
            font-weight: bold;
            color: #FFA726;
          }
        </style>
      </head>
      <body>
        <h1>Factura</h1>
        <p><strong>Cliente:</strong> ${invoice.client_name}</p>
        <p><strong>Identificación:</strong> ${invoice.id_type} ${
    invoice.id_number
  }</p>
        <p><strong>Correo:</strong> ${invoice.email}</p>
        <p><strong>Celular:</strong> ${invoice.phone}</p>
        <p><strong>Fecha:</strong> ${invoice.date}</p>
        <p><strong>Moneda:</strong> ${invoice.currency}</p>

        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p class="total">Total: $${invoice.total.toFixed(2)}</p>
      </body>
    </html>
  `;
}
