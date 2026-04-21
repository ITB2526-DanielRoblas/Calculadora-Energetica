const MESES = [
  { valor: 1, corto: "Ene", nombre: "enero" },
  { valor: 2, corto: "Feb", nombre: "febrero" },
  { valor: 3, corto: "Mar", nombre: "marzo" },
  { valor: 4, corto: "Abr", nombre: "abril" },
  { valor: 5, corto: "May", nombre: "mayo" },
  { valor: 6, corto: "Jun", nombre: "junio" },
  { valor: 7, corto: "Jul", nombre: "julio" },
  { valor: 8, corto: "Ago", nombre: "agosto" },
  { valor: 9, corto: "Sep", nombre: "septiembre" },
  { valor: 10, corto: "Oct", nombre: "octubre" },
  { valor: 11, corto: "Nov", nombre: "noviembre" },
  { valor: 12, corto: "Dic", nombre: "diciembre" }
];

const RECURSOS = {
  electricidad: {
    nombre: "Electricidad",
    unidad: "kWh",
    pesoImpacto: 40,
    factorActivo: 1.14,
    factorInactivo: 0.46,
    sensibilidadCalendario: 0.35,
    estacionalidad: [1.18, 1.15, 1.04, 0.98, 0.95, 0.92, 0.78, 0.8, 1.05, 1.09, 1.12, 1.17],
    plan: [
      {
        anio: 1,
        impacto: 16,
        accion: "LED y apagado inteligente",
        detalle: "Sustituir luminarias ineficientes y activar protocolos de apagado en aulas, pasillos y laboratorios."
      },
      {
        anio: 2,
        impacto: 10,
        accion: "Sensores y regletas controladas",
        detalle: "Instalar sensores de presencia, temporizadores y regletas con corte automático para equipos periféricos."
      },
      {
        anio: 3,
        impacto: 13,
        accion: "Monitorización por zonas",
        detalle: "Automatizar el seguimiento de laboratorios, climatización y salas técnicas para corregir picos en tiempo real."
      }
    ]
  },
  agua: {
    nombre: "Agua",
    unidad: "m³",
    pesoImpacto: 25,
    factorActivo: 1.16,
    factorInactivo: 0.54,
    sensibilidadCalendario: 0.42,
    estacionalidad: [0.86, 0.89, 0.95, 1.02, 1.09, 1.14, 1.04, 0.97, 1.08, 1.03, 0.98, 0.95],
    plan: [
      {
        anio: 1,
        impacto: 13,
        accion: "Reductores de caudal y revisión de fugas",
        detalle: "Renovar grifería, revisar cisternas y programar inspecciones al inicio de cada trimestre."
      },
      {
        anio: 2,
        impacto: 10,
        accion: "Control de usos por bloques",
        detalle: "Medir consumos en baños, talleres y zonas comunes para detectar sobreutilización."
      },
      {
        anio: 3,
        impacto: 12,
        accion: "Reutilización y automatización",
        detalle: "Aplicar sistemas de reutilización de aguas grises y cierres automáticos en puntos críticos."
      }
    ]
  },
  consumibles: {
    nombre: "Consumibles",
    unidad: "EUR",
    pesoImpacto: 20,
    factorActivo: 1.22,
    factorInactivo: 0.2,
    sensibilidadCalendario: 0.55,
    estacionalidad: [0.88, 0.9, 0.96, 1.02, 1.08, 1.14, 0.56, 0.5, 1.3, 1.2, 1.06, 0.94],
    plan: [
      {
        anio: 1,
        impacto: 20,
        accion: "Digitalización y doble cara",
        detalle: "Limitar impresiones, priorizar entregas online y fijar la doble cara como opción por defecto."
      },
      {
        anio: 2,
        impacto: 10,
        accion: "Control de stock y reposición",
        detalle: "Auditar pedidos por departamento y ajustar compras a la demanda real."
      },
      {
        anio: 3,
        impacto: 10,
        accion: "Flujos automatizados de compra",
        detalle: "Conectar avisos de stock con compras responsables para evitar exceso de material almacenado."
      }
    ]
  },
  limpieza: {
    nombre: "Limpieza",
    unidad: "EUR",
    pesoImpacto: 15,
    factorActivo: 1.18,
    factorInactivo: 0.5,
    sensibilidadCalendario: 0.4,
    estacionalidad: [0.93, 0.95, 1.02, 1.07, 1.11, 1.09, 0.83, 0.8, 1.17, 1.12, 1.06, 0.98],
    plan: [
      {
        anio: 1,
        impacto: 12,
        accion: "Productos concentrados y ecológicos",
        detalle: "Sustituir referencias sobredosificadas por productos concentrados con menor desperdicio."
      },
      {
        anio: 2,
        impacto: 10,
        accion: "Rutas y frecuencia optimizadas",
        detalle: "Ajustar la frecuencia por ocupación real de aulas, zonas comunes y laboratorios."
      },
      {
        anio: 3,
        impacto: 15,
        accion: "Dosificación automática",
        detalle: "Implantar dispensadores calibrados y control digital para evitar sobreuso."
      }
    ]
  }
};

