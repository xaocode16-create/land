"use client";

import { useRef, useState } from "react";
import type { LoteInmobiliario, PoligonoLote } from "@/tipos/lote";
import { ControlesPlano } from "./ControlesPlano";
import { PoligonoLote as PoligonoLoteSvg } from "./PoligonoLote";
import estilos from "@/estilos/proyectos/PlanoInteractivo.module.css";

interface PropiedadesPlanoInteractivo {
  rutaPlano: string;
  lotes: LoteInmobiliario[];
  poligonos: PoligonoLote[];
  loteSeleccionadoId: string;
  alSeleccionar: (loteId: string) => void;
}

export function PlanoInteractivo({ rutaPlano, lotes, poligonos, loteSeleccionadoId, alSeleccionar }: PropiedadesPlanoInteractivo) {
  const [zoom, setZoom] = useState(1);
  const [desplazamiento, setDesplazamiento] = useState({ x: 0, y: 0 });
  const [arrastrando, setArrastrando] = useState(false);
  const ultimoPunto = useRef({ x: 0, y: 0 });

  function cambiarZoom(incremento: number) {
    setZoom((valor) => Math.min(3, Math.max(1, Number((valor + incremento).toFixed(2)))));
  }

  function iniciarDesplazamiento(evento: React.PointerEvent<HTMLDivElement>) {
    ultimoPunto.current = { x: evento.clientX, y: evento.clientY };
    evento.currentTarget.setPointerCapture(evento.pointerId);
    setArrastrando(true);
  }

  function moverPlano(evento: React.PointerEvent<HTMLDivElement>) {
    if (!arrastrando) return;
    const deltaX = evento.clientX - ultimoPunto.current.x;
    const deltaY = evento.clientY - ultimoPunto.current.y;
    ultimoPunto.current = { x: evento.clientX, y: evento.clientY };
    setDesplazamiento((valor) => ({ x: valor.x + deltaX, y: valor.y + deltaY }));
  }

  function terminarDesplazamiento(evento: React.PointerEvent<HTMLDivElement>) {
    if (evento.currentTarget.hasPointerCapture(evento.pointerId)) evento.currentTarget.releasePointerCapture(evento.pointerId);
    setArrastrando(false);
  }

  function restablecer() {
    setZoom(1);
    setDesplazamiento({ x: 0, y: 0 });
  }

  return (
    <div className={estilos["contenedor-plano"]}>
      <ControlesPlano zoom={zoom} alAcercar={() => cambiarZoom(0.25)} alAlejar={() => cambiarZoom(-0.25)} alRestablecer={restablecer} />
      <div className={estilos["marco-plano"]}>
        <div
          className={`${estilos["visor-plano"]} ${arrastrando ? estilos["arrastrando"] : ""}`}
          onPointerDown={iniciarDesplazamiento}
          onPointerMove={moverPlano}
          onPointerUp={terminarDesplazamiento}
          onPointerCancel={terminarDesplazamiento}
          onWheel={(evento) => { evento.preventDefault(); cambiarZoom(evento.deltaY > 0 ? -0.1 : 0.1); }}
          aria-label="Plano interactivo de los lotes"
        >
          <div className={estilos["lienzo-plano"]} style={{ transform: `translate3d(${desplazamiento.x}px, ${desplazamiento.y}px, 0) scale(${zoom})` }}>
            <svg className={estilos["svg-plano"]} viewBox="0 0 1324 1188" role="img" aria-label="Plano de referencia con lotes seleccionables">
              <image href={rutaPlano} x="0" y="0" width="1324" height="1188" preserveAspectRatio="none" />
              <g aria-label="Lotes">
                {poligonos.map((poligono) => <PoligonoLoteSvg key={poligono.loteId} poligono={poligono} seleccionado={poligono.loteId === loteSeleccionadoId} alSeleccionar={alSeleccionar} />)}
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className={estilos["leyenda-plano"]}>
        <span><i className={estilos["punto-leyenda"]} data-estado="disponible" /> Disponible</span>
        <span><i className={estilos["punto-leyenda"]} data-estado="reservado" /> Reservado</span>
        <span><i className={estilos["punto-leyenda"]} data-estado="vendido" /> Vendido</span>
        <span><i className={estilos["punto-leyenda"]} data-estado="por_confirmar" /> Por confirmar</span>
      </div>
      <p className={estilos["nota-plano"]}>El trazado se superpone a `plano.jpg`. Las geometrías marcadas para revisión no deben interpretarse como levantamiento topográfico.</p>
      <p className="sr-only">{lotes.length} lotes registrados en el plano.</p>
    </div>
  );
}
