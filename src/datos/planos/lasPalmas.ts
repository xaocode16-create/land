import type { PoligonoLote } from "@/tipos/lote";

/**
 * Coordenadas en píxeles sobre plano.jpg (1324 × 1188).
 * Los lotes 20, 19, 18, 17, 16, 15, 14, 13 y 12 siguen los bordes visibles
 * del plano; los demás conservan un trazado operativo sujeto a revisión técnica.
 */
export const poligonosLasPalmas: PoligonoLote[] = [
  { loteId: "las-palmas-lote-01", numero: 1, puntos: "424,184 753,184 590,356 532,297", precision: "pendiente_validacion", nota: "Revisar el perímetro superior antes de publicar." },
  { loteId: "las-palmas-lote-02", numero: 2, puntos: "753,184 842,184 696,337 590,356", precision: "pendiente_validacion", nota: "Revisar el encuentro con los lotes 01 y 03." },
  { loteId: "las-palmas-lote-03", numero: 3, puntos: "842,184 948,184 806,342 696,337", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-04", numero: 4, puntos: "948,184 1058,184 918,345 806,342", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-05", numero: 5, puntos: "1058,184 1110,184 1016,368 918,345", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-06", numero: 6, puntos: "918,345 1016,368 1087,512 985,489", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-07", numero: 7, puntos: "985,489 1087,512 1125,626 1028,604", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-08", numero: 8, puntos: "1028,604 1125,626 1162,736 1068,714", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-09", numero: 9, puntos: "1068,714 1162,736 1192,823 1100,803", precision: "pendiente_validacion" },
  { loteId: "las-palmas-lote-10", numero: 10, puntos: "1100,803 1192,823 1234,796 1192,735", precision: "pendiente_validacion", nota: "Revisar el límite curvo del borde oriental." },
  { loteId: "las-palmas-lote-11", numero: 11, puntos: "1055,826 1100,803 934,1077 855,995", precision: "pendiente_validacion", nota: "Revisar el perímetro colindante con el área verde." },
  { loteId: "las-palmas-lote-12", numero: 12, puntos: "997,768 1055,826 855,995 797,936", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-13", numero: 13, puntos: "939,709 997,768 797,936 738,878", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-14", numero: 14, puntos: "881,650 939,709 738,878 680,819", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-15", numero: 15, puntos: "822,591 881,650 680,819 622,760", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-16", numero: 16, puntos: "764,532 822,591 622,760 563,701", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-17", numero: 17, puntos: "706,473 764,532 563,701 505,642", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-18", numero: 18, puntos: "648,414 706,473 505,642 447,584", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-19", numero: 19, puntos: "590,356 648,414 447,584 390,526", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-20", numero: 20, puntos: "532,297 590,356 390,526 334,468", precision: "trazado_sobre_plano" },
  { loteId: "las-palmas-lote-21", numero: 21, puntos: "424,184 532,297 334,468 278,412", precision: "pendiente_validacion", nota: "Revisar el límite exterior junto a Jr. Los Sinamis C-02." },
  { loteId: "las-palmas-lote-22", numero: 22, puntos: "326,184 424,184 334,468 211,315", precision: "pendiente_validacion", nota: "Revisar el límite exterior junto a Jr. Los Pijuayos C-01." },
];

export function obtenerPoligonoLasPalmasPorLote(loteId: string) {
  return poligonosLasPalmas.find((poligono) => poligono.loteId === loteId);
}
