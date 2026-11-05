import { MessageCircle } from "lucide-react";
import type { LoteInmobiliario } from "@/tipos/lote";
import { generarEnlaceWhatsApp } from "@/utilidades/generarEnlaceWhatsApp";
import estilos from "@/estilos/proyectos/BotonConsultarLote.module.css";

export function construirMensajeLote(lote: LoteInmobiliario) {
  const area = lote.areaExcel === lote.areaPlano && lote.areaExcel ? ` Área registrada: ${lote.areaExcel} m², pendiente de confirmación.` : " La superficie está pendiente de confirmación.";
  return `Hola, LAND Inmobiliaria. Estoy interesado en el proyecto Las Palmas de San Ignacio, específicamente en el lote ${lote.numero}.${area} Quisiera confirmar su disponibilidad, precio actualizado y condiciones de compra.`;
}

export function BotonConsultarLote({ lote, etiqueta = "Consultar este lote" }: { lote: LoteInmobiliario; etiqueta?: string }) {
  const enlace = generarEnlaceWhatsApp(construirMensajeLote(lote));
  if (!enlace) return <span className={`${estilos["boton-consultar"]} ${estilos["deshabilitado"]}`}><MessageCircle size={17} /> WhatsApp no configurado</span>;
  return <a className={estilos["boton-consultar"]} href={enlace} target="_blank" rel="noreferrer"><MessageCircle size={17} /> {etiqueta}</a>;
}
