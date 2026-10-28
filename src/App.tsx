import React, { useState } from 'react';
import { Header } from './components/Header';
import { StageProgressBar } from './components/StageProgressBar';
import { Stage1Landing } from './components/stages/Stage1Landing';
import { Stage2Quoter } from './components/stages/Stage2Quoter';
import { Stage3Briefing } from './components/stages/Stage3Briefing';
import { Stage4Checkout } from './components/stages/Stage4Checkout';
import { Stage5AiGeneration } from './components/stages/Stage5AiGeneration';
import { Stage6Approval } from './components/stages/Stage6Approval';
import { Stage7Dispatch } from './components/stages/Stage7Dispatch';
import { Stage8Reorder } from './components/stages/Stage8Reorder';
import { ProcessBlueprintView } from './components/ProcessBlueprintView';
import { HelpModal } from './components/HelpModal';
import { INITIAL_BRIEFING } from './data/mockData';
import {
  WorkflowStageId,
  QuoteConfig,
  BriefingData,
  AiConceptReport,
  EntryOption,
} from './types/workflow';

export default function App() {
  const [activeView, setActiveView] = useState<'simulator' | 'blueprint'>('simulator');
  const [currentStage, setCurrentStage] = useState<WorkflowStageId>(1);
  const [completedStages, setCompletedStages] = useState<number[]>([1]);
  const [helpModalKey, setHelpModalKey] = useState<string | null>(null);

  // Workflow State
  const [quote, setQuote] = useState<QuoteConfig>({
    selectedJarId: 'jar-hexagonal-500g',
    quantity: 48,
    includePureHoney: true,
    includeLabelDesign: true,
    printMaterial: 'Plástico impermeable (resistente al agua y miel)',
    deliveryMode: 'shipping',
    productCategory: 'miel',
  });

  const [briefing, setBriefing] = useState<BriefingData>(INITIAL_BRIEFING);
  const [orderNumber] = useState<string>('AGR-7482');
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [conceptReport, setConceptReport] = useState<AiConceptReport | null>(null);
  const [clientSignature, setClientSignature] = useState<string | null>(null);
  const [isApprovedForPrint, setIsApprovedForPrint] = useState<boolean>(false);
  const [trackingNumber] = useState<string>('FDX-MX-84920184');

  const markCompleted = (stageId: number) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages((prev) => [...prev, stageId]);
    }
  };

  const goToStage = (stageId: WorkflowStageId) => {
    setCurrentStage(stageId);
    markCompleted(stageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stage 1 selection handler
  const handleSelectEntryOption = (option: EntryOption) => {
    if (option === 'wholesale_honey') {
      setQuote((prev) => ({
        ...prev,
        productCategory: 'miel',
        includePureHoney: true,
        includeLabelDesign: false,
      }));
    } else if (option === 'jars_packaging') {
      setQuote((prev) => ({
        ...prev,
        productCategory: prev.productCategory || 'miel',
        includePureHoney: false,
        includeLabelDesign: false,
      }));
    } else if (option === 'label_design') {
      setQuote((prev) => ({
        ...prev,
        productCategory: prev.productCategory || 'miel',
        includePureHoney: false,
        includeLabelDesign: true,
      }));
    } else if (option === 'artisan_custom_product') {
      setQuote((prev) => ({
        ...prev,
        productCategory: 'otro',
        includePureHoney: false,
        includeLabelDesign: true,
      }));
    } else {
      setQuote((prev) => ({
        ...prev,
        productCategory: 'miel',
        includePureHoney: true,
        includeLabelDesign: true,
      }));
    }
    markCompleted(1);
    goToStage(2);
  };

  // Stage 2 handler
  const handleNextFromStage2 = () => {
    markCompleted(2);
    if (quote.includeLabelDesign) {
      goToStage(3);
    } else {
      goToStage(4);
    }
  };

  // Stage 3 handler
  const handleNextFromStage3 = () => {
    markCompleted(3);
    goToStage(4);
  };

  // Stage 4 payment confirmation
  const handleConfirmPayment = (_method: 'SPEI' | 'Card' | 'OXXO') => {
    setIsPaid(true);
    markCompleted(4);
  };

  // Stage 6 approval
  const handleApprovePrint = (sigData: string) => {
    setClientSignature(sigData);
    setIsApprovedForPrint(true);
    markCompleted(6);
  };

  // Reset workflow
  const handleResetWorkflow = () => {
    setCurrentStage(1);
    setCompletedStages([1]);
    setIsPaid(false);
    setIsApprovedForPrint(false);
    setClientSignature(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f5] text-stone-900 antialiased">
      {/* Top Bar Contract (3 zones) */}
      <Header
        activeView={activeView}
        onSelectView={setActiveView}
        onGoToStage={goToStage}
      />

      {/* Main Content Area */}
      {activeView === 'simulator' && (
        <StageProgressBar
          currentStage={currentStage}
          onSelectStage={goToStage}
          completedStages={completedStages}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeView === 'blueprint' ? (
          <ProcessBlueprintView
            onGoToStage={(stage) => {
              setActiveView('simulator');
              goToStage(stage);
            }}
          />
        ) : (
          <div>
            {currentStage === 1 && (
              <Stage1Landing
                onSelectOption={handleSelectEntryOption}
                onOpenHelp={setHelpModalKey}
                onNext={() => goToStage(2)}
              />
            )}

            {currentStage === 2 && (
              <Stage2Quoter
                quote={quote}
                onChangeQuote={(updated) => setQuote((prev) => ({ ...prev, ...updated }))}
                onOpenHelp={setHelpModalKey}
                onNext={handleNextFromStage2}
                onBack={() => goToStage(1)}
              />
            )}

            {currentStage === 3 && (
              <Stage3Briefing
                briefing={briefing}
                onChangeBriefing={(updated) => setBriefing((prev) => ({ ...prev, ...updated }))}
                onNext={handleNextFromStage3}
                onBack={() => goToStage(2)}
              />
            )}

            {currentStage === 4 && (
              <Stage4Checkout
                quote={quote}
                briefing={briefing}
                orderNumber={orderNumber}
                isPaid={isPaid}
                onConfirmPayment={handleConfirmPayment}
                onNext={() => {
                  markCompleted(4);
                  goToStage(5);
                }}
                onBack={() => goToStage(quote.includeLabelDesign ? 3 : 2)}
              />
            )}

            {currentStage === 5 && (
              <Stage5AiGeneration
                quote={quote}
                briefing={briefing}
                conceptReport={conceptReport}
                onUpdateConceptReport={setConceptReport}
                onNext={() => {
                  markCompleted(5);
                  goToStage(6);
                }}
                onBack={() => goToStage(4)}
              />
            )}

            {currentStage === 6 && (
              <Stage6Approval
                quote={quote}
                briefing={briefing}
                conceptReport={conceptReport}
                isApprovedForPrint={isApprovedForPrint}
                clientSignature={clientSignature}
                onApprove={handleApprovePrint}
                onNext={() => {
                  markCompleted(6);
                  goToStage(7);
                }}
                onBack={() => goToStage(5)}
              />
            )}

            {currentStage === 7 && (
              <Stage7Dispatch
                quote={quote}
                briefing={briefing}
                orderNumber={orderNumber}
                trackingNumber={trackingNumber}
                onNext={() => {
                  markCompleted(7);
                  goToStage(8);
                }}
                onBack={() => goToStage(6)}
              />
            )}

            {currentStage === 8 && (
              <Stage8Reorder
                quote={quote}
                briefing={briefing}
                orderNumber={orderNumber}
                onResetWorkflow={handleResetWorkflow}
              />
            )}
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-stone-200 bg-white py-6 px-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">Grupo Global Agronext Ventures</span>
            <span aria-hidden="true">·</span>
            <span>Central Mieles Mexicanas</span>
            <span aria-hidden="true">·</span>
            <span>Estudio Hexagonal</span>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <span>San Luis Potosí, S.L.P.</span>
            <span aria-hidden="true">·</span>
            <span>Cumplimiento NOM-051-SCFI/SSA1-2010</span>
          </div>
        </div>
      </footer>

      {/* Interactive Modal de Ayuda */}
      <HelpModal
        modalKey={helpModalKey}
        onClose={() => setHelpModalKey(null)}
      />
    </div>
  );
}
