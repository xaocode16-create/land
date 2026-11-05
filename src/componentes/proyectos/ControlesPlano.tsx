import { Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import estilos from "@/estilos/proyectos/PlanoInteractivo.module.css";

interface PropiedadesControlesPlano {
  zoom: number;
  alAcercar: () => void;
  alAlejar: () => void;
  alRestablecer: () => void;
}

export function ControlesPlano({ zoom, alAcercar, alAlejar, alRestablecer }: PropiedadesControlesPlano) {
  return (
    <div className={estilos["controles-plano"]} aria-label="Controles del plano">
      <button type="button" onClick={alAlejar} aria-label="Alejar el plano" disabled={zoom <= 1}><Minus size={16} /></button>
      <span aria-live="polite">{Math.round(zoom * 100)}%</span>
      <button type="button" onClick={alAcercar} aria-label="Acercar el plano" disabled={zoom >= 3}><Plus size={16} /></button>
      <button type="button" onClick={alRestablecer} aria-label="Restablecer vista"><RotateCcw size={16} /></button>
      <span className={estilos["ayuda-plano"]}><Maximize2 size={14} /> Arrastra para desplazarte</span>
    </div>
  );
}
