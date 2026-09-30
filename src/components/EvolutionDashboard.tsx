import React, { useState } from 'react';
import { UserProgress, PillarCategory, UserCreation } from '../types';

interface Props {
  progress: UserProgress;
  onSelectExercise: (id: string) => void;
}

export const EvolutionDashboard: React.FC<Props> = ({ progress, onSelectExercise }) => {
  const [activeCreationFilter, setActiveCreationFilter] = useState<'all' | 'texto' | 'poema' | 'desenho'>('all');
  const [selectedCreation, setSelectedCreation] = useState<UserCreation | null>(null);

  const scores = progress.scores;
  const overallAutonomyIndex = Math.round(
    (scores.raciocinio + scores.memoria + scores.escrita + scores.criatividade) / 4
  );

  const filteredCreations = progress.creations.filter((c) => {
    if (activeCreationFilter === 'all') return true;
    return c.type === activeCreationFilter;
  });

  const getPillarColor = (cat: PillarCategory) => {
    switch (cat) {
      case 'raciocinio': return 'bg-amber-700';
      case 'memoria': return 'bg-blue-800';
      case 'escrita': return 'bg-emerald-800';
      case 'criatividade': return 'bg-orange-800';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Acompanhamento Longitudinal</span>
          <span aria-hidden="true">·</span>
          <span>4 Pilares da Autonomia Intelectual</span>
        </div>
        <h2 className="text-3xl font-serif text-stone-900 font-bold">
          Sua Evolução Cognitiva & Criativa
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Cada sessão concluída fortalece as trilhas neurais da iniciativa individual. Acompanhe sua consistência e revisite tudo o que você criou com as próprias mãos.
        </p>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Index */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Índice de Autonomia
            </span>
            <div className="text-4xl font-serif font-bold text-stone-900 tabular-nums">
              {overallAutonomyIndex}<span className="text-base text-stone-400 font-sans">/100</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Média ponderada dos seus treinos de raciocínio, memória, escrita e inventividade.
          </p>
        </div>

        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Sequência de Prática
            </span>
            <div className="text-4xl font-serif font-bold text-stone-900 tabular-nums flex items-baseline gap-2">
              <span>{progress.streak}</span>
              <span className="text-base font-sans text-stone-500">dias</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Constância diária preserva a elasticidade mental contra a inércia do piloto automático.
          </p>
        </div>

        {/* Sessions Completed */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Treinos Concluídos
            </span>
            <div className="text-4xl font-serif font-bold text-stone-900 tabular-nums">
              {progress.activities.length}
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Desafios intelectuais enfrentados sem atalhos automáticos.
          </p>
        </div>

        {/* Creations Count */}
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Obras Autorais
            </span>
            <div className="text-4xl font-serif font-bold text-stone-900 tabular-nums">
              {progress.creations.length}
            </div>
          </div>
          <p className="text-xs text-stone-500 mt-3 pt-3 border-t border-stone-100">
            Textos, poemas, desenhos e ideias geradas genuinamente por você.
          </p>
        </div>
      </div>

      {/* 4 Pillars Breakdown */}
      <div className="p-6 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <h3 className="text-lg font-serif font-semibold text-stone-900">
            Desempenho por Pilar Cognitivo
          </h3>
          <span className="text-xs text-stone-500">
            Escala de prontidão autônoma (0 a 100)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Raciocínio & Lógica */}
          <div className="space-y-2 p-4 bg-stone-50/70 rounded-xl border border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-900">Lógica & Raciocínio Crítico</span>
              <span className="font-mono tabular-nums font-bold text-stone-900">{scores.raciocinio}/100</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-800 h-2 rounded-full transition-all duration-500"
                style={{ width: `${scores.raciocinio}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Capacidade de dedução, identificação de falácias e auditoria de respostas sintéticas.
            </p>
          </div>

          {/* Memória & Concentração */}
          <div className="space-y-2 p-4 bg-stone-50/70 rounded-xl border border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-900">Memória & Foco Sustentado</span>
              <span className="font-mono tabular-nums font-bold text-stone-900">{scores.memoria}/100</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-800 h-2 rounded-full transition-all duration-500"
                style={{ width: `${scores.memoria}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Memória de trabalho espacial, retenção de sequências e inibição do impulso automático.
            </p>
          </div>

          {/* Escrita & Voz Própria */}
          <div className="space-y-2 p-4 bg-stone-50/70 rounded-xl border border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-900">Escrita & Voz Autêntica</span>
              <span className="font-mono tabular-nums font-bold text-stone-900">{scores.escrita}/100</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-800 h-2 rounded-full transition-all duration-500"
                style={{ width: `${scores.escrita}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Rascunho puro desconectado, desintoxicação de clichês e poesia com vivência humana.
            </p>
          </div>

          {/* Criatividade & Imaginação */}
          <div className="space-y-2 p-4 bg-stone-50/70 rounded-xl border border-stone-100">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-900">Criatividade & Pensamento Divergente</span>
              <span className="font-mono tabular-nums font-bold text-stone-900">{scores.criatividade}/100</span>
            </div>
            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-800 h-2 rounded-full transition-all duration-500"
                style={{ width: `${scores.criatividade}%` }}
              />
            </div>
            <p className="text-[11px] text-stone-500 pt-1">
              Desenho livre, usos inusitados de objetos e pontes conceituais não-lineares.
            </p>
          </div>
        </div>
      </div>

      {/* Creations Portfolio Gallery */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
          <div>
            <h3 className="text-xl font-serif font-bold text-stone-900">
              Galeria de Criações Humanas
            </h3>
            <p className="text-xs text-stone-500">
              O acervo das ideias, poesias e traços concebidos pela sua mente.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            {(['all', 'texto', 'poema', 'desenho'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveCreationFilter(type)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeCreationFilter === type
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {type === 'all' && 'Todos'}
                {type === 'texto' && 'Textos'}
                {type === 'poema' && 'Poemas'}
                {type === 'desenho' && 'Desenhos'}
              </button>
            ))}
          </div>
        </div>

        {filteredCreations.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-stone-200 text-stone-500 space-y-2">
            <p className="text-sm font-serif">Nenhuma criação salva nesta categoria ainda.</p>
            <p className="text-xs">
              Acesse o <strong>Estúdio Criativo</strong> ou complete um exercício de escrita ou desenho para salvar suas produções.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCreations.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedCreation(item)}
                className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-stone-400 cursor-pointer transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                    <span className="capitalize font-mono">{item.type}</span>
                    <span>{new Date(item.timestamp).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <h4 className="text-base font-serif font-bold text-stone-900 line-clamp-1">
                    {item.title}
                  </h4>
                  {item.imageDataUrl ? (
                    <div className="mt-2 h-36 bg-stone-50 rounded-lg overflow-hidden border border-stone-100">
                      <img
                        src={item.imageDataUrl}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-stone-600 line-clamp-4 mt-2 font-serif italic leading-relaxed">
                      “{item.content}”
                    </p>
                  )}
                </div>

                <div className="text-[11px] text-amber-900 font-medium hover:underline pt-2 border-t border-stone-100">
                  Ver criação na íntegra →
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
        <h3 className="text-lg font-serif font-semibold text-stone-900 border-b border-stone-100 pb-3">
          Histórico Recente de Treinos
        </h3>

        {progress.activities.length === 0 ? (
          <p className="text-xs text-stone-500 py-4 text-center">
            Nenhuma atividade registrada ainda. Comece hoje mesmo!
          </p>
        ) : (
          <div className="divide-y divide-stone-100">
            {progress.activities.slice(0, 8).map((act) => (
              <div key={act.id} className="py-3 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900">{act.exerciseTitle}</span>
                    <span className="text-[10px] text-stone-400">
                      ({new Date(act.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })})
                    </span>
                  </div>
                  <p className="text-stone-600 text-[11px] leading-relaxed">
                    {act.summary}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-stone-900 text-sm tabular-nums">
                    {act.score}
                  </span>
                  <span className="text-[10px] text-stone-400 block">pontos</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for viewing single creation */}
      {selectedCreation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-stone-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-stone-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400 block">
                  {selectedCreation.type} · {new Date(selectedCreation.timestamp).toLocaleDateString('pt-BR')}
                </span>
                <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                  {selectedCreation.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCreation(null)}
                className="text-stone-400 hover:text-stone-900 p-1 text-sm"
              >
                ✕
              </button>
            </div>

            {selectedCreation.imageDataUrl ? (
              <div className="bg-stone-50 rounded-xl p-2 border border-stone-200">
                <img
                  src={selectedCreation.imageDataUrl}
                  alt={selectedCreation.title}
                  className="w-full max-h-[360px] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : null}

            {selectedCreation.content && (
              <div className="text-xs text-stone-800 font-serif leading-relaxed whitespace-pre-wrap p-4 bg-stone-50 rounded-xl border border-stone-100">
                {selectedCreation.content}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedCreation(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-stone-800"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notice / Disclaimer */}
      <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200 text-stone-500 text-[11px] leading-relaxed">
        <strong>Nota de Bem-Estar e Transparência:</strong> Este aplicativo é uma ferramenta de desenvolvimento pessoal, hábitos e prática cognitiva autônoma. As pontuações e métricas servem exclusivamente como estímulo motivacional de consistência individual e não constituem, sob nenhuma hipótese, avaliação médica, neuropsicológica ou diagnóstica.
      </div>
    </div>
  );
};
