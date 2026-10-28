import React from 'react';
import { WORKFLOW_STAGES } from '../data/mockData';
import { WorkflowStageId } from '../types/workflow';

interface StageProgressBarProps {
  currentStage: WorkflowStageId;
  onSelectStage: (stage: WorkflowStageId) => void;
  completedStages: number[];
}

export const StageProgressBar: React.FC<StageProgressBarProps> = ({
  currentStage,
  onSelectStage,
  completedStages,
}) => {
  return (
    <div className="w-full bg-white border-b border-stone-200 py-3 px-4 shadow-xs">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
          {WORKFLOW_STAGES.map((stage) => {
            const isCurrent = stage.id === currentStage;
            const isCompleted = completedStages.includes(stage.id);

            return (
              <button
                key={stage.id}
                onClick={() => onSelectStage(stage.id as WorkflowStageId)}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-all shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500/10 border border-amber-600/30'
                    : 'hover:bg-stone-50 border border-transparent'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums shrink-0 transition-colors ${
                    isCurrent
                      ? 'bg-amber-600 text-white'
                      : isCompleted
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-200 text-stone-600 group-hover:bg-stone-300'
                  }`}
                >
                  {isCompleted && !isCurrent ? '✓' : stage.id}
                </div>
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${
                      isCurrent ? 'text-amber-950 font-bold' : 'text-stone-700'
                    }`}
                  >
                    Etapa {stage.id}
                  </span>
                  <span className="text-[11px] text-stone-500 truncate max-w-[110px] hidden lg:inline">
                    {stage.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
