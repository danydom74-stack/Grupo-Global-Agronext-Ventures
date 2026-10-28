import React from 'react';
import { WorkflowStageId } from '../types/workflow';

interface HeaderProps {
  activeView: 'simulator' | 'blueprint';
  onSelectView: (view: 'simulator' | 'blueprint') => void;
  onGoToStage: (stage: WorkflowStageId) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onSelectView,
  onGoToStage,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#faf9f5]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => {
            onSelectView('simulator');
            onGoToStage(1);
          }}
          className="text-xl font-bold tracking-tight text-stone-900 font-serif whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity text-left cursor-pointer"
        >
          Grupo Global Agronext Ventures
        </button>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-stone-600">
          <button
            onClick={() => {
              onSelectView('simulator');
              onGoToStage(1);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Inicio
          </button>
          <button
            onClick={() => {
              onSelectView('simulator');
              onGoToStage(2);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Frascos y Precios
          </button>
          <button
            onClick={() => {
              onSelectView('simulator');
              onGoToStage(3);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Diseño en 3 Min
          </button>
          <button
            onClick={() => {
              onSelectView('simulator');
              onGoToStage(6);
            }}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Muestra 3D
          </button>
          <button
            onClick={() => onSelectView('blueprint')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'blueprint' ? 'text-amber-800 font-bold' : 'hover:text-stone-900'
            }`}
          >
            Cómo Funciona el Proceso
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          {activeView === 'simulator' ? (
            <button
              onClick={() => onSelectView('blueprint')}
              className="px-4 py-2.5 text-xs font-bold text-stone-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Ver el Proceso Completo
            </button>
          ) : (
            <button
              onClick={() => {
                onSelectView('simulator');
                onGoToStage(2);
              }}
              className="px-4 py-2.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cotizar Mi Paquete →
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
