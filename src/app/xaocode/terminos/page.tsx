import Link from "next/link";
import styles from "../xaocode.module.css";

export default function XaoCodeTerminos() {
  return (
    <main className={styles.legalPage}>
      <span className={styles.eyebrow}>Información legal</span>
      <h1>Términos de Servicio</h1>
      <p className={styles.legalIntro}>Condiciones informativas para el uso de xaoCode Automatización y su posible integración con TikTok for Developers.</p>
      <article className={styles.legalBody}>
        <p className={styles.reviewNote}><strong>Pendiente de confirmación del propietario:</strong> antes de publicar esta versión deben definirse la identidad legal responsable, el canal oficial de contacto, la jurisdicción aplicable, el alcance final del servicio y cualquier condición comercial. Esos datos no se completan aquí sin autorización.</p>
        <h2>1. Alcance del servicio</h2>
        <p>xaoCode Automatización puede ofrecer herramientas para preparar, organizar y gestionar flujos de contenido destinados a redes sociales. La disponibilidad de cada función depende de la implementación vigente, de los permisos concedidos y de las reglas de cada plataforma.</p>
        <h2>2. Autorización de cuentas</h2>
        <p>La conexión con TikTok for Developers debe iniciarse mediante el flujo oficial de autorización del proveedor. La persona usuaria declara que tiene permiso para administrar la cuenta conectada y que no compartirá client secrets, tokens ni credenciales privadas a través de formularios o mensajes de xaoCode.</p>
        <h2>3. Gestión de contenido y publicaciones</h2>
        <p>La persona usuaria conserva la responsabilidad sobre el contenido que prepara o publica. Cuando una función de publicación esté habilitada, se utilizarán únicamente los permisos y configuraciones aprobados; pueden existir límites, revisiones, rechazos o cambios impuestos por TikTok.</p>
        <h2>4. Uso aceptable</h2>
        <p>No se debe usar xaoCode para suplantar identidades, infringir derechos, distribuir contenido ilegal, evadir controles de una plataforma o publicar material sin autorización de la cuenta correspondiente.</p>
        <h2>5. Cambios y disponibilidad</h2>
        <p>Las funciones pueden cambiar si cambian la integración, las políticas del proveedor o la configuración del servicio. El propietario debe confirmar antes de publicar cualquier compromiso sobre disponibilidad, soporte, tiempos, tarifas o garantías.</p>
        <h2>6. Contacto y versión final</h2>
        <p>El canal de contacto, la fecha de entrada en vigor y la identidad del responsable están pendientes de confirmación. Esta página es una base informativa para revisión y no sustituye la validación legal del propietario.</p>
      </article>
      <Link className={styles.legalBack} href="/xaocode">Volver a xaoCode Automatización</Link>
    </main>
  );
}
