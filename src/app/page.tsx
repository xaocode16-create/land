import type { Metadata } from "next";
import { BannerVideos } from "@/componentes/inicio/BannerVideos";
import { BuscadorTerrenos } from "@/componentes/inicio/BuscadorTerrenos";
import { ProyectosDestacados } from "@/componentes/inicio/ProyectosDestacados";
import { SeccionBeneficios } from "@/componentes/inicio/SeccionBeneficios";
import { SobreLand } from "@/componentes/inicio/SobreLand";
import { PasosDeCompra } from "@/componentes/inicio/PasosDeCompra";
import { SeccionUbicaciones } from "@/componentes/inicio/SeccionUbicaciones";
import { PreguntasFrecuentes } from "@/componentes/inicio/PreguntasFrecuentes";

export const metadata: Metadata = { title: "Tu terreno, tu futuro", description: "Descubre oportunidades inmobiliarias y encuentra el lugar ideal para construir tus sueños." };

export default function Inicio() {
  return <><BannerVideos /><BuscadorTerrenos /><ProyectosDestacados /><SeccionBeneficios /><SobreLand /><PasosDeCompra /><SeccionUbicaciones /><PreguntasFrecuentes /></>;
}