const formateadorNumero = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 1
});

const formateadorEntero = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 0
});

const formateadorMoneda = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
});

const formulario = document.getElementById("calculatorForm");
const summaryGrid = document.getElementById("summaryGrid");
const resultsGrid = document.getElementById("resultsGrid");
const planGrid = document.getElementById("planGrid");
const statusMessage = document.getElementById("statusMessage");
const savingsBreakdown = document.getElementById("savingsBreakdown");
const periodDescription = document.getElementById("periodDescription");
const applyPlanBtn = document.getElementById("applyPlanBtn");
const resetPlanBtn = document.getElementById("resetPlanBtn");

let comparisonChart;
let seasonalityChart;
let escenarioBase = null;
let escenarioOptimizado = null;
let planAplicado = false;

function obtenerMesPorValor(valor) {
  return MESES.find((mes) => mes.valor === Number(valor));
}

function obtenerMesesActivos() {
  return Array.from(document.querySelectorAll('input[name="mesesActivos"]:checked'))
    .map((input) => Number(input.value))
    .sort((a, b) => a - b);
}

function obtenerMesesPeriodo(mesInicio, mesFin) {
  const meses = [];
  let actual = Number(mesInicio);

  while (true) {
    meses.push(actual);
    if (actual === Number(mesFin)) {
      break;
    }

    actual = actual === 12 ? 1 : actual + 1;
  }

  return meses;
}

function obtenerEtiquetaPeriodo(mesInicio, mesFin) {
  const inicio = obtenerMesPorValor(mesInicio);
  const fin = obtenerMesPorValor(mesFin);
  const cantidadMeses = obtenerMesesPeriodo(mesInicio, mesFin).length;

  return `${capitalizar(inicio.nombre)} - ${capitalizar(fin.nombre)} (${cantidadMeses} meses)`;
}

