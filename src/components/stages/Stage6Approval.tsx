import React, { useRef, useState } from 'react';
import { IMAGES, PACKAGING_OPTIONS } from '../../data/mockData';
import { QuoteConfig, BriefingData, AiConceptReport } from '../../types/workflow';

interface Stage6ApprovalProps {
  quote: QuoteConfig;
  briefing: BriefingData;
  conceptReport: AiConceptReport | null;
  isApprovedForPrint: boolean;
  clientSignature: string | null;
  onApprove: (signatureData: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Stage6Approval: React.FC<Stage6ApprovalProps> = ({
  quote,
  briefing,
  conceptReport,
  isApprovedForPrint,
  clientSignature,
  onApprove,
  onNext,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(Boolean(clientSignature));
  const [checkName, setCheckName] = useState(false);
  const [checkNutrition, setCheckNutrition] = useState(false);
  const [activeTab, setActiveTab] = useState<'mockup' | 'report'>('mockup');

  const selectedJar = PACKAGING_OPTIONS.find((j) => j.id === quote.selectedJarId) || PACKAGING_OPTIONS[0];

  const report = conceptReport || {
    tagline: `Miel pura de abeja, cosechada con respeto a la floración del campo.`,
    conceptJustification: `Diseñamos la etiqueta de ${briefing.brandName} para que comunique autenticidad y trabajo limpio. Los detalles botánicos y el acomodo de letras transmiten a los clientes que se trata de miel 100% pura y de origen confiable.`,
    typographyRationale: `Elegimos tipografías limpias y de buena presencia para que el nombre de tu miel se lea fácil en cualquier anaquel o mesa de feria.`,
    paletteRationale: `Los colores de ${briefing.colorPalette} combinan con los tonos dorados y ámbar de la miel dentro de tu ${selectedJar.name}.`,
    nom051Compliance: `Cuidamos que los sellos de advertencia y la leyenda obligatoria de contenido neto cumplan con la norma mexicana NOM-051 para que puedas vender en tiendas formales sin ningún problema legal.`,
    promptEngineering: [],
    technicalSpecs: {
      dimensionsMm: selectedJar.dieCutDimensions,
      resolution: '300 DPI CMYK',
      substrate: quote.printMaterial,
      printMethod: 'Prensa digital',
      specialFinishes: 'Barniz mate',
    },
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1c1917';
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirmApproval = () => {
    const canvas = canvasRef.current;
    const sigData = canvas ? canvas.toDataURL() : 'signed';
    onApprove(sigData);
  };

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Paso 6 · Muestra Real y Visto Bueno
        </span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Revisa cómo lucirá tu frasco terminado
        </h2>
        <p className="text-base text-stone-700 mt-1.5 max-w-2xl leading-relaxed">
          Mira tu etiqueta montada en el frasco real. Cuando todo esté a tu gusto, autoriza con tu firma digital para encender las máquinas de imprenta.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Vista del Frasco y Explicación (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex gap-2 border-b border-stone-200 pb-2">
            <button
              onClick={() => setActiveTab('mockup')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'mockup'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              1. Muestra en el Frasco Real
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              2. ¿Por qué elegimos este diseño?
            </button>
          </div>

          {activeTab === 'mockup' && (
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 border border-stone-200">
                <img
                  src={IMAGES.labelMockup}
                  alt={`Frasco de ${briefing.brandName}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  {selectedJar.name} · {quote.printMaterial}
                </div>

                <div className="absolute bottom-4 right-4 bg-amber-950/80 backdrop-blur-md text-amber-200 text-xs px-3 py-1.5 rounded-full font-mono">
                  Cumple NOM-051
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs flex flex-wrap justify-between gap-4 text-stone-700">
                <div>
                  <span className="font-bold text-stone-900">Marca:</span> {briefing.brandName}
                </div>
                <div>
                  <span className="font-bold text-stone-900">Contenido:</span> {selectedJar.capacity}
                </div>
                <div>
                  <span className="font-bold text-stone-900">Papel:</span> {quote.printMaterial.split(' ')[0]}
                </div>
                <div>
                  <span className="font-bold text-stone-900">Origen:</span> {briefing.originState}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  La esencia de {briefing.brandName}
                </h3>
                <p className="text-sm text-stone-600 italic mt-1">
                  "{report.tagline}"
                </p>
              </div>

              <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
                <div>
                  <h4 className="font-bold text-stone-900 mb-1">
                    1. La imagen de tu producto:
                  </h4>
                  <p>{report.conceptJustification}</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-1">
                    2. Letras y legibilidad:
                  </h4>
                  <p>{report.typographyRationale}</p>
                </div>

                <div>
                  <h4 className="font-bold text-stone-900 mb-1">
                    3. Sellos y cumplimiento de la ley (NOM-051):
                  </h4>
                  <p className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-950 text-xs">
                    {report.nom051Compliance}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Visto Bueno y Firma (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-bold text-emerald-800 uppercase">
                Autorización Final
              </span>
              <h3 className="text-lg font-serif font-bold text-stone-900 mt-0.5">
                Firma de Visto Bueno
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Con tu firma autorizas que mandemos a imprimir tus etiquetas.
              </p>
            </div>

            {/* Checkboxes de Confirmación Sencillos */}
            <div className="space-y-3 text-xs">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkName}
                  onChange={(e) => setCheckName(e.target.checked)}
                  className="mt-0.5 accent-amber-600 rounded"
                />
                <span className="text-stone-700 leading-normal">
                  Revisé que el nombre de mi miel (<strong className="text-stone-900">{briefing.brandName}</strong>) y mis datos estén correctos.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkNutrition}
                  onChange={(e) => setCheckNutrition(e.target.checked)}
                  className="mt-0.5 accent-amber-600 rounded"
                />
                <span className="text-stone-700 leading-normal">
                  Los gramos ({selectedJar.capacity}) y los sellos de norma oficial se ven claros.
                </span>
              </label>
            </div>

            {/* Firma Canvas */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-800">
                  Firma aquí (con tu dedo o mouse):
                </span>
                <button
                  type="button"
                  onClick={clearSignature}
                  className="text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
                >
                  Borrar firma
                </button>
              </div>

              <div className="border-2 border-dashed border-stone-300 rounded-2xl overflow-hidden bg-stone-50">
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={130}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  className="w-full h-[130px] touch-none cursor-crosshair bg-white"
                />
              </div>
              <div className="text-[11px] text-stone-400 text-center">
                {briefing.producerName || 'Productor'} · {new Date().toLocaleDateString('es-MX')}
              </div>
            </div>

            {/* Botón de Aprobación */}
            <div className="space-y-2.5 pt-2">
              {!isApprovedForPrint ? (
                <button
                  onClick={handleConfirmApproval}
                  disabled={!checkName || !checkNutrition || !hasSignature}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                >
                  Aprobar para Impresión (Visto Bueno) →
                </button>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center text-xs font-bold text-emerald-900">
                    ✓ ¡Visto bueno firmado! Tu pedido entra a prensa.
                  </div>
                  <button
                    onClick={onNext}
                    className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                  >
                    Ver el avance de taller y envío (Paso 7) →
                  </button>
                </div>
              )}

              <button
                onClick={onBack}
                className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                ← Volver al paso anterior
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
