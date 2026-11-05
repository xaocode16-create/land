"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { obtenerProyectosDestacados } from "@/utilidades/obtenerProyectos";
import { TarjetaProyecto } from "@/componentes/proyectos/TarjetaProyecto";
import estilos from "@/estilos/inicio/ProyectosDestacados.module.css";

export function ProyectosDestacados() {
  const proyectosDestacados = obtenerProyectosDestacados();
  const carruselRef = useRef<HTMLDivElement>(null);
  const [indiceActivo, setIndiceActivo] = useState(0);

  useEffect(() => {
    const contenedor = carruselRef.current;
    if (!contenedor) return;

    function actualizarIndice() {
      const tarjetas = Array.from(contenedor!.children) as HTMLElement[];
      if (!tarjetas.length) return;

      const indice = tarjetas.reduce((mejorIndice, tarjeta, indiceActual) => {
        const mejorDistancia = Math.abs(tarjetas[mejorIndice].offsetLeft - contenedor!.scrollLeft);
        const distanciaActual = Math.abs(tarjeta.offsetLeft - contenedor!.scrollLeft);
        return distanciaActual < mejorDistancia ? indiceActual : mejorIndice;
      }, 0);

      setIndiceActivo(indice);
    }

    contenedor.addEventListener("scroll", actualizarIndice, { passive: true });
    actualizarIndice();
    return () => contenedor.removeEventListener("scroll", actualizarIndice);
  }, [proyectosDestacados.length]);

  function mostrarProyecto(indice: number) {
    const carrusel = carruselRef.current;
    const tarjeta = carrusel?.children.item(indice) as HTMLElement | null;
    if (!carrusel || !tarjeta) return;

    carrusel.scrollTo({ left: tarjeta.offsetLeft, behavior: "smooth" });
    setIndiceActivo(indice);
  }

  return <section className={`seccion ${estilos["seccion-proyectos"]}`} id="proyectos-destacados"><div className="contenedor-pagina"><div className="encabezado-seccion"><div><span className="etiqueta-seccion">Proyectos seleccionados</span><h2 className="titulo-seccion">Descubre nuestros proyectos inmobiliarios</h2><p className="descripcion-seccion">Conoce nuevas oportunidades para tu próxima inversión.</p></div><Link className="boton-fantasma" href="/proyectos">Ver todos los proyectos <ArrowRight size={17} /></Link></div><div ref={carruselRef} className={estilos["carrusel-proyectos"]} aria-label="Proyectos destacados">{proyectosDestacados.map((proyecto) => <div className={estilos["tarjeta-deslizante"]} key={proyecto.id}><TarjetaProyecto proyecto={proyecto} /></div>)}</div><div className={estilos["paginacion-carrusel"]} aria-label="Navegación de proyectos">{proyectosDestacados.map((proyecto, indice) => <button className={`${estilos["punto-carrusel"]} ${indice === indiceActivo ? estilos.activo : ""}`} key={proyecto.id} type="button" onClick={() => mostrarProyecto(indice)} aria-label={`Mostrar proyecto ${indice + 1}: ${proyecto.nombre}`} aria-current={indice === indiceActivo ? "true" : undefined} />)}</div></div></section>;
}
