import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Info, MapPin, Ruler } from "lucide-react";
import { GaleriaProyecto } from "@/componentes/proyectos/GaleriaProyecto";
import { BotonWhatsApp } from "@/componentes/contacto/BotonWhatsApp";
import { TarjetaProyecto } from "@/componentes/proyectos/TarjetaProyecto";
import { formatearPrecio } from "@/utilidades/formatearPrecio";
import { generarMensajeProyecto } from "@/utilidades/generarEnlaceWhatsApp";
import { obtenerProyectoPorIdentificador, obtenerProyectosPublicados, obtenerProyectosRelacionados } from "@/utilidades/obtenerProyectos";
import { ExperienciaLasPalmas } from "@/componentes/proyectos/ExperienciaLasPalmas";
import estilos from "@/estilos/proyectos/DetalleProyecto.module.css";

interface PropiedadesPaginaProyecto { params: Promise<{ identificador: string }> }

export function generateStaticParams() { return obtenerProyectosPublicados().map((proyecto) => ({ identificador: proyecto.identificador })); }

export async function generateMetadata({ params }: PropiedadesPaginaProyecto): Promise<Metadata> {
  const { identificador } = await params;
  const proyecto = obtenerProyectoPorIdentificador(identificador);
  if (!proyecto) return { title: "Proyecto no encontrado" };
  return { title: proyecto.nombre, description: proyecto.descripcionCorta, openGraph: { title: proyecto.nombre, description: proyecto.descripcionCorta, images: [proyecto.imagenPrincipal] } };
}

export default async function DetalleProyecto({ params }: PropiedadesPaginaProyecto) {
  const { identificador } = await params;
  const proyecto = obtenerProyectoPorIdentificador(identificador);
  if (!proyecto) notFound();
  if (proyecto.identificador === "las-palmas-de-san-ignacio") return <ExperienciaLasPalmas />;
  const relacionados = obtenerProyectosRelacionados(proyecto.identificador);
  return <section className={estilos["detalle-proyecto"]}><div className="contenedor-pagina"><div className={estilos["detalle-encabezado"]}><div><span className="etiqueta-seccion">{proyecto.etiqueta ?? "Proyecto LAND"}</span><h1>{proyecto.nombre}</h1><p>{proyecto.descripcionCompleta}</p><div className={estilos["datos-detalle"]}><div className={estilos["dato-detalle"]}><small>Ubicación</small><strong>{proyecto.ubicacion.split(" · ")[0]}</strong></div><div className={estilos["dato-detalle"]}><small>Área desde</small><strong>{proyecto.areaDesde} m²</strong></div><div className={estilos["dato-detalle"]}><small>Precio desde</small><strong>{formatearPrecio(proyecto.precioDesde, proyecto.moneda)}</strong></div></div><BotonWhatsApp mensaje={generarMensajeProyecto(proyecto.nombre)} etiqueta="Consultar este proyecto" /></div><div className={estilos["detalle-portada"]}><Image src={proyecto.imagenPrincipal} alt={`Imagen principal de ${proyecto.nombre}`} fill priority sizes="(max-width: 980px) 100vw, 50vw" /></div></div><GaleriaProyecto imagenes={proyecto.imagenes} nombre={proyecto.nombre} /><div className={estilos["detalle-columnas"]}><div className="panel-blanco"><h2>Sobre este proyecto</h2><p>{proyecto.descripcionCompleta}</p><ul className="lista-caracteristicas">{proyecto.caracteristicas.map((caracteristica) => <li key={caracteristica}><Check size={17} /> {caracteristica}</li>)}</ul></div><div className="panel-blanco"><h2>Ubicación</h2><p className="flex items-start gap-2"><MapPin size={20} className="mt-1 shrink-0 text-blue-500" /> {proyecto.ubicacion}</p>{proyecto.latitud && proyecto.longitud ? <a className="boton-fantasma mt-3" href={`https://www.google.com/maps?q=${proyecto.latitud},${proyecto.longitud}`} target="_blank" rel="noreferrer">Abrir mapa</a> : <div className="aviso-demo"><Info size={18} /> Las coordenadas exactas de este proyecto todavía deben ser confirmadas.</div>}<div className="mt-6 flex items-center gap-2 text-sm text-slate-500"><Ruler size={17} className="text-blue-500" /> Área referencial desde {proyecto.areaDesde} m²</div></div></div>{relacionados.length > 0 && <div className="mt-24"><div className="encabezado-seccion"><div><span className="etiqueta-seccion">También puedes conocer</span><h2 className="titulo-seccion">Otros proyectos</h2></div><Link href="/proyectos" className="boton-fantasma">Ver catálogo</Link></div><div className="rejilla-proyectos">{relacionados.map((item) => <TarjetaProyecto key={item.id} proyecto={item} />)}</div></div>}</div></section>;
}
