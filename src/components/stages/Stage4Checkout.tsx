import React, { useState } from 'react';
import { PACKAGING_OPTIONS } from '../../data/mockData';
import { QuoteConfig, BriefingData } from '../../types/workflow';

interface Stage4CheckoutProps {
  quote: QuoteConfig;
  briefing: BriefingData;
  orderNumber: string;
  isPaid: boolean;
  onConfirmPayment: (method: 'SPEI' | 'Card' | 'OXXO') => void;
  onNext: () => void;
  onBack: () => void;
}

export const Stage4Checkout: React.FC<Stage4CheckoutProps> = ({
  quote,
  briefing,
  orderNumber,
  isPaid,
  onConfirmPayment,
  onNext,
  onBack,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'SPEI' | 'Card' | 'OXXO'>('SPEI');
  const [copied, setCopied] = useState(false);

  const selectedJar = PACKAGING_OPTIONS.find((j) => j.id === quote.selectedJarId) || PACKAGING_OPTIONS[0];

  const baseJarsSubtotal = selectedJar.unitPrice * quote.quantity;
  let discountPercent = quote.quantity >= 120 ? 0.25 : quote.quantity >= 48 ? 0.15 : quote.quantity >= 24 ? 0.10 : quote.quantity >= 12 ? 0.05 : 0;
  const packagingDiscount = baseJarsSubtotal * discountPercent;
  const honeySubtotal = quote.includePureHoney ? selectedJar.honeyCost * quote.quantity : 0;
  const designFee = quote.includeLabelDesign ? 1850 : 0;
  const subtotalBeforeTax = baseJarsSubtotal - packagingDiscount + honeySubtotal + designFee;
  const shippingFee = quote.deliveryMode === 'workshop_slp' ? 0 : quote.quantity > 100 ? 550 : 380;
  const estimatedTax = subtotalBeforeTax * 0.16;
  const totalAmount = subtotalBeforeTax + estimatedTax + shippingFee;

  const whatsappMessage = `*PEDIDO CENTRAL MIELES & ESTUDIO HEXAGONAL*
*Orden:* #${orderNumber}
*Apicultor:* ${briefing.producerName} (${briefing.brandName})
*WhatsApp:* ${briefing.phoneWhatsapp}

*PAQUETE SELECCIONADO:*
- ${quote.quantity} pzs ${selectedJar.name}
${discountPercent > 0 ? `- Descuento mayoreo: ${(discountPercent * 100).toFixed(0)}%` : ''}
- Miel 100% Pura: ${quote.includePureHoney ? 'Sí (frascos llenos)' : 'Solo frascos vacíos'}
- Diseño de Marca: ${quote.includeLabelDesign ? 'Sí (con sellos NOM-051)' : 'Sin diseño'}
- Papel: ${quote.printMaterial}
- Entrega: ${quote.deliveryMode === 'workshop_slp' ? 'Recoge en Taller SLP' : 'Envío asegurado'}

*TOTAL:* $${totalAmount.toFixed(2)} MXN
_Con tu pago apartamos tus frascos y el diseñador comienza tu boceto._`;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
          Paso 4 · Apartado y Pago
        </span>
        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">
          Confirma tu pedido y aparta tus frascos
        </h2>
        <p className="text-base text-stone-700 mt-1.5 max-w-2xl leading-relaxed">
          Revisa el resumen que enviamos a tu WhatsApp y elige tu forma de pago favorita.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Resumen WhatsApp (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#f0f2f5] p-6 rounded-3xl border border-stone-300 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">💬</span>
                <span className="text-sm font-bold text-stone-800">
                  Resumen para tu WhatsApp
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                {copied ? '✓ ¡Copiado!' : 'Copiar mensaje'}
              </button>
            </div>

            <pre className="text-xs font-mono bg-white p-5 rounded-2xl border border-stone-200 text-stone-800 whitespace-pre-wrap leading-relaxed max-h-[380px] overflow-y-auto">
              {whatsappMessage}
            </pre>

            <p className="text-xs text-stone-500">
              * Guardamos este resumen para que tengas comprobante claro de todo lo acordado.
            </p>
          </div>
        </div>

        {/* Right: Métodos de Pago y Confirmación (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="bg-white p-7 rounded-3xl border border-stone-200 space-y-6">
            <div className="border-b border-stone-100 pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Formas de pago seguras
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Elige la que te sea más cómoda:
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-stone-500">Total a pagar</div>
                <div className="text-2xl font-serif font-bold text-stone-900 tabular-nums">
                  ${totalAmount.toFixed(2)} MXN
                </div>
              </div>
            </div>

            {/* Selector de Métodos */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'SPEI', label: 'SPEI / Bancario', note: 'Acreditación al instante' },
                { id: 'Card', label: 'Tarjeta Bancaria', note: 'Débito o crédito' },
                { id: 'OXXO', label: 'Tienda OXXO', note: 'Efectivo con código' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMethod(m.id as any)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedMethod === m.id
                      ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <div className="text-xs font-bold leading-tight">{m.label}</div>
                  <div className={`text-[10px] mt-1 ${selectedMethod === m.id ? 'text-stone-300' : 'text-stone-500'}`}>
                    {m.note}
                  </div>
                </button>
              ))}
            </div>

            {/* Detalle */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              {selectedMethod === 'SPEI' && (
                <div className="space-y-2">
                  <div className="font-bold text-stone-900 text-sm">Datos para transferir por SPEI:</div>
                  <div className="text-stone-700 flex justify-between">
                    <span>Banco:</span> <strong className="font-mono">BBVA México</strong>
                  </div>
                  <div className="text-stone-700 flex justify-between">
                    <span>A nombre de:</span> <strong>Grupo Global Agronext S.A.S.</strong>
                  </div>
                  <div className="text-stone-700 flex justify-between">
                    <span>CLABE Interbancaria:</span> <strong className="font-mono text-stone-900 tracking-wider">012 700 0011 2233 4455</strong>
                  </div>
                  <div className="text-stone-700 flex justify-between">
                    <span>Concepto:</span> <strong className="font-mono text-amber-800">ORD-{orderNumber}</strong>
                  </div>
                </div>
              )}

              {selectedMethod === 'Card' && (
                <div className="space-y-1.5">
                  <div className="font-bold text-stone-900 text-sm">Pago con tarjeta de débito o crédito:</div>
                  <p className="text-stone-600">
                    Aceptamos todas las tarjetas mexicanas mediante pasarela segura protegida.
                  </p>
                </div>
              )}

              {selectedMethod === 'OXXO' && (
                <div className="space-y-2">
                  <div className="font-bold text-stone-900 text-sm">Referencia para pagar en caja OXXO:</div>
                  <div className="p-3 bg-white border border-stone-300 rounded-xl text-center font-mono text-base font-bold tracking-widest text-stone-900">
                    9384 - 2819 - 4820 - {orderNumber.slice(-4)}
                  </div>
                  <div className="text-[11px] text-stone-500 text-center">
                    Solo muéstrale este número al cajero en cualquier tienda OXXO.
                  </div>
                </div>
              )}
            </div>

            {/* Garantía Humana */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <span>🛡️ Compromiso de taller</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-900">
                Al confirmar tu pago, apartamos físicamente tus frascos en nuestro taller de San Luis Potosí y nuestro diseñador comienza a maquetar tu marca.
              </p>
            </div>

            {/* Botones */}
            <div className="space-y-3 pt-1">
              {!isPaid ? (
                <button
                  onClick={() => onConfirmPayment(selectedMethod)}
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                >
                  Registrar pago y comenzar trabajo ($ {totalAmount.toFixed(2)} MXN) →
                </button>
              ) : (
                <div className="space-y-2.5">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold text-center rounded-2xl">
                    ✓ ¡Pago recibido y frascos apartados!
                  </div>
                  <button
                    onClick={onNext}
                    className="w-full py-4 bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm rounded-2xl shadow-md transition-all hover:scale-[1.01] cursor-pointer text-center"
                  >
                    Ver el trabajo de diseño (Paso 5) →
                  </button>
                </div>
              )}

              <button
                onClick={onBack}
                className="w-full py-2 text-stone-600 hover:text-stone-900 text-xs font-semibold transition-colors cursor-pointer text-center"
              >
                ← Regresar al cuestionario de estilo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
