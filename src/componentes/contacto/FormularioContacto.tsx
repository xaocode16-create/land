"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { generarEnlaceWhatsApp } from "@/utilidades/generarEnlaceWhatsApp";
import { obtenerProyectosPublicados } from "@/utilidades/obtenerProyectos";
import estilos from "@/estilos/contacto/FormularioContacto.module.css";

interface DatosFormulario {
  nombre: string;
  telefono: string;
  correo: string;
  proyecto: string;
  mensaje: string;
  privacidad: boolean;
}

const estadoInicial: DatosFormulario = { nombre: "", telefono: "", correo: "", proyecto: "", mensaje: "", privacidad: false };

export function FormularioContacto() {
  const [datos, setDatos] = useState(estadoInicial);
  const [error, setError] = useState("");

  function actualizar(campo: keyof DatosFormulario, valor: string | boolean) {
    setDatos((actuales) => ({ ...actuales, [campo]: valor }));
    setError("");
  }

  function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    if (!datos.nombre.trim() || !datos.telefono.trim() || !datos.mensaje.trim()) {
      setError("Completa tu nombre, teléfono y mensaje para continuar.");
      return;
    }
    if (!datos.privacidad) {
      setError("Acepta la nota de privacidad para abrir WhatsApp.");
      return;
    }
    const texto = [
      "Hola, LAND Inmobiliaria. Quisiera realizar una consulta.",
      `Nombre: ${datos.nombre}`,
      `Teléfono: ${datos.telefono}`,
      datos.correo ? `Correo: ${datos.correo}` : "",
      datos.proyecto ? `Proyecto de interés: ${datos.proyecto}` : "",
      `Mensaje: ${datos.mensaje}`,
    ].filter(Boolean).join("\n");
    const enlace = generarEnlaceWhatsApp(texto);
    if (!enlace) {
      setError("WhatsApp aún no está configurado. El equipo debe añadir el número oficial en src/configuracion/empresa.ts.");
      return;
    }
    window.open(enlace, "_blank", "noopener,noreferrer");
  }

  return (
    <form className={estilos["formulario-contacto"]} onSubmit={enviarFormulario} noValidate>
      <div className={estilos["formulario-grid"]}>
        <label className="campo-etiqueta">Nombre completo *<input value={datos.nombre} onChange={(e) => actualizar("nombre", e.target.value)} placeholder="Tu nombre" required /></label>
        <label className="campo-etiqueta">Teléfono *<input value={datos.telefono} onChange={(e) => actualizar("telefono", e.target.value)} placeholder="Tu número" inputMode="tel" required /></label>
        <label className="campo-etiqueta">Correo electrónico <input type="email" value={datos.correo} onChange={(e) => actualizar("correo", e.target.value)} placeholder="tu@correo.com" /></label>
        <label className="campo-etiqueta">Proyecto de interés
          <select value={datos.proyecto} onChange={(e) => actualizar("proyecto", e.target.value)}>
            <option value="">Selecciona un proyecto</option>
            {obtenerProyectosPublicados().map((proyecto) => <option key={proyecto.identificador} value={proyecto.nombre}>{proyecto.nombre}</option>)}
          </select>
        </label>
        <label className={`campo-etiqueta ${estilos["formulario-ancho"]}`}>Mensaje *<textarea value={datos.mensaje} onChange={(e) => actualizar("mensaje", e.target.value)} placeholder="Cuéntanos qué información necesitas" rows={5} required /></label>
      </div>
      <label className="flex items-start gap-3 text-sm text-slate-500"><input type="checkbox" checked={datos.privacidad} onChange={(e) => actualizar("privacidad", e.target.checked)} className="mt-1 accent-blue-500" /> Entiendo que este formulario abrirá WhatsApp para continuar la consulta y que esta versión no almacena mis datos.</label>
      {error && <p className={estilos["mensaje-formulario"]} role="alert">{error}</p>}
      <p className={estilos["formulario-ayuda"]}>Los campos marcados con * son obligatorios. No se muestra un mensaje de envío exitoso: la consulta continúa en WhatsApp cuando el número oficial esté configurado.</p>
      <button className="boton-principal w-fit" type="submit"><Send size={17} /> Continuar en WhatsApp</button>
    </form>
  );
}
