import Link from "next/link";
import { empresa } from "@/configuracion/empresa";
import { enlacesNavegacion } from "@/configuracion/navegacion";
import { generarEnlaceWhatsApp } from "@/utilidades/generarEnlaceWhatsApp";
import estilos from "@/estilos/estructura/PieDePagina.module.css";

export function PieDePagina() {
  const anoActual = new Date().getFullYear();
  const enlaceWhatsApp = generarEnlaceWhatsApp("Hola, LAND Inmobiliaria. Quisiera recibir información sobre sus proyectos.");
  return (
    <footer className={estilos["pie-pagina"]}>
      <div className={estilos["pie-marco"]}>
        <div className={`contenedor-pagina ${estilos["pie-contenido"]}`}>
          <section className={estilos["pie-llamado"]} aria-labelledby="titulo-pie">
            <span><i className="bi bi-buildings-fill" aria-hidden="true" /> LAND INMOBILIARIA</span>
            <h2 id="titulo-pie">Tu futuro comienza con una gran decisión.</h2>
            <p>Encuentra el terreno ideal y recibe orientación personalizada.</p>
          </section>
          <div className={estilos["pie-grid"]}>
            <div className={estilos["pie-identidad"]}>
              <Link className={estilos["marca-pie"]} href="/" aria-label="Ir al inicio"><strong>LAND</strong><small>INMOBILIARIA</small></Link>
              <p className={estilos["pie-descripcion"]}>Construimos oportunidades para tu futuro.</p>
              <div className={estilos["redes-sociales"]}>
                {empresa.redesSociales.facebook && <a className={estilos["red-social"]} href={empresa.redesSociales.facebook} aria-label="Facebook" target="_blank" rel="noreferrer"><i className="bi bi-facebook" aria-hidden="true" /></a>}
                {empresa.redesSociales.instagram && <a className={estilos["red-social"]} href={empresa.redesSociales.instagram} aria-label="Instagram" target="_blank" rel="noreferrer"><i className="bi bi-instagram" aria-hidden="true" /></a>}
                {empresa.redesSociales.youtube && <a className={estilos["red-social"]} href={empresa.redesSociales.youtube} aria-label="YouTube" target="_blank" rel="noreferrer"><i className="bi bi-youtube" aria-hidden="true" /></a>}
              </div>
            </div>
            <div className={estilos["pie-columna"]}>
              <h3><i className="bi bi-compass-fill" aria-hidden="true" /> Explora</h3>
              <nav className={estilos["pie-enlaces"]} aria-label="Enlaces del pie de página">
                {enlacesNavegacion.map((enlace) => <Link key={enlace.href} href={enlace.href}>{enlace.etiqueta}</Link>)}
              </nav>
            </div>
            <div className={estilos["pie-columna"]}>
              <h3><i className="bi bi-chat-dots-fill" aria-hidden="true" /> Contáctanos</h3>
              <div className={estilos["pie-enlaces"]}>
                {enlaceWhatsApp ? <a href={enlaceWhatsApp} target="_blank" rel="noreferrer"><i className="bi bi-whatsapp" aria-hidden="true" /> WhatsApp</a> : <Link href="/contacto"><i className="bi bi-whatsapp" aria-hidden="true" /> WhatsApp</Link>}
                {empresa.correoElectronico ? <a href={`mailto:${empresa.correoElectronico}`}><i className="bi bi-envelope-fill" aria-hidden="true" /> Correo corporativo</a> : <Link href="/contacto"><i className="bi bi-envelope-fill" aria-hidden="true" /> Correo corporativo</Link>}
              </div>
            </div>
          </div>
          <div className={estilos["pie-bajo"]}>
            <span>© {anoActual} LAND Inmobiliaria</span>
            <Link href="/politica-de-privacidad">Política de privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
