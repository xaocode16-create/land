"use client";

import Link from "next/link";
import { enlacesNavegacion } from "@/configuracion/navegacion";
import estilos from "@/estilos/estructura/MenuMovil.module.css";

interface PropiedadesMenuMovil {
  rutaActual: string;
  alNavegar: () => void;
}

export function MenuMovil({ rutaActual, alNavegar }: PropiedadesMenuMovil) {
  return (
    <nav className={estilos["menu-movil"]} aria-label="Navegación móvil">
      {enlacesNavegacion.map((enlace) => {
        const activo = enlace.href === "/" ? rutaActual === "/" : rutaActual.startsWith(enlace.href);
        return (
          <Link key={enlace.href} href={enlace.href} className={activo ? estilos.activo : ""} onClick={alNavegar}>
            {enlace.etiqueta}
          </Link>
        );
      })}
    </nav>
  );
}
