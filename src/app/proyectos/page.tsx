import type { Metadata } from "next";
import { Suspense } from "react";
import { CabeceraInterna } from "@/componentes/interfaz/CabeceraInterna";
import { CatalogoInteractivo } from "@/componentes/proyectos/CatalogoInteractivo";

export const metadata: Metadata = { title: "Proyectos inmobiliarios", description: "Explora el catálogo de proyectos inmobiliarios de LAND y filtra según tus preferencias." };

export default function Proyectos() {
  return <><CabeceraInterna etiqueta="Catálogo LAND" titulo="Encuentra un proyecto para tu próxima historia." descripcion="Explora la información disponible, compara opciones y conversa con un asesor cuando quieras profundizar." /><section className="seccion pagina-contenido"><div className="contenedor-pagina"><Suspense fallback={<div className="panel-blanco text-center">Cargando catálogo…</div>}><CatalogoInteractivo /></Suspense></div></section></>;
}
