"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import estilos from "@/estilos/proyectos/GaleriaProyecto.module.css";

export function GaleriaProyecto({ imagenes, nombre }: { imagenes: readonly string[]; nombre: string }) {
  const [indiceActivo, setIndiceActivo] = useState<number | null>(null);
  const cerrar = () => setIndiceActivo(null);
  useEffect(() => {
    const manejarTecla = (event: KeyboardEvent) => {
      if (indiceActivo === null) return;
      if (event.key === "Escape") cerrar();
      if (event.key === "ArrowRight") setIndiceActivo((indice) => indice === null ? 0 : (indice + 1) % imagenes.length);
      if (event.key === "ArrowLeft") setIndiceActivo((indice) => indice === null ? 0 : (indice - 1 + imagenes.length) % imagenes.length);
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [imagenes.length, indiceActivo]);
  return <>
    <div className={estilos["galeria-proyecto"]} aria-label={`Galería de ${nombre}`}>
      {imagenes.map((imagen, indice) => <button className={estilos["galeria-miniatura"]} type="button" key={imagen} onClick={() => setIndiceActivo(indice)} aria-label={`Ampliar imagen ${indice + 1} de ${nombre}`}><Image src={imagen} alt={`Imagen ${indice + 1} de ${nombre}`} fill sizes="(max-width: 640px) 50vw, 33vw" /></button>)}
    </div>
    {indiceActivo !== null && <div className={estilos["visor-galeria"]} role="dialog" aria-modal="true" aria-label={`Visor de imágenes de ${nombre}`} onClick={(event) => { if (event.target === event.currentTarget) cerrar(); }}><div className={estilos["visor-contenido"]}><Image src={imagenes[indiceActivo]} alt={`Imagen ampliada de ${nombre}`} fill sizes="100vw" /><button className={estilos["visor-cerrar"]} type="button" onClick={cerrar} aria-label="Cerrar galería"><X size={20} /></button><button className={`${estilos["visor-navegacion"]} ${estilos["visor-anterior"]}`} type="button" onClick={() => setIndiceActivo((indiceActivo - 1 + imagenes.length) % imagenes.length)} aria-label="Imagen anterior"><ChevronLeft size={22} /></button><button className={`${estilos["visor-navegacion"]} ${estilos["visor-siguiente"]}`} type="button" onClick={() => setIndiceActivo((indiceActivo + 1) % imagenes.length)} aria-label="Imagen siguiente"><ChevronRight size={22} /></button></div></div>}
  </>;
}
