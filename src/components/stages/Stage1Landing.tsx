import React from 'react';
import { IMAGES } from '../../data/mockData';
import { EntryOption } from '../../types/workflow';

interface Stage1LandingProps {
  onSelectOption: (option: EntryOption) => void;
  onOpenHelp?: (key: string) => void;
  onNext: () => void;
}

export const Stage1Landing: React.FC<Stage1LandingProps> = ({
  onSelectOption,
  onOpenHelp,
  onNext,
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 py-2">
      {/* 1. Hero Section Limpio y Directo */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[440px] sm:min-h-[480px] flex flex-col justify-end p-6 sm:p-12 lg:p-16 shadow-lg">
        <img
          src={IMAGES.hero}
          alt="Miel pura y frascos de Grupo Global Agronext"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-5">
          {/* Sellos de Cercanía */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <span className="bg-stone-800/90 text-stone-200 px-3.5 py-1.5 rounded-full border border-stone-700">
              🇲🇽 San Luis Potosí
            </span>
            <span className="bg-amber-900/80 text-amber-200 px-3.5 py-1.5 rounded-full border border-amber-700/60">
              🐝 100% Miel Pura de Cosecha
            </span>
            <span className="bg-stone-800/90 text-stone-200 px-3.5 py-1.5 rounded-full border border-stone-700">
              ⏱️ Bocetos en 24-48 hrs
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            De la tierra al envase.
          </h1>

          <p className="text-stone-200 text-lg sm:text-[20px] font-normal leading-relaxed">
            Miel 100% pura de abeja, frascos de vidrio y el diseño de tu etiqueta listo para salir a vender.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-3.5">
            <button
              onClick={() => {
                onSelectOption('jars_packaging');
                onNext();
              }}
              className="w-full sm:w-auto min-h-[52px] py-3.5 px-7 bg-amber-500 hover:bg-amber-400 text-stone-950 text-base sm:text-[18px] font-bold rounded-2xl transition-all shadow-md active:scale-95 cursor-pointer text-center"
            >
              Ver Frascos y Miel →
            </button>
            <button
              onClick={() => {
                onSelectOption('artisan_custom_product');
                onNext();
              }}
              className="w-full sm:w-auto min-h-[52px] py-3.5 px-7 bg-stone-800/90 hover:bg-stone-700 text-white text-base sm:text-[18px] font-bold rounded-2xl border border-stone-600 transition-all active:scale-95 cursor-pointer text-center"
            >
              Diseñar mi Etiqueta
            </button>
          </div>
        </div>
      </div>

      {/* 2. Menú de Entrada Única (4 Botones Principales Solicitados) */}
      <div className="space-y-6">
        <div className="text-left sm:text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider block">
            ¿Qué necesitas hoy para tu negocio?
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
            Elige una opción para ver precios al instante
          </h2>
          <p className="text-stone-700 text-[18px] leading-relaxed">
            Sin llamadas largas ni trámites: toca una tarjeta para comenzar.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Botón 1: 🍯 Miel a Mayoreo */}
          <div
            onClick={() => {
              onSelectOption('wholesale_honey');
              onNext();
            }}
            className="group bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="space-y-3">
              <div className="text-4xl">🍯</div>
              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                Miel a Mayoreo
              </h3>
              <p className="text-stone-700 text-[18px] leading-relaxed">
                Miel 100% pura de abeja en caja de frascos o tambo. Cosecha potosina certificada.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                Ver precios de miel →
              </span>
            </div>
          </div>

          {/* Botón 2: 🫙 Frascos y Envases */}
          <div
            onClick={() => {
              onSelectOption('jars_packaging');
              onNext();
            }}
            className="group bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="space-y-3">
              <div className="text-4xl">🫙</div>
              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                Frascos y Envases
              </h3>
              <p className="text-stone-700 text-[18px] leading-relaxed">
                Tarros hexagonales de 500g, mieleros de 1.3kg y ositos PET. Desde 12 piezas con tapa.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                Elegir envases →
              </span>
            </div>
          </div>

          {/* Botón 3: 🐝 Paquete Apícola Completo */}
          <div
            onClick={() => {
              onSelectOption('full_pack');
              onNext();
            }}
            className="group bg-amber-50/80 p-6 sm:p-7 rounded-3xl border-2 border-amber-300 hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between relative active:scale-[0.98]"
          >
            <span className="absolute top-4 right-4 bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Más pedido
            </span>
            <div className="space-y-3">
              <div className="text-4xl">🐝</div>
              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                Paquete Apícola Completo
              </h3>
              <p className="text-stone-800 text-[18px] leading-relaxed">
                Miel + Frasco + Etiqueta con norma oficial. Te llega listo para poner en anaquel y vender.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-900 group-hover:translate-x-1 transition-transform">
                Cotizar paquete completo →
              </span>
            </div>
          </div>

          {/* Botón 4: 🏷️ Diseño de Etiquetas para Mi Producto (Salsas, Jabones, Café, Mezcal, etc.) */}
          <div
            onClick={() => {
              onSelectOption('artisan_custom_product');
              onNext();
            }}
            className="group bg-white p-6 sm:p-7 rounded-3xl border-2 border-stone-200 hover:border-amber-500 hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between active:scale-[0.98]"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-4xl">🏷️</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenHelp?.('artisan_products');
                  }}
                  className="text-xs font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 px-2.5 py-1 rounded-full cursor-pointer flex items-center gap-1"
                >
                  <span>¿Qué es esto?</span>
                </button>
              </div>

              <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug">
                Diseño para Mi Producto
              </h3>
              <p className="text-stone-700 text-[18px] leading-relaxed">
                Salsas, café, mezcal, jabones y mermeladas. Tu etiqueta lista en 24 a 48 horas con medidas exactas.
              </p>
            </div>
            <div className="pt-6">
              <span className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                Diseñar mi producto →
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Muestra de Otros Productos Artesanales Atendidos */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-bold text-amber-800 uppercase tracking-wider">
              Apoyo a Productores Locales
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
              Etiquetas para cualquier producto del campo
            </h2>
          </div>
          <button
            onClick={() => onOpenHelp?.('artisan_products')}
            className="self-start sm:self-auto py-2 px-4 bg-amber-50 hover:bg-amber-100 text-amber-900 text-sm font-bold rounded-xl border border-amber-200 transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span>Ver ejemplos y materiales [¿Qué es esto?]</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
            <img
              src={IMAGES.artisanProducts}
              alt="Productos artesanales con etiquetas de Estudio Hexagonal (Mezcal, Salsa, Café, Jabón)"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:col-span-5 space-y-4">
            <p className="text-stone-800 text-[18px] leading-relaxed">
              Trabajamos con maestros mezcaleros, tostadores de café, productores de salsa macha y artesanas de cosmética natural.
            </p>
            <div className="space-y-2.5 text-base sm:text-[18px] text-stone-700 font-medium">
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Plástico resistente al agua y aceites para salsas y botellas.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Papel kraft ecológico para café y jabón artesanal.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="text-emerald-700 font-bold">✓</span>
                <span>Cumplimiento con tablas y sellos para venta en tiendas.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectOption('artisan_custom_product');
                  onNext();
                }}
                className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white text-base sm:text-[18px] font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer text-center"
              >
                Cotizar etiquetas para mi producto →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Caso de Éxito: Antes y Después */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 space-y-6">
        <div className="space-y-1">
          <span className="text-xs sm:text-sm font-bold text-stone-500 uppercase tracking-wider">
            Transformación Real
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
            De etiqueta casera a producto de anaquel
          </h2>
          <p className="text-stone-700 text-[18px]">
            Mira cómo cambia la confianza del comprador cuando el frasco tiene etiqueta formal.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-stone-200 shadow-sm relative">
            <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
              ANTES: CASERO
            </div>
            <div className="absolute top-3 right-3 bg-amber-950/90 text-amber-200 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full shadow-md">
              DESPUÉS: ARTESANAL NOM-051
            </div>
            <img
              src={IMAGES.beforeAfter}
              alt="Comparativa Antes y Después"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="lg:col-span-4 p-6 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <p className="text-stone-900 text-[18px] italic leading-relaxed">
              “Logré entrar a mi primera tienda artesanal gracias a mi nueva etiqueta. La gente ya no me pide rebaja porque el producto se ve fino y confiable.”
            </p>
            <div className="border-t border-stone-200 pt-3">
              <div className="font-bold text-stone-900 text-base">Don Carlos Mendoza</div>
              <div className="text-stone-500 text-sm">Apiario Luna Real · San Luis Potosí</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
