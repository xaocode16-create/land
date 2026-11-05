"use client";

import Link from "next/link";
import { ArrowDown, MessageCircle, Pause, Play } from "lucide-react";
import { useRef, useState } from "react";
import type { ProyectoLasPalmas } from "@/tipos/proyectoLasPalmas";
import estilos from "@/estilos/proyectos/PortadaProyecto.module.css";

export function PortadaProyecto({ proyecto }: { proyecto: ProyectoLasPalmas }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reproduciendo, setReproduciendo] = useState(true);

  function alternarVideo() {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      void videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }

  return (
    <section className={estilos["portada-proyecto"]} aria-labelledby="titulo-las-palmas">
      <div className={estilos["portada-fondo"]}>
        <video
          ref={videoRef}
          className={estilos["portada-video"]}
          autoPlay
          muted
          loop
          playsInline
          poster={proyecto.posterVideo}
          preload="metadata"
          onPlay={() => setReproduciendo(true)}
          onPause={() => setReproduciendo(false)}
          aria-label={`Video promocional de ${proyecto.nombre}`}
        >
          <source src={proyecto.videoMovil} media="(max-width: 640px)" type="video/mp4" />
          <source src={proyecto.video} type="video/mp4" />
        </video>
      </div>
      <div className={estilos["portada-capa"]} />
      <div className={`contenedor-pagina ${estilos["portada-contenido"]}`}>
        <div className={estilos["portada-texto"]}>
          <h1 id="titulo-las-palmas">{proyecto.tituloComercial}</h1>
          <div className={estilos["portada-acciones"]}>
            <a className="boton-principal" href="#plano-interactivo"><ArrowDown size={17} /> Explorar el proyecto</a>
            <Link className="boton-secundario" href="#plano-interactivo"><MessageCircle size={17} /> Consultar por WhatsApp</Link>
          </div>
        </div>
        <button className={estilos["control-video"]} type="button" onClick={alternarVideo} aria-label={reproduciendo ? "Pausar video" : "Reproducir video"} aria-pressed={!reproduciendo}>
          {reproduciendo ? <Pause size={16} /> : <Play size={16} />}
          {reproduciendo ? "Pausar video" : "Reproducir video"}
        </button>
      </div>
    </section>
  );
}
