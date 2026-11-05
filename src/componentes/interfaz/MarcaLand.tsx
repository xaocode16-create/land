import estilos from "@/estilos/estructura/MarcaLand.module.css";

export function MarcaLand() {
  return (
    <span className={estilos["marca-land"]} aria-label="LAND Inmobiliaria">
      <span className={estilos["marca-acento"]} aria-hidden="true" />
      <span>
        <strong>LAND</strong>
        <small>INMOBILIARIA</small>
      </span>
    </span>
  );
}
