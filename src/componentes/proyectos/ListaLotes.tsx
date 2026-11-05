import type { LoteInmobiliario } from "@/tipos/lote";
import { TarjetaLote } from "./TarjetaLote";
import estilos from "@/estilos/proyectos/ListaLotes.module.css";

export function ListaLotes({ lotes, seleccionadoId, comparacionIds, alSeleccionar, alComparar }: { lotes: LoteInmobiliario[]; seleccionadoId: string; comparacionIds: string[]; alSeleccionar: (loteId: string) => void; alComparar: (loteId: string) => void }) {
  return <div><div className={estilos["encabezado-lista"]}><p>{lotes.length} {lotes.length === 1 ? "lote encontrado" : "lotes encontrados"}</p><span>Selecciona una tarjeta para sincronizarla con el plano.</span></div>{lotes.length ? <div className={estilos["lista-lotes"]}>{lotes.map((lote) => <TarjetaLote key={lote.id} lote={lote} seleccionado={lote.id === seleccionadoId} enComparacion={comparacionIds.includes(lote.id)} alSeleccionar={() => alSeleccionar(lote.id)} alComparar={() => alComparar(lote.id)} />)}</div> : <div className={estilos["lista-vacia"]}>No encontramos lotes con esos filtros.</div>}</div>;
}
