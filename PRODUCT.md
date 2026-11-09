# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack
Next.js (App Router), TypeScript (`"strict": true`), Tailwind CSS, Zod. Arquitectura modular estricta (`app/`, `components/ui/`, `components/features/`, `lib/`, `hooks/`, `server/`) sin dependencias externas no autorizadas y con validación de esquemas en tiempo de ejecución.

## Users
Directores generales (CEO, COO), directores financieros (CFO) y propietarios de empresas medianas y grandes que enfrentan cuellos de botella en su escalabilidad, erosión de márgenes operativos o necesidad de reestructuración profunda y buscan resultados tangibles y medibles.

## Product Purpose
Sitio web institucional y plataforma de diagnóstico de **VÉRTICE Partners** (identidad propuesta para el proyecto), firma de consultoría empresarial especializada en reestructuración operativa, escalabilidad industrial/corporativa y expansión de rentabilidad. El éxito del sitio consiste en demostrar rigor analítico inmediato, permitir que el directivo evalúe el potencial de mejora operativa y facilitar la solicitud de una auditoría o diagnóstico ejecutivo validado.

## Positioning
Diagnóstico cuantitativo de operaciones y ejecución directa en campo ("en planta y piso operativo") con métricas financieras auditables (impacto directo en EBITDA, flujo de caja libre y tiempos de ciclo), diferenciándose explícitamente de las consultoras tradicionales que solo entregan presentaciones en PDF sin comprometerse con la implementación.

## Operating Context
Los directivos evalúan la firma desde su escritorio o dispositivo móvil entre juntas de consejo o revisiones trimestrales de resultados. Su entorno mental es el de estados de resultados (P&L), tableros de telemetría operativa, matrices de riesgo, auditorías de costos y cronogramas de intervención por semanas.

## Capabilities and Constraints
- Arquitectura de rutas en `app/`, componentes primitivos en `components/ui/`, componentes de dominio en `components/features/`, utilidades/esquemas en `lib/`, hooks en `hooks/` y Server Actions / lógica de servidor en `server/`.
- Tipado estricto (`"strict": true`, cero `any` o `unknown` sin estrechamiento) y validación con Zod para toda entrada externa (simulador de diagnóstico, filtros y formulario de solicitud de intervención).
- Estados explícitos de carga (Skeleton), error y vacío en las vistas e interacciones asíncronas.
- Límite de modularidad de máximo ~250-300 líneas por archivo.

## Brand Commitments
Identidad propuesta: **VÉRTICE Partners** — *Arquitectura Operativa y Reestructuración Empresarial*. Voz sobria, quirúrgica, directa y respaldada por ingeniería financiera y operativa.

## Evidence on Hand
No existen activos comerciales previos ni clientes reales confirmados; todos los casos de estudio, métricas de impacto en EBITDA, telemetría de referencia y diagnósticos mostrados en la interfaz se presentan como demostraciones ilustrativas/sintéticas claramente etiquetadas para proteger la veracidad comercial.

## Product Principles
1. **Evidencia sobre retórica:** Mostrar el mecanismo de diagnóstico e intervención con números, estructuras de costos y cronogramas antes que promesas genéricas.
2. **Rigor de ingeniería en cada interacción:** Cada calculadora, filtro de casos y formulario valida entradas estrictamente y responde con estados claros.
3. **Claridad ejecutiva:** Respetar el tiempo de un CEO/COO mediante jerarquía tipográfica limpia, lectura rápida de hallazgos y rutas de acción sin fricción.
4. **Transparencia documental:** Distinguir con precisión los modelos demostrativos y escenarios simulados de los compromisos comerciales.
