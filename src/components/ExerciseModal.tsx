import React from 'react';
import { ExerciseItem } from '../types';
import { recordActivity } from '../utils/storage';
import { DoorsOfTruth } from './exercises/DoorsOfTruth';
import { FallacyHunter } from './exercises/FallacyHunter';
import { PatternSeries } from './exercises/PatternSeries';
import { VisualMemoryMatrix } from './exercises/VisualMemoryMatrix';
import { ReverseDigitSpan } from './exercises/ReverseDigitSpan';
import { StroopFocus } from './exercises/StroopFocus';
import { PureDraftWriting } from './exercises/PureDraftWriting';
import { PoetryLab } from './exercises/PoetryLab';
import { TextSurgeon } from './exercises/TextSurgeon';
import { UnusualUses } from './exercises/UnusualUses';
import { RemoteConnection } from './exercises/RemoteConnection';
import { DrawingStudio } from './DrawingStudio';

interface Props {
  exercise: ExerciseItem | null;
  onClose: () => void;
  onUpdated: () => void;
}

export const ExerciseModal: React.FC<Props> = ({ exercise, onClose, onUpdated }) => {
  if (!exercise) return null;

  const handleComplete = (score: number, summary: string, details?: string, imageDataUrl?: string) => {
    recordActivity(
      exercise.id,
      exercise.title,
      exercise.category,
      score,
      summary,
      details,
      imageDataUrl
    );
    onUpdated();
    onClose();
  };

  const renderExerciseContent = () => {
    switch (exercise.id) {
      case 'desafio-portas-verdade':
        return <DoorsOfTruth onComplete={handleComplete} onCancel={onClose} />;
      case 'cacador-de-falacias':
        return <FallacyHunter onComplete={handleComplete} onCancel={onClose} />;
      case 'sequencias-do-pensador':
        return <PatternSeries onComplete={handleComplete} onCancel={onClose} />;
      case 'palacio-mental':
        return <VisualMemoryMatrix onComplete={handleComplete} onCancel={onClose} />;
      case 'cadeia-reversa':
        return <ReverseDigitSpan onComplete={handleComplete} onCancel={onClose} />;
      case 'foco-stroop':
        return <StroopFocus onComplete={handleComplete} onCancel={onClose} />;
      case 'rascunho-puro':
        return <PureDraftWriting onComplete={handleComplete} onCancel={onClose} />;
      case 'oficina-poesia':
        return <PoetryLab onComplete={handleComplete} onCancel={onClose} />;
      case 'cirurgiao-de-texto':
        return <TextSurgeon onComplete={handleComplete} onCancel={onClose} />;
      case 'usos-inusitados':
        return <UnusualUses onComplete={handleComplete} onCancel={onClose} />;
      case 'conexao-remota':
        return <RemoteConnection onComplete={handleComplete} onCancel={onClose} />;
      case 'doodle-thinking':
        return <DrawingStudio onComplete={handleComplete} onCancel={onClose} />;
      default:
        return (
          <div className="p-8 text-center space-y-4">
            <h4 className="text-lg font-serif">{exercise.title}</h4>
            <p className="text-xs text-stone-600">{exercise.description}</p>
            <button
              onClick={() => handleComplete(85, 'Exercício de reflexão individual concluído.')}
              className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg"
            >
              Concluir Prática
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-stone-50 rounded-2xl max-w-2xl w-full border border-stone-200 shadow-2xl my-auto overflow-hidden">
        {/* Top bar with category indicator and close button */}
        <div className="px-6 py-4 border-b border-stone-200 bg-white/70 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="font-semibold uppercase tracking-wider text-amber-900">
              {exercise.category === 'raciocinio' && 'Lógica & Raciocínio'}
              {exercise.category === 'memoria' && 'Memória & Concentração'}
              {exercise.category === 'escrita' && 'Escrita & Voz Própria'}
              {exercise.category === 'criatividade' && 'Criatividade & Imaginação'}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{exercise.difficulty}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-800 p-1 text-sm rounded-md transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Exercise Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {renderExerciseContent()}
        </div>
      </div>
    </div>
  );
};
