export interface RedesSociales {
  instagram: string;
  facebook: string;
  youtube: string;
}

export interface DatosEmpresa {
  nombreComercial: string;
  descripcion: string;
  logotipo: string;
  telefono: string;
  whatsapp: string;
  correoElectronico: string;
  direccion: string;
  dominio: string;
  redesSociales: RedesSociales;
  contenidoDemostrativo: boolean;
}
