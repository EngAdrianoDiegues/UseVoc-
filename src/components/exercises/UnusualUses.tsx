import React, { useState } from 'react';
import { saveCreation } from '../../utils/storage';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

const OBJECTS = [
  {
    name: 'Um Tijolo de Barro Vermelho',
    standardUse: 'Construir paredes e muros de alvenaria.',
    examples: ['Peso para segurar papéis no vento', 'Triturar para pigmento de aquarela rústica', 'Aquecer ao sol para aquecer a cama']
  },
  {
    name: 'Um Clipe de Papel Metálico',
    standardUse: 'Agrupar folhas de papel sulfite.',
    examples: ['Chave para abrir bandeja de chip de celular', 'Arame de sustentação para mini-planta', 'Condutor temporário de teste elétrico']
  },
  {
    name: 'Uma Xícara Cerâmica com Asa Quebrada',
    standardUse: 'Beber café ou chá quente.',
    examples: ['Vaso para mini-cactos suculentos', 'Porta-clipes ou moedas de mesa', 'Molde circular para cortar massa de pastel']
  }
];

export const UnusualUses: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [objectIdx, setObjectIdx] = useState(0);
  const [uses, setUses] = useState<string[]>(['', '', '', '', '', '']);

  const currentObj = OBJECTS[objectIdx];

  const handleUseChange = (index: number, val: string) => {
    const next = [...uses];
    next[index] = val;
    setUses(next);
  };

  const filledCount = uses.filter((u) => u.trim().length >= 3).length;

  const handleSubmit = () => {
    if (filledCount < 4) return;

    const formattedList = uses
      .filter((u) => u.trim().length > 0)
      .map((u, i) => `${i + 1}. ${u.trim()}`)
      .join('\n');

    saveCreation(
      'pensamento',
      `Usos Inusitados: ${currentObj.name}`,
      `Objeto: ${currentObj.name}\n\nUsos Originais Concebidos:\n${formattedList}`,
      undefined,
      ['Pensamento Divergente', 'Criatividade']
    );

    const score = Math.min(100, 60 + filledCount * 7);
    const summary = `Pensamento divergente: concebeu ${filledCount} utilizações não-convencionais para ${currentObj.name}.`;
    onComplete(score, summary);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Pensamento Divergente (Guilford)</span>
          <span aria-hidden="true">·</span>
          <span>Flexibilidade Mental</span>
          <span aria-hidden="true">·</span>
          <span>{filledCount} de 6 usos listados</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Teste dos Usos Inusitados
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          A IA gera associações padronizadas. O cérebro criativo é capaz de subverter a função original de qualquer objeto do mundo real.
        </p>
      </div>

      {/* Target Object */}
      <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-wide block mb-1">
            Objeto do Desafio:
          </span>
          <h4 className="text-base font-serif font-bold text-stone-900">
            {currentObj.name}
          </h4>
          <p className="text-xs text-stone-600 mt-0.5">
            Uso convencional habitual: <em>{currentObj.standardUse}</em>
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setObjectIdx((prev) => (prev + 1) % OBJECTS.length);
            setUses(['', '', '', '', '', '']);
          }}
          className="text-xs text-amber-900 hover:text-amber-950 underline decoration-dotted whitespace-nowrap shrink-0 mt-1"
        >
          Trocar Objeto
        </button>
      </div>

      {/* Input Fields */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
        <span className="text-xs font-semibold text-stone-800 uppercase tracking-wide block">
          Imagine 6 utilidades completamente diferentes (sem julgar ou censurar):
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {uses.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-stone-400 w-5 text-right">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={val}
                onChange={(e) => handleUseChange(idx, e.target.value)}
                placeholder={`Uso inusitado #${idx + 1}...`}
                className="w-full text-xs p-2.5 border border-stone-200 rounded-lg text-stone-800 focus:outline-none focus:border-stone-800"
              />
            </div>
          ))}
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
          {filledCount < 4 && (
            <span className="text-[11px] text-stone-400">
              Preencha pelo menos 4 utilidades ({filledCount}/4)
            </span>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={filledCount < 4}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
          >
            Registrar Respostas Divergentes
          </button>
        </div>
      </div>
    </div>
  );
};
