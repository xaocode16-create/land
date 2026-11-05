"use client";

import { Check, Copy, Info, MapPinned, Share2, X } from "lucide-react";
import { useState } from "react";
import type { LoteInmobiliario } from "@/tipos/lote";
import { formatearPrecio } from "@/utilidades/formatearPrecio";
import { BotonConsultarLote } from "./BotonConsultarLote";
import estilos from "@/estilos/proyectos/PanelLote.module.css";

function formatearArea(valor: number | undefined) {
  return typeof valor === "number" ? `${valor.toLocaleString("es-PE", { maximumFractionDigits: 2 })} m²` : "Por confirmar";
}

function precioMetroCuadrado(lote: LoteInmobiliario) {
  if (!lote.precioDolares || !lote.areaExcel) return "Por confirmar";
  return `${formatearPrecio(lote.precioDolares / lote.areaExcel, "USD")}/m²`;
}

export function PanelLote({ lote, alAgregarComparacion, enComparacion, panelMovilAbierto = true, alCerrar }: { lote: LoteInmobiliario; alAgregarComparacion: () => void; enComparacion: boolean; panelMovilAbierto?: boolean; alCerrar?: () => void }) {
  const [compartido, setCompartido] = useState(false);
  const hayDiscrepancia = lote.areaExcel !== lote.areaPlano && lote.areaExcel !== undefined && lote.areaPlano !== undefined;

  async function compartir() {
    const url = `${window.location.origin}${window.location.pathname}#${lote.id}`;
    try {
      if (navigator.share) await navigator.share({ title: `Lote ${lote.numero} · Las Palmas de San Ignacio`, url });
      else await navigator.clipboard.writeText(url);
      setCompartido(true);
      window.setTimeout(() => setCompartido(false), 1800);
    } catch {
      setCompartido(false);
    }
  }

  return (
    <>
      {panelMovilAbierto ? <button className={estilos["fondo-panel-lote"]} type="button" onClick={alCerrar} aria-label="Cerrar información del lote" /> : null}
      <aside className={`${estilos["panel-lote"]} ${estilos[panelMovilAbierto ? "panel-movil-abierto" : "panel-movil-cerrado"]}`} id={lote.id} aria-labelledby="titulo-lote-seleccionado">
      <div className={estilos["panel-cabecera"]}>
        <div><span className={estilos["panel-etiqueta"]}>Lote seleccionado</span><h3 id="titulo-lote-seleccionado">Lote {String(lote.numero).padStart(2, "0")}</h3></div>
        <span className={estilos["estado-lote"]} data-estado={lote.estado}>Por confirmar</span><button className={estilos["boton-cerrar-panel"]} type="button" onClick={alCerrar} aria-label="Cerrar información del lote"><X size={18} /></button>
      </div>
      <p className={estilos["panel-proyecto"]}>Las Palmas de San Ignacio</p>
      {hayDiscrepancia ? <div className={estilos["alerta-superficie"]}><Info size={17} /><div><strong>Superficie pendiente de confirmación.</strong><span>Excel: {formatearArea(lote.areaExcel)} · Plano: {formatearArea(lote.areaPlano)}</span></div></div> : <div className={estilos["dato-destacado"]}><span>Área registrada</span><strong>{formatearArea(lote.areaExcel ?? lote.areaPlano)}</strong><small>La medida aún debe confirmarse comercialmente.</small></div>}
      <div className={estilos["precios-lote"]}><div><span>Precio Excel · USD</span><strong>{formatearPrecio(lote.precioDolares, "USD")}</strong></div><div><span>Precio Excel · soles</span><strong>{formatearPrecio(lote.precioSoles, "PEN")}</strong></div><div><span>Precio referencial</span><strong>{precioMetroCuadrado(lote)}</strong><small>Cálculo sobre el área Excel</small></div></div>
      <dl className={estilos["ficha-lote"]}>
        <div><dt><MapPinned size={15} /> Ubicación en plano</dt><dd>Polígono asociado al lote {lote.numero}; la selección está sincronizada con el plano.</dd></div>
        <div><dt>Medidas perimetrales verificadas</dt><dd>Información por confirmar.</dd></div>
        <div><dt>Vías colindantes</dt><dd>Consultar con un asesor; el plano es una referencia gráfica.</dd></div>
      </dl>
      <div className={estilos["caracteristicas-lote"]}><h4>Características confirmadas</h4><ul>{lote.caracteristicas.map((caracteristica) => <li key={caracteristica}><Check size={15} /> {caracteristica}</li>)}</ul></div>
      {lote.observaciones.map((observacion) => <p className={estilos["observacion-lote"]} key={observacion}><Info size={15} /> {observacion}</p>)}
      <div className={estilos["acciones-lote"]}><BotonConsultarLote lote={lote} /><button className="boton-fantasma" type="button" onClick={alAgregarComparacion} disabled={enComparacion}>{enComparacion ? "En comparación" : "Agregar a comparación"}</button><button className="boton-fantasma" type="button" onClick={compartir}>{compartido ? <Copy size={16} /> : <Share2 size={16} />} {compartido ? "Enlace copiado" : "Compartir"}</button></div>
      <p className={estilos["fuente-lote"]}>Fuente: {lote.fuenteDatos}. Disponibilidad y precios sujetos a confirmación comercial.</p>
      </aside>
    </>
  );
}
