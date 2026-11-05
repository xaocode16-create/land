import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

export function SobreLand() {
  return <section className="seccion bg-white"><div className="contenedor-pagina rejilla-dos-columnas"><div className="marco-imagen"><Image src="/imagenes/escena-inmobiliaria.svg" alt="Ilustración demostrativa de una propuesta inmobiliaria" width={1200} height={900} /></div><div><span className="etiqueta-seccion">Sobre LAND</span><h2 className="titulo-seccion">Ideas claras para encontrar tu próximo lugar.</h2><p className="descripcion-seccion">LAND Inmobiliaria presenta una experiencia digital pensada para conocer proyectos, comparar información y conversar con un asesor cuando estés listo.</p><ul className="lista-check"><li><Check size={18} /> Contenido comercial fácil de actualizar.</li><li><Check size={18} /> Fichas de proyectos con información ordenada.</li><li><Check size={18} /> Contacto directo para resolver dudas.</li></ul><Link className="boton-principal" href="/nosotros">Conoce nuestra empresa <ArrowUpRight size={17} /></Link></div></div></section>;
}
