import { CalendarDays, Compass, FileText, MessageCircle } from "lucide-react";

const pasos = [
  { numero: "01", icono: Compass, titulo: "Explora nuestros proyectos", descripcion: "Revisa las fichas y encuentra el proyecto que quieres conocer mejor." },
  { numero: "02", icono: MessageCircle, titulo: "Solicita información", descripcion: "Escríbenos con tus preguntas y preferencias." },
  { numero: "03", icono: CalendarDays, titulo: "Agenda una visita", descripcion: "Coordina con un asesor cuando la información esté confirmada." },
  { numero: "04", icono: FileText, titulo: "Recibe orientación", descripcion: "Conoce los siguientes pasos de acuerdo con tu consulta." },
];

export function PasosDeCompra() {
  return <section className="seccion bg-slate-50"><div className="contenedor-pagina"><div className="encabezado-seccion"><div><span className="etiqueta-seccion">Cómo comprar</span><h2 className="titulo-seccion">Tu próximo paso, más simple.</h2><p className="descripcion-seccion">Un recorrido orientativo para pasar de la exploración a una conversación informada.</p></div></div><div className="rejilla-pasos">{pasos.map(({ numero, icono: Icono, titulo, descripcion }) => <article className="paso-compra" key={numero}><div className="flex items-center justify-between"><span className="paso-numero">{numero}</span><Icono size={22} className="text-blue-500" /></div><h3>{titulo}</h3><p>{descripcion}</p></article>)}</div></div></section>;
}
