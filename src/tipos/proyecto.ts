export interface ProyectoInmobiliario {
  id: number;
  identificador: string;
  nombre: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  ubicacion: string;
  areaDesde: number;
  areaHasta?: number;
  precioDesde?: number;
  moneda: "PEN" | "USD";
  imagenPrincipal: string;
  imagenes: string[];
  video?: string;
  caracteristicas: string[];
  destacado: boolean;
  publicado: boolean;
  latitud?: number;
  longitud?: number;
  enlaceMapa?: string;
  etiqueta?: string;
  esDemostrativo?: boolean;
}
