import Link from "next/link";
import styles from "../xaocode.module.css";

export default function XaoCodePrivacidad() {
  return (
    <main className={styles.legalPage}>
      <span className={styles.eyebrow}>Información legal</span>
      <h1>Política de Privacidad</h1>
      <p className={styles.legalIntro}>Información sobre autorización, datos y publicaciones en el contexto de xaoCode Automatización.</p>
      <article className={styles.legalBody}>
        <p className={styles.reviewNote}><strong>Pendiente de confirmación del propietario:</strong> deben confirmarse el responsable del tratamiento, el canal para ejercer derechos, los proveedores involucrados, las transferencias aplicables y los plazos de conservación. No se inventan correos, domicilios ni periodos de retención.</p>
        <h2>1. Datos que podrían tratarse</h2>
        <p>Según las funciones que se habiliten, el servicio podría tratar datos de cuenta necesarios para autorizar una integración, información técnica de la conexión y datos de contenido destinados a una publicación. El listado definitivo debe revisarse contra la implementación real.</p>
        <h2>2. Autorización con TikTok for Developers</h2>
        <p>La autorización debe realizarse en el flujo del proveedor. xaoCode no solicita que se peguen tokens, client secrets o contraseñas en esta página. Los permisos deberían limitarse a los necesarios para la función aprobada y revocarse desde la plataforma cuando ya no sean necesarios.</p>
        <h2>3. Uso de la información</h2>
        <p>La información podría utilizarse para conectar la cuenta autorizada, preparar contenido, ejecutar una acción de publicación solicitada y mostrar el estado de ese flujo. No se deben añadir finalidades como analítica, publicidad o cesión a terceros sin confirmarlas y describirlas antes de publicar.</p>
        <h2>4. Publicaciones y terceros</h2>
        <p>El contenido publicado se envía al proveedor social conforme a la autorización y a sus políticas. TikTok puede tratar la información de acuerdo con sus propios términos y políticas. La identidad de otros proveedores técnicos, si los hubiera, debe confirmarse antes de publicar esta política.</p>
        <h2>5. Seguridad y conservación</h2>
        <p>Las credenciales y secretos no deben almacenarse en el repositorio. Las medidas de seguridad, el lugar de almacenamiento y el plazo de conservación de cualquier dato operativo requieren una definición técnica y legal específica; por ello no se establece aquí un plazo inventado.</p>
        <h2>6. Derechos y actualizaciones</h2>
        <p>El propietario debe completar el mecanismo para solicitar acceso, rectificación, supresión, oposición u otros derechos que correspondan según la normativa aplicable. También debe confirmar la fecha de vigencia y comunicar los cambios relevantes de esta política.</p>
      </article>
      <Link className={styles.legalBack} href="/xaocode">Volver a xaoCode Automatización</Link>
    </main>
  );
}
