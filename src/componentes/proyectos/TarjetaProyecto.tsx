import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Ruler } from "lucide-react";
import type { ProyectoInmobiliario } from "@/tipos/proyecto";
import { formatearPrecio } from "@/utilidades/formatearPrecio";
import estilos from "@/estilos/proyectos/TarjetaProyecto.module.css";

export function TarjetaProyecto({ proyecto }: { proyecto: ProyectoInmobiliario }) {
  return (
    <article className={estilos["tarjeta-proyecto"]}>
      <Link href={`/proyectos/${proyecto.identificador}`} aria-label={`Ver proyecto ${proyecto.nombre}`}>
        <div className={estilos["tarjeta-imagen"]}><Image src={proyecto.imagenPrincipal} alt={`Imagen demostrativa de ${proyecto.nombre}`} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw" />{proyecto.etiqueta && <span className={estilos["tarjeta-etiqueta"]}>{proyecto.etiqueta}</span>}</div>
      </Link>
      <div className={estilos["tarjeta-contenido"]}>
        <h3>{proyecto.nombre}</h3>
        <p>{proyecto.descripcionCorta}</p>
        <div className={estilos["tarjeta-meta"]}><span><MapPin size={15} /> {proyecto.ubicacion.split(" · ")[0]}</span><span><Ruler size={15} /> Desde {proyecto.areaDesde} m²</span></div>
        <div className={estilos["tarjeta-pie"]}><div className={estilos["tarjeta-precio"]}><small>Precio desde</small><strong>{formatearPrecio(proyecto.precioDesde, proyecto.moneda)}</strong></div><Link className={estilos["enlace-flecha"]} href={`/proyectos/${proyecto.identificador}`}>Conocer <ArrowUpRight size={17} /></Link></div>
      </div>
    </article>
  );
}
