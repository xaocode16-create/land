import type { KeyboardEvent } from "react";
import type { PoligonoLote } from "@/tipos/lote";
import estilos from "@/estilos/proyectos/PlanoInteractivo.module.css";

interface PropiedadesPoligonoLote {
  poligono: PoligonoLote;
  seleccionado: boolean;
  alSeleccionar: (loteId: string) => void;
}

export function PoligonoLote({ poligono, seleccionado, alSeleccionar }: PropiedadesPoligonoLote) {
  function manejarTecla(evento: KeyboardEvent<SVGPolygonElement>) {
    if (evento.key === "Enter" || evento.key === " ") {
      evento.preventDefault();
      alSeleccionar(poligono.loteId);
    }
  }

  return (
    <polygon
      className={`${estilos["poligono-lote"]} ${seleccionado ? estilos["poligono-seleccionado"] : ""} ${poligono.precision === "pendiente_validacion" ? estilos["poligono-pendiente"] : ""}`}
      points={poligono.puntos}
      tabIndex={0}
      role="button"
      aria-label={`Seleccionar lote ${poligono.numero}`}
      aria-pressed={seleccionado}
      data-lote={poligono.numero}
      onClick={() => alSeleccionar(poligono.loteId)}
      onKeyDown={manejarTecla}
    />
  );
}
