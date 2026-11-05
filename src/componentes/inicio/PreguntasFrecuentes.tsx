"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { preguntasFrecuentes } from "@/datos/preguntasFrecuentes";

export function PreguntasFrecuentes({ completa = false }: { completa?: boolean }) {
  const [abierta, setAbierta] = useState<number | null>(0);
  const preguntas = completa ? preguntasFrecuentes : preguntasFrecuentes.slice(0, 4);
  return <section className="seccion bg-slate-50"><div className="contenedor-pagina"><div className="encabezado-seccion"><div><span className="etiqueta-seccion">Respuestas claras</span><h2 className="titulo-seccion">Preguntas frecuentes</h2><p className="descripcion-seccion">Una guía breve para orientarte antes de conversar con un asesor.</p></div>{!completa && <Link className="boton-fantasma" href="/preguntas-frecuentes">Ver todas <ArrowRight size={17} /></Link>}</div><div className="faq-lista">{preguntas.map((item, indice) => <article className={`faq-item ${abierta === indice ? "abierto" : ""}`} key={item.pregunta}><button className="faq-pregunta" type="button" onClick={() => setAbierta(abierta === indice ? null : indice)} aria-expanded={abierta === indice}>{item.pregunta}<ChevronDown size={19} /></button>{abierta === indice && <div className="faq-respuesta">{item.respuesta}</div>}</article>)}</div></div></section>;
}
