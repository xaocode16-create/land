import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, FileText, MessageCircle } from "lucide-react";
import { CabeceraInterna } from "@/componentes/interfaz/CabeceraInterna";
import { BotonWhatsApp } from "@/componentes/contacto/BotonWhatsApp";

export const metadata: Metadata = { title: "Cómo comprar", description: "Conoce el proceso orientativo para solicitar información de un proyecto inmobiliario LAND." };
const pasos = [{ icono: Compass, titulo: "Explora", texto: "Revisa el catálogo y guarda los proyectos que te interesen." }, { icono: MessageCircle, titulo: "Consulta", texto: "Cuéntanos qué necesitas y solicita la información disponible." }, { icono: CalendarDays, titulo: "Coordina", texto: "Si corresponde, agenda una visita con un asesor." }, { icono: FileText, titulo: "Continúa", texto: "Recibe orientación sobre los siguientes pasos de tu consulta." }];

export default function ComoComprar() {
  return <><CabeceraInterna etiqueta="Guía LAND" titulo="Cómo comprar tu terreno" descripcion="Un proceso orientativo para pasar de la exploración a una conversación informada." /><section className="seccion bg-white"><div className="contenedor-pagina"><div className="rejilla-pasos">{pasos.map(({ icono: Icono, titulo, texto }, indice) => <article className="paso-compra" key={titulo}><Icono size={26} className="text-blue-500" /><div className="paso-numero mt-7">0{indice + 1}</div><h3>{titulo}</h3><p>{texto}</p></article>)}</div><div className="mt-14 grid gap-6 md:grid-cols-2"><div className="panel-blanco"><h2>Recomendaciones generales</h2><p>Antes de tomar una decisión, solicita la información comercial vigente, revisa los documentos que correspondan y pregunta por las condiciones específicas del proyecto.</p><p>Esta guía no reemplaza asesoría legal, financiera ni contractual personalizada.</p></div><div className="panel-blanco"><h2>¿Tienes una pregunta?</h2><p>Escríbenos con el nombre del proyecto que te interesa y un asesor podrá orientarte con la información disponible.</p><div className="mt-5 flex flex-wrap gap-3"><BotonWhatsApp etiqueta="Consultar por WhatsApp" /><Link href="/contacto" className="boton-fantasma">Ir a contacto <ArrowRight size={16} /></Link></div></div></div></div></section></>;
}
