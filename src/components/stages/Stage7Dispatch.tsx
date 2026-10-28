import React, { useState } from 'react';
import { PACKAGING_OPTIONS } from '../../data/mockData';
import { QuoteConfig, BriefingData } from '../../types/workflow';

interface Stage7DispatchProps {
  quote: QuoteConfig;
  briefing: BriefingData;
  orderNumber: string;
  trackingNumber: string;
  onNext: () => void;
  onBack: () => void;
}

export const Stage7Dispatch: React.FC<Stage7DispatchProps> = ({
  quote,
  briefing,
  orderNumber,
  trackingNumber,
  onNext,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(4);

  const selectedJar = PACKAGING_OPTIONS.find((j) => j.id === quote.selectedJarId) || PACKAGING_OPTIONS[0];

  const steps = [
    {
      id: 1,
      title: '1. Impresión en Prensa Digital',
      desc: `Imprimiendo en papel ${quote.printMaterial} con barniz que resiste derrames de miel.`,
      status: 'completed',
    },
    {
      id: 2,
      title: '2. Corte a la Medida',
      desc: `Corte exacto para que quede limpio en el frasco sin arrugas.`,
      status: 'completed',
    },
    {
      id: 3,
      title: '3. Envasado y Pegado',
      desc: quote.includePureHoney
        ? `Llenado con miel 100% pura potosina y pegado de etiqueta centrado.`
        : `Pegado cuidadoso en los ${quote.quantity} frascos limpios.`,
      status: 'completed',
    },
    {
      id: 4,
      title: '4. Empaque con Separadores',
      desc: `Cajas de cartón corrugado reforzadas para que ningún frasco se quiebre en camino.`,
      status: currentStep >= 4 ? 'completed' : 'in_progress',
    },
    {
      id: 5,
      title: '5. En Camino a tu Dirección',
      desc:
        quote.deliveryMode === 'workshop_slp'
          ? `Listo para recoger en nuestro taller en San Luis Potosí (Zona Industrial).`
          : `Enviado con guía de rastreo nacional: ${trackingNumber}.`,
      status: currentStep >= 5 ? 'completed' : 'pending',
    },
  ];

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Paso 7 · Taller y Envío
        </span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Tu miel va en camino, lista para salir a vender
        </h2>
        <p className="text-base text-stone-700 mt-1.5 max-w-2xl leading-relaxed">
          Sigue el avance de tu pedido en tiempo real. Te entregamos producto terminado para que solo te preocupes por cobrar y vender.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Lista de Pasos (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-stone-500">
                  PEDIDO #{orderNumber}
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Progreso en Taller
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full">
                {currentStep === 5 ? 'Entregado' : 'Empacando en taller'}
              </span>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3">
              {steps.map((st) => (
                <div
                  key={st.id}
                  onClick={() => setCurrentStep(st.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    currentStep === st.id
                      ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600 shadow-xs'
                      : 'border-stone-200 bg-stone-50/60 hover:bg-stone-50'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      st.status === 'completed'
                        ? 'bg-emerald-600 text-white'
                        : st.status === 'in_progress'
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {st.status === 'completed' ? '✓' : st.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-stone-900 flex items-center justify-between">
                      <span>{st.title}</span>
                      <span className="text-xs text-stone-500 font-normal">
                        {st.status === 'completed' ? 'Listo' : 'En proceso'}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Simulación sencilla */}
            <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
              <span>Probar avance de pedido:</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setCurrentStep(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold cursor-pointer ${
                      currentStep === lvl
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    Fase {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Datos de Envío y Recepción (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Datos de tu Paquete
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="text-stone-500">A nombre de:</div>
                <div className="font-bold text-stone-900 text-sm">{briefing.producerName}</div>
                <div className="text-stone-700">{briefing.brandName} · {briefing.phoneWhatsapp}</div>
                <div className="text-stone-600">San Luis Potosí, México</div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1">
                <div className="text-stone-500">Modalidad de entrega:</div>
                <div className="font-bold text-stone-900 text-sm">
                  {quote.deliveryMode === 'workshop_slp'
                    ? 'Recolección en Taller San Luis Potosí'
                    : 'Flete con caja reforzada anti-golpes'}
                </div>
                <div className="text-stone-600 font-mono text-xs">
                  Guía: {trackingNumber}
                </div>
              </div>

              <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <div className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                  <span>📦 Listo para el anaquel</span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed">
                  Tus {quote.quantity} frascos llegan limpios, etiquetados y empacados. Solo abres la caja y están listos para salir a vender.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-2">
              <button
                onClick={onNext}
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
              >
                ¿Necesitas más etiquetas en el futuro? (Paso 8) →
              </button>

              <button
                onClick={onBack}
                className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                ← Volver a la firma
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
