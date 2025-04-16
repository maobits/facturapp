// Importa la configuración de entorno (desarrollo o producción)
import config from "../../config/env";

// Define la URL base para las peticiones de autenticación
const BASE_URL = config.API_URL + "/auth";

// Función para registrar un nuevo usuario
export async function registerUser(
  full_name: string,
  email: string,
  password: string
) {
  // Envía una solicitud POST a /auth/register.php con los datos del usuario
  const res = await fetch(`${BASE_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Se envía como JSON
    body: JSON.stringify({ full_name, email, password }), // Datos enviados al servidor
  });

  // Devuelve la respuesta convertida a JSON
  return await res.json();
}

export async function loginUser(email: string, password: string) {
  const url = `${BASE_URL}/login.php`;

  console.log("📤 Enviando datos al backend:", { email, password });
  console.log("🌐 URL de conexión:", url);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("✅ Respuesta del servidor:", data);

    return data;
  } catch (error) {
    console.error("❌ Error al conectar con el servidor:", error);
    return {
      success: false,
      message: "Error de conexión con el servidor",
    };
  }
}
