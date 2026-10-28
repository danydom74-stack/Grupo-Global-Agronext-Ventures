import React, { useState } from 'react';
import { WORKFLOW_STAGES } from '../data/mockData';
import { WorkflowStageId } from '../types/workflow';

interface ProcessBlueprintViewProps {
  onGoToStage: (stage: WorkflowStageId) => void;
}

export const ProcessBlueprintView: React.FC<ProcessBlueprintViewProps> = ({
  onGoToStage,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<number>(1);

  const blueprintDetails = [
    {
      id: 1,
      title: 'Paso 1: Entrada y Selección',
      channel: 'Página Web o WhatsApp directo',
      clientAction: 'Llegas a la página desde redes o recomendado por otro apicultor y eliges qué buscas hoy.',
      systemAutomation: 'Te muestra 3 opciones claras: Miel pura a mayoreo, frascos de vidrio o diseño de etiqueta.',
      workshopAction: 'Todo está listo para que navegues sin necesidad de esperar a que alguien te conteste.',
      deliverable: 'Atención inmediata sin llamadas de 40 minutos.',
      metricGain: 'Ahorro de horas explicando catálogos por teléfono.',
    },
    {
      id: 2,
      title: 'Paso 2: Cotizador en Vivo',
      channel: 'Calculadora en 3 clics',
      clientAction: 'Eliges el frasco que te gusta (Hexagonal, Mielero u Osito), la cantidad y si lo quieres lleno con miel.',
      systemAutomation: 'Calcula tu precio al instante con descuento automático por caja a partir de 12 piezas.',
      workshopAction: 'Precios fijos y transparentes sin que nadie tenga que buscar libretas de precios viejas.',
      deliverable: 'Precio exacto con IVA y flete incluido en menos de 1 minuto.',
      metricGain: 'Cotizaciones listas en 45 segundos en lugar de 2 días.',
    },
    {
      id: 3,
      title: 'Paso 3: Cuestionario de Marca (3 min)',
      channel: 'Cuestionario visual con tarjetas',
      clientAction: 'Eliges con clics el estilo que te gusta: Rústico, Limpio o Tradicional, tus colores y dónde vas a vender.',
      systemAutomation: 'Organiza la información y prepara la plantilla exacta según el frasco que elegiste.',
      workshopAction: 'El diseñador recibe tus gustos exactos y las normas oficiales que debe cumplir tu etiqueta.',
      deliverable: 'Bocetos certeros sin malentendidos.',
      metricGain: 'Cero trámites burocráticos ni cuestionarios pesados.',
    },
    {
      id: 4,
      title: 'Paso 4: Apartado y Pago Fácil',
      channel: 'Resumen a tu WhatsApp + SPEI / Tarjeta / OXXO',
      clientAction: 'Revisas el resumen en tu celular y haces tu pago por transferencia, tarjeta o en la tienda OXXO más cercana.',
      systemAutomation: 'Genera tu folio de pedido, tu recibo fiscal y aparta tus frascos en el almacén de San Luis Potosí.',
      workshopAction: 'El taller recibe la orden pagada y el diseñador comienza a trabajar tu marca.',
      deliverable: 'Frascos apartados y trabajo en marcha.',
      metricGain: 'Seguridad para ti y compromiso inmediato de entrega.',
    },
    {
      id: 5,
      title: 'Paso 5: Taller Gráfico y Medidas',
      channel: 'Taller de Diseño Estudio Hexagonal',
      clientAction: 'Esperas entre 24 y 48 horas mientras preparamos tu propuesta con calma.',
      systemAutomation: 'Asegura que el tamaño de corte sea exacto para que no se arrugue ni se despegue en el frasco.',
      workshopAction: 'El diseñador pule los detalles, la tabla nutrimental y los sellos oficiales NOM-051.',
      deliverable: 'Boceto listo para que veas cómo lucirá tu frasco real.',
      metricGain: 'Primeras propuestas en solo 24 a 48 horas.',
    },
    {
      id: 6,
      title: 'Paso 6: Muestra en 3D y Tu Firma',
      channel: 'Muestra digital interactiva en tu celular',
      clientAction: 'Ves tu frasco en pantalla tal como va a quedar terminado, revisas que tu nombre esté bien y firmas con tu dedo.',
      systemAutomation: 'Genera el archivo final de alta resolución con tu visto bueno registrado.',
      workshopAction: 'El taller manda el archivo directamente a las prensas de impresión.',
      deliverable: 'Garantía total de que no habrá errores en la imprenta.',
      metricGain: 'Cero frascos desperdiciados ni errores de ortografía.',
    },
    {
      id: 7,
      title: 'Paso 7: Impresión, Empaque y Envío',
      channel: 'Taller en San Luis Potosí y Flete Protegido',
      clientAction: 'Recibes tus cajas selladas en la puerta de tu casa o las recoges en nuestro taller de San Luis Potosí.',
      systemAutomation: 'Te manda avisos cuando tus frascos se imprimen, se empacan y salen en camino.',
      workshopAction: 'Empacamos con cartón corrugado y separadores para que ningún frasco se quiebre.',
      deliverable: 'Frascos listos para poner en la repisa de la tienda y salir a vender.',
      metricGain: 'Entrega rápida, protegida y con producto terminado.',
    },
    {
      id: 8,
      title: 'Paso 8: Reorden para tu Próxima Cosecha',
      channel: 'Reorden en 1 solo clic',
      clientAction: 'Cuando saques nueva cosecha, solo pides más etiquetas con tu número de pedido.',
      systemAutomation: 'Recupera tus archivos listos. No tienes que volver a pagar diseño.',
      workshopAction: 'Imprimimos tu nuevo tiraje de inmediato o adaptamos a frascos más grandes o chicos por solo $350 MXN.',
      deliverable: 'Ahorro continuo en cada temporada de miel.',
      metricGain: 'Reorden inmediata sin trámites ni gastos dobles.',
    },
  ];

  const activeStage = blueprintDetails.find((s) => s.id === selectedStageId) || blueprintDetails[0];

  return (
    <div className="space-y-12 max-w-7xl mx-auto py-4">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-6">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Transparencia Total
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
          Cómo funciona nuestro proceso de principio a fin
        </h1>
        <p className="text-stone-700 text-base sm:text-lg mt-2 max-w-3xl leading-relaxed">
          Diseñado para que cualquier apicultor o artesano pueda tener su miel envasada con imagen profesional, sin llamadas repetitivas, sin enredos y con precios claros desde el primer segundo.
        </p>
      </div>

      {/* Grid de Pasos con Clics */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
          Los 8 Pasos Clave del Recorrido:
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {WORKFLOW_STAGES.map((s) => {
            const isSelected = s.id === selectedStageId;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedStageId(s.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/80 shadow-xs ring-2 ring-amber-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                      {s.id}
                    </span>
                    <span className="text-[10px] text-stone-400 font-semibold">
                      Paso {s.id}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-stone-900 leading-tight">
                    {s.title}
                  </div>
                </div>
                <div className="text-[11px] text-stone-500 mt-2 truncate">
                  {s.subtitle}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de Detalle del Paso Seleccionado */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div>
            <span className="text-xs font-bold text-amber-800">
              {activeStage.channel}
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              {activeStage.title}
            </h3>
          </div>

          <button
            onClick={() => onGoToStage(activeStage.id as WorkflowStageId)}
            className="py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            Probar este paso en vivo ({activeStage.id}) →
          </button>
        </div>

        {/* 4 Carriles Simples y Humanos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>👤 Lo que tú haces:</span>
            </div>
            <p className="text-stone-700 leading-relaxed text-xs">
              {activeStage.clientAction}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <div className="font-bold text-amber-950 text-sm flex items-center gap-1.5">
              <span>⚡ Lo que hace la página:</span>
            </div>
            <p className="text-amber-900 leading-relaxed text-xs">
              {activeStage.systemAutomation}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
            <div className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
              <span>🏭 Nuestro taller en SLP:</span>
            </div>
            <p className="text-stone-700 leading-relaxed text-xs">
              {activeStage.workshopAction}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-950 text-sm flex items-center gap-1.5">
              <span>📦 Tu beneficio directo:</span>
            </div>
            <p className="text-emerald-900 leading-relaxed text-xs font-medium">
              {activeStage.deliverable}
            </p>
            <div className="pt-2 text-[11px] text-emerald-800 border-t border-emerald-200 font-semibold">
              ✨ {activeStage.metricGain}
            </div>
          </div>
        </div>
      </div>

      {/* Tabla Comparativa: Antes vs. Con Nosotros */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm space-y-5">
        <div>
          <h3 className="text-xl font-serif font-bold text-stone-900">
            ¿Por qué los apicultores prefieren este sistema?
          </h3>
          <p className="text-stone-600 text-sm mt-1">
            Compara cómo se hacía antes y cómo te ayudamos a resolverlo hoy.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-stone-200 text-stone-500 font-bold uppercase text-xs">
                <th className="py-3 px-4">Situación</th>
                <th className="py-3 px-4 text-rose-800 bg-rose-50/50">Forma Tradicional</th>
                <th className="py-3 px-4 text-emerald-900 bg-emerald-50/50">Con Estudio Hexagonal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">Cotizar frascos y miel</td>
                <td className="py-3.5 px-4 text-stone-600">Llamar, esperar 2 días a que te contesten y pedir rebaja.</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-950 bg-emerald-50/30">Precio claro en 45 segundos con descuento automático por caja.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">Diseño de etiqueta</td>
                <td className="py-3.5 px-4 text-stone-600">Diseñadores que no saben de miel ni de la norma NOM-051.</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-950 bg-emerald-50/30">Taller especializado en miel con sellos legales listos para anaquel.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">Probar antes de imprimir</td>
                <td className="py-3.5 px-4 text-stone-600">Te mandan un PDF plano y al pegar en el frasco queda chueco.</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-950 bg-emerald-50/30">Ves el frasco en 3D real y autorizas con tu firma en el celular.</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-bold text-stone-900">Siguiente cosecha</td>
                <td className="py-3.5 px-4 text-stone-600">Volver a pagar diseño y explicar todo otra vez.</td>
                <td className="py-3.5 px-4 font-semibold text-emerald-950 bg-emerald-50/30">Tus archivos quedan guardados: reorden inmediata sin pagar diseño.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
