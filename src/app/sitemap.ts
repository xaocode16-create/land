import type { MetadataRoute } from "next";
import { dominioPublico } from "@/configuracion/empresa";
import { obtenerProyectosPublicados } from "@/utilidades/obtenerProyectos";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/proyectos", "/nosotros", "/como-comprar", "/preguntas-frecuentes", "/contacto", "/politica-de-privacidad"];
  return [...rutas.map((ruta) => ({ url: `${dominioPublico}${ruta}`, lastModified: new Date() })), ...obtenerProyectosPublicados().map((proyecto) => ({ url: `${dominioPublico}/proyectos/${proyecto.identificador}`, lastModified: new Date() }))];
}
