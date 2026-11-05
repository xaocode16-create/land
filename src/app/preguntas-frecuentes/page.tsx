import type { Metadata } from "next";
import { CabeceraInterna } from "@/componentes/interfaz/CabeceraInterna";
import { PreguntasFrecuentes } from "@/componentes/inicio/PreguntasFrecuentes";

export const metadata: Metadata = { title: "Preguntas frecuentes", description: "Respuestas configurables a las preguntas frecuentes sobre proyectos y contacto LAND." };

export default function Preguntas() { return <><CabeceraInterna etiqueta="Respuestas LAND" titulo="Preguntas frecuentes" descripcion="Información general para orientarte antes de conversar con un asesor." /><PreguntasFrecuentes completa /></>; }
