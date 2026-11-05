"use client";

import { X } from "lucide-react";
import type { LoteInmobiliario } from "@/tipos/lote";
import { formatearPrecio } from "@/utilidades/formatearPrecio";
import estilos from "@/estilos/proyectos/ComparadorLotes.module.css";

function precioMetroCuadrado(lote: LoteInmobiliario) {
  if (!lote.precioDolares || !lote.areaExcel) return "Por confirmar";
  return `${formatearPrecio(lote.precioDolares / lote.areaExcel, "USD")}/m²`;
}

export function ComparadorLotes({ lotes, alQuitar }: { lotes: LoteInmobiliario[]; alQuitar: (loteId: string) => void }) {
  return <section className={estilos["comparador-lotes"]} aria-labelledby="titulo-comparador"><div className={estilos["encabezado-comparador"]}><div><span className="etiqueta-seccion">Decide con calma</span><h2 id="titulo-comparador">Comparador de terrenos</h2><p>Hasta tres lotes, con sus fuentes de superficie separadas para que la comparación sea transparente.</p></div><span className={estilos["contador-comparador"]}>{lotes.length}/3</span></div>{lotes.length ? <div className={estilos["tabla-scroll"]}><table><thead><tr><th>Dato</th>{lotes.map((lote) => <th key={lote.id}><span>Lote {String(lote.numero).padStart(2, "0")}</span><button type="button" onClick={() => alQuitar(lote.id)} aria-label={`Quitar lote ${lote.numero}`}><X size={15} /></button></th>)}</tr></thead><tbody><tr><th>Área Excel</th>{lotes.map((lote) => <td key={lote.id}>{lote.areaExcel?.toLocaleString("es-PE")} m²</td>)}</tr><tr><th>Área plano</th>{lotes.map((lote) => <td key={lote.id}>{lote.areaPlano?.toLocaleString("es-PE")} m²{lote.areaExcel !== lote.areaPlano && <small>Discrepante</small>}</td>)}</tr><tr><th>Precio USD</th>{lotes.map((lote) => <td key={lote.id}>{formatearPrecio(lote.precioDolares, "USD")}</td>)}</tr><tr><th>Precio soles</th>{lotes.map((lote) => <td key={lote.id}>{formatearPrecio(lote.precioSoles, "PEN")}</td>)}</tr><tr><th>Precio por m²</th>{lotes.map((lote) => <td key={lote.id}>{precioMetroCuadrado(lote)}</td>)}</tr><tr><th>Estado</th>{lotes.map((lote) => <td key={lote.id}>Por confirmar</td>)}</tr><tr><th>Características</th>{lotes.map((lote) => <td key={lote.id}><ul>{lote.caracteristicas.map((caracteristica) => <li key={caracteristica}>{caracteristica}</li>)}</ul></td>)}</tr></tbody></table></div> : <div className={estilos["comparador-vacio"]}>Agrega hasta tres lotes desde el plano o el listado para verlos lado a lado.</div>}</section>;
}
