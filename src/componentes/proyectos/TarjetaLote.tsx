import { ArrowUpRight, Ruler } from "lucide-react";
import type { LoteInmobiliario } from "@/tipos/lote";
import { formatearPrecio } from "@/utilidades/formatearPrecio";
import estilos from "@/estilos/proyectos/TarjetaLote.module.css";

export function TarjetaLote({ lote, seleccionado, enComparacion, alSeleccionar, alComparar }: { lote: LoteInmobiliario; seleccionado: boolean; enComparacion: boolean; alSeleccionar: () => void; alComparar: () => void }) {
  const discrepante = lote.areaExcel !== lote.areaPlano;
  return <article className={`${estilos["tarjeta-lote"]} ${seleccionado ? estilos["seleccionado"] : ""}`}><button className={estilos["boton-tarjeta"]} type="button" onClick={alSeleccionar} aria-pressed={seleccionado}><span className={estilos["numero-lote"]}>Lote {String(lote.numero).padStart(2, "0")}</span><strong>{formatearPrecio(lote.precioDolares, "USD")}</strong><span className={estilos["meta-lote"]}><Ruler size={14} /> {lote.areaExcel?.toLocaleString("es-PE")} m² {discrepante && "· por confirmar"}</span><ArrowUpRight size={17} /></button><button className={estilos["boton-comparar"]} type="button" onClick={alComparar} disabled={enComparacion}>{enComparacion ? "En comparación" : "+ Comparar"}</button></article>;
}
