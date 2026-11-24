import type { Metadata } from "next";
import Link from "next/link";
import styles from "./xaocode.module.css";

export const metadata: Metadata = {
  title: { absolute: "xaoCode Automatización" },
  description: "Información sobre xaoCode Automatización y su integración autorizada con redes sociales.",
};

export default function XaoCodeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <Link className={styles.brand} href="/xaocode" aria-label="xaoCode Automatización, inicio">
          <span className={styles.brandMark}>x</span>
          <span className={styles.brandName}>xaoCode <span>Automatización</span></span>
        </Link>
        <nav className={styles.topbarNav} aria-label="Navegación de xaoCode">
          <Link href="/xaocode">Cómo funciona</Link>
          <Link href="/xaocode/terminos">Términos</Link>
          <Link href="/xaocode/privacidad">Privacidad</Link>
        </nav>
      </header>
      {children}
      <footer className={styles.footer}>
        <span>xaoCode Automatización</span>
        <nav className={styles.footerLinks} aria-label="Enlaces legales">
          <Link href="/xaocode/terminos">Términos de Servicio</Link>
          <Link href="/xaocode/privacidad">Política de Privacidad</Link>
        </nav>
      </footer>
    </div>
  );
}
