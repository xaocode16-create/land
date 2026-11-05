import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { CabeceraInterna } from "@/componentes/interfaz/CabeceraInterna";
import { FormularioContacto } from "@/componentes/contacto/FormularioContacto";
import { BotonWhatsApp } from "@/componentes/contacto/BotonWhatsApp";
import { empresa } from "@/configuracion/empresa";

export const metadata: Metadata = { title: "Contacto", description: "Contacta a LAND Inmobiliaria para solicitar información sobre un proyecto." };

export default function Contacto() {
  return <><CabeceraInterna etiqueta="Hablemos" titulo="Cuéntanos qué estás buscando." descripcion="Completa el formulario y continúa tu consulta en WhatsApp cuando el número oficial esté configurado." /><section className="seccion pagina-contenido"><div className="contenedor-pagina grid gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><span className="etiqueta-seccion">Contacto directo</span><h2 className="titulo-seccion">Estamos para orientarte.</h2><p className="descripcion-seccion">La primera versión no almacena datos en un servidor. El formulario prepara un mensaje para continuar la conversación en WhatsApp.</p><div className="mt-8 grid gap-3">{empresa.telefono && <div className="ubicacion-item"><Phone size={19} /><span>{empresa.telefono}</span></div>}{empresa.correoElectronico && <div className="ubicacion-item"><Mail size={19} /><span>{empresa.correoElectronico}</span></div>}{empresa.direccion && <div className="ubicacion-item"><MapPin size={19} /><span>{empresa.direccion}</span></div>}{!empresa.telefono && !empresa.correoElectronico && !empresa.direccion && <div className="aviso-demo"><Mail size={18} /> Los datos de teléfono, correo y dirección están pendientes de configuración en `src/configuracion/empresa.ts`.</div>}</div><div className="mt-6"><BotonWhatsApp etiqueta="Abrir WhatsApp" /></div></div><div className="panel-blanco"><FormularioContacto /></div></div></section></>;
}
