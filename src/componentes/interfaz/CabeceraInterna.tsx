import estilos from "@/estilos/interfaz/CabeceraInterna.module.css";

interface PropiedadesCabeceraInterna {
  etiqueta?: string;
  titulo: string;
  descripcion: string;
}

export function CabeceraInterna({ etiqueta = "LAND INMOBILIARIA", titulo, descripcion }: PropiedadesCabeceraInterna) {
  return <section className={estilos["cabecera-interna"]}><video className={estilos["cabecera-video"]} autoPlay muted loop playsInline poster="/imagenes/proyectos/las-palmas/poster-video.jpg" preload="metadata" aria-hidden="true"><source src="/videos/proyectos/las-palmas-de-san-ignacio-1080p.mp4" type="video/mp4" /></video><div className={estilos["cabecera-capa"]} aria-hidden="true" /><div className="contenedor-pagina"><span className="etiqueta-seccion text-cyan-300"><i className="bi bi-buildings-fill" aria-hidden="true" />{etiqueta}</span><h1>{titulo}</h1><p>{descripcion}</p></div></section>;
}
