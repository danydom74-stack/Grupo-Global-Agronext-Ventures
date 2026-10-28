import React from 'react';
import { PACKAGING_OPTIONS, LABEL_FINISH_CARDS } from '../../data/mockData';
import { QuoteConfig, LabelFinishType, ProductCategory } from '../../types/workflow';

interface Stage2QuoterProps {
  quote: QuoteConfig;
  onChangeQuote: (updated: Partial<QuoteConfig>) => void;
  onOpenHelp?: (key: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Stage2Quoter: React.FC<Stage2QuoterProps> = ({
  quote,
  onChangeQuote,
  onOpenHelp,
  onNext,
  onBack,
}) => {
  const selectedJar = PACKAGING_OPTIONS.find((j) => j.id === quote.selectedJarId) || PACKAGING_OPTIONS[0];

  // Pricing calculations
  const isNoJar = quote.selectedJarId === 'no-jar';
  const jarUnitPrice = isNoJar ? 0 : selectedJar.unitPrice;
  const baseJarsSubtotal = jarUnitPrice * quote.quantity;

  let discountPercent = 0;
  if (quote.quantity >= 120) {
    discountPercent = 0.25;
  } else if (quote.quantity >= 48) {
    discountPercent = 0.15;
  } else if (quote.quantity >= 24) {
    discountPercent = 0.10;
  } else if (quote.quantity >= 12) {
    discountPercent = 0.05;
  }

  const packagingDiscount = baseJarsSubtotal * discountPercent;
  const honeySubtotal = (!isNoJar && quote.includePureHoney) ? selectedJar.honeyCost * quote.quantity : 0;
  const designFee = quote.includeLabelDesign ? 1850 : 0;
  const subtotalBeforeTax = baseJarsSubtotal - packagingDiscount + honeySubtotal + designFee;
  const shippingFee = quote.deliveryMode === 'workshop_slp' ? 0 : quote.quantity > 100 ? 550 : 380;
  const estimatedTax = subtotalBeforeTax * 0.16;
  const totalAmount = subtotalBeforeTax + estimatedTax + shippingFee;

  const currentCategory = quote.productCategory || 'miel';

  // WhatsApp formatted string
  const whatsappOrderText = encodeURIComponent(
    `¡Hola Grupo Global Agronext! Me interesa cotizar este pedido:\n\n` +
    `• Producto: ${currentCategory.toUpperCase()}\n` +
    `• Envase: ${isNoJar ? 'Ya tengo mis propios envases (solo etiquetas)' : selectedJar.name}\n` +
    `• Cantidad: ${quote.quantity} piezas\n` +
    `• Miel pura: ${quote.includePureHoney ? 'Sí (frascos llenos)' : 'No'}\n` +
    `• Diseño de etiqueta: ${quote.includeLabelDesign ? 'Sí (con norma oficial)' : 'Ya tengo mi archivo'}\n` +
    `• Acabado de etiqueta: ${quote.printMaterial}\n` +
    `• Entrega: ${quote.deliveryMode === 'workshop_slp' ? 'Recojo en Taller SLP' : 'Envío nacional'}\n` +
    `• Total estimado: $${totalAmount.toFixed(2)} MXN\n\n` +
    `¿Me pueden orientar para cerrar mi pedido?`
  );

  const productCategories: Array<{ id: ProductCategory; label: string; icon: string }> = [
    { id: 'miel', label: 'Miel de Abeja', icon: '🍯' },
    { id: 'salsas', label: 'Salsas Machas', icon: '🌶️' },
    { id: 'cafe', label: 'Café de Grano', icon: '☕' },
    { id: 'mezcal', label: 'Mezcal / Licores', icon: '🍶' },
    { id: 'jabones', label: 'Jabones / Cosmética', icon: '🧼' },
    { id: 'otro', label: 'Otro Producto', icon: '📦' },
  ];

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado con Tipografía Móvil */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider block">
          Cotizador Visual
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 mt-1 leading-tight">
          Arma tu paquete en 3 pasos
        </h2>
        <p className="text-stone-700 text-[18px] mt-1.5 max-w-2xl leading-relaxed">
          Toca las tarjetas con fotos para armar tu pedido. Ve tu precio al instante y pídelo por WhatsApp con 1 clic.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Tarjetas Visuales (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* PASO 1: Tipo de Producto */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                1
              </span>
              <label className="text-xl sm:text-2xl font-bold text-stone-900">
                ¿Qué producto vendes?
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {productCategories.map((cat) => {
                const isSelected = currentCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onChangeQuote({ productCategory: cat.id })}
                    className={`min-h-[58px] p-3 rounded-2xl border-2 text-left font-bold text-base transition-all flex items-center gap-2.5 cursor-pointer active:scale-95 ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50 text-stone-900 shadow-sm ring-1 ring-amber-500'
                        : 'border-stone-200 bg-white hover:border-stone-300 text-stone-800'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PASO 2: Envases con Foto y Pop-up de Ayuda */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </span>
                <label className="text-xl sm:text-2xl font-bold text-stone-900">
                  Elige tu frasco o envase:
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {PACKAGING_OPTIONS.map((jar) => {
                const isSelected = jar.id === quote.selectedJarId;
                const modalKey = jar.id === 'jar-hexagonal-500g'
                  ? 'jar_hexagonal'
                  : jar.id === 'jar-mielero-1300g'
                  ? 'jar_mielero'
                  : 'jar_osito';

                return (
                  <div
                    key={jar.id}
                    onClick={() => onChangeQuote({ selectedJarId: jar.id })}
                    className={`p-4 rounded-3xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500 shadow-md'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div>
                      {/* Image container */}
                      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 mb-3 border border-stone-100">
                        <img
                          src={jar.image}
                          alt={jar.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenHelp?.(modalKey);
                          }}
                          className="absolute top-2 right-2 bg-stone-900/80 hover:bg-stone-950 text-white text-xs font-bold px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1 shadow-sm backdrop-blur-xs"
                        >
                          <span>¿Qué es esto?</span>
                        </button>
                      </div>

                      <div className="text-base font-bold text-stone-900 leading-tight">
                        {jar.name}
                      </div>
                      <div className="text-sm text-stone-600 mt-1">
                        {jar.capacity}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-stone-200/60 flex items-center justify-between">
                      <span className="text-base font-bold text-amber-900 tabular-nums">
                        ${jar.unitPrice.toFixed(2)} MXN
                      </span>
                      <span className="text-xs font-bold text-stone-500">con tapa</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Opción alternativa: Ya tengo mis propios frascos */}
            <div
              onClick={() => onChangeQuote({ selectedJarId: 'no-jar' })}
              className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
                quote.selectedJarId === 'no-jar'
                  ? 'border-amber-600 bg-amber-50 text-stone-900 ring-1 ring-amber-500'
                  : 'border-stone-200 bg-white hover:border-stone-300 text-stone-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <div className="text-base font-bold text-stone-900">
                    Ya tengo mis frascos (Solo necesito diseño e impresión de etiquetas)
                  </div>
                  <div className="text-sm text-stone-500">
                    Adaptamos las etiquetas a las medidas de tus propios envases o bolsas.
                  </div>
                </div>
              </div>
              <span className="text-sm font-bold text-amber-900 shrink-0">
                {quote.selectedJarId === 'no-jar' ? '✓ Seleccionado' : 'Elegir'}
              </span>
            </div>
          </div>

          {/* Cantidad de Piezas */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <label className="text-lg sm:text-xl font-bold text-stone-900">
                ¿Cuántas piezas necesitas?
              </label>
              <div className="text-xl font-bold text-stone-900 tabular-nums">
                {quote.quantity} piezas
                {discountPercent > 0 && (
                  <span className="ml-2 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                    -{(discountPercent * 100).toFixed(0)}% por mayoreo
                  </span>
                )}
              </div>
            </div>

            <input
              type="range"
              min={12}
              max={500}
              step={12}
              value={quote.quantity}
              onChange={(e) => onChangeQuote({ quantity: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer h-3 bg-stone-200 rounded-lg"
            />

            <div className="flex flex-wrap gap-2.5">
              {[12, 24, 48, 120, 240, 500].map((qty) => (
                <button
                  key={qty}
                  type="button"
                  onClick={() => onChangeQuote({ quantity: qty })}
                  className={`min-h-[44px] px-4 py-2 text-sm font-bold rounded-xl border transition-colors cursor-pointer ${
                    quote.quantity === qty
                      ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {qty} pzs
                </button>
              ))}
            </div>
            <p className="text-sm text-stone-600">
              Descuento directo: Caja de 24 pzs (-10%) · Mayoreo de 120+ pzs (-25%).
            </p>
          </div>

          {/* PASO 3: Acabado de la Etiqueta (Tarjetas Visuales + Pop-up de Ayuda) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-stone-900 text-white font-bold text-sm flex items-center justify-center shrink-0">
                3
              </span>
              <label className="text-xl sm:text-2xl font-bold text-stone-900">
                Elige el material de tu etiqueta:
              </label>
            </div>
            <p className="text-stone-700 text-base">
              Selecciona el papel o plástico que mejor proteja tu producto:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {LABEL_FINISH_CARDS.map((card) => {
                const isSelected = quote.printMaterial === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => onChangeQuote({ printMaterial: card.id })}
                    className={`p-5 rounded-3xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer active:scale-[0.98] ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500 shadow-md'
                        : 'border-stone-200 bg-white hover:border-stone-300'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                          {card.tagline}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenHelp?.(card.modalKey);
                          }}
                          className="text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-0.5"
                        >
                          <span>[?]</span>
                        </button>
                      </div>

                      <h4 className="text-lg font-bold text-stone-900 leading-snug">
                        {card.shortName}
                      </h4>

                      <p className="text-stone-700 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 text-xs text-stone-500 font-medium">
                      {card.bestFor}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Toggles de Miel y Diseño */}
          <div className="space-y-3">
            <label className="text-lg font-bold text-stone-900 block">
              Servicios adicionales para tu lote:
            </label>

            {/* Toggle Miel (solo si eligió frasco) */}
            {!isNoJar && (
              <div
                onClick={() => onChangeQuote({ includePureHoney: !quote.includePureHoney })}
                className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  quote.includePureHoney
                    ? 'border-amber-500 bg-amber-50/60'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="space-y-1 pr-4">
                  <div className="text-base font-bold text-stone-900">
                    🍯 Frascos llenos con Miel Pura de Cosecha
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed">
                    Miel 100% pura de abeja cosechada en San Luis Potosí (${selectedJar.honeyCost} MXN c/u).
                  </p>
                </div>
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 duration-200 ease-in-out shrink-0 ${
                    quote.includePureHoney ? 'bg-amber-600' : 'bg-stone-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                      quote.includePureHoney ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Toggle Diseño de Etiqueta */}
            <div
              onClick={() => onChangeQuote({ includeLabelDesign: !quote.includeLabelDesign })}
              className={`p-5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                quote.includeLabelDesign
                  ? 'border-amber-500 bg-amber-50/60'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="space-y-1 pr-4">
                <div className="text-base font-bold text-stone-900">
                  ✏️ Diseño de Marca Listo para Anaquel
                </div>
                <p className="text-stone-700 text-sm leading-relaxed">
                  Creamos tu etiqueta con tu historia, troquel exacto y sellos NOM-051 ($1,850 MXN pago único).
                </p>
              </div>
              <div
                className={`w-12 h-6 flex items-center rounded-full p-1 duration-200 ease-in-out shrink-0 ${
                  quote.includeLabelDesign ? 'bg-amber-600' : 'bg-stone-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-200 ease-in-out ${
                    quote.includeLabelDesign ? 'translate-x-6' : ''
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Resumen Total y Botón de WhatsApp Gigante (5 cols) */}
        <div className="lg:col-span-5 sticky top-20">
          <div className="bg-white rounded-3xl border-2 border-stone-200 p-6 sm:p-7 shadow-lg space-y-6">
            <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  Resumen de tu Pedido
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
                  Costo Total Estimado
                </h3>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Precios fijos
              </span>
            </div>

            {/* Product summary card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2">
              <div className="text-sm font-bold text-stone-900">
                {isNoJar ? 'Solo diseño e impresión de etiquetas' : `${selectedJar.name} (${quote.quantity} pzs)`}
              </div>
              <div className="text-xs text-stone-600 space-y-0.5">
                <div>• Producto: <span className="font-semibold text-stone-800">{currentCategory.toUpperCase()}</span></div>
                <div>• Acabado: <span className="font-semibold text-stone-800">{quote.printMaterial}</span></div>
                <div>• Miel incluida: <span className="font-semibold text-stone-800">{quote.includePureHoney ? 'Sí' : 'No'}</span></div>
                <div>• Diseño de marca: <span className="font-semibold text-stone-800">{quote.includeLabelDesign ? 'Sí' : 'No'}</span></div>
              </div>
            </div>

            {/* Desglose Numérico */}
            <div className="space-y-2.5 text-base text-stone-700">
              {!isNoJar && (
                <div className="flex justify-between">
                  <span>Envases ({quote.quantity} pzs)</span>
                  <span className="font-mono tabular-nums text-stone-900 font-bold">${baseJarsSubtotal.toFixed(2)} MXN</span>
                </div>
              )}

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>Descuento de mayoreo ({(discountPercent * 100).toFixed(0)}%)</span>
                  <span className="font-mono tabular-nums">-${packagingDiscount.toFixed(2)} MXN</span>
                </div>
              )}

              {quote.includePureHoney && !isNoJar && (
                <div className="flex justify-between">
                  <span>Miel pura de abeja</span>
                  <span className="font-mono tabular-nums text-stone-900 font-bold">${honeySubtotal.toFixed(2)} MXN</span>
                </div>
              )}

              {quote.includeLabelDesign && (
                <div className="flex justify-between">
                  <span>Diseño y sellos NOM-051</span>
                  <span className="font-mono tabular-nums text-stone-900 font-bold">${designFee.toFixed(2)} MXN</span>
                </div>
              )}

              <div className="flex justify-between text-sm text-stone-600">
                <span>Flete / Envío asegurado</span>
                <span className="font-mono tabular-nums text-stone-900 font-bold">
                  {shippingFee === 0 ? 'Gratis en taller SLP' : `$${shippingFee.toFixed(2)} MXN`}
                </span>
              </div>

              <div className="flex justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
                <span>IVA Trasladado (16%)</span>
                <span className="font-mono tabular-nums">${estimatedTax.toFixed(2)} MXN</span>
              </div>

              {/* Total Final */}
              <div className="pt-4 border-t-2 border-stone-900 flex items-baseline justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-stone-600">
                    Total Neto
                  </div>
                  <div className="text-xs text-stone-500">Factura disponible</div>
                </div>
                <div className="text-3xl font-bold font-serif text-stone-900 tabular-nums">
                  ${totalAmount.toFixed(2)} <span className="text-sm font-sans font-normal text-stone-500">MXN</span>
                </div>
              </div>
            </div>

            {/* BOTÓN GIGANTE VISIBLE: PEDIR POR WHATSAPP */}
            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/524448291102?text=${whatsappOrderText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[58px] py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer text-center"
              >
                <span className="text-2xl">💬</span>
                <span>Pedir por WhatsApp</span>
              </a>

              {/* Opción de continuar en línea */}
              <button
                onClick={onNext}
                className="w-full min-h-[50px] py-3.5 px-6 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white font-bold text-base rounded-2xl shadow-sm transition-all cursor-pointer text-center"
              >
                {quote.includeLabelDesign
                  ? 'Llenar datos de mi marca en 3 min →'
                  : 'Confirmar y apartar frascos en línea →'}
              </button>

              <button
                onClick={onBack}
                className="w-full py-2 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors cursor-pointer text-center"
              >
                ← Volver al menú principal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
