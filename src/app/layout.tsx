import type { Metadata } from "next";
import { EncabezadoPrincipal } from "@/componentes/estructura/EncabezadoPrincipal";
import { PieDePagina } from "@/componentes/estructura/PieDePagina";
import { BotonWhatsApp } from "@/componentes/contacto/BotonWhatsApp";
import { dominioPublico, empresa } from "@/configuracion/empresa";
import "@/estilos/variables.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/estilos/tipografia.css";
import "@/estilos/animaciones.css";
import "@/estilos/global.css";
import "@/estilos/inicio/secciones.css";
import "@/estilos/paginas/compartidos.css";

export const metadata: Metadata = {
  title: { default: `${empresa.nombreComercial} | Tu terreno, tu futuro`, template: `%s | ${empresa.nombreComercial}` },
  description: empresa.descripcion,
  keywords: ["LAND Inmobiliaria", "terrenos", "proyectos inmobiliarios", "Perú"],
  applicationName: empresa.nombreComercial,
  metadataBase: new URL(dominioPublico),
  openGraph: { title: empresa.nombreComercial, description: empresa.descripcion, type: "website", locale: "es_PE" },
  icons: { icon: "/favicon.svg" },
};

export default function RaizLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-PE"><body><EncabezadoPrincipal /><main>{children}</main><PieDePagina /><BotonWhatsApp flotante /></body></html>;
}
