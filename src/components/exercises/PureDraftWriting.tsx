import React, { useState, useEffect } from 'react';
import { saveCreation } from '../../utils/storage';

interface Props {
  onComplete: (score: number, summary: string, content?: string) => void;
  onCancel: () => void;
}

const PROMPTS = [
  'Qual habilidade humana continuará absolutamente insubstituível por qualquer máquina nos próximos 50 anos, e por que você acredita nisso?',
  'Descreva um momento específico em que um erro seu foi crucial para você amadurecer ou aprender algo insubstituível.',
  'Por que a capacidade de tolerar o silêncio e o tédio é o solo fértil de onde nascem as ideias mais originais?',
  'Qual é a diferença fundamental entre ter acesso instantâneo a todas as respostas e cultivar sabedoria de vida?',
  'Escreva uma carta para o seu eu de daqui a dez anos sobre a importância de proteger sua autenticidade e independência de pensamento.'
];

export const PureDraftWriting: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [promptIdx, setPromptIdx] = useState(0);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(true);
  const [checkedAutonomy1, setCheckedAutonomy1] = useState(false);
  const [checkedAutonomy2, setCheckedAutonomy2] = useState(false);
  const [checkedAutonomy3, setCheckedAutonomy3] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  // Statistics
  const words = text.trim() ? text.trim().split(/\s+/) : [];
  const wordCount = words.length;
  const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-záàâãéèêíïóôõöúç]/gi, ''))).size;
  const lexicalRichness = wordCount > 0 ? Math.round((uniqueWords / wordCount) * 100) : 0;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const handleNextPrompt = () => {
    setPromptIdx((prev) => (prev + 1) % PROMPTS.length);
  };

  const handleSave = () => {
    if (wordCount < 30) return;
    const itemTitle = title.trim() || `Rascunho Autoral: ${PROMPTS[promptIdx].slice(0, 36)}...`;
    
    // Save to user's creations portfolio
    saveCreation('texto', itemTitle, text, undefined, ['Rascunho Puro', 'Voz Autêntica']);

    // Calculate score based on depth and self-evaluation
    let calculatedScore = Math.min(100, Math.round(50 + Math.min(30, wordCount / 4) + (checkedAutonomy1 ? 7 : 0) + (checkedAutonomy2 ? 7 : 0) + (checkedAutonomy3 ? 6 : 0)));
    const summary = `Redigiu texto 100% autoral (${wordCount} palavras, vocabulário com ${lexicalRichness}% de variedade) em ${timeFormatted}.`;

    onComplete(calculatedScore, summary, text);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Escrita Humana Desconectada</span>
          <span aria-hidden="true">·</span>
          <span>Tempo de foco: {timeFormatted}</span>
          <span aria-hidden="true">·</span>
          <span>{wordCount} palavras</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Oficina do Rascunho Puro (Zero IA)
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Sem sugestões automáticas, sem reescrita sintética. Apenas você, seu vocabulário e a coragem de pensar na folha em branco.
        </p>
      </div>

      {/* Prompt Card */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide block mb-1">
            Estímulo para Reflexão:
          </span>
          <p className="text-sm font-serif text-stone-800 leading-relaxed italic">
            “{PROMPTS[promptIdx]}”
          </p>
        </div>
        <button
          type="button"
          onClick={handleNextPrompt}
          className="text-xs text-amber-900 hover:text-amber-950 underline decoration-dotted whitespace-nowrap shrink-0 mt-1"
        >
          Trocar Tema
        </button>
      </div>

      {/* Writing Box */}
      <div className="space-y-3 bg-white p-4 rounded-xl border border-stone-200">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do seu texto (opcional)"
            className="w-full text-base font-serif font-semibold text-stone-900 placeholder:text-stone-300 border-b border-stone-200 pb-2 focus:outline-none focus:border-stone-800"
          />
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={9}
          placeholder="Comece a escrever livremente. Não se preocupe em parecer perfeito; preocupe-se em soar verdadeiro..."
          className="w-full text-sm text-stone-800 leading-relaxed p-2 placeholder:text-stone-300 focus:outline-none resize-none font-sans"
        />

        {/* Live Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-4">
            <span>Palavras: <strong className="text-stone-800">{wordCount}</strong></span>
            <span>·</span>
            <span>Variedade Lexical: <strong className="text-stone-800">{lexicalRichness}%</strong></span>
            <span>·</span>
            <span>Tempo de Leitura: ~{Math.max(1, Math.ceil(wordCount / 180))} min</span>
          </div>

          <button
            type="button"
            onClick={() => setTimerRunning(!timerRunning)}
            className="text-[11px] text-stone-500 hover:text-stone-800 underline decoration-dotted"
          >
            {timerRunning ? 'Pausar cronômetro' : 'Retomar cronômetro'}
          </button>
        </div>
      </div>

      {/* Autonomy Checklist */}
      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
        <span className="text-xs font-semibold text-stone-700 block">
          Autoavaliação da Voz Própria:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-stone-600">
          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checkedAutonomy1}
              onChange={(e) => setCheckedAutonomy1(e.target.checked)}
              className="mt-0.5 rounded text-stone-900 focus:ring-stone-800"
            />
            <span>Escrevi sem consultar chatbots ou abrir abas de busca</span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checkedAutonomy2}
              onChange={(e) => setCheckedAutonomy2(e.target.checked)}
              className="mt-0.5 rounded text-stone-900 focus:ring-stone-800"
            />
            <span>Usei palavras e expressões que eu falaria de verdade</span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={checkedAutonomy3}
              onChange={(e) => setCheckedAutonomy3(e.target.checked)}
              className="mt-0.5 rounded text-stone-900 focus:ring-stone-800"
            />
            <span>Contém ao menos uma vivência ou opinião singular</span>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Voltar
        </button>

        <div className="flex items-center gap-3">
          {wordCount < 30 && (
            <span className="text-[11px] text-stone-400">
              Escreva pelo menos 30 palavras para salvar ({wordCount}/30)
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={wordCount < 30}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
          >
            Salvar no Portfólio de Autonomia
          </button>
        </div>
      </div>
    </div>
  );
};
