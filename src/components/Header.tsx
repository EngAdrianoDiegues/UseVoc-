import React from 'react';

interface Props {
  activeTab: 'home' | 'exercises' | 'studio' | 'articles' | 'evolution';
  onSelectTab: (tab: 'home' | 'exercises' | 'studio' | 'articles' | 'evolution') => void;
  onOpenCheckin: () => void;
  streak: number;
}

export const Header: React.FC<Props> = ({ activeTab, onSelectTab, onOpenCheckin, streak }) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element Brand wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className="text-lg font-serif font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors"
        >
          UseVocê
        </button>

        {/* Zone 2: 4-5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-stone-600">
          <button
            type="button"
            onClick={() => onSelectTab('home')}
            className={`transition-colors hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'home' ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
            }`}
          >
            Visão Geral
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('exercises')}
            className={`transition-colors hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'exercises' ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
            }`}
          >
            Academia da Mente
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('studio')}
            className={`transition-colors hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'studio' ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
            }`}
          >
            Estúdio Criativo
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('articles')}
            className={`transition-colors hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'articles' ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
            }`}
          >
            Trilhas de Consciência
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('evolution')}
            className={`transition-colors hover:text-stone-900 whitespace-nowrap ${
              activeTab === 'evolution' ? 'text-stone-950 font-semibold border-b-2 border-stone-900 pb-0.5' : ''
            }`}
          >
            Minha Evolução
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-600 font-mono">
            <span>🔥</span>
            <span>{streak} {streak === 1 ? 'dia' : 'dias'} de autonomia</span>
          </div>

          <button
            type="button"
            onClick={onOpenCheckin}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors whitespace-nowrap"
          >
            Check-in Diário
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-200 px-2 py-2 text-[11px] font-medium text-stone-600 bg-stone-50">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={activeTab === 'home' ? 'text-stone-950 font-semibold' : ''}
        >
          Início
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('exercises')}
          className={activeTab === 'exercises' ? 'text-stone-950 font-semibold' : ''}
        >
          Exercícios
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('studio')}
          className={activeTab === 'studio' ? 'text-stone-950 font-semibold' : ''}
        >
          Estúdio
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('articles')}
          className={activeTab === 'articles' ? 'text-stone-950 font-semibold' : ''}
        >
          Artigos
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('evolution')}
          className={activeTab === 'evolution' ? 'text-stone-950 font-semibold' : ''}
        >
          Evolução
        </button>
      </div>
    </header>
  );
};
