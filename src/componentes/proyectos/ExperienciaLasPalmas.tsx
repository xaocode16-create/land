"use client";

import Link from "next/link";
import { ArrowRight, Check, ExternalLink, FileText, MapPin, ShieldAlert } from "lucide-react";
import { useMemo, useState } from "react";
import { proyectoLasPalmas } from "@/datos/proyectos/lasPalmas";
import { lotesLasPalmas } from "@/datos/lotes/lasPalmas";
import { poligonosLasPalmas } from "@/datos/planos/lasPalmas";
import { GaleriaProyecto } from "./GaleriaProyecto";
import { PortadaProyecto } from "./PortadaProyecto";
import { PlanoInteractivo } from "./PlanoInteractivo";
import { PanelLote } from "./PanelLote";
import { FiltrosLotes, type FiltrosLotesEstado } from "./FiltrosLotes";
import { ListaLotes } from "./ListaLotes";
import { ComparadorLotes } from "./ComparadorLotes";
import estilos from "@/estilos/proyectos/LasPalmasExperiencia.module.css";

const filtrosIniciales: FiltrosLotesEstado = {
  numero: "",
  areaMinima: "",
  presupuestoMaximo: "",
  estado: "",
  orden: "numero",
};

export function ExperienciaLasPalmas() {
  const [loteSeleccionadoId, setLoteSeleccionadoId] = useState("las-palmas-lote-12");
  const [comparacionIds, setComparacionIds] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<FiltrosLotesEstado>(filtrosIniciales);
  const [panelMovilAbierto, setPanelMovilAbierto] = useState(false);
  const loteSeleccionado = lotesLasPalmas.find((lote) => lote.id === loteSeleccionadoId) ?? lotesLasPalmas[0];

  const lotesFiltrados = useMemo(() => {
    const numero = Number(filtros.numero);
    const areaMinima = Number(filtros.areaMinima);
    const presupuestoMaximo = Number(filtros.presupuestoMaximo);
    const resultado = lotesLasPalmas.filter(
      (lote) =>
        (!filtros.numero || lote.numero === numero) &&
        (!filtros.areaMinima || (lote.areaExcel ?? 0) >= areaMinima) &&
        (!filtros.presupuestoMaximo || (lote.precioDolares ?? Infinity) <= presupuestoMaximo) &&
        (!filtros.estado || lote.estado === filtros.estado),
    );

    return [...resultado].sort((a, b) => {
      if (filtros.orden === "precio-menor") return (a.precioDolares ?? Infinity) - (b.precioDolares ?? Infinity);
      if (filtros.orden === "precio-mayor") return (b.precioDolares ?? 0) - (a.precioDolares ?? 0);
      if (filtros.orden === "area-menor") return (a.areaExcel ?? Infinity) - (b.areaExcel ?? Infinity);
      if (filtros.orden === "area-mayor") return (b.areaExcel ?? 0) - (a.areaExcel ?? 0);
      return a.numero - b.numero;
    });
  }, [filtros]);

  const lotesComparados = useMemo(
    () =>
      comparacionIds
        .map((id) => lotesLasPalmas.find((lote) => lote.id === id))
        .filter((lote): lote is (typeof lotesLasPalmas)[number] => Boolean(lote)),
    [comparacionIds],
  );

  function seleccionarLote(loteId: string) {
    setLoteSeleccionadoId(loteId);
    setPanelMovilAbierto(true);

    window.requestAnimationFrame(() => {
      if (window.matchMedia("(min-width: 641px)").matches) {
        document.getElementById(loteId)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });
  }

  function cambiarFiltro(campo: keyof FiltrosLotesEstado, valor: string) {
    setFiltros((actuales) => ({ ...actuales, [campo]: valor }));
  }

  function alternarComparacion(loteId: string) {
    setComparacionIds((actuales) =>
      actuales.includes(loteId)
        ? actuales.filter((id) => id !== loteId)
        : actuales.length < 3
          ? [...actuales, loteId]
          : actuales,
    );
  }

  return (
    <div className={estilos["experiencia-las-palmas"]}>
      <PortadaProyecto proyecto={proyectoLasPalmas} />

      <section className="seccion" aria-labelledby="resumen-proyecto">
        <div className={`contenedor-pagina ${estilos["resumen-grid"]}`}>
          <div>
            <span className="etiqueta-seccion">Conoce el proyecto</span>
            <h2 id="resumen-proyecto" className="titulo-seccion">Una exploración clara, lote por lote.</h2>
            <p className="descripcion-seccion">Los datos que ves provienen del material recibido. Cuando el plano y el Excel no coinciden, la diferencia se muestra de forma visible para que puedas consultarla antes de tomar una decisión.</p>
            <div className={estilos["acciones-resumen"]}>
              <a className="boton-principal" href="#plano-interactivo">Ver el plano <ArrowRight size={16} /></a>
              <Link className="boton-fantasma" href="#documentacion">Revisar información <FileText size={16} /></Link>
            </div>
          </div>
          <div className={estilos["resumen-metricas"]}>
            <div><strong>22</strong><span>registros de lotes en Excel</span></div>
            <div><strong>USD</strong><span>precios referenciales de la hoja recibida</span></div>
            <div><strong>1:1</strong><span>plano y ficha sincronizados</span></div>
          </div>
        </div>
      </section>

      <section className={`seccion ${estilos["seccion-visual"]}`} aria-labelledby="galeria-las-palmas">
        <div className="contenedor-pagina">
          <div className="encabezado-seccion">
            <div>
              <span className="etiqueta-seccion">Material visual recibido</span>
              <h2 id="galeria-las-palmas" className="titulo-seccion">Una vista aérea y el plano de referencia.</h2>
              <p className="descripcion-seccion">Las piezas promocionales recibidas sobre Tarapoto se mantienen fuera de esta galería hasta confirmar que pertenecen a este proyecto.</p>
            </div>
          </div>
          <GaleriaProyecto imagenes={proyectoLasPalmas.imagenes} nombre={proyectoLasPalmas.nombre} />
        </div>
      </section>

      <section className={`seccion ${estilos["seccion-plano"]}`} id="plano-interactivo" aria-labelledby="titulo-plano">
        <div className="contenedor-pagina">
          <div className="encabezado-seccion">
            <div>
              <span className="etiqueta-seccion">Exploración principal</span>
              <h2 id="titulo-plano" className="titulo-seccion">Selecciona un lote sobre el plano.</h2>
              <p className="descripcion-seccion">Haz clic, toca o enfoca con el teclado cualquier zona trazada. El panel y el listado se actualizan juntos.</p>
            </div>
          </div>
          <div className={estilos["plano-grid"]}>
            <PlanoInteractivo rutaPlano={proyectoLasPalmas.plano} lotes={lotesLasPalmas} poligonos={poligonosLasPalmas} loteSeleccionadoId={loteSeleccionado.id} alSeleccionar={seleccionarLote} />
            <PanelLote lote={loteSeleccionado} alAgregarComparacion={() => alternarComparacion(loteSeleccionado.id)} enComparacion={comparacionIds.includes(loteSeleccionado.id)} panelMovilAbierto={panelMovilAbierto} alCerrar={() => setPanelMovilAbierto(false)} />
          </div>
        </div>
      </section>

      <section className="seccion bg-white" aria-labelledby="titulo-listado">
        <div className="contenedor-pagina">
          <div className="encabezado-seccion">
            <div>
              <span className="etiqueta-seccion">Todos los registros</span>
              <h2 id="titulo-listado" className="titulo-seccion">Encuentra tu lote.</h2>
              <p className="descripcion-seccion">Filtra por número, superficie registrada, presupuesto o estado. Por ahora, todos los lotes parten como “por confirmar”.</p>
            </div>
          </div>
          <FiltrosLotes filtros={filtros} alCambiar={cambiarFiltro} alLimpiar={() => setFiltros(filtrosIniciales)} />
          <ListaLotes lotes={lotesFiltrados} seleccionadoId={loteSeleccionado.id} comparacionIds={comparacionIds} alSeleccionar={seleccionarLote} alComparar={alternarComparacion} />
        </div>
      </section>

      <section className={estilos["seccion-comparacion"]}>
        <div className="contenedor-pagina"><ComparadorLotes lotes={lotesComparados} alQuitar={(loteId) => alternarComparacion(loteId)} /></div>
      </section>

      <section className="seccion" id="documentacion" aria-labelledby="titulo-documentacion">
        <div className="contenedor-pagina">
          <div className="encabezado-seccion">
            <div>
              <span className="etiqueta-seccion">Información comercial</span>
              <h2 id="titulo-documentacion" className="titulo-seccion">Lo que está disponible y lo que falta confirmar.</h2>
              <p className="descripcion-seccion">La experiencia está preparada para ampliar la ficha cuando LAND valide la información del proyecto.</p>
            </div>
          </div>
          <div className={estilos["informacion-grid"]}>
            <article className="panel-blanco"><MapPin className={estilos["icono-informacion"]} size={24} /><h3>Ubicación y accesos</h3><p>{proyectoLasPalmas.ubicacion}</p><p className={estilos["nota-informacion"]}>{proyectoLasPalmas.notaUbicacion}</p><a className="boton-fantasma mt-3 inline-flex" href={proyectoLasPalmas.enlaceMapa} target="_blank" rel="noreferrer">Abrir ubicación en Google Maps <ExternalLink size={16} /></a></article>
            <article className="panel-blanco"><Check className={estilos["icono-informacion"]} size={24} /><h3>Características comunicables</h3><ul className="lista-caracteristicas">{proyectoLasPalmas.caracteristicas.map((caracteristica) => <li key={caracteristica}><Check size={16} /> {caracteristica}</li>)}</ul><p className={estilos["nota-informacion"]}>Servicios, títulos, autorizaciones y condiciones no se presentan como confirmados sin respaldo adicional.</p></article>
            <article className="panel-blanco"><ShieldAlert className={estilos["icono-informacion"]} size={24} /><h3>Documentación</h3><p>{proyectoLasPalmas.notaLegal}</p><p className={estilos["nota-informacion"]}>Los certificados registrales y el plano general se conservan como material de revisión interna.</p></article>
          </div>
        </div>
      </section>

      <section className={`seccion ${estilos["seccion-faq"]}`} aria-labelledby="titulo-faq">
        <div className="contenedor-pagina">
          <div className="encabezado-seccion"><div><span className="etiqueta-seccion">Preguntas frecuentes</span><h2 id="titulo-faq" className="titulo-seccion">Respuestas sencillas para empezar.</h2></div></div>
          <div className={estilos["faq-lista"]}>{proyectoLasPalmas.preguntas.map((pregunta) => <details key={pregunta.pregunta}><summary>{pregunta.pregunta}</summary><p>{pregunta.respuesta}</p></details>)}</div>
        </div>
      </section>

    </div>
  );
}
