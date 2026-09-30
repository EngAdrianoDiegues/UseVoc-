import React, { useState } from 'react';
import { saveCreation } from '../../utils/storage';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

const CONCEPT_PAIRS = [
  {
    conceptA: 'A Arquitetura de um Formigueiro',
    conceptB: 'Gerenciamento de Tempo e Foco Pessoal',
    promptQuestion: 'Como a distribuição de tarefas sem chefe central das formigas pode inspirar uma rotina de estudos sem estresse?'
  },
  {
    conceptA: 'A Fermentação Natural de um Pão',
    conceptB: 'O Processo de Ter uma Ideia Original',
    promptQuestion: 'Por que uma boa ideia precisa de "tempo de descanso no escuro" para crescer, exatamente como a massa de trigo fermentando?'
  },
  {
    conceptA: 'Correntes Marítimas e Marés',
    conceptB: 'Navegar em Conversas Difíceis no Trabalho',
    promptQuestion: 'Como o conceito de remar a favor ou contra a correnteza explica o timing de expressar uma opinião delicada?'
  }
];

export const RemoteConnection: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [pairIdx, setPairIdx] = useState(0);
  const [response, setResponse] = useState('');

  const currentPair = CONCEPT_PAIRS[pairIdx];
  const charLength = response.trim().length;

  const handleSubmit = () => {
    if (charLength < 40) return;

    saveCreation(
      'pensamento',
      `Associação Remota: ${currentPair.conceptA} + ${currentPair.conceptB}`,
      `Conceito 1: ${currentPair.conceptA}\nConceito 2: ${currentPair.conceptB}\n\nConexão Original:\n${response}`,
      undefined,
      ['Associação Remota', 'Síntese Conceitual']
    );

    const score = 88;
    const summary = `Associação remota formulada: conectou ${currentPair.conceptA} com ${currentPair.conceptB}.`;
    onComplete(score, summary);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Associação Remota de Ideias</span>
          <span aria-hidden="true">·</span>
          <span>Pensamento Sintético</span>
          <span aria-hidden="true">·</span>
          <span>Par {pairIdx + 1} de {CONCEPT_PAIRS.length}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Ponte de Conceitos (Associação Remota)
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          A inovação não é criar matéria do nada, mas sim conectar dois saberes distantes que nunca haviam sido postos lado a lado.
        </p>
      </div>

      {/* Concepts Bridge Visual */}
      <div className="p-5 rounded-xl bg-stone-100/90 border border-stone-200 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="p-3 bg-white rounded-lg border border-stone-200 flex-1 w-full">
            <span className="text-[10px] uppercase font-bold text-amber-900 block">Conceito A</span>
            <span className="text-sm font-serif font-semibold text-stone-900">{currentPair.conceptA}</span>
          </div>

          <div className="text-xs text-stone-400 font-mono flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center font-bold">
              +
            </span>
          </div>

          <div className="p-3 bg-white rounded-lg border border-stone-200 flex-1 w-full">
            <span className="text-[10px] uppercase font-bold text-emerald-900 block">Conceito B</span>
            <span className="text-sm font-serif font-semibold text-stone-900">{currentPair.conceptB}</span>
          </div>
        </div>

        <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
          <strong className="text-stone-900">Pergunta disparadora:</strong> {currentPair.promptQuestion}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => {
              setPairIdx((prev) => (prev + 1) % CONCEPT_PAIRS.length);
              setResponse('');
            }}
            className="text-xs text-stone-600 hover:text-stone-900 underline decoration-dotted"
          >
            Sortear Outro Par de Conceitos
          </button>
        </div>
      </div>

      {/* Answer Box */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
        <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
          Sua Tese: Qual ponte ou metáfora inovadora une esses dois universos?
        </label>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={5}
          placeholder="Desenvolva seu raciocínio. Como o funcionamento de um elucida ou transforma a maneira de encarar o outro?"
          className="w-full text-sm text-stone-800 leading-relaxed p-2.5 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-900/10"
        />
        <div className="text-right text-[11px] text-stone-400">
          {charLength} caracteres
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

        <button
          type="button"
          onClick={handleSubmit}
          disabled={charLength < 40}
          className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
        >
          Salvar Síntese Criativa
        </button>
      </div>
    </div>
  );
};
