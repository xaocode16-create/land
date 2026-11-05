import { proyectos } from "@/datos/proyectos";

export function obtenerProyectoPorIdentificador(identificador: string) {
  return proyectos.find((proyecto) => proyecto.identificador === identificador);
}

export function obtenerProyectosPublicados() {
  return proyectos.filter((proyecto) => proyecto.publicado);
}

export function obtenerProyectosDestacados() {
  return obtenerProyectosPublicados().filter((proyecto) => proyecto.destacado);
}

export function obtenerUbicaciones() {
  return Array.from(new Set(obtenerProyectosPublicados().map((proyecto) => proyecto.ubicacion)));
}

export function obtenerProyectosRelacionados(identificador: string, limite = 2) {
  return obtenerProyectosPublicados()
    .filter((proyecto) => proyecto.identificador !== identificador)
    .slice(0, limite);
}
