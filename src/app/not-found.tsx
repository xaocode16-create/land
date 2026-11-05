import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NoEncontrado() { return <section className="pagina-404"><div className="contenedor-pagina"><p className="etiqueta-seccion justify-center">LAND INMOBILIARIA</p><h1>404</h1><p className="mx-auto mb-7 max-w-md text-slate-500">La página que buscas no existe o fue movida.</p><Link href="/" className="boton-principal"><ArrowLeft size={17} /> Volver al inicio</Link></div></section>; }
