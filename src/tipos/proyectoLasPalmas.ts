export interface ProyectoLasPalmas {
  id: number;
  identificador: string;
  nombre: string;
  tituloComercial: string;
  descripcion: string;
  ubicacion: string;
  latitud: number;
  longitud: number;
  enlaceMapa: string;
  imagenPrincipal: string;
  video: string;
  videoMovil: string;
  posterVideo: string;
  plano: string;
  imagenes: readonly string[];
  caracteristicas: readonly string[];
  notaUbicacion: string;
  notaLegal: string;
  preguntas: readonly { readonly pregunta: string; readonly respuesta: string }[];
}
