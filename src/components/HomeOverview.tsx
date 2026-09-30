import React from 'react';
import { UserProgress, ExerciseItem } from '../types';
import { EXERCISE_ITEMS } from '../data/exercisesData';

interface Props {
  progress: UserProgress;
  onSelectTab: (tab: 'home' | 'exercises' | 'studio' | 'articles' | 'evolution') => void;
  onStartExercise: (exercise: ExerciseItem) => void;
  onOpenCheckin: () => void;
}

export const HomeOverview: React.FC<Props> = ({
  progress,
  onSelectTab,
  onStartExercise,
  onOpenCheckin,
}) => {
  // Pick a featured exercise for today (e.g. Pure Draft or Doors of Truth or Fallacy Hunter)
  const todayExercise = EXERCISE_ITEMS[0]; // Doors of Truth or Pure Draft
  const writingExercise = EXERCISE_ITEMS.find((e) => e.id === 'rascunho-puro') || EXERCISE_ITEMS[6];

  const overallAutonomy = Math.round(
    (progress.scores.raciocinio + progress.scores.memoria + progress.scores.escrita + progress.scores.criatividade) / 4
  );

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-stone-900 text-stone-100 overflow-hidden shadow-xl border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Text Side (7 cols) */}
          <div className="p-8 sm:p-12 lg:col-span-7 space-y-6 z-10">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300/90 font-mono">
              <span>●</span>
              <span>Autonomia Intelectual & Criatividade Humana</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              “Use a IA, mas não deixe de usar você.”
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-xl">
              A inteligência artificial é uma ferramenta poderosa de amplificação, mas o pensamento crítico, a intuição singular, a memória operacional e a voz autêntica são músculos que se atrofiam sem treino deliberado. Aqui, convidamos sua mente a ser a primeira autora de cada ideia.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onStartExercise(todayExercise)}
                className="px-6 py-3 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md active:scale-95"
              >
                Desafio Rápido de Hoje (5 min)
              </button>

              <button
                type="button"
                onClick={() => onSelectTab('exercises')}
                className="px-5 py-3 text-xs font-medium text-stone-200 hover:text-white border border-stone-700 hover:border-stone-500 rounded-xl transition-all"
              >
                Ver Todos os Exercícios
              </button>
            </div>

            {/* Quick Micro-stats */}
            <div className="pt-4 border-t border-stone-800 flex items-center gap-6 text-xs text-stone-400">
              <div>
                <span className="text-white font-mono font-bold text-sm block tabular-nums">
                  {progress.streak} {progress.streak === 1 ? 'dia' : 'dias'}
                </span>
                <span>Sequência de autonomia</span>
              </div>
              <div className="h-6 w-px bg-stone-800" />
              <div>
                <span className="text-white font-mono font-bold text-sm block tabular-nums">
                  {overallAutonomy}/100
                </span>
                <span>Índice cognitivo global</span>
              </div>
              <div className="h-6 w-px bg-stone-800" />
              <div>
                <span className="text-white font-mono font-bold text-sm block tabular-nums">
                  {progress.creations.length}
                </span>
                <span>Criações autorais salvas</span>
              </div>
            </div>
          </div>

          {/* Image Side (5 cols) */}
          <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full relative overflow-hidden bg-stone-950">
            <img
              src="/src/assets/images/hero_human_intellect_1790772539242.jpg"
              alt="Mente humana em reflexão e criação analógica"
              className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-stone-900 lg:via-transparent lg:to-transparent" />
          </div>
        </div>
      </section>

      {/* Daily Reflection & Quick Action Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Check-in prompt */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900 block">
              Hábito Consciente
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900">
              Bússola de Autonomia de Hoje
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Você já refletiu se hoje começou criando rascunhos com suas próprias sinapses ou se foi direto ao chat?
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCheckin}
            className="w-full py-2.5 px-4 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center"
          >
            Fazer Check-in Diário
          </button>
        </div>

        {/* Card 2: Featured Logic Challenge */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block">
              Dedução Lógica
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900">
              O Enigma dos Três Guardiões
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Descubra quem mente e quem diz a verdade sem consultar o Google ou a IA. Apenas raciocínio puro.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onStartExercise(todayExercise)}
            className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors text-center"
          >
            Resolver Enigma (5 min)
          </button>
        </div>

        {/* Card 3: Human Writing Prompt */}
        <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-900 block">
              Escrita Autêntica
            </span>
            <h3 className="text-base font-serif font-bold text-stone-900">
              Oficina do Rascunho Puro
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              5 minutos de fluxo livre sobre temas profundos, avaliando riqueza de vocabulário e voz própria.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onStartExercise(writingExercise)}
            className="w-full py-2.5 px-4 text-xs font-semibold text-stone-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors text-center"
          >
            Abrir Folha em Branco
          </button>
        </div>
      </section>

      {/* The 4 Pillars of Intellectual Sovereignty */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1">
              Pilares de Desenvolvimento
            </span>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Academia da Mente: As 4 Dimensões
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('exercises')}
            className="text-xs font-semibold text-stone-900 hover:text-amber-800 underline decoration-dotted"
          >
            Ver todos os 12 exercícios →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div
            onClick={() => onSelectTab('exercises')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center text-lg mb-3">
                ⚖️
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Lógica & Raciocínio
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Audite premissas, resolva enigmas dedutivos e identifique falácias argumentativas que passam despercebidas na pressa.
              </p>
            </div>
            <div className="text-[11px] text-amber-900 font-medium pt-2 border-t border-stone-100">
              3 desafios disponíveis →
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => onSelectTab('exercises')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center text-lg mb-3">
                🧩
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Memória & Atenção
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Exercite sua memória de trabalho, retenção espacial de símbolos e controle de impulsos contra a distração contínua.
              </p>
            </div>
            <div className="text-[11px] text-blue-900 font-medium pt-2 border-t border-stone-100">
              3 desafios disponíveis →
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => onSelectTab('exercises')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center text-lg mb-3">
                ✍️
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Escrita & Voz Própria
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Recupere o prazer de pensar escrevendo. Crie poesias sensoriais e aprenda a desintoxicar textos do jargão sintético.
              </p>
            </div>
            <div className="text-[11px] text-emerald-900 font-medium pt-2 border-t border-stone-100">
              3 desafios disponíveis →
            </div>
          </div>

          {/* Pillar 4 */}
          <div
            onClick={() => onSelectTab('studio')}
            className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 transition-all cursor-pointer space-y-3 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-900 flex items-center justify-center text-lg mb-3">
                🎨
              </div>
              <h3 className="text-base font-serif font-bold text-stone-900">
                Criatividade & Desenho
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed mt-1">
                Pensamento visual na prancheta de desenho livre, testes de pensamento divergente e conexões remotas entre conceitos.
              </p>
            </div>
            <div className="text-[11px] text-orange-900 font-medium pt-2 border-t border-stone-100">
              Prancheta interativa →
            </div>
          </div>
        </div>
      </section>

      {/* Featured Educational Manifesto Callout */}
      <section className="p-8 sm:p-10 rounded-3xl bg-stone-100 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Filosofia Central do Projeto
          </span>
          <h3 className="text-2xl font-serif font-bold text-stone-900">
            Por que não bloqueamos e nem proibimos a IA?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Proibir ferramentas tecnológicas gera frustração e não desenvolve discernimento. O objetivo real do <strong>UseVocê</strong> é pedagógico e libertador: treinar sua capacidade de <em>pensar antes, criar primeiro e avaliar com rigor</em>. Assim, quando você decidir usar a IA, ela será o seu instrumento, e não o seu substituto.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onSelectTab('articles')}
          className="px-6 py-3 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl whitespace-nowrap transition-colors shadow-sm"
        >
          Ler os Artigos Educativos
        </button>
      </section>
    </div>
  );
};
