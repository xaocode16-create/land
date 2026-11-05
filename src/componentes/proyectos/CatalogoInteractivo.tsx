"use client";

import { RotateCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { TarjetaProyecto } from "./TarjetaProyecto";
import { obtenerProyectosPublicados, obtenerUbicaciones } from "@/utilidades/obtenerProyectos";
import estilos from "@/estilos/proyectos/CatalogoInteractivo.module.css";

export function CatalogoInteractivo() {
  const parametros = useSearchParams();
  const [ubicacion, setUbicacion] = useState(parametros.get("ubicacion") ?? "");
  const [presupuesto, setPresupuesto] = useState(parametros.get("presupuesto") ?? "");
  const [area, setArea] = useState(parametros.get("area") ?? "");
  const [orden, setOrden] = useState("relevancia");
  const ubicaciones = obtenerUbicaciones();
  const resultados = useMemo(() => {
    const filtrados = obtenerProyectosPublicados().filter((proyecto) => !ubicacion || proyecto.ubicacion === ubicacion).filter((proyecto) => !presupuesto || (proyecto.precioDesde ?? Infinity) <= Number(presupuesto)).filter((proyecto) => !area || proyecto.areaDesde >= Number(area));
    return [...filtrados].sort((a, b) => orden === "precio-menor" ? (a.precioDesde ?? Infinity) - (b.precioDesde ?? Infinity) : orden === "precio-mayor" ? (b.precioDesde ?? 0) - (a.precioDesde ?? 0) : a.id - b.id);
  }, [area, orden, presupuesto, ubicacion]);
  function limpiar() { setUbicacion(""); setPresupuesto(""); setArea(""); setOrden("relevancia"); }
  return <div><div className={estilos["filtros-caja"]}><label className="campo-etiqueta">Ubicación<select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}><option value="">Todas las ubicaciones</option>{ubicaciones.map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select></label><label className="campo-etiqueta">Presupuesto máximo<input type="number" min="0" value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} placeholder="Sin límite" /></label><label className="campo-etiqueta">Área mínima<input type="number" min="0" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Sin mínimo" /></label><label className="campo-etiqueta">Ordenar<select value={orden} onChange={(e) => setOrden(e.target.value)}><option value="relevancia">Relevancia</option><option value="precio-menor">Precio menor</option><option value="precio-mayor">Precio mayor</option></select></label><button className="boton-fantasma" type="button" onClick={limpiar}><RotateCcw size={16} /> Limpiar</button></div><p className={estilos["resultado-filtros"]}>{resultados.length} {resultados.length === 1 ? "proyecto encontrado" : "proyectos encontrados"}</p>{resultados.length ? <div className="rejilla-proyectos">{resultados.map((proyecto) => <TarjetaProyecto key={proyecto.id} proyecto={proyecto} />)}</div> : <div className={estilos["estado-vacio"]}><h2 className="mb-2 text-xl font-bold text-slate-900">No encontramos coincidencias</h2><p className="m-0">Prueba quitando algún filtro o escribe a un asesor para conocer nuevas opciones.</p></div>}</div>;
}
