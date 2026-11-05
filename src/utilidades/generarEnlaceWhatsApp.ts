import { empresa } from "@/configuracion/empresa";

export function generarEnlaceWhatsApp(mensaje: string) {
  const numeroLimpio = empresa.whatsapp.replace(/\D/g, "");
  if (!numeroLimpio) return "";
  return `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
}

export function generarMensajeProyecto(nombreProyecto: string) {
  return `Hola, LAND Inmobiliaria. Quisiera recibir más información sobre el proyecto ${nombreProyecto}.`;
}