function capitalizar(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

function clamp(numero, minimo, maximo) {
  return Math.min(Math.max(numero, minimo), maximo);
}

function sumar(lista) {
  return lista.reduce((acumulado, valor) => acumulado + valor, 0);
}

function formatearValor(valor, recurso) {
  if (recurso === "agua") {
    return `${formateadorNumero.format(valor)} m³`;
  }

  if (recurso === "consumibles" || recurso === "limpieza") {
    return formateadorMoneda.format(valor);
  }

  return `${formateadorEntero.format(valor)} kWh`;
}

function formatearPorcentaje(valor) {
  return `${formateadorNumero.format(valor)}%`;
}

function calcularAhorroPorIndice(indiceBase, indiceNuevo) {
  if (indiceBase <= 0) {
    return 0;
  }

  return ((indiceBase - indiceNuevo) / indiceBase) * 100;
}

function calcularVariabilidadDeterminista(recurso, mes, variabilidad, mesesActivosCount) {
  const huellaRecurso = recurso
    .split("")
    .reduce((acumulado, caracter) => acumulado + caracter.charCodeAt(0), 0);

  const oscilacion =
    Math.sin((huellaRecurso + mes * 19 + mesesActivosCount * 11) * 0.31) * 0.58 +
    Math.cos((huellaRecurso + mes * 7) * 0.13) * 0.42;

  return 1 + oscilacion * (variabilidad / 100);
}

function calcularFactorCalendario(configuracion, mesesActivosCount) {
  const referencia = 10;
  const desviacion = ((mesesActivosCount - referencia) / referencia) * configuracion.sensibilidadCalendario;
  return clamp(1 + desviacion, 0.72, 1.18);
}

function crearSerieMensual(consumoBase, claveRecurso, parametros) {
  const configuracion = RECURSOS[claveRecurso];
  const mesesActivos = new Set(parametros.mesesActivos);
  const totalProyectado =
    consumoBase *
    (1 + parametros.crecimiento / 100) *
    calcularFactorCalendario(configuracion, parametros.mesesActivos.length);

  const pesos = MESES.map((mes) => {
    const actividad = mesesActivos.has(mes.valor)
      ? configuracion.factorActivo
      : configuracion.factorInactivo;
    const estacionalidad = configuracion.estacionalidad[mes.valor - 1];
    const variacion = calcularVariabilidadDeterminista(
      claveRecurso,
      mes.valor,
      parametros.variabilidad,
      parametros.mesesActivos.length
    );

    return actividad * estacionalidad * variacion;
  });

  const sumaPesos = sumar(pesos);
  return pesos.map((peso) => totalProyectado * (peso / sumaPesos));
}

function calcularEscenario(parametros) {
  const mesesPeriodo = obtenerMesesPeriodo(parametros.mesInicio, parametros.mesFin);
  const escenario = {
    recursos: {},
    indiceMensual: [],
    indiceGlobal: 0,
    mesesPeriodo,
    etiquetaPeriodo: obtenerEtiquetaPeriodo(parametros.mesInicio, parametros.mesFin)
  };

  Object.keys(RECURSOS).forEach((claveRecurso) => {
    const consumoBase = parametros[claveRecurso];
    const serieMensual = crearSerieMensual(consumoBase, claveRecurso, parametros);
    const anual = sumar(serieMensual);
    const periodo = sumar(mesesPeriodo.map((mes) => serieMensual[mes - 1]));
    const impactoAnual = consumoBase > 0 ? (anual / consumoBase) * RECURSOS[claveRecurso].pesoImpacto : 0;
    const impactoMensual = consumoBase > 0
      ? serieMensual.map((valor) => (valor / consumoBase) * RECURSOS[claveRecurso].pesoImpacto)
      : new Array(12).fill(0);

    escenario.recursos[claveRecurso] = {
      base: consumoBase,
      mensual: serieMensual,
      anual,
      periodo,
      impactoAnual,
      impactoMensual
    };
  });

  escenario.indiceMensual = MESES.map((_, indice) =>
    sumar(Object.values(escenario.recursos).map((recurso) => recurso.impactoMensual[indice]))
  );

  escenario.indiceGlobal = sumar(
    Object.values(escenario.recursos).map((recurso) => recurso.impactoAnual)
  );

  return escenario;
}

function obtenerFactoresPlan(claveRecurso) {
  let factorAcumulado = 1;

  return RECURSOS[claveRecurso].plan.map((paso) => {
    factorAcumulado *= 1 - paso.impacto / 100;
    return factorAcumulado;
  });
}

function aplicarPlanDeReduccion(escenario) {
  const optimizado = {
    recursos: {},
    indiceMensual: [],
    indiceGlobal: 0,
    mesesPeriodo: [...escenario.mesesPeriodo],
    etiquetaPeriodo: escenario.etiquetaPeriodo,
    hitosAhorro: []
  };

  const indicesAnuales = [escenario.indiceGlobal, 0, 0, 0];

  Object.keys(RECURSOS).forEach((claveRecurso) => {
    const factores = obtenerFactoresPlan(claveRecurso);
    const factorFinal = factores[factores.length - 1];
    const recursoBase = escenario.recursos[claveRecurso];

    optimizado.recursos[claveRecurso] = {
      ...recursoBase,
      mensual: recursoBase.mensual.map((valor) => valor * factorFinal),
      anual: recursoBase.anual * factorFinal,
      periodo: recursoBase.periodo * factorFinal,
      impactoAnual: recursoBase.impactoAnual * factorFinal,
      impactoMensual: recursoBase.impactoMensual.map((valor) => valor * factorFinal),
      ahorroFinal: (1 - factorFinal) * 100
    };

    for (let indice = 0; indice < factores.length; indice += 1) {
      indicesAnuales[indice + 1] += recursoBase.impactoAnual * factores[indice];
    }
  });

  optimizado.indiceMensual = MESES.map((_, indice) =>
    sumar(Object.values(optimizado.recursos).map((recurso) => recurso.impactoMensual[indice]))
  );
  optimizado.indiceGlobal = sumar(
    Object.values(optimizado.recursos).map((recurso) => recurso.impactoAnual)
  );
  optimizado.hitosAhorro = indicesAnuales.slice(1).map((indice) => ({
    indice,
    ahorro: calcularAhorroPorIndice(escenario.indiceGlobal, indice)
  }));
  optimizado.ahorroGlobal = calcularAhorroPorIndice(
    escenario.indiceGlobal,
    optimizado.indiceGlobal
  );

  return optimizado;
}

function leerFormulario() {
  const mesesActivos = obtenerMesesActivos();

  if (!mesesActivos.length) {
    throw new Error("Selecciona al menos un mes activo para el curso.");
  }

  return {
    electricidad: Number(formulario.electricidad.value),
    agua: Number(formulario.agua.value),
    consumibles: Number(formulario.consumibles.value),
    limpieza: Number(formulario.limpieza.value),
    crecimiento: Number(formulario.crecimiento.value),
    variabilidad: Number(formulario.variabilidad.value),
    mesInicio: Number(formulario.mesInicio.value),
    mesFin: Number(formulario.mesFin.value),
    mesesActivos
  };
}

function obtenerTonoCambio(porcentaje) {
  if (porcentaje >= 8) {
    return "danger";
  }

  if (porcentaje >= 3) {
    return "warning";
  }

  return "success";
}

function obtenerEtiquetaCambio(porcentaje) {
  if (porcentaje >= 8) {
    return "Presión alta";
  }

  if (porcentaje >= 3) {
    return "Vigilar";
  }

  return "Controlado";
}

function construirInterpretacionAnual(claveRecurso, valorAnual, valorBase, parametros) {
  const variacion = valorBase > 0 ? ((valorAnual - valorBase) / valorBase) * 100 : 0;
  const mesesActivosTexto = `${parametros.mesesActivos.length} meses activos`;

  if (variacion >= 8) {
    return `La proyección crece ${formatearPorcentaje(variacion)} sobre la referencia actual. Conviene actuar pronto porque ${mesesActivosTexto} y la estacionalidad elevan el consumo.`;
  }

  if (variacion >= 3) {
    return `La subida es moderada (${formatearPorcentaje(variacion)}). Hay margen de mejora si se optimiza el uso durante los meses de mayor actividad.`;
  }

  return `El escenario queda bastante estable (${formatearPorcentaje(variacion)}). La clave es mantener disciplina operativa en los meses lectivos.`;
}

function construirInterpretacionPeriodo(valorPeriodo, valorAnual) {
  const proporcion = valorAnual > 0 ? (valorPeriodo / valorAnual) * 100 : 0;

  if (proporcion >= 80) {
    return `El periodo concentra ${formatearPorcentaje(proporcion)} del total anual, así que es la ventana prioritaria para implantar mejoras.`;
  }

  if (proporcion >= 60) {
    return `El periodo absorbe ${formatearPorcentaje(proporcion)} del año, con una carga relevante pero aún repartida.`;
  }

  return `El periodo representa ${formatearPorcentaje(proporcion)} del total anual. La demanda está más distribuida y permite escalonar acciones.`;
}

function renderResumen(escenarioActual, optimizado, parametros) {
  const ahorroPotencial = optimizado
    ? optimizado.ahorroGlobal
    : aplicarPlanDeReduccion(escenarioActual).ahorroGlobal;
  const periodoEtiquetado = obtenerEtiquetaPeriodo(parametros.mesInicio, parametros.mesFin);
  const estadoMeta = planAplicado
    ? optimizado.ahorroGlobal >= 30
      ? "Meta superada"
      : "Meta pendiente"
    : "Potencial estimado";

  const tarjetas = [
    {
      titulo: "Índice global previsto",
      badge: "Base 100 actual",
      badgeClass: "",
      valor: `${formateadorNumero.format(escenarioActual.indiceGlobal)} pts`,
      detalle: planAplicado
        ? `Tras el plan completo baja a ${formateadorNumero.format(optimizado.indiceGlobal)} pts.`
        : "Cuanto mayor sea este valor, mayor será la presión operativa prevista."
    },
    {
      titulo: "Ahorro total",
      badge: estadoMeta,
      badgeClass: planAplicado && optimizado.ahorroGlobal >= 30 ? "metric-card__badge--success" : "metric-card__badge--warning",
      valor: formatearPorcentaje(ahorroPotencial),
      detalle: planAplicado
        ? "Comparativa ponderada entre el escenario proyectado y el optimizado."
        : "Ahorro estimado al aplicar el plan completo de 3 años."
    },
    {
      titulo: "Periodo personalizado",
      badge: "Lectura del curso",
      badgeClass: "",
      valor: periodoEtiquetado,
      detalle: `${escenarioActual.mesesPeriodo.length} meses incluidos en el análisis personalizado.`
    },
    {
      titulo: "Calendario activo",
      badge: "Uso del centro",
      badgeClass: "",
      valor: `${parametros.mesesActivos.length} meses`,
      detalle: `Variabilidad operativa configurada: ${formatearPorcentaje(parametros.variabilidad)}.`
    }
  ];

  summaryGrid.innerHTML = tarjetas
    .map(
      (tarjeta) => `
        <article class="metric-card fade-rise">
          <div class="metric-card__label">
            <span>${tarjeta.titulo}</span>
            <strong class="metric-card__badge ${tarjeta.badgeClass}">${tarjeta.badge}</strong>
          </div>
          <div class="metric-card__value">${tarjeta.valor}</div>
          <p class="metric-card__detail">${tarjeta.detalle}</p>
        </article>
      `
    )
    .join("");
}

function renderResultados(escenarioActual, optimizado, parametros) {
  const tarjetas = [];
  const periodoNombre = obtenerEtiquetaPeriodo(parametros.mesInicio, parametros.mesFin);

  Object.keys(RECURSOS).forEach((claveRecurso) => {
    const recurso = RECURSOS[claveRecurso];
    const base = escenarioActual.recursos[claveRecurso];
    const variacionAnual = base.base > 0 ? ((base.anual - base.base) / base.base) * 100 : 0;
    const tono = obtenerTonoCambio(variacionAnual);
    const etiqueta = obtenerEtiquetaCambio(variacionAnual);
    const optimizadoRecurso = optimizado ? optimizado.recursos[claveRecurso] : null;

    tarjetas.push({
      tipo: "Próximo año",
      titulo: `${recurso.nombre} del próximo año`,
      valor: formatearValor(base.anual, claveRecurso),
      comparacion: optimizadoRecurso
        ? `Optimización a 3 años: <strong>${formatearValor(optimizadoRecurso.anual, claveRecurso)}</strong> (${formatearPorcentaje(optimizadoRecurso.ahorroFinal)} de ahorro en este indicador).`
        : null,
      texto: construirInterpretacionAnual(claveRecurso, base.anual, base.base, parametros),
      tono,
      etiqueta
    });

    tarjetas.push({
      tipo: "Periodo",
      titulo: `${recurso.nombre} en ${periodoNombre}`,
      valor: formatearValor(base.periodo, claveRecurso),
      comparacion: optimizadoRecurso
        ? `Con mejoras: <strong>${formatearValor(optimizadoRecurso.periodo, claveRecurso)}</strong> para el periodo seleccionado.`
        : null,
      texto: construirInterpretacionPeriodo(base.periodo, base.anual),
      tono: base.periodo / base.anual >= 0.8 ? "danger" : base.periodo / base.anual >= 0.6 ? "warning" : "success",
      etiqueta: base.periodo / base.anual >= 0.8 ? "Pico de curso" : base.periodo / base.anual >= 0.6 ? "Alta demanda" : "Demanda repartida"
    });
  });

  resultsGrid.innerHTML = tarjetas
    .map(
      (tarjeta) => `
        <article class="result-card fade-rise">
          <div class="result-card__top">
            <div>
              <p class="result-card__eyebrow">${tarjeta.tipo}</p>
              <h3>${tarjeta.titulo}</h3>
            </div>
            <span class="tag tag--${tarjeta.tono}">${tarjeta.etiqueta}</span>
          </div>
          <div class="value-stack">
            <strong>${tarjeta.valor}</strong>
            <small>${tarjeta.texto}</small>
          </div>
          ${tarjeta.comparacion ? `<div class="comparison-note">${tarjeta.comparacion}</div>` : ""}
        </article>
      `
    )
    .join("");
}

function calcularAhorroAcumuladoRecurso(claveRecurso) {
  return (1 - obtenerFactoresPlan(claveRecurso).slice(-1)[0]) * 100;
}

function renderPlan() {
  planGrid.innerHTML = Object.keys(RECURSOS)
    .map((claveRecurso) => {
      const recurso = RECURSOS[claveRecurso];
      const ahorroTotal = calcularAhorroAcumuladoRecurso(claveRecurso);

      return `
        <article class="plan-card fade-rise">
          <div class="plan-card__header">
            <h3>${recurso.nombre}</h3>
            <span class="timeline-badge">${formatearPorcentaje(ahorroTotal)} máx.</span>
          </div>
          <p>Ruta escalonada para reducir el consumo sin comprometer la operativa del centro.</p>
          <div class="plan-steps">
            ${recurso.plan
              .map(
                (paso) => `
                  <div class="plan-step">
                    <div class="plan-step__top">
                      <strong>Año ${paso.anio}: ${paso.accion}</strong>
                      <span>-${paso.impacto}%</span>
                    </div>
                    <p>${paso.detalle}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMensajeEstado(escenarioActual, optimizado, parametros) {
  const contribuciones = Object.entries(escenarioActual.recursos)
    .map(([claveRecurso, datos]) => ({
      claveRecurso,
      impacto: datos.impactoAnual
    }))
    .sort((a, b) => b.impacto - a.impacto);

  const principal = RECURSOS[contribuciones[0].claveRecurso].nombre;
  const secundario = RECURSOS[contribuciones[1].claveRecurso].nombre;
  const ahorroPotencial = optimizado ? optimizado.ahorroGlobal : aplicarPlanDeReduccion(escenarioActual).ahorroGlobal;
  const clase = optimizado
    ? optimizado.ahorroGlobal >= 30
      ? "status-message status-message--success"
      : "status-message status-message--warning"
    : ahorroPotencial >= 30
      ? "status-message status-message--warning"
      : "status-message status-message--danger";

  let mensaje = "";

  if (optimizado) {
    if (optimizado.ahorroGlobal >= 30) {
      mensaje = `Has reducido ${formatearPorcentaje(optimizado.ahorroGlobal)} del índice global. El objetivo institucional queda superado y ${principal.toLowerCase()} sigue siendo el frente más sensible para consolidar el resultado.`;
    } else {
      mensaje = `El plan aplicado recorta ${formatearPorcentaje(optimizado.ahorroGlobal)}, pero todavía no llega al 30%. Conviene reforzar especialmente ${principal.toLowerCase()} y ${secundario.toLowerCase()}.`;
    }
  } else {
    mensaje = `Con los datos actuales, ${principal.toLowerCase()} y ${secundario.toLowerCase()} concentran la mayor presión del centro. Si despliegas el plan completo a 3 años, el ahorro estimado es de ${formatearPorcentaje(ahorroPotencial)}.`;
  }

  statusMessage.className = clase;
  statusMessage.textContent = mensaje;

  const hitos = optimizado ? optimizado.hitosAhorro : aplicarPlanDeReduccion(escenarioActual).hitosAhorro;

  savingsBreakdown.innerHTML = hitos
    .map(
      (hito, indice) => `
        <div class="phase-card fade-rise">
          <strong>Año ${indice + 1}</strong>
          <span>Ahorro acumulado: ${formatearPorcentaje(hito.ahorro)}</span>
        </div>
      `
    )
    .join("");

  periodDescription.textContent = `Periodo analizado: ${obtenerEtiquetaPeriodo(parametros.mesInicio, parametros.mesFin)}.`;
}

function actualizarHero(parametros) {
  document.getElementById("heroActiveMonths").textContent = `${parametros.mesesActivos.length}`;
  document.getElementById("heroPeriod").textContent = `${obtenerMesPorValor(parametros.mesInicio).corto}-${obtenerMesPorValor(parametros.mesFin).corto}`;
  document.getElementById("heroVariability").textContent = formatearPorcentaje(parametros.variabilidad);
}

function obtenerDatosGraficaComparativa(escenarioActual, optimizado) {
  return Object.keys(RECURSOS).map((claveRecurso) => ({
    nombre: RECURSOS[claveRecurso].nombre,
    base: escenarioActual.recursos[claveRecurso].impactoAnual,
    optimizado: optimizado ? optimizado.recursos[claveRecurso].impactoAnual : null
  }));
}

function renderGraficas(escenarioActual, optimizado) {
  const comparativa = obtenerDatosGraficaComparativa(escenarioActual, optimizado);
  const canvasComparativa = document.getElementById("comparisonChart").getContext("2d");
  const canvasEstacional = document.getElementById("seasonalityChart").getContext("2d");

  if (comparisonChart) {
    comparisonChart.destroy();
  }

  if (seasonalityChart) {
    seasonalityChart.destroy();
  }

  comparisonChart = new Chart(canvasComparativa, {
    type: "bar",
    data: {
      labels: comparativa.map((item) => item.nombre),
      datasets: [
        {
          label: "Escenario proyectado",
          data: comparativa.map((item) => item.base),
          backgroundColor: "rgba(194, 65, 12, 0.76)",
          borderRadius: 12
        },
        {
          label: "Escenario optimizado",
          data: comparativa.map((item) => item.optimizado),
          backgroundColor: "rgba(21, 128, 61, 0.76)",
          borderRadius: 12,
          hidden: !optimizado
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      animation: {
        duration: 650
      },
      plugins: {
        legend: {
          position: "top"
        },
        tooltip: {
          callbacks: {
            label(contexto) {
              return `${contexto.dataset.label}: ${formateadorNumero.format(contexto.parsed.y)} pts`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(23, 49, 51, 0.08)"
          },
          ticks: {
            callback(valor) {
              return `${valor} pts`;
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  seasonalityChart = new Chart(canvasEstacional, {
    type: "line",
    data: {
      labels: MESES.map((mes) => mes.corto),
      datasets: [
        {
          label: "Perfil mensual proyectado",
          data: escenarioActual.indiceMensual,
          borderColor: "#0f766e",
          backgroundColor: "rgba(15, 118, 110, 0.16)",
          fill: true,
          tension: 0.35,
          borderWidth: 3,
          pointRadius: 3
        },
        {
          label: "Perfil mensual optimizado",
          data: optimizado ? optimizado.indiceMensual : escenarioActual.indiceMensual.map(() => null),
          borderColor: "#15803d",
          backgroundColor: "rgba(21, 128, 61, 0.08)",
          fill: false,
          tension: 0.35,
          borderWidth: 3,
          pointRadius: 3,
          hidden: !optimizado
        }
      ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      animation: {
        duration: 650
      },
      plugins: {
        legend: {
          position: "top"
        },
        tooltip: {
          callbacks: {
            label(contexto) {
              return `${contexto.dataset.label}: ${formateadorNumero.format(contexto.parsed.y)} pts`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(23, 49, 51, 0.08)"
          },
          ticks: {
            callback(valor) {
              return `${valor} pts`;
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function renderizarTodo(parametros) {
  escenarioBase = calcularEscenario(parametros);
  if (planAplicado) {
    escenarioOptimizado = aplicarPlanDeReduccion(escenarioBase);
  } else {
    escenarioOptimizado = null;
  }

  const escenarioVisible = planAplicado ? escenarioOptimizado : null;

  actualizarHero(parametros);
  renderResumen(escenarioBase, escenarioOptimizado, parametros);
  renderResultados(escenarioBase, escenarioVisible, parametros);
  renderPlan();
  renderMensajeEstado(escenarioBase, escenarioOptimizado, parametros);
  renderGraficas(escenarioBase, escenarioOptimizado);

  applyPlanBtn.disabled = false;
  resetPlanBtn.disabled = !planAplicado;
}

function manejarCalculo(evento) {
  if (evento) {
    evento.preventDefault();
  }

  try {
    const parametros = leerFormulario();
    renderizarTodo(parametros);
  } catch (error) {
    window.alert(error.message);
  }
}

formulario.addEventListener("submit", manejarCalculo);

applyPlanBtn.addEventListener("click", () => {
  planAplicado = true;
  manejarCalculo();
});

resetPlanBtn.addEventListener("click", () => {
  planAplicado = false;
  manejarCalculo();
});

window.addEventListener("DOMContentLoaded", () => {
  renderPlan();
  manejarCalculo();
});
