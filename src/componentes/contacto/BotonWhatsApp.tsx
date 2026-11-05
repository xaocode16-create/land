import { MessageCircle } from "lucide-react";
import { generarEnlaceWhatsApp } from "@/utilidades/generarEnlaceWhatsApp";
import estilos from "@/estilos/contacto/BotonWhatsApp.module.css";

interface PropiedadesBotonWhatsApp {
  mensaje?: string;
  etiqueta?: string;
  flotante?: boolean;
}

export function BotonWhatsApp({ mensaje = "Hola, LAND Inmobiliaria. Quisiera recibir información sobre sus proyectos.", etiqueta = "Escríbenos por WhatsApp", flotante = false }: PropiedadesBotonWhatsApp) {
  const enlace = generarEnlaceWhatsApp(mensaje);
  const clases = `${flotante ? estilos["boton-whatsapp"] : "boton-principal"} ${!enlace ? estilos.deshabilitado : ""}`;
  if (!enlace) return <span className={clases} title="Configura el número oficial en src/configuracion/empresa.ts"><MessageCircle size={18} /> WhatsApp no configurado</span>;
  return <a className={clases} href={enlace} target="_blank" rel="noreferrer"><MessageCircle size={18} /> {etiqueta}</a>;
}
