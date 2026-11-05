import { RotateCcw, SlidersHorizontal } from "lucide-react";
import estilos from "@/estilos/proyectos/FiltrosLotes.module.css";

export type OrdenLotes = "numero" | "precio-menor" | "precio-mayor" | "area-menor" | "area-mayor";

export interface FiltrosLotesEstado {
  numero: string;
  areaMinima: string;
  presupuestoMaximo: string;
  estado: string;
  orden: OrdenLotes;
}

export function FiltrosLotes({ filtros, alCambiar, alLimpiar }: { filtros: FiltrosLotesEstado; alCambiar: (campo: keyof FiltrosLotesEstado, valor: string) => void; alLimpiar: () => void }) {
  return <div className={estilos["filtros-lotes"]}><div className={estilos["filtros-titulo"]}><SlidersHorizontal size={17} /><span>Encuentra tu lote</span></div><label className="campo-etiqueta">Número<input type="number" min="1" max="22" value={filtros.numero} onChange={(evento) => alCambiar("numero", evento.target.value)} placeholder="Todos" /></label><label className="campo-etiqueta">Área mínima<select value={filtros.areaMinima} onChange={(evento) => alCambiar("areaMinima", evento.target.value)}><option value="">Todas</option><option value="200">Desde 200 m²</option><option value="250">Desde 250 m²</option><option value="300">Desde 300 m²</option></select></label><label className="campo-etiqueta">Presupuesto USD<input type="number" min="0" value={filtros.presupuestoMaximo} onChange={(evento) => alCambiar("presupuestoMaximo", evento.target.value)} placeholder="Sin límite" /></label><label className="campo-etiqueta">Estado<select value={filtros.estado} onChange={(evento) => alCambiar("estado", evento.target.value)}><option value="">Todos</option><option value="por_confirmar">Por confirmar</option><option value="disponible">Disponible</option><option value="reservado">Reservado</option><option value="vendido">Vendido</option></select></label><label className="campo-etiqueta">Ordenar<select value={filtros.orden} onChange={(evento) => alCambiar("orden", evento.target.value)}><option value="numero">Número</option><option value="precio-menor">Precio menor</option><option value="precio-mayor">Precio mayor</option><option value="area-menor">Área menor</option><option value="area-mayor">Área mayor</option></select></label><button className="boton-fantasma" type="button" onClick={alLimpiar}><RotateCcw size={15} /> Limpiar</button></div>;
}
