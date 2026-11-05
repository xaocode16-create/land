export function formatearPrecio(precio: number | undefined, moneda: "PEN" | "USD" = "PEN") {
  if (typeof precio !== "number") return "Consultar";

  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(precio);
}
