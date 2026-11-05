import { proyectoLasPalmas } from "@/datos/proyectos/lasPalmas";
import type { ProyectoInmobiliario } from "@/tipos/proyecto";

export const proyectos: ProyectoInmobiliario[] = [
  {
    id: proyectoLasPalmas.id,
    identificador: proyectoLasPalmas.identificador,
    nombre: proyectoLasPalmas.nombre,
    descripcionCorta: proyectoLasPalmas.descripcion,
    descripcionCompleta: "Una experiencia interactiva para explorar los 22 registros de lotes recibidos, revisar sus precios referenciales y consultar las diferencias entre el plano y el Excel sin ocultar la información pendiente de validación.",
    ubicacion: proyectoLasPalmas.ubicacion,
    latitud: proyectoLasPalmas.latitud,
    longitud: proyectoLasPalmas.longitud,
    enlaceMapa: proyectoLasPalmas.enlaceMapa,
    areaDesde: 200,
    areaHasta: 319.31,
    precioDesde: 50000,
    moneda: "USD",
    imagenPrincipal: proyectoLasPalmas.imagenPrincipal,
    imagenes: [...proyectoLasPalmas.imagenes],
    video: proyectoLasPalmas.video,
    caracteristicas: [...proyectoLasPalmas.caracteristicas],
    destacado: true,
    publicado: true,
    etiqueta: "Proyecto comercial · datos por confirmar",
    esDemostrativo: false,
  },
];
