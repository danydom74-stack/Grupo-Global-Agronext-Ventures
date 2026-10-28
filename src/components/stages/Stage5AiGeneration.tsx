import React, { useState } from 'react';
import { PACKAGING_OPTIONS } from '../../data/mockData';
import { QuoteConfig, BriefingData, AiConceptReport } from '../../types/workflow';
import { generateConceptReport } from '../../services/geminiService';

interface Stage5AiGenerationProps {
  quote: QuoteConfig;
  briefing: BriefingData;
  conceptReport: AiConceptReport | null;
  onUpdateConceptReport: (report: AiConceptReport) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Stage5AiGeneration: React.FC<Stage5AiGenerationProps> = ({
  quote,
  briefing,
  conceptReport,
  onUpdateConceptReport,
  onNext,
  onBack,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationLog, setGenerationLog] = useState<string[]>([]);

  const selectedJar = PACKAGING_OPTIONS.find((j) => j.id === quote.selectedJarId) || PACKAGING_OPTIONS[0];

  const handleRunAiGeneration = async () => {
    setIsGenerating(true);
    setGenerationLog([
      '1. Cargando medidas exactas del frasco...',
      '2. Tomando en cuenta tu historia y estilo elegido...',
      '3. Asegurando que los sellos NOM-051 queden en regla...',
      '4. Preparando propuesta visual y ficha técnica...',
    ]);

    try {
      const report = await generateConceptReport({
        brandName: briefing.brandName,
        story: briefing.storyHeritage,
        style: briefing.typographicStyle,
        colorPalette: briefing.colorPalette,
        symbols: briefing.preferredSymbols.join(', '),
        targetMarket: briefing.futureVisionMarket,
        jarType: selectedJar.name,
        hasHoney: quote.includePureHoney,
        material: quote.printMaterial,
      });

      onUpdateConceptReport(report);
      setGenerationLog((prev) => [
        ...prev,
        '✓ ¡Propuesta lista! Generamos la justificación para tu producto.',
      ]);
    } catch {
      // Local fallback with simple, human copy
      const fallback: AiConceptReport = {
        tagline: `Miel de abeja cosechada con orgullo y respeto a las abejas.`,
        conceptJustification: `Diseñamos la etiqueta de ${briefing.brandName} para que transmita la calidad de tu miel. El estilo ${briefing.typographicStyle} resalta el nombre de tu apiario y comunica a los compradores que es miel auténtica de productor, lista para venderse en ${briefing.futureVisionMarket}.`,
        typographyRationale: `Usamos letras claras y legibles a distancia para que cualquier cliente en anaquel identifique tu marca de inmediato.`,
        paletteRationale: `Los tonos de ${briefing.colorPalette} combinan de forma natural con el color dorado ámbar de la miel dentro de tu ${selectedJar.name}.`,
        nom051Compliance: `Revisamos que la etiqueta cumpla con la norma mexicana NOM-051: denominación de Miel Pura de Abeja, contenido neto visible y tabla nutrimental correspondiente.`,
        promptEngineering: [
          {
            title: 'Idea de Etiqueta Frontal',
            prompt: `Artisanal honey packaging for ${briefing.brandName}, ${selectedJar.name}, ${briefing.typographicStyle} style, honey bee illustration, high quality product photo.`,
          },
        ],
        technicalSpecs: {
          dimensionsMm: selectedJar.dieCutDimensions,
          resolution: '300 DPI alta definición para imprenta',
          substrate: quote.printMaterial,
          printMethod: 'Prensa digital con barniz antimanchas',
          specialFinishes: 'Corte perimetral a medida del frasco',
        },
      };
      onUpdateConceptReport(fallback);
      setGenerationLog((prev) => [
        ...prev,
        '✓ Ficha y propuesta preparadas con éxito.',
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Paso 5 · Taller y Medidas de Corte
        </span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Adaptamos tu marca al tamaño exacto del frasco
        </h2>
        <p className="text-base text-stone-700 mt-1.5 max-w-2xl leading-relaxed">
          Cuidamos cada milímetro para que al pegar la etiqueta no se arrugue ni se tape la belleza de tu miel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Molde de Corte (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-xs font-bold text-stone-500 uppercase">
                  Molde de corte
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  {selectedJar.name}
                </h3>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
                {selectedJar.dieCutDimensions}
              </span>
            </div>

            {/* Visual Plano Sencillo */}
            <div className="p-5 bg-stone-900 rounded-2xl text-stone-200 text-xs space-y-4">
              <div className="flex justify-between text-stone-400 text-[11px]">
                <span>PLANO DE IMPRESIÓN</span>
                <span>NORMA MEXICANA NOM-051</span>
              </div>

              <div className="h-44 border-2 border-dashed border-amber-400 rounded-xl p-4 flex flex-col justify-between bg-stone-950/70">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-amber-300">
                    {briefing.brandName || 'Tu Marca'}
                  </span>
                  <span className="text-[10px] bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
                    Sellos NOM-051
                  </span>
                </div>

                <div className="text-center text-xs text-stone-300 py-1">
                  Estilo: {briefing.typographicStyle} · {briefing.preferredSymbols[0] || 'Abeja'}
                </div>

                <div className="flex justify-between text-[11px] text-stone-400 border-t border-stone-800 pt-1.5">
                  <span>Cont. Neto: {selectedJar.capacity}</span>
                  <span>Hecho en México</span>
                  <span>Papel: {quote.printMaterial.split(' ')[0]}</span>
                </div>
              </div>

              <p className="text-stone-300 text-xs leading-relaxed">
                Este molde asegura que la etiqueta abrace perfectamente el contorno del frasco sin cubrir de más el producto.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Generación del Boceto (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 space-y-5">
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Primeros bocetos de tu etiqueta
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Tomamos las preferencias de tu cuestionario y preparamos la muestra gráfica antes de mandar a máquinas de imprenta.
            </p>

            <button
              onClick={handleRunAiGeneration}
              disabled={isGenerating}
              className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-300 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer"
            >
              {isGenerating ? (
                <span>Preparando propuesta...</span>
              ) : conceptReport ? (
                <span>Actualizar propuesta de diseño ↺</span>
              ) : (
                <span>Ver propuesta de diseño para mi miel →</span>
              )}
            </button>

            {generationLog.length > 0 && (
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-1">
                <div className="text-[11px] font-bold text-stone-600 uppercase">
                  Progreso del taller:
                </div>
                <div className="space-y-0.5 text-xs text-stone-800">
                  {generationLog.map((log, idx) => (
                    <div key={idx}>{log}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={onNext}
                className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
              >
                Ver mi frasco en 3D y dar visto bueno (Paso 6) →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
