import React from 'react';
import { HELP_MODALS } from '../data/mockData';

interface HelpModalProps {
  modalKey: string | null;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ modalKey, onClose }) => {
  if (!modalKey) return null;
  const content = HELP_MODALS[modalKey];
  if (!content) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 transform transition-all text-stone-900 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        {content.image && (
          <div className="relative aspect-[16/9] w-full bg-stone-100 overflow-hidden shrink-0">
            <img
              src={content.image}
              alt={content.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <button
              onClick={onClose}
              aria-label="Cerrar ventana de ayuda"
              className="absolute top-3 right-3 w-10 h-10 rounded-full bg-stone-900/80 hover:bg-stone-950 text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer shadow-md"
            >
              ✕
            </button>
          </div>
        )}

        {/* Content body with minimum 18px body font and 24px-28px heading */}
        <div className="p-6 sm:p-7 space-y-4 overflow-y-auto">
          {!content.image && (
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Información de ayuda
              </span>
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-stone-800 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <div>
            <h3 className="text-2xl sm:text-[26px] font-bold text-stone-900 leading-tight">
              {content.title}
            </h3>
            {content.subtitle && (
              <p className="text-amber-800 font-semibold text-sm sm:text-base mt-1">
                {content.subtitle}
              </p>
            )}
          </div>

          <p className="text-stone-700 text-base sm:text-[18px] leading-relaxed">
            {content.description}
          </p>

          {content.highlights && content.highlights.length > 0 && (
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200/80 space-y-2">
              <div className="text-xs font-bold uppercase text-amber-950 tracking-wider">
                Puntos Clave:
              </div>
              <ul className="space-y-1.5 text-sm sm:text-base text-amber-950 font-medium">
                {content.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold shrink-0">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {content.recommendation && (
            <p className="text-stone-600 text-xs sm:text-sm italic">
              💡 {content.recommendation}
            </p>
          )}

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 text-white font-bold text-base rounded-2xl shadow-md transition-colors cursor-pointer text-center"
            >
              Entendido, volver a elegir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
