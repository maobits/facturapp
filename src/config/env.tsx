// Bandera que indica si estamos en modo desarrollo
// ⚠️ Cambia a false cuando vayas a subir a producción
const IS_DEVELOPMENT = false;

// Objeto que contiene la configuración para ambos entornos: desarrollo y producción
const ENV = {
  development: {
    // URL local para pruebas durante el desarrollo
    API_URL: "http://localhost:8080/facturapp/api",
  },
  production: {
    // URL de tu API en producción (dominio real)
    API_URL: "https://facturapp.maobits.com/api",
  },
};

// Selecciona la configuración según el modo actual
const config = IS_DEVELOPMENT ? ENV.development : ENV.production;

// Exporta la configuración seleccionada para usarla en toda la app
export default config;
