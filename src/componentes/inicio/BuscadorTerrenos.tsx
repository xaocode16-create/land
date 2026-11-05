"use client";

import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { obtenerUbicaciones } from "@/utilidades/obtenerProyectos";

export function BuscadorTerrenos() {
  const router = useRouter();
  const [ubicacion, setUbicacion] = useState("");
  const [presupuesto, setPresupuesto] = useState("");
  const [area, setArea] = useState("");
  function buscar(evento: FormEvent) {
    evento.preventDefault();
    const parametros = new URLSearchParams();
    if (ubicacion) parametros.set("ubicacion", ubicacion);
    if (presupuesto) parametros.set("presupuesto", presupuesto);
    if (area) parametros.set("area", area);
    router.push(`/proyectos${parametros.toString() ? `?${parametros.toString()}` : ""}`);
  }
  return (
    <section className="buscador-flotante" aria-label="Buscar terrenos">
      <div className="contenedor-pagina">
        <form className="buscador-caja" onSubmit={buscar}>
          <label className="campo-etiqueta">Ubicación<select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}><option value="">Cualquier ubicación</option>{obtenerUbicaciones().map((valor) => <option key={valor} value={valor}>{valor}</option>)}</select></label>
          <label className="campo-etiqueta">Presupuesto máximo<input value={presupuesto} onChange={(e) => setPresupuesto(e.target.value)} type="number" min="0" placeholder="Ej. 120000" /></label>
          <label className="campo-etiqueta">Área mínima (m²)<input value={area} onChange={(e) => setArea(e.target.value)} type="number" min="0" placeholder="Ej. 100" /></label>
          <button className="boton-principal" type="submit"><Search size={17} /> Buscar</button>
        </form>
      </div>
    </section>
  );
}
