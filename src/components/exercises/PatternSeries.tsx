import React, { useState } from 'react';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

const SERIES = [
  {
    sequence: '2, 5, 11, 23, 47, ... ?',
    correctAnswer: '95',
    explanation: 'A cada passo, multiplica-se o número por 2 e soma-se 1: (2×2+1=5), (5×2+1=11), (11×2+1=23), (23×2+1=47), (47×2+1 = 95).',
    hint: 'Observe a relação entre um número e o dobro do seu antecessor.'
  },
  {
    sequence: '3, 12, 6, 24, 12, 48, 24, ... ?',
    correctAnswer: '96',
    explanation: 'Alternância de operações: multiplica por 4 e depois divide por 2: 3×4=12; 12÷2=6; 6×4=24; 24÷2=12; 12×4=48; 48÷2=24; 24×4 = 96.',
    hint: 'Tente olhar o padrão de passos pares e ímpares separadamente.'
  },
  {
    sequence: '1, 8, 27, 64, 125, ... ?',
    correctAnswer: '216',
    explanation: 'Série dos cubos perfeitos: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125, 6³ = 216.',
    hint: 'Pense em potências de números inteiros consecutivos.'
  }
];

export const PatternSeries: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const current = SERIES[currentIdx];

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const isCorrect = userGuess.trim() === current.correctAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < SERIES.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setUserGuess('');
      setSubmitted(false);
      setShowHint(false);
    } else {
      const score = Math.round((correctCount / SERIES.length) * 100);
      const summary = `Decifrou padrões indutivos com ${correctCount} acertos de ${SERIES.length}.`;
      onComplete(score, summary);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Raciocínio Indutivo</span>
          <span aria-hidden="true">·</span>
          <span>Desafio {currentIdx + 1} de {SERIES.length}</span>
          <span aria-hidden="true">·</span>
          <span>Acertos: {correctCount}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Padrões Indutivos & Sequências
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Descubra a lei interna de progressão matemática sem calculadora ou prompts.
        </p>
      </div>

      {/* Sequence Box */}
      <div className="p-8 bg-stone-100 rounded-2xl border border-stone-200 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">
          Série Lógica:
        </span>
        <div className="text-2xl md:text-3xl font-mono font-bold text-stone-900 tracking-wide">
          {current.sequence}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleCheck} className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
        <div className="max-w-xs mx-auto text-center space-y-2">
          <label className="block text-xs font-semibold text-stone-700 uppercase">
            Qual é o próximo número?
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            disabled={submitted}
            placeholder="Digite o número..."
            className="w-full text-center text-xl font-mono p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10"
          />
        </div>

        {!submitted ? (
          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={!userGuess.trim()}
              className="px-6 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Conferir Raciocínio
            </button>
          </div>
        ) : (
          <div className="space-y-3 pt-2">
            <div
              className={`p-4 rounded-xl border text-xs leading-relaxed ${
                userGuess.trim() === current.correctAnswer
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="font-semibold mb-1">
                {userGuess.trim() === current.correctAnswer ? '✓ Correto!' : 'Quase lá!'}
              </div>
              <p>
                <strong>Resposta correta:</strong> {current.correctAnswer}
              </p>
              <p className="mt-1 text-stone-700">
                <strong>Lei da sequência:</strong> {current.explanation}
              </p>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
              >
                {currentIdx < SERIES.length - 1 ? 'Próxima Sequência →' : 'Finalizar Série'}
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Hint toggle */}
      {!submitted && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-stone-500 hover:text-stone-800 underline decoration-dotted"
          >
            {showHint ? 'Ocultar dica' : 'Pedir uma dica leve'}
          </button>
          {showHint && (
            <p className="text-xs text-stone-600 italic mt-2 bg-stone-100 p-2 rounded max-w-sm mx-auto">
              {current.hint}
            </p>
          )}
        </div>
      )}

      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};
