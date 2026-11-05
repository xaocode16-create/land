"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { videosBanner } from "@/datos/videosBanner";
import { generarEnlaceWhatsApp } from "@/utilidades/generarEnlaceWhatsApp";
import estilos from "@/estilos/inicio/BannerVideos.module.css";

export function BannerVideos() {
  const videosActivos = useMemo(() => videosBanner.filter((video) => video.activo).sort((a, b) => a.orden - b.orden), []);
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [pausado, setPausado] = useState(false);
  const [movimientoReducido, setMovimientoReducido] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoActual = videosActivos[indiceActivo] ?? videosActivos[0];

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMovimientoReducido(consulta.matches);
    const actualizar = () => setMovimientoReducido(consulta.matches);
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  useEffect(() => {
    if (pausado || movimientoReducido || videosActivos.length < 2) return;
    const temporizador = window.setTimeout(() => setIndiceActivo((indice) => (indice + 1) % videosActivos.length), videoActual.duracion * 1000);
    return () => window.clearTimeout(temporizador);
  }, [indiceActivo, pausado, movimientoReducido, videoActual, videosActivos]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (pausado || movimientoReducido) videoRef.current.pause();
    else void videoRef.current.play().catch(() => undefined);
  }, [pausado, movimientoReducido, videoActual.id]);

  if (!videoActual) return null;
  const avanzar = () => setIndiceActivo((indice) => (indice + 1) % videosActivos.length);
  const retroceder = () => setIndiceActivo((indice) => (indice - 1 + videosActivos.length) % videosActivos.length);

  return (
    <section className={estilos["banner-principal"]} aria-label="Presentación de proyectos LAND">
      <div className={estilos["banner-fondo"]} key={videoActual.id}>
        {videoActual.rutaVideo ? <video ref={videoRef} src={videoActual.rutaVideo} poster={videoActual.imagenRespaldo} autoPlay muted playsInline loop={videosActivos.length === 1} onEnded={avanzar} className="h-full w-full object-cover" aria-label={`Video promocional de ${videoActual.nombre}`} /> : <Image src={videoActual.imagenRespaldo} alt={`Imagen de respaldo del proyecto ${videoActual.nombre}`} fill priority sizes="100vw" />}
      </div>
      <div className={estilos["banner-capa"]} />
      <div className={`contenedor-pagina ${estilos["banner-contenido"]}`}>
        <div className={estilos["banner-texto"]}>
          <h1 className={estilos["banner-titulo"]}>{videoActual.titulo}</h1>
          <div className={estilos["banner-acciones"]}>
            <Link className="boton-principal" href={videoActual.enlaceProyecto}>Explorar proyecto <ChevronRight size={17} /></Link>
            <Link className="boton-secundario" href={generarEnlaceWhatsApp(`Hola, LAND Inmobiliaria. Quisiera consultar por el proyecto ${videoActual.nombre}.`) || "/contacto"} target={generarEnlaceWhatsApp(`Hola, LAND Inmobiliaria. Quisiera consultar por el proyecto ${videoActual.nombre}.`) ? "_blank" : undefined} rel={generarEnlaceWhatsApp(`Hola, LAND Inmobiliaria. Quisiera consultar por el proyecto ${videoActual.nombre}.`) ? "noreferrer" : undefined}>Consultar por WhatsApp</Link>
          </div>
        </div>
      </div>
      <div className={`contenedor-pagina ${estilos["banner-controles"]}`}>
        <div className={estilos["controles-banner"]}>
          <button className={estilos["control-circular"]} type="button" onClick={retroceder} aria-label="Video anterior"><ChevronLeft size={18} /></button>
          <button className={estilos["control-circular"]} type="button" onClick={() => setPausado((estado) => !estado)} aria-label={pausado ? "Reanudar videos" : "Pausar videos"}>{pausado ? <Play size={17} /> : <Pause size={17} />}</button>
          <button className={estilos["control-circular"]} type="button" onClick={avanzar} aria-label="Video siguiente"><ChevronRight size={18} /></button>
        </div>
        <div className={estilos["indicadores-banner"]} aria-label="Seleccionar proyecto">
          {videosActivos.map((video, indice) => <button key={video.id} className={`${estilos["indicador-banner"]} ${indice === indiceActivo ? estilos.activo : ""}`} type="button" onClick={() => setIndiceActivo(indice)} aria-label={`Mostrar ${video.nombre}`} aria-current={indice === indiceActivo} />)}
        </div>
        <div className={estilos["banner-progreso"]}><span>{String(indiceActivo + 1).padStart(2, "0")}</span><span className={estilos["barra-progreso"]}><span key={videoActual.id} /></span><span>{String(videosActivos.length).padStart(2, "0")}</span></div>
      </div>
    </section>
  );
}
