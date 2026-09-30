import React, { useState } from 'react';
import { saveDailyReflection } from '../utils/storage';
import { DailyReflection } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const DailyCheckinModal: React.FC<Props> = ({ isOpen, onClose, onSaved }) => {
  const [autonomousCount, setAutonomousCount] = useState<number>(1);
  const [feeling, setFeeling] = useState<'excelente' | 'em_evolucao' | 'desafiador'>('excelente');
  const [note, setNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    const reflection: DailyReflection = {
      date: today,
      autonomousTries: autonomousCount,
      feeling,
      note: note.trim() || 'Check-in diário de consciência intelectual registrado.'
    };

    saveDailyReflection(reflection);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onSaved();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-stone-50 rounded-2xl max-w-lg w-full border border-stone-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span>Bússola de Autonomia Diária</span>
            <span>Sem julgamentos</span>
          </div>
          <h3 className="text-xl font-serif text-stone-900 font-semibold">
            Check-in de Consciência
          </h3>
          <p className="text-xs text-stone-600 mt-1">
            Uma pausa de 30 segundos para auditar se você tem sido o autor ou o mero espectador das suas próprias decisões cognitivas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Posture */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Como foi sua postura com a tecnologia hoje?
            </label>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => setFeeling('excelente')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  feeling === 'excelente'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="font-semibold">Protagonista Ativo</div>
                <div className={feeling === 'excelente' ? 'text-stone-300' : 'text-stone-500'}>
                  Tentei rascunhar ou resolver por conta própria antes de pedir ajuda a qualquer IA.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFeeling('em_evolucao')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  feeling === 'em_evolucao'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="font-semibold">Copiloto Consciente</div>
                <div className={feeling === 'em_evolucao' ? 'text-stone-300' : 'text-stone-500'}>
                  Usei a IA para pesquisa ou apoio, mas questionei e editei com minha própria voz.
                </div>
              </button>

              <button
                type="button"
                onClick={() => setFeeling('desafiador')}
                className={`p-3 rounded-xl border text-left text-xs transition-all ${
                  feeling === 'desafiador'
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'
                }`}
              >
                <div className="font-semibold">Piloto Automático Notado</div>
                <div className={feeling === 'desafiador' ? 'text-stone-300' : 'text-stone-500'}>
                  Percebi que terceirizei tarefas no reflexo sem tentar pensar primeiro.
                </div>
              </button>
            </div>
          </div>

          {/* Autonomous count */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
              <span className="uppercase tracking-wide">
                Quantas vezes você tentou resolver sozinho antes de recorrer à tela?
              </span>
              <span className="font-mono text-stone-900 font-bold">{autonomousCount}x</span>
            </div>
            <input
              type="range"
              min={0}
              max={8}
              value={autonomousCount}
              onChange={(e) => setAutonomousCount(Number(e.target.value))}
              className="w-full accent-stone-900"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-mono">
              <span>0 vezes</span>
              <span>2-3 vezes</span>
              <span>5+ vezes</span>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-stone-800 uppercase tracking-wide">
              Uma reflexão rápida do seu dia (opcional):
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ex: Hoje escrevi a pauta da reunião à mão e senti a diferença no foco..."
              className="w-full text-xs p-2.5 border border-stone-200 rounded-lg text-stone-800 bg-white focus:outline-none focus:border-stone-900"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 text-center font-medium animate-fade-in">
              ✓ Reflexão de autonomia salva com sucesso!
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              Fechar
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Salvar Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
