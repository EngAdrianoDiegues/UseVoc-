import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

interface ColorDef {
  name: string;
  css: string;
  twText: string;
}

const COLORS: ColorDef[] = [
  { name: 'Vermelho', css: '#dc2626', twText: 'text-red-600' },
  { name: 'Azul', css: '#2563eb', twText: 'text-blue-600' },
  { name: 'Verde', css: '#16a34a', twText: 'text-green-600' },
  { name: 'Amarelo', css: '#d97706', twText: 'text-amber-600' },
  { name: 'Roxo', css: '#9333ea', twText: 'text-purple-600' },
];

export const StroopFocus: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [word, setWord] = useState('');
  const [inkColor, setInkColor] = useState<ColorDef>(COLORS[0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const roundStartTime = useRef<number>(0);
  const totalRounds = 12;

  const nextRound = (currentIdx: number) => {
    if (currentIdx >= totalRounds) {
      // finish
      const avgReaction = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / (reactionTimes.length || 1));
      const accuracyRate = (correctCount / totalRounds) * 100;
      const finalScore = Math.min(100, Math.round(accuracyRate * 0.7 + Math.max(0, 100 - avgReaction / 20) * 0.3));
      const summary = `Controle de impulso concluído: ${correctCount}/${totalRounds} acertos. Tempo médio de reação: ${avgReaction}ms.`;
      onComplete(finalScore, summary);
      return;
    }

    // Pick a random word and a different ink color (incongruent condition)
    const randomWordIdx = Math.floor(Math.random() * COLORS.length);
    let randomInkIdx = Math.floor(Math.random() * COLORS.length);
    // 75% chance of conflict (incongruent), 25% match
    if (Math.random() > 0.25 && randomInkIdx === randomWordIdx) {
      randomInkIdx = (randomInkIdx + 1) % COLORS.length;
    }

    setWord(COLORS[randomWordIdx].name.toUpperCase());
    setInkColor(COLORS[randomInkIdx]);
    setRoundIndex(currentIdx + 1);
    roundStartTime.current = Date.now();
  };

  const handleStart = () => {
    setStarted(true);
    setCorrectCount(0);
    setReactionTimes([]);
    nextRound(0);
  };

  const handleAnswer = (selectedName: string) => {
    const elapsed = Date.now() - roundStartTime.current;
    const isCorrect = selectedName.toLowerCase() === inkColor.name.toLowerCase();

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
    setReactionTimes((prev) => [...prev, elapsed]);
    nextRound(roundIndex);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Inibição de Resposta Automática</span>
          <span aria-hidden="true">·</span>
          <span>Neurociência da Atenção</span>
          <span aria-hidden="true">·</span>
          <span>{started ? `Rodada ${roundIndex}/${totalRounds}` : '12 Rodadas'}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Foco Seletivo & Anti-Piloto Automático
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          O cérebro quer ler a palavra automaticamente. Seu desafio é ignorar o texto escrito e clicar exclusivamente na <strong>cor da tinta</strong>.
        </p>
      </div>

      {!started ? (
        <div className="p-6 rounded-xl bg-white border border-stone-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-xl mx-auto">
            🎯
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h4 className="text-sm font-semibold text-stone-900">
              Regra de ouro:
            </h4>
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center gap-2">
              <span className="text-3xl font-extrabold" style={{ color: '#2563eb' }}>
                VERMELHO
              </span>
              <p className="text-xs text-stone-600">
                Se a palavra for a acima, a resposta correta é <strong className="text-blue-600">Azul</strong> (a cor da tinta), e NÃO Vermelho!
              </p>
            </div>
            <p className="text-xs text-stone-500">
              Isso treina o córtex pré-frontal a resistir à rota de menor resistência — a mesma habilidade necessária para não aceitar atalhos algorítmicos impensados.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStart}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Começar Treino de Atenção
          </button>
        </div>
      ) : (
        <div className="space-y-6 text-center">
          <div className="p-8 bg-stone-100/70 border border-stone-200 rounded-2xl flex flex-col items-center justify-center min-h-[160px]">
            <span
              className="text-4xl md:text-5xl font-extrabold tracking-wider transition-all select-none font-sans"
              style={{ color: inkColor.css }}
            >
              {word}
            </span>
            <span className="text-[11px] text-stone-400 mt-3 font-mono">
              Qual é a cor da tinta?
            </span>
          </div>

          {/* Color Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-lg mx-auto">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => handleAnswer(c.name)}
                className="py-3 px-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-400 text-xs font-semibold text-stone-800 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: c.css }}
                />
                <span>{c.name}</span>
              </button>
            ))}
          </div>

          <div className="text-xs text-stone-400 flex items-center justify-center gap-4">
            <span>Acertos: {correctCount}</span>
            <span>·</span>
            <span>Concentre-se na retina, não no som da palavra</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
