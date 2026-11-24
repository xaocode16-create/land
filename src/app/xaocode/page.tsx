import Link from "next/link";
import styles from "./xaocode.module.css";

export default function XaoCodeInicio() {
  return (
    <>
      <main>
        <section className={styles.hero} aria-labelledby="titulo-xaocode">
          <div>
            <span className={styles.eyebrow}>Automatización para creadores y equipos</span>
            <h1 id="titulo-xaocode" className={styles.heroTitle}>Publica con intención. <span>Automatiza con control.</span></h1>
            <p className={styles.heroText}>
              xaoCode Automatización es una propuesta para conectar flujos de contenido con redes sociales, como TikTok for Developers, mediante autorizaciones explícitas y acciones trazables.
            </p>
            <div className={styles.heroActions}>
              <Link className={styles.buttonPrimary} href="/xaocode/terminos">Ver términos de servicio</Link>
              <Link className={styles.buttonSecondary} href="/xaocode/privacidad">Ver política de privacidad</Link>
            </div>
          </div>
          <div className={styles.orbit} aria-label="Flujo ilustrativo de autorización, contenido, revisión y publicación">
            <span className={`${styles.orbitNode} ${styles.nodeTikTok}`}>TikTok</span>
            <span className={`${styles.orbitNode} ${styles.nodeContent}`}>Contenido</span>
            <span className={`${styles.orbitNode} ${styles.nodeReview}`}>Revisión</span>
            <span className={`${styles.orbitNode} ${styles.nodeAccess}`}>Acceso</span>
            <span className={styles.orbitCenter}>xaoCode</span>
          </div>
        </section>

        <section className={styles.lightSection} aria-labelledby="titulo-flujo">
          <div className={styles.contentSection}>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>Un flujo comprensible</span>
              <h2 id="titulo-flujo">La automatización empieza con permiso, no con credenciales compartidas.</h2>
              <p>La integración con una plataforma social debe respetar el consentimiento de la cuenta, los permisos solicitados y las reglas del proveedor. Esta página describe el modelo previsto, no confirma que una conexión concreta ya esté activa.</p>
            </div>
            <div className={styles.cards}>
              <article className={styles.card}>
                <span className={styles.cardNumber}>01</span>
                <h3>Autorización</h3>
                <p>La persona propietaria de la cuenta inicia y aprueba el acceso en el flujo oficial del proveedor, con los permisos que correspondan a la integración.</p>
              </article>
              <article className={styles.card}>
                <span className={styles.cardNumber}>02</span>
                <h3>Preparación</h3>
                <p>El sistema puede ayudar a organizar contenido y datos necesarios para una publicación, sin pedir tokens o secretos directamente en esta web.</p>
              </article>
              <article className={styles.card}>
                <span className={styles.cardNumber}>03</span>
                <h3>Publicación controlada</h3>
                <p>Las publicaciones se gestionarían según los permisos aprobados, la configuración definida y las restricciones de TikTok for Developers.</p>
              </article>
            </div>
            <p className={styles.disclaimer}><strong>Antes de publicar:</strong> el propietario debe confirmar el nombre legal responsable, los permisos exactos, el flujo de aprobación y si existirá publicación manual, programada o automatizada. Ninguno de esos datos se inventa en esta sección.</p>
          </div>
        </section>

        <section className={styles.lightSection}>
          <div className={styles.contentSection}>
            <div className={styles.legalStrip}>
              <div>
                <h2>Información legal de xaoCode</h2>
                <p>Consulta cómo se autoriza el acceso, cómo se usan los datos y cómo se gestionan las publicaciones.</p>
              </div>
              <div className={styles.legalLinks}>
                <Link className={styles.legalLink} href="/xaocode/terminos">Términos de Servicio</Link>
                <Link className={styles.legalLink} href="/xaocode/privacidad">Política de Privacidad</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
