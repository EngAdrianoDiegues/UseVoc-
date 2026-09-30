import React, { useState } from 'react';
import { saveCreation } from '../../utils/storage';

interface Props {
  onComplete: (score: number, summary: string, content?: string) => void;
  onCancel: () => void;
}

const SOUNDS = [
  'O estalar lento de brasas no silêncio da noite',
  'Passos apressados sobre cascalho úmido',
  'O som da chuva grossa batendo na janela de vidro',
  'O rangido de um piso de madeira em casa antiga',
  'O murmúrio indistinto de uma cafeteria movimentada',
];

const SCENTS_TEXTURES = [
  'O cheiro característico de terra molhada após seca prolongada',
  'A aspereza do papel de um livro amarelado de sebo',
  'O aroma de café fresco moído ao amanhecer',
  'O toque frio de uma maçaneta de ferro no inverno',
  'O calor de uma xícara cerâmica entre as duas mãos',
];

const MEMORIES = [
  'A sensação agridoce de se despedir em uma rodoviária ou aeroporto',
  'Uma risada espontânea e incontrolável com alguém querido',
  'A primeira vez em que você percebeu que seus pais também envelhecem',
  'A surpresa de redescobrir um objeto da infância numa gaveta esquecida',
  'A coragem súbita que surge logo após um momento de medo profundo',
];

export const PoetryLab: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [soundIdx, setSoundIdx] = useState(0);
  const [scentIdx, setScentIdx] = useState(0);
  const [memoryIdx, setMemoryIdx] = useState(0);

  const [title, setTitle] = useState('');
  const [poem, setPoem] = useState('');
  const [structureType, setStructureType] = useState<'livre' | 'haiku' | 'estrofes'>('livre');

  const handleShuffle = () => {
    setSoundIdx(Math.floor(Math.random() * SOUNDS.length));
    setScentIdx(Math.floor(Math.random() * SCENTS_TEXTURES.length));
    setMemoryIdx(Math.floor(Math.random() * MEMORIES.length));
  };

  const lineCount = poem.trim() ? poem.trim().split('\n').filter((l) => l.trim().length > 0).length : 0;
  const wordCount = poem.trim() ? poem.trim().split(/\s+/).length : 0;

  const handleSave = () => {
    if (wordCount < 10) return;
    const finalTitle = title.trim() || 'Poema Autoral Sem Título';
    saveCreation('poema', finalTitle, poem, undefined, ['Poesia', 'Metáfora Humana', structureType]);

    const score = Math.min(100, Math.round(70 + Math.min(25, wordCount / 2)));
    const summary = `Composição poética concluída (${lineCount} versos, ${wordCount} palavras) a partir de estímulos sensoriais vivos.`;
    onComplete(score, summary, poem);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Sensibilidade & Metáfora</span>
          <span aria-hidden="true">·</span>
          <span>Exercício de Imaginação Viva</span>
          <span aria-hidden="true">·</span>
          <span>{lineCount} versos</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Laboratório de Poesia & Metáforas
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Modelos estatísticos combinam palavras por proximidade de banco de dados. Poetas humanos combinam sensações viscerais que só seres encarnados viveram.
        </p>
      </div>

      {/* Sensory Triggers */}
      <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700 uppercase tracking-wide">
            Seus 3 Estímulos Sensoriais:
          </span>
          <button
            type="button"
            onClick={handleShuffle}
            className="text-xs text-stone-600 hover:text-stone-900 underline decoration-dotted transition-colors"
          >
            Sortear Novos Estímulos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-800">1. Som & Ritmo</span>
            <p className="text-stone-800 italic">“{SOUNDS[soundIdx]}”</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800">2. Textura / Olfato</span>
            <p className="text-stone-800 italic">“{SCENTS_TEXTURES[scentIdx]}”</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-stone-200 space-y-1">
            <span className="text-[10px] uppercase font-bold text-stone-700">3. Emoção / Memória</span>
            <p className="text-stone-800 italic">“{MEMORIES[memoryIdx]}”</p>
          </div>
        </div>
      </div>

      {/* Format Selector */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-stone-500">Estilo:</span>
        <button
          type="button"
          onClick={() => setStructureType('livre')}
          className={`px-3 py-1 rounded-md transition-colors ${
            structureType === 'livre' ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:text-stone-900'
          }`}
        >
          Verso Livre
        </button>
        <button
          type="button"
          onClick={() => setStructureType('haiku')}
          className={`px-3 py-1 rounded-md transition-colors ${
            structureType === 'haiku' ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:text-stone-900'
          }`}
        >
          Haiku (3 versos)
        </button>
        <button
          type="button"
          onClick={() => setStructureType('estrofes')}
          className={`px-3 py-1 rounded-md transition-colors ${
            structureType === 'estrofes' ? 'bg-stone-900 text-white font-medium' : 'bg-stone-100 text-stone-600 hover:text-stone-900'
          }`}
        >
          Estrofes Clássicas
        </button>
      </div>

      {/* Editor */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título do Poema"
          className="w-full text-lg font-serif font-bold text-stone-900 border-b border-stone-200 pb-2 focus:outline-none focus:border-stone-800"
        />

        <textarea
          value={poem}
          onChange={(e) => setPoem(e.target.value)}
          rows={8}
          placeholder="Deixe os versos fluírem. Tente tecer ao menos dois dos três estímulos acima..."
          className="w-full text-sm font-serif leading-loose text-stone-800 placeholder:text-stone-300 focus:outline-none resize-none"
        />
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
          {wordCount < 10 && (
            <span className="text-[11px] text-stone-400">
              Escreva ao menos 10 palavras ({wordCount}/10)
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={wordCount < 10}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
          >
            Publicar no Meu Portfólio
          </button>
        </div>
      </div>
    </div>
  );
};
