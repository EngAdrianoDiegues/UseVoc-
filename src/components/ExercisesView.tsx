import React, { useState } from 'react';
import { EXERCISE_ITEMS } from '../data/exercisesData';
import { ExerciseItem, PillarCategory } from '../types';

interface Props {
  onStartExercise: (exercise: ExerciseItem) => void;
}

export const ExercisesView: React.FC<Props> = ({ onStartExercise }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredExercises = EXERCISE_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedDifficulty !== 'all' && item.difficulty !== selectedDifficulty) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Treino Deliberado</span>
          <span aria-hidden="true">·</span>
          <span>Tentativa Individual Incentivada</span>
          <span aria-hidden="true">·</span>
          <span>12 Desafios Interativos</span>
        </div>
        <h2 className="text-3xl font-serif text-stone-900 font-bold">
          Academia da Mente & Autonomia
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Exercícios práticos desenhados para reacender os circuitos de dedução, memória de curto prazo, expressão autoral e inventividade visual. Escolha um desafio e teste seu potencial.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Segmented Control */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'all'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todos os Pilares ({EXERCISE_ITEMS.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('raciocinio')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'raciocinio'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Lógica & Raciocínio
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('memoria')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'memoria'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Memória & Foco
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('escrita')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'escrita'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Escrita & Voz
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('criatividade')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              selectedCategory === 'criatividade'
                ? 'bg-white text-stone-900 shadow-sm font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Criatividade & Desenho
          </button>
        </div>

        {/* Difficulty filter */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Dificuldade:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="border border-stone-200 bg-white rounded-lg p-1.5 text-stone-800 text-xs focus:outline-none"
          >
            <option value="all">Todas as Dificuldades</option>
            <option value="Iniciante">Iniciante</option>
            <option value="Intermediário">Intermediário</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => {
          return (
            <div
              key={exercise.id}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:border-stone-400 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                {/* Metadata row */}
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-semibold uppercase tracking-wider text-amber-900">
                    {exercise.category === 'raciocinio' && 'Lógica'}
                    {exercise.category === 'memoria' && 'Memória'}
                    {exercise.category === 'escrita' && 'Escrita'}
                    {exercise.category === 'criatividade' && 'Criatividade'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span>{exercise.estimatedMinutes} min</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{exercise.difficulty}</span>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-bold text-stone-900 leading-snug">
                  {exercise.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed font-serif italic">
                  {exercise.subtitle}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {exercise.description}
                </p>

                {/* Why it matters callout */}
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-[11px] text-stone-700 leading-relaxed">
                  <strong className="text-stone-900">Por que treinar:</strong> {exercise.whyItMatters}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onStartExercise(exercise)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors text-center"
                >
                  Iniciar Desafio Solo
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
