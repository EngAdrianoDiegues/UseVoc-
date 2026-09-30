import React, { useState } from 'react';
import { DrawingStudio } from './DrawingStudio';
import { PureDraftWriting } from './exercises/PureDraftWriting';
import { PoetryLab } from './exercises/PoetryLab';

interface Props {
  onCreationSaved: () => void;
}

export const StudioView: React.FC<Props> = ({ onCreationSaved }) => {
  const [studioMode, setStudioMode] = useState<'desenho' | 'escrita' | 'poesia'>('desenho');

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Espaço de Expressão Livre</span>
          <span aria-hidden="true">·</span>
          <span>Zero Correções Sintéticas</span>
          <span aria-hidden="true">·</span>
          <span>Salvo no seu Portfólio</span>
        </div>
        <h2 className="text-3xl font-serif text-stone-900 font-bold">
          Estúdio Criativo Autoral
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Um ambiente limpo e acolhedor para você praticar o pensamento visual na prancheta ou tecer palavras sem filtros algorítmicos. O que você cria aqui é inquestionavelmente seu.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="flex items-center gap-2 p-1.5 bg-stone-100 rounded-xl max-w-md">
        <button
          type="button"
          onClick={() => setStudioMode('desenho')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
            studioMode === 'desenho'
              ? 'bg-white text-stone-900 shadow-sm font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          🎨 Prancheta de Desenho
        </button>

        <button
          type="button"
          onClick={() => setStudioMode('escrita')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
            studioMode === 'escrita'
              ? 'bg-white text-stone-900 shadow-sm font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          ✍️ Rascunho Livre
        </button>

        <button
          type="button"
          onClick={() => setStudioMode('poesia')}
          className={`flex-1 py-2 px-3 text-xs font-medium rounded-lg transition-all ${
            studioMode === 'poesia'
              ? 'bg-white text-stone-900 shadow-sm font-semibold'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          🌿 Laboratório Poético
        </button>
      </div>

      {/* Studio Workspace */}
      <div className="bg-stone-50/50 p-2 sm:p-6 rounded-3xl border border-stone-200">
        {studioMode === 'desenho' && (
          <DrawingStudio
            onComplete={() => {
              onCreationSaved();
            }}
          />
        )}

        {studioMode === 'escrita' && (
          <PureDraftWriting
            onComplete={() => {
              onCreationSaved();
            }}
            onCancel={() => {}}
          />
        )}

        {studioMode === 'poesia' && (
          <PoetryLab
            onComplete={() => {
              onCreationSaved();
            }}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};
