import React, { useState } from 'react';
import { EDUCATIONAL_ARTICLES } from '../data/educationalArticles';
import { EducationalArticle } from '../types';

export const EducationalSection: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(EDUCATIONAL_ARTICLES[0].id);

  const current = EDUCATIONAL_ARTICLES.find((a) => a.id === selectedArticleId) || EDUCATIONAL_ARTICLES[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Intro Header */}
      <div className="space-y-2 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Fundamentos Científicos</span>
          <span aria-hidden="true">·</span>
          <span>Neuroplasticidade & Filosofia da Mente</span>
          <span aria-hidden="true">·</span>
          <span>Sem diagnósticos médicos</span>
        </div>
        <h2 className="text-3xl font-serif text-stone-900 font-bold">
          Trilhas de Consciência Intelectual
        </h2>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Compreenda os mecanismos biológicos da economia cognitiva e aprenda estratégias para colher os benefícios da IA sem atrofiar o seu próprio julgamento crítico.
        </p>
      </div>

      {/* Two-Column Reader Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article Selector List (Left 4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-2">
            Módulos Educativos:
          </span>

          {EDUCATIONAL_ARTICLES.map((art) => {
            const isSelected = art.id === selectedArticleId;
            return (
              <button
                key={art.id}
                type="button"
                onClick={() => setSelectedArticleId(art.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                    : 'border-stone-200 bg-stone-50/70 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-1">
                  <span>{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readingTime}</span>
                </div>
                <h4 className={`text-sm font-serif font-semibold leading-snug ${isSelected ? 'text-stone-950' : 'text-stone-800'}`}>
                  {art.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
                  {art.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Article Body (Right 8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm space-y-6">
          {/* Header */}
          <div className="space-y-2 border-b border-stone-100 pb-5">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="font-semibold text-amber-900 uppercase tracking-wide">{current.category}</span>
              <span aria-hidden="true">·</span>
              <span>{current.readingTime}</span>
            </div>
            <h3 className="text-2xl font-serif text-stone-900 font-bold leading-tight">
              {current.title}
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-serif italic">
              {current.subtitle}
            </p>
          </div>

          {/* Key Takeaway Callout */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/90 text-stone-800 text-xs leading-relaxed space-y-1">
            <span className="font-bold text-amber-950 uppercase tracking-wider text-[10px] block">
              💡 Síntese Essencial:
            </span>
            <p className="font-medium text-stone-900">
              {current.keyTakeaway}
            </p>
          </div>

          {/* Body Sections */}
          <div className="space-y-6 text-sm text-stone-800 leading-relaxed">
            {current.content.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-base font-serif font-semibold text-stone-900">
                  {sec.heading}
                </h4>
                <p className="text-stone-700 leading-relaxed">
                  {sec.body}
                </p>
                {sec.practicalTip && (
                  <div className="p-3 bg-stone-50 rounded-lg border-l-2 border-amber-800 text-xs text-stone-700 italic mt-2">
                    <strong className="text-stone-900 not-italic">Como aplicar: </strong>
                    {sec.practicalTip}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Daily Challenge Action Step */}
          <div className="p-5 bg-stone-900 text-white rounded-xl space-y-2 text-xs">
            <div className="text-amber-300 font-semibold uppercase tracking-wider text-[10px]">
              Desafio Prático Deste Módulo:
            </div>
            <p className="text-stone-200 text-sm font-serif">
              “{current.actionStep}”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
