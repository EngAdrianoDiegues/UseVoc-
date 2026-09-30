import React, { useState, useEffect, useRef } from 'react';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

export const ReverseDigitSpan: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [level, setLevel] = useState<number>(4); // digit count
  const [stage, setStage] = useState<'intro' | 'showing' | 'input' | 'feedback'>('intro');
  const [sequence, setSequence] = useState<number[]>([]);
  const [currentShowingIdx, setCurrentShowingIdx] = useState<number>(-1);
  const [userInput, setUserInput] = useState<string>('');
  const [maxSpanAchieved, setMaxSpanAchieved] = useState<number>(0);
  const [feedbackMsg, setFeedbackMsg] = useState<{ isSuccess: boolean; text: string } | null>(null);

  const startLevel = (digitCount: number) => {
    // generate sequence of unique or pseudo-random non-repeating digits
    const seq: number[] = [];
    while (seq.length < digitCount) {
      const d = Math.floor(Math.random() * 9) + 1;
      if (seq[seq.length - 1] !== d) {
        seq.push(d);
      }
    }
    setSequence(seq);
    setUserInput('');
    setFeedbackMsg(null);
    setStage('showing');
    setCurrentShowingIdx(0);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (stage === 'showing') {
      if (currentShowingIdx < sequence.length) {
        timer = setTimeout(() => {
          setCurrentShowingIdx((prev) => prev + 1);
        }, 1100);
      } else {
        // finished showing digits
        timer = setTimeout(() => {
          setStage('input');
        }, 600);
      }
    }
    return () => clearTimeout(timer);
  }, [stage, currentShowingIdx, sequence.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = userInput.replace(/\D/g, '');
    const reversedTarget = [...sequence].reverse().join('');

    const isMatch = cleanInput === reversedTarget;
    if (isMatch) {
      const nextSpan = Math.max(maxSpanAchieved, sequence.length);
      setMaxSpanAchieved(nextSpan);

      if (sequence.length < 8) {
        setFeedbackMsg({
          isSuccess: true,
          text: `Excelente! Você reteve e inverteu ${sequence.length} dígitos com precisão. Preparando ${sequence.length + 1} dígitos...`
        });
        setStage('feedback');
        setTimeout(() => {
          setLevel(sequence.length + 1);
          startLevel(sequence.length + 1);
        }, 2200);
      } else {
        // Max level conquered
        const finalScore = 100;
        const summary = `Impressionante! Atingiu capacidade máxima de manipulação mental de 8 dígitos reversos.`;
        onComplete(finalScore, summary);
      }
    } else {
      // Mistake
      setFeedbackMsg({
        isSuccess: false,
        text: `A sequência correta invertida era: ${reversedTarget}. Sua capacidade máxima consolidada foi de ${maxSpanAchieved || (sequence.length - 1)} dígitos.`
      });
      setStage('feedback');
      const finalScore = Math.min(95, Math.max(40, (maxSpanAchieved || sequence.length - 1) * 12));
      setTimeout(() => {
        onComplete(
          finalScore,
          `Memória operacional treinada com alcance de ${maxSpanAchieved || (sequence.length - 1)} dígitos reversos.`
        );
      }, 3500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Memória Operacional Ativa</span>
          <span aria-hidden="true">·</span>
          <span>Nível atual: {sequence.length || level} dígitos</span>
          <span aria-hidden="true">·</span>
          <span>Recorde nesta sessão: {maxSpanAchieved}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Cadeia de Dígitos Reversa
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Dígitos serão apresentados um a um. Ao final, digite-os na <strong>ordem inversa</strong> (do último que viu até o primeiro).
        </p>
      </div>

      {stage === 'intro' && (
        <div className="p-6 rounded-xl bg-white border border-stone-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 flex items-center justify-center text-xl mx-auto">
            🔢
          </div>
          <div className="max-w-md mx-auto space-y-2 text-stone-600 text-xs leading-relaxed">
            <p>
              Ao salvar telefones na agenda e deixar a IA sintetizar relatórios, quase nunca exercitamos a memória de curto prazo com manipulação direta.
            </p>
            <p className="text-stone-800 font-medium bg-stone-50 p-2.5 rounded-lg border border-stone-200">
              Exemplo: Se você vir [3] depois [8] depois [1], deverá digitar <strong>183</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={() => startLevel(4)}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
          >
            Iniciar com 4 Dígitos
          </button>
        </div>
      )}

      {stage === 'showing' && (
        <div className="p-12 bg-stone-100/80 rounded-2xl border border-stone-200 text-center min-h-[200px] flex flex-col items-center justify-center">
          <span className="text-xs text-stone-400 uppercase tracking-widest block mb-4 font-mono">
            {currentShowingIdx < sequence.length
              ? `Dígito ${currentShowingIdx + 1} de ${sequence.length}`
              : 'Preparando...'}
          </span>
          <div className="h-24 flex items-center justify-center">
            {currentShowingIdx < sequence.length ? (
              <span className="text-6xl font-mono font-bold text-stone-900 animate-pulse">
                {sequence[currentShowingIdx]}
              </span>
            ) : (
              <span className="text-sm font-medium text-stone-500">
                Guarde a sequência na mente...
              </span>
            )}
          </div>
        </div>
      )}

      {stage === 'input' && (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-xl border border-stone-200 text-center space-y-4">
          <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
            Digite a sequência na ordem inversa:
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ex: 9542..."
            autoFocus
            className="text-center font-mono text-3xl tracking-widest w-48 mx-auto p-3 border-2 border-stone-300 focus:border-stone-900 rounded-xl focus:outline-none"
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={userInput.length !== sequence.length}
              className="px-6 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Confirmar Resposta ({userInput.length}/{sequence.length})
            </button>
          </div>
        </form>
      )}

      {stage === 'feedback' && feedbackMsg && (
        <div
          className={`p-5 rounded-xl border text-center space-y-2 animate-fade-in ${
            feedbackMsg.isSuccess
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : 'bg-stone-900 text-stone-100 border-stone-800'
          }`}
        >
          <div className="text-sm font-semibold">
            {feedbackMsg.isSuccess ? '✓ Resposta Correta' : 'Registro de Desempenho'}
          </div>
          <p className="text-xs leading-relaxed max-w-md mx-auto">
            {feedbackMsg.text}
          </p>
        </div>
      )}

      <div className="flex items-center justify-start pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Sair do exercício
        </button>
      </div>
    </div>
  );
};
