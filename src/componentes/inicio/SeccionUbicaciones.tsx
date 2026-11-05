import { ExternalLink, MapPin } from "lucide-react";
import { obtenerProyectosPublicados } from "@/utilidades/obtenerProyectos";

export function SeccionUbicaciones() {
  const proyectosPublicados = obtenerProyectosPublicados();
  const primerProyectoConMapa = proyectosPublicados.find((proyecto) => proyecto.enlaceMapa);

  return (
    <section className="seccion bg-white">
      <div className="contenedor-pagina">
        <div className="encabezado-seccion">
          <div>
            <span className="etiqueta-seccion">Dónde encontrarnos</span>
            <h2 className="titulo-seccion">Ubicaciones que puedes consultar.</h2>
            <p className="descripcion-seccion">Consulta la ubicación compartida para cada proyecto y abre Google Maps para revisar el punto de referencia.</p>
          </div>
        </div>
        <div className="ubicaciones-grid">
          <div className="mapa-espera">
            <div>
              <MapPin size={34} className="mx-auto mb-4 text-blue-500" />
              <strong className="mb-2 block text-lg text-slate-900">Ubicación disponible en Google Maps</strong>
              <p className="m-0 text-sm leading-6">La ubicación corresponde al punto compartido para Las Palmas de San Ignacio. Los accesos y las distancias comerciales deben confirmarse con un asesor.</p>
              {primerProyectoConMapa?.enlaceMapa && <a className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-500" href={primerProyectoConMapa.enlaceMapa} target="_blank" rel="noreferrer">Abrir ubicación <ExternalLink size={15} /></a>}
            </div>
          </div>
          <div className="lista-ubicaciones">
            {proyectosPublicados.map((proyecto) => (
              <div className="ubicacion-item" key={proyecto.identificador}>
                <MapPin size={20} />
                <div>
                  <strong>{proyecto.nombre}</strong>
                  <span>{proyecto.ubicacion}</span>
                  {proyecto.enlaceMapa ? <a className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-blue-500" href={proyecto.enlaceMapa} target="_blank" rel="noreferrer">Abrir mapa <ExternalLink size={13} /></a> : <span className="mt-2 block text-xs text-slate-400">Coordenadas por confirmar</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
