import { Handshake, Info, MessageCircle, ShieldCheck } from "lucide-react";

const beneficios = [
  { icono: Handshake, titulo: "Atención personalizada", descripcion: "Un punto de contacto claro para resolver tus preguntas." },
  { icono: Info, titulo: "Información clara", descripcion: "Presentamos cada proyecto con datos editables y fáciles de consultar." },
  { icono: MessageCircle, titulo: "Acompañamiento cercano", descripcion: "Recibe orientación para avanzar a tu propio ritmo." },
  { icono: ShieldCheck, titulo: "Asesoramiento comercial", descripcion: "Conecta con un asesor para revisar la información disponible." },
];

export function SeccionBeneficios() {
  return <section className="seccion bg-white"><div className="contenedor-pagina"><div className="encabezado-seccion"><div><span className="etiqueta-seccion">La experiencia LAND</span><h2 className="titulo-seccion">Una forma más clara de empezar.</h2><p className="descripcion-seccion">Cada consulta merece información ordenada, una conversación honesta y el espacio para tomar decisiones con calma.</p></div></div><div className="rejilla-beneficios">{beneficios.map(({ icono: Icono, titulo, descripcion }) => <article className="beneficio" key={titulo}><span className="beneficio-icono"><Icono size={22} /></span><h3>{titulo}</h3><p>{descripcion}</p></article>)}</div></div></section>;
}
