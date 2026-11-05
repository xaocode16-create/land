import type { Config } from "tailwindcss";

const configuracionTailwind: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        noche: "var(--color-azul-noche)",
        azul: "var(--color-azul-principal)",
        cian: "var(--color-azul-cian)",
        tinta: "var(--color-texto)",
        niebla: "var(--color-gris-claro)",
      },
      boxShadow: {
        elegante: "var(--sombra-elegante)",
      },
    },
  },
  plugins: [],
};

export default configuracionTailwind;
