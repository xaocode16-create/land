import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BotonWhatsApp } from "@/componentes/contacto/BotonWhatsApp";

export function LlamadoFinal() {
  return <section className="seccion seccion-noche llamado-final"><div className="contenedor-pagina llamado-contenido"><div><span className="etiqueta-seccion text-cyan-300">El siguiente paso</span><h2 className="titulo-seccion">El siguiente paso hacia tu futuro comienza aquí.</h2><p className="descripcion-seccion">Conoce nuestros proyectos y recibe la información que necesitas para tomar tu próxima decisión.</p></div><div className="flex flex-wrap gap-3"><Link className="boton-principal" href="/proyectos">Explorar proyectos <ArrowRight size={17} /></Link><BotonWhatsApp etiqueta="Contactar asesor" /></div></div></section>;
}
