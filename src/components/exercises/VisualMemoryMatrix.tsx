import React, { useState, useEffect } from 'react';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

const SYMBOLS = [
  { id: 'sun', icon: '☀️', name: 'Sol' },
  { id: 'key', icon: '🗝️', name: 'Chave' },
  { id: 'leaf', icon: '🍃', name: 'Folha' },
  { id: 'book', icon: '📖', name: 'Livro' },
  { id: 'hourglass', icon: '⏳', name: 'Ampulheta' },
  { id: 'feather', icon: '🪶', name: 'Pena' },
  { id: 'anchor', icon: '⚓', name: 'Âncora' },
  { id: 'bell', icon: '🔔', name: 'Sino' },
];

export const VisualMemoryMatrix: React.FC<Props> = ({ onComplete, onCancel }) => {
  // Phase: 'intro' | 'memorize' | 'recall' | 'result'
  const [phase, setPhase] = useState<'intro' | 'memorize' | 'recall' | 'result'>('intro');
  const [targetGrid, setTargetGrid] = useState<string[]>(Array(9).fill(''));
  const [userGrid, setUserGrid] = useState<string[]>(Array(9).fill(''));
  const [activeSlot, setActiveSlot] = useState<number | null>(0);
  const [countdown, setCountdown] = useState<number>(6);
  const [targetCount, setTargetCount] = useState<number>(4);

  // Generate puzzle
  const startChallenge = () => {
    const grid = Array(9).fill('');
    // pick 4 distinct slots
    const slots = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => 0.5 - Math.random()).slice(0, 4);
    // pick 4 distinct symbols
    const syms = [...SYMBOLS].sort(() => 0.5 - Math.random()).slice(0, 4);

    slots.forEach((slotIdx, i) => {
      grid[slotIdx] = syms[i].icon;
    });

    setTargetGrid(grid);
    setUserGrid(Array(9).fill(''));
    setActiveSlot(0);
    setTargetCount(4);
    setCountdown(6);
    setPhase('memorize');
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (phase === 'memorize' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (phase === 'memorize' && countdown === 0) {
      setPhase('recall');
    }
    return () => clearTimeout(timer);
  }, [phase, countdown]);

  const handlePlaceSymbol = (symbolIcon: string) => {
    if (activeSlot === null) return;
    const next = [...userGrid];
    next[activeSlot] = next[activeSlot] === symbolIcon ? '' : symbolIcon;
    setUserGrid(next);
  };

  const handleClearSlot = (index: number) => {
    const next = [...userGrid];
    next[index] = '';
    setUserGrid(next);
  };

  const checkResults = () => {
    let matches = 0;
    let falsePositives = 0;

    targetGrid.forEach((target, i) => {
      if (target !== '') {
        if (userGrid[i] === target) {
          matches++;
        }
      } else {
        if (userGrid[i] !== '') {
          falsePositives++;
        }
      }
    });

    const accuracy = Math.max(0, Math.round(((matches - falsePositives * 0.5) / targetCount) * 100));
    setPhase('result');

    setTimeout(() => {
      onComplete(
        accuracy,
        `Retenção espacial: ${matches} de ${targetCount} símbolos lembrados com exatidão na matriz.`
      );
    }, 3500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Memória Operacional Espacial</span>
          <span aria-hidden="true">·</span>
          <span>Sem anotações externas</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Matriz de Retenção Visual
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Memorize as posições exatas dos símbolos. Quando o tempo acabar, recrie a disposição sem espiar.
        </p>
      </div>

      {phase === 'intro' && (
        <div className="p-6 rounded-xl bg-white border border-stone-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center text-xl mx-auto">
            🧠
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-sm font-semibold text-stone-900">
              Como funciona o treino:
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Você verá uma matriz 3x3 com 4 símbolos desenhados durante <strong>6 segundos</strong>.
              Em seguida, eles desaparecerão e você deverá apontar onde cada símbolo estava.
            </p>
            <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200/60 text-left">
              <strong>Técnica do Palácio Mental:</strong> Tente criar uma breve história ligando os símbolos (ex: “o Sol iluminou a Chave no canto, enquanto a Pena caiu no centro”). Histórias ativam mais circuitos de memória do que a mera repetição!
            </p>
          </div>

          <button
            type="button"
            onClick={startChallenge}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Iniciar Memorização (6s)
          </button>
        </div>
      )}

      {phase === 'memorize' && (
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-semibold rounded-full">
            <span>Fixe o olhar: {countdown} segundos restantes</span>
          </div>

          <div className="max-w-[280px] mx-auto grid grid-cols-3 gap-2.5 p-3 bg-stone-100 rounded-2xl border border-stone-200 shadow-inner">
            {targetGrid.map((sym, idx) => (
              <div
                key={idx}
                className="h-20 bg-white rounded-xl flex items-center justify-center text-3xl shadow-sm border border-stone-200 transition-all"
              >
                {sym}
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-500 italic">
            Guarde a geometria e a posição relativa de cada elemento...
          </p>
        </div>
      )}

      {phase === 'recall' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-stone-600">
            <span>Selecione uma casa na grade e depois clique no símbolo correspondente:</span>
            <button
              type="button"
              onClick={checkResults}
              className="px-4 py-1.5 font-medium text-xs text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Conferir Memória
            </button>
          </div>

          {/* 3x3 Interactive Grid */}
          <div className="max-w-[280px] mx-auto grid grid-cols-3 gap-2.5 p-3 bg-stone-100 rounded-2xl border border-stone-200 shadow-inner">
            {userGrid.map((sym, idx) => {
              const isSelected = activeSlot === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlot(idx)}
                  className={`h-20 rounded-xl flex flex-col items-center justify-center text-3xl relative transition-all ${
                    isSelected
                      ? 'bg-amber-50 border-2 border-amber-800 shadow-md ring-2 ring-amber-700/20'
                      : 'bg-white border border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <span>{sym || ''}</span>
                  {sym && (
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClearSlot(idx);
                      }}
                      className="absolute top-1 right-1 text-[10px] text-stone-400 hover:text-rose-600 px-1"
                    >
                      ×
                    </span>
                  )}
                  {!sym && (
                    <span className="text-[10px] text-stone-300 font-mono">
                      #{idx + 1}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Symbol Palette */}
          <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-2">
            <div className="text-xs font-medium text-stone-600 text-center">
              Paleta de Símbolos (clique para posicionar na casa selecionada):
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SYMBOLS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handlePlaceSymbol(s.icon)}
                  className="px-3 py-2 bg-stone-50 hover:bg-amber-50 hover:border-amber-300 border border-stone-200 rounded-lg text-xl flex items-center gap-1.5 transition-all"
                >
                  <span>{s.icon}</span>
                  <span className="text-xs text-stone-700 font-sans">{s.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'result' && (
        <div className="space-y-4 text-center">
          <div className="p-4 bg-stone-900 text-white rounded-xl text-xs space-y-2 animate-fade-in">
            <h4 className="font-semibold text-amber-300 text-sm">
              Comparativo de Memória
            </h4>
            <p className="text-stone-300">
              Veja a matriz original lado a lado com a que você reconstruiu:
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-2 text-stone-200">
              <div className="p-2 bg-stone-800/80 rounded-lg">
                <div className="text-[11px] font-semibold text-stone-400 mb-1">Original</div>
                <div className="grid grid-cols-3 gap-1">
                  {targetGrid.map((sym, i) => (
                    <div key={i} className="h-8 bg-stone-700/50 rounded flex items-center justify-center text-sm">
                      {sym}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-2 bg-stone-800/80 rounded-lg">
                <div className="text-[11px] font-semibold text-stone-400 mb-1">Sua Tentativa</div>
                <div className="grid grid-cols-3 gap-1">
                  {userGrid.map((sym, i) => {
                    const isRight = sym === targetGrid[i] && sym !== '';
                    return (
                      <div
                        key={i}
                        className={`h-8 rounded flex items-center justify-center text-sm ${
                          isRight ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500' : 'bg-stone-700/50'
                        }`}
                      >
                        {sym}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-amber-200 pt-2 font-medium">
              Salvando pontuação no pilar de Memória...
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Voltar aos exercícios
        </button>
      </div>
    </div>
  );
};
