export type EstadoLote = "disponible" | "reservado" | "vendido" | "por_confirmar";

export type PrecisionPoligono = "trazado_sobre_plano" | "pendiente_validacion";

export interface LoteInmobiliario {
  id: string;
  numero: number;
  proyectoId: string;
  areaExcel?: number;
  areaPlano?: number;
  areaValidada?: number;
  precioSoles?: number;
  precioDolares?: number;
  estado: EstadoLote;
  caracteristicas: string[];
  observaciones: string[];
  datosVerificados: boolean;
  fuenteDatos: string;
}

export interface PoligonoLote {
  loteId: string;
  numero: number;
  puntos: string;
  precision: PrecisionPoligono;
  nota?: string;
}

export interface RegistroInternoLote {
  loteId: string;
  numero: number;
  partidaRegistral?: string;
}
