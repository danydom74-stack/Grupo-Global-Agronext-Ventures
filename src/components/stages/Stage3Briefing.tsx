import React from 'react';
import { BriefingData } from '../../types/workflow';

interface Stage3BriefingProps {
  briefing: BriefingData;
  onChangeBriefing: (updated: Partial<BriefingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Stage3Briefing: React.FC<Stage3BriefingProps> = ({
  briefing,
  onChangeBriefing,
  onNext,
  onBack,
}) => {
  const toggleSymbol = (sym: string) => {
    const list = [...briefing.preferredSymbols];
    const idx = list.indexOf(sym);
    if (idx >= 0) {
      list.splice(idx, 1);
    } else {
      if (list.length < 3) list.push(sym);
    }
    onChangeBriefing({ preferredSymbols: list });
  };

  return (
    <div className="space-y-10 py-2">
      {/* Header Humanizado con Tipografía Móvil */}
      <div className="border-b border-stone-200 pb-5">
        <span className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider block">
          Paso 3 · Cuestionario Ágil (3 minutos)
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-stone-900 mt-1 leading-tight">
          Elige el estilo para tu marca
        </h2>
        <p className="text-stone-700 text-[18px] mt-1.5 max-w-2xl leading-relaxed">
          Solo da toques en las tarjetas que más te gusten. Nosotros nos encargamos de que quede armónico y cumpla con las normas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cuestionario Dinámico de Opción Múltiple (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Datos Esenciales */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              1. Tu Producto y Contacto
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-bold text-stone-700 block mb-1">
                  Nombre de tu marca:
                </label>
                <input
                  type="text"
                  value={briefing.brandName}
                  onChange={(e) => onChangeBriefing({ brandName: e.target.value })}
                  placeholder="Ej: Miel San Isidro, Mezcal El Potosí"
                  className="w-full text-base sm:text-[18px] p-3.5 bg-stone-50 border border-stone-300 rounded-2xl focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-stone-700 block mb-1">
                  Tu nombre:
                </label>
                <input
                  type="text"
                  value={briefing.producerName}
                  onChange={(e) => onChangeBriefing({ producerName: e.target.value })}
                  placeholder="Ej: Carlos Mendoza"
                  className="w-full text-base sm:text-[18px] p-3.5 bg-stone-50 border border-stone-300 rounded-2xl focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-stone-700 block mb-1">
                  WhatsApp para bocetos:
                </label>
                <input
                  type="text"
                  value={briefing.phoneWhatsapp}
                  onChange={(e) => onChangeBriefing({ phoneWhatsapp: e.target.value })}
                  placeholder="+52 444 ..."
                  className="w-full text-base sm:text-[18px] p-3.5 bg-stone-50 border border-stone-300 rounded-2xl focus:ring-2 focus:ring-stone-900 text-stone-900"
                />
              </div>
            </div>
          </div>

          {/* 2. Estilo Visual con Tarjetas Gráficas de 1 Clic */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-stone-900">
                2. ¿Qué estilo va mejor con tu producto?
              </h3>
              <span className="text-sm text-stone-500 font-medium">Elige 1</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Estilo A */}
              <button
                type="button"
                onClick={() => onChangeBriefing({ typographicStyle: 'Rústico & Botánico' })}
                className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                  briefing.typographicStyle === 'Rústico & Botánico'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500 shadow-md'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-3xl">🌿</div>
                  <div className="font-bold text-stone-900 text-lg sm:text-xl">
                    Rústico y Botánico
                  </div>
                  <p className="text-stone-700 text-base leading-relaxed">
                    Ilustraciones de plantas, flores silvestres, abejas y textura cálida de campo.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-amber-900">
                  {briefing.typographicStyle === 'Rústico & Botánico' ? '✓ Seleccionado' : 'Elegir'}
                </div>
              </button>

              {/* Estilo B */}
              <button
                type="button"
                onClick={() => onChangeBriefing({ typographicStyle: 'Moderno & Minimalista' })}
                className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                  briefing.typographicStyle === 'Moderno & Minimalista'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500 shadow-md'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-3xl">✨</div>
                  <div className="font-bold text-stone-900 text-lg sm:text-xl">
                    Limpio y Moderno
                  </div>
                  <p className="text-stone-700 text-base leading-relaxed">
                    Letras minimalistas, mucho aire visual, diseño fino y contemporáneo.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-amber-900">
                  {briefing.typographicStyle === 'Moderno & Minimalista' ? '✓ Seleccionado' : 'Elegir'}
                </div>
              </button>

              {/* Estilo C */}
              <button
                type="button"
                onClick={() => onChangeBriefing({ typographicStyle: 'Clásico & Serif' })}
                className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98] ${
                  briefing.typographicStyle === 'Clásico & Serif'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500 shadow-md'
                    : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="text-3xl">🏛️</div>
                  <div className="font-bold text-stone-900 text-lg sm:text-xl">
                    Tradicional y Familiar
                  </div>
                  <p className="text-stone-700 text-base leading-relaxed">
                    Sellos de cera, letras clásicas y sensación de tradición de varias generaciones.
                  </p>
                </div>
                <div className="mt-4 text-xs font-bold text-amber-900">
                  {briefing.typographicStyle === 'Clásico & Serif' ? '✓ Seleccionado' : 'Elegir'}
                </div>
              </button>
            </div>
          </div>

          {/* 3. Colores y Símbolos de 1 Clic */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 space-y-5">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
                3. Elige los tonos que prefieras:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: 'Oro Ámbar & Negro', desc: 'Dorado y negro profundo', colors: ['#D97706', '#1C1917'] },
                  { name: 'Kraft Orgánico & Miel', desc: 'Tono papel tierra y sepia', colors: ['#A16207', '#78350F'] },
                  { name: 'Verde Botánico & Ocre', desc: 'Hojas silvestres y miel', colors: ['#15803D', '#B45309'] },
                  { name: 'Terracota Cálido & Crema', desc: 'Tierra cocida y marfil', colors: ['#C2410C', '#FEF3C7'] },
                ].map((pal) => {
                  const isSel = briefing.colorPalette === pal.name;
                  return (
                    <button
                      key={pal.name}
                      type="button"
                      onClick={() => onChangeBriefing({ colorPalette: pal.name as any })}
                      className={`min-h-[80px] p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-95 ${
                        isSel
                          ? 'border-amber-600 bg-amber-50/70 ring-1 ring-amber-600 shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                      }`}
                    >
                      <div className="flex gap-2 mb-2">
                        <span className="w-5 h-5 rounded-full border border-stone-300 shadow-xs" style={{ backgroundColor: pal.colors[0] }} />
                        <span className="w-5 h-5 rounded-full border border-stone-300 shadow-xs" style={{ backgroundColor: pal.colors[1] }} />
                      </div>
                      <div className="text-sm font-bold text-stone-900 leading-tight">{pal.name}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{pal.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-stone-900 mb-2">
                Símbolos a incluir (Elige hasta 3):
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  'Abeja reina grabada',
                  'Panal hexagonal',
                  'Rama de mezquite floral',
                  'Sol del altiplano',
                  'Gota de miel pura',
                  'Flor de azahar',
                  'Penca de maguey / agave',
                  'Grano de café',
                  'Chile y molcajete tradicional',
                ].map((sym) => {
                  const isSel = briefing.preferredSymbols.includes(sym);
                  return (
                    <button
                      key={sym}
                      type="button"
                      onClick={() => toggleSymbol(sym)}
                      className={`min-h-[44px] px-4 py-2.5 rounded-2xl text-sm font-bold border transition-all cursor-pointer ${
                        isSel
                          ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {isSel ? '✓ ' : '+ '} {sym}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4. ¿Dónde vas a vender? */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-stone-900">
              4. ¿Dónde vas a vender tu producto?
            </h3>
            <p className="text-stone-700 text-[18px]">
              Nos sirve para calcular el tamaño del código de barras y los sellos de ley.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {[
                { title: 'Ferias y Mercados Locales', desc: 'Venta directa, tianguis y conocidos.' },
                { title: 'Tiendas Gourmet y Orgánicas', desc: 'Comercios especializados y cafeterías.' },
                { title: 'Supermercados (Walmart / HEB)', desc: 'Cadenas formales de autoservicio.' },
              ].map((opt) => {
                const isSel = briefing.futureVisionMarket.includes(opt.title.split(' ')[0]);
                return (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => onChangeBriefing({ futureVisionMarket: opt.title as any })}
                    className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer active:scale-95 ${
                      isSel
                        ? 'border-stone-900 bg-stone-900 text-white shadow-md'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="text-base font-bold">{opt.title}</div>
                    <div className={`text-sm mt-1 ${isSel ? 'text-stone-300' : 'text-stone-600'}`}>
                      {opt.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Garantía de Taller (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-stone-900 text-white p-7 rounded-3xl shadow-md space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Compromiso Local
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-stone-100">
              Tú eliges el estilo, nosotros cuidamos las normas
            </h4>
            <p className="text-stone-300 text-base leading-relaxed">
              Tú nos das la historia familiar y nosotros nos aseguramos de que la etiqueta no te la rechacen en tiendas:
            </p>

            <div className="space-y-2.5 pt-2 border-t border-stone-800 text-sm text-stone-300 font-medium">
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Tamaño exacto para que no se arrugue en el frasco.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Sellos oficiales NOM-051 y contenido neto en regla.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-amber-400 font-bold">✓</span>
                <span>Código de barras nítido que lee cualquier escáner.</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-3">
            <button
              onClick={onNext}
              className="w-full min-h-[52px] py-4 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold text-base sm:text-lg rounded-2xl shadow-md transition-all cursor-pointer text-center"
            >
              Guardar estilo y ver pedido (Paso 4) →
            </button>
            <button
              onClick={onBack}
              className="w-full py-2.5 text-stone-600 hover:text-stone-900 text-sm font-semibold transition-colors cursor-pointer text-center"
            >
              ← Modificar frascos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
