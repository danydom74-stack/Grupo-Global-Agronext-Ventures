import React, { useState } from 'react';
import { QuoteConfig, BriefingData } from '../../types/workflow';

interface Stage8ReorderProps {
  quote: QuoteConfig;
  briefing: BriefingData;
  orderNumber: string;
  onResetWorkflow: () => void;
}

export const Stage8Reorder: React.FC<Stage8ReorderProps> = ({
  quote,
  briefing,
  orderNumber,
  onResetWorkflow,
}) => {
  const [reorderAction, setReorderAction] = useState<'reorder_same' | 'adapt_size' | 'bulk_honey' | null>(null);
  const [reorderSuccess, setReorderSuccess] = useState(false);

  const handleSimulateReorder = () => {
    setReorderSuccess(true);
    setTimeout(() => setReorderSuccess(false), 4000);
  };

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Paso 8 · Siguiente Cosecha
        </span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Pide más etiquetas sin volver a pagar diseño
        </h2>
        <p className="text-base text-stone-700 mt-1.5 max-w-2xl leading-relaxed">
          Guardamos tus archivos listos en taller. En tu próxima temporada solo pides el tiraje que necesites o adaptamos a nuevos frascos por un costo mínimo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Expediente Seguro (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase">
                  Tu Expediente
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {briefing.brandName} (#{orderNumber})
                </h3>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full">
                Archivado en Taller
              </span>
            </div>

            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Productor:</span>
                <strong className="text-stone-900">{briefing.producerName}</strong>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Papel utilizado:</span>
                <span className="text-stone-900">{quote.printMaterial}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-stone-100">
                <span className="text-stone-500">Norma oficial:</span>
                <span className="text-emerald-800 font-bold">NOM-051 Aprobada</span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 space-y-1">
              <div className="font-bold text-stone-800">Archivos listos para reimpresión inmediata:</div>
              <p className="text-stone-500 leading-relaxed">
                Tenemos tus moldes de corte y textos guardados. No tienes que volver a mandar nada ni explicar todo otra vez.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Opciones de Reorden (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div>
              <h3 className="text-lg font-serif font-bold text-stone-900">
                ¿Qué te gustaría pedir para tu próxima cosecha?
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Elige con un clic:
              </p>
            </div>

            <div className="space-y-3">
              {/* Opción 1 */}
              <div
                onClick={() => setReorderAction('reorder_same')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  reorderAction === 'reorder_same'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">1. Mismo Tiraje de Etiquetas</div>
                  <span className={`text-xs font-bold ${reorderAction === 'reorder_same' ? 'text-amber-300' : 'text-emerald-800'}`}>
                    Diseño: $0 MXN
                  </span>
                </div>
                <p className={`text-xs mt-1.5 leading-relaxed ${reorderAction === 'reorder_same' ? 'text-stone-300' : 'text-stone-600'}`}>
                  Manda a imprimir exactamente la misma etiqueta. Solo pagas el papel y la tinta.
                </p>
              </div>

              {/* Opción 2 */}
              <div
                onClick={() => setReorderAction('adapt_size')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  reorderAction === 'adapt_size'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">2. Adaptar a Nuevo Tamaño de Frasco</div>
                  <span className={`text-xs font-bold ${reorderAction === 'adapt_size' ? 'text-amber-300' : 'text-amber-800'}`}>
                    Solo $350 MXN
                  </span>
                </div>
                <p className={`text-xs mt-1.5 leading-relaxed ${reorderAction === 'adapt_size' ? 'text-stone-300' : 'text-stone-600'}`}>
                  Adaptamos tu misma marca a frascos de 250 g, 500 g o 1 kg sin empezar desde cero.
                </p>
              </div>

              {/* Opción 3 */}
              <div
                onClick={() => setReorderAction('bulk_honey')}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  reorderAction === 'bulk_honey'
                    ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold">3. Más Miel a Mayoreo</div>
                  <span className={`text-xs font-bold ${reorderAction === 'bulk_honey' ? 'text-amber-300' : 'text-amber-800'}`}>
                    Precio Productor
                  </span>
                </div>
                <p className={`text-xs mt-1.5 leading-relaxed ${reorderAction === 'bulk_honey' ? 'text-stone-300' : 'text-stone-600'}`}>
                  Miel pura para cubrir temporadas altas en cubetas de 25 kg o tambos de 300 kg.
                </p>
              </div>
            </div>

            {reorderAction && (
              <div className="pt-2">
                <button
                  onClick={handleSimulateReorder}
                  className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                >
                  Solicitar reorden con mi pedido #{orderNumber} →
                </button>
              </div>
            )}

            {reorderSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-center text-xs font-bold">
                ✓ Solicitud registrada. Te contactamos a tu WhatsApp para programar la entrega.
              </div>
            )}

            <div className="pt-4 border-t border-stone-100">
              <button
                onClick={onResetWorkflow}
                className="w-full py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-2xl transition-colors cursor-pointer text-center"
              >
                ↺ Armar una nueva cotización desde el inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
