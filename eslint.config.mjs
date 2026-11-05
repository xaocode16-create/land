import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const directorioActual = dirname(fileURLToPath(import.meta.url));
const compatibilidad = new FlatCompat({ baseDirectory: directorioActual });

export default [
  ...compatibilidad.extends("next/core-web-vitals", "next/typescript"),
  { ignores: [".next/**", ".next-*/**", "node_modules/**"] },
];
