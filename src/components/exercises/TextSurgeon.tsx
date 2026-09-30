import React, { useState } from 'react';
import { saveCreation } from '../../utils/storage';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

const AI_TEXT_ROUNDS = [
  {
    original: '“É imperativo salientar que, no hodierno cenário contemporâneo, a sinergia holística entre os diversos stakeholders desempenha um papel fulcral no atingimento de patamares exponenciais de excelência corporativa sustentável.”',
    jargonList: ['“É imperativo salientar”', '“hodierno cenário contemporâneo”', '“sinergia holística”', '“papel fulcral”', '“patamares exponenciais”'],
    coreMeaning: 'Tradução do significado real: Quando as pessoas da equipe conversam e trabalham juntas com clareza, os projetos funcionam melhor.',
    humanInspiration: 'Exemplo de voz humana: “Projetos só dão certo quando o time conversa de verdade e para de se esconder atrás de reuniões intermináveis.”'
  },
  {
    original: '“Ademais, convém ressaltar que a automação e a inteligência cognitiva proporcionam um ecossistema fértil para a otimização de fluxos operacionais, mitigando gargalos e alavancando a proposição de valor perante o cliente final.”',
    jargonList: ['“Ademais, convém ressaltar”', '“inteligência cognitiva”', '“ecossistema fértil”', '“mitigando gargalos”', '“alavancando a proposição de valor”'],
    coreMeaning: 'Tradução do significado real: Usar bons computadores elimina tarefas chatas e sobra tempo para atender bem as pessoas.',
    humanInspiration: 'Exemplo de voz humana: “Deixe as máquinas cuidarem das planilhas repetitivas para que a gente possa conversar com quem compra de nós.”'
  }
];

export const TextSurgeon: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [roundIdx, setRoundIdx] = useState(0);
  const [rewrittenText, setRewrittenText] = useState('');
  const [showInspiration, setShowInspiration] = useState(false);

  const current = AI_TEXT_ROUNDS[roundIdx];
  const charCount = rewrittenText.trim().length;

  const handleFinish = () => {
    if (charCount < 20) return;
    saveCreation(
      'texto',
      `Cirurgia de Texto: Humanização de Jargão`,
      `Original Sintético:\n${current.original}\n\nVersão Humana:\n${rewrittenText}`,
      undefined,
      ['Cirurgia de Texto', 'Clareza Humana']
    );

    const score = 90;
    const summary = 'Desconstruiu parágrafo sintético empilhado de jargões e redigiu síntese viva e transparente.';
    onComplete(score, summary);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Desintoxicação de Linguagem</span>
          <span aria-hidden="true">·</span>
          <span>Exercício Editorial</span>
          <span aria-hidden="true">·</span>
          <span>Caso {roundIdx + 1} de {AI_TEXT_ROUNDS.length}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          O Cirurgião de Texto (Humanize o Sintético)
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          A linguagem de IA padrão é cheia de clichês inchados que fingem erudição. Sua missão como humano é extirpar o excesso e dizer o que realmente importa com autenticidade.
        </p>
      </div>

      {/* The Artificial Jargon Card */}
      <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-rose-900 uppercase tracking-wide">
            Texto Sintético Pasteurizado:
          </span>
          <span className="text-rose-700/80 italic">Diagnóstico: Enchimento sem alma</span>
        </div>

        <blockquote className="text-sm font-serif italic text-stone-800 leading-relaxed bg-white/70 p-3 rounded-lg border border-rose-200/50">
          {current.original}
        </blockquote>

        <div className="text-xs text-stone-600 flex flex-wrap gap-1.5 items-center">
          <span className="font-medium text-stone-700">Vírus sintéticos identificados:</span>
          {current.jargonList.map((j, i) => (
            <span key={i} className="text-stone-700 bg-rose-100/70 px-2 py-0.5 rounded text-[11px]">
              {j}
            </span>
          ))}
        </div>
      </div>

      {/* Editor for rewrite */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
        <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
          Sua Reescrita com Voz Humana e Clareza Real:
        </label>
        <textarea
          value={rewrittenText}
          onChange={(e) => setRewrittenText(e.target.value)}
          rows={4}
          placeholder="Escreva como você explicaria essa ideia tomando um café com um amigo. Simples, direto e inteligente..."
          className="w-full text-sm text-stone-800 leading-relaxed p-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-800/10"
        />

        <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
          <button
            type="button"
            onClick={() => setShowInspiration(!showInspiration)}
            className="text-stone-600 hover:text-stone-900 underline decoration-dotted"
          >
            {showInspiration ? 'Ocultar exemplo de tradução' : 'Ver pista de tradução'}
          </button>
          <span>Caracteres: {charCount}</span>
        </div>

        {showInspiration && (
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700 space-y-1 animate-fade-in">
            <p className="font-medium text-stone-800">{current.coreMeaning}</p>
            <p className="text-stone-600 italic">{current.humanInspiration}</p>
          </div>
        )}
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
          {roundIdx < AI_TEXT_ROUNDS.length - 1 && (
            <button
              type="button"
              onClick={() => {
                setRoundIdx(roundIdx + 1);
                setRewrittenText('');
                setShowInspiration(false);
              }}
              className="text-xs text-stone-600 hover:text-stone-900 underline"
            >
              Testar Outro Parágrafo
            </button>
          )}

          <button
            type="button"
            onClick={handleFinish}
            disabled={charCount < 20}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
          >
            Salvar Reescrita no Portfólio
          </button>
        </div>
      </div>
    </div>
  );
};
