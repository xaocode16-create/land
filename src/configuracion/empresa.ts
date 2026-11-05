import type { DatosEmpresa } from "@/tipos/empresa";

export const empresa = {
  nombreComercial: "LAND Inmobiliaria",
  descripcion:
    "Una experiencia clara y cercana para descubrir oportunidades inmobiliarias con propósito.",
  logotipo: "",
  telefono: "",
  whatsapp: "+51984296445",
  correoElectronico: "",
  direccion: "",
  dominio: "",
  redesSociales: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  contenidoDemostrativo: true,
} as const satisfies DatosEmpresa;

export const dominioPublico = empresa.dominio || "http://localhost:3000";
