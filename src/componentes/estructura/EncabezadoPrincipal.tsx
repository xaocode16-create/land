"use client";

import Link from "next/link";
import { CircleHelp, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { empresa } from "@/configuracion/empresa";
import { enlacesNavegacion } from "@/configuracion/navegacion";
import { MarcaLand } from "@/componentes/interfaz/MarcaLand";
import estilos from "@/estilos/estructura/EncabezadoPrincipal.module.css";
import { MenuMovil } from "./MenuMovil";

export function EncabezadoPrincipal() {
  const rutaActual = usePathname();
  const [desplazado, setDesplazado] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const esInicio = rutaActual === "/";

  useEffect(() => {
    const actualizarEstado = () => setDesplazado(window.scrollY > 24);
    actualizarEstado();
    window.addEventListener("scroll", actualizarEstado, { passive: true });
    return () => window.removeEventListener("scroll", actualizarEstado);
  }, []);

  useEffect(() => setMenuAbierto(false), [rutaActual]);

  return (
    <header className={`${estilos["encabezado-principal"]} ${desplazado ? estilos["encabezado-desplazado"] : ""} ${!esInicio ? estilos["encabezado-solido"] : ""}`}>
      <div className={`contenedor-pagina ${estilos["barra-navegacion"]}`}>
        <Link href="/" aria-label="Ir al inicio"><MarcaLand /></Link>
        <nav className={estilos["navegacion-escritorio"]} aria-label="Navegación principal">
          {enlacesNavegacion.map((enlace) => {
            const activo = enlace.href === "/" ? rutaActual === "/" : rutaActual.startsWith(enlace.href);
            return <Link key={enlace.href} href={enlace.href} className={`${estilos["enlace-navegacion"]} ${activo ? estilos.activo : ""}`}>{enlace.etiqueta}</Link>;
          })}
        </nav>
        <Link className={estilos["boton-ayuda"]} href="/preguntas-frecuentes" aria-label="Abrir ayuda" title="Ayuda">
          <CircleHelp size={19} /> <span>Ayuda</span>
        </Link>
        <button className={estilos["boton-menu"]} type="button" aria-expanded={menuAbierto} aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuAbierto((estado) => !estado)}>
          {menuAbierto ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuAbierto && <MenuMovil rutaActual={rutaActual} alNavegar={() => setMenuAbierto(false)} />}
      {empresa.contenidoDemostrativo && <span className="sr-only">Sitio con contenido demostrativo pendiente de datos comerciales.</span>}
    </header>
  );
}
