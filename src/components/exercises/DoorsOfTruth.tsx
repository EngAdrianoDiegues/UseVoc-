import React, { useState } from 'react';
import { PillarCategory } from '../../types';

interface Props {
  onComplete: (score: number, summary: string, details?: string) => void;
  onCancel: () => void;
}

export const DoorsOfTruth: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [selectedScenario, setSelectedScenario] = useState<{
    solaris: string;
    luna: string;
    terra: string;
  }>({
    solaris: '',
    luna: '',
    terra: '',
  });

  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // The Puzzle:
  // Três guardiões vigiam as portas Ouro, Prata e Bronze.
  // Sabe-se que:
  // - Um guardião SEMPRE diz a verdade (Verídico).
  // - Um guardião SEMPRE mente (Mentiroso).
  // - Um guardião ALTERNA: se a primeira afirmação for verdadeira, a próxima é falsa (ou neste enigma clássico: é o Enganador / Neutro).
  //
  // Declarações:
  // 1. Guardião da Porta de Ouro (Solaris): "O Guardião da Porta de Prata é o Mentiroso."
  // 2. Guardião da Porta de Prata (Luna): "Apenas um de nós três é o Verídico, e sou eu!"
  // 3. Guardião da Porta de Bronze (Terra): "O Guardião da Porta de Ouro nunca mente."

  // Análise Lógica:
  // - Suponha que Solaris diz a verdade (Verídico).
  //   Então Luna é o Mentiroso.
  //   Terra diz: "Solaris nunca mente" -> Terra está dizendo a verdade!
  //   Mas só existe UM Verídico! Contradição!
  // - Logo, Solaris NÃO pode ser o Verídico!
  // - Se Solaris não é o Verídico, Terra (que afirma que Solaris nunca mente) está MENTINDO!
  //   Portanto Terra é o Mentiroso!
  // - Se Terra é o Mentiroso, quem é o Verídico?
  //   Solaris mentiu ao dizer que Luna é o Mentiroso (pois o Mentiroso é Terra). Logo Solaris é o Alternador/Enganador (ou semi-mentiroso)!
  //   E Luna é o Verídico! Ao dizer "Apenas um de nós três é o Verídico, e sou eu", Luna diz a pura verdade!
  // Portanto:
  // Luna = Verídico
  // Terra = Mentiroso
  // Solaris = Alternador / Enganador

  const handleSubmit = () => {
    setSubmitted(true);
    let score = 0;
    const isLunaCorrect = selectedScenario.luna === 'veridico';
    const isTerraCorrect = selectedScenario.terra === 'mentiroso';
    const isSolarisCorrect = selectedScenario.solaris === 'alternador';

    let correctCount = 0;
    if (isLunaCorrect) correctCount++;
    if (isTerraCorrect) correctCount++;
    if (isSolarisCorrect) correctCount++;

    if (correctCount === 3) score = 100;
    else if (correctCount === 2) score = 75;
    else if (correctCount === 1) score = 50;
    else score = 30;

    const summary = correctCount === 3
      ? 'Dedução impecável! Identificou a identidade exata de todos os três guardiões.'
      : `Raciocínio dedutivo aplicado com ${correctCount} acertos de 3 guardiões.`;

    setTimeout(() => {
      onComplete(score, summary, notes);
    }, 4500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
          <span>Lógica Dedutiva Pura</span>
          <span aria-hidden="true">·</span>
          <span>Sem consultas externas</span>
          <span aria-hidden="true">·</span>
          <span>Tempo sugerido: 5 min</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          O Enigma dos Três Guardiões
        </h3>
        <p className="text-sm text-stone-600 mt-1 leading-relaxed">
          Você se encontra diante de três portas sagradas: Ouro, Prata e Bronze. Cada uma é protegida por um guardião.
          Você sabe com certeza matemática que:
        </p>
        <ul className="text-xs text-stone-700 mt-2 space-y-1 list-disc list-inside">
          <li><strong>Exatamente um</strong> diz sempre a verdade (Verídico).</li>
          <li><strong>Exatamente um</strong> mente o tempo todo (Mentiroso).</li>
          <li><strong>Exatamente um</strong> é o Alternador (faz afirmações ardilosas que confundem).</li>
        </ul>
      </div>

      {/* Clues Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80">
          <div className="text-xs font-semibold text-amber-800 uppercase tracking-wide">
            Porta de Ouro (Solaris)
          </div>
          <blockquote className="mt-2 text-sm text-stone-800 italic font-serif">
            “O Guardião da Porta de Prata é o Mentiroso.”
          </blockquote>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Porta de Prata (Luna)
          </div>
          <blockquote className="mt-2 text-sm text-stone-800 italic font-serif">
            “Apenas um de nós três é o Verídico, e sou eu!”
          </blockquote>
        </div>

        <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200/80">
          <div className="text-xs font-semibold text-orange-800 uppercase tracking-wide">
            Porta de Bronze (Terra)
          </div>
          <blockquote className="mt-2 text-sm text-stone-800 italic font-serif">
            “O Guardião da Porta de Ouro nunca mente.”
          </blockquote>
        </div>
      </div>

      {/* Interactive Selection */}
      <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-4">
        <h4 className="text-sm font-semibold text-stone-900">
          Sua Dedução: Quem é quem?
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Solaris (Porta de Ouro):
            </label>
            <select
              value={selectedScenario.solaris}
              onChange={(e) => setSelectedScenario({ ...selectedScenario, solaris: e.target.value })}
              disabled={submitted}
              className="w-full text-sm border border-stone-300 rounded-lg p-2.5 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20"
            >
              <option value="">Selecione o papel...</option>
              <option value="veridico">O Verídico (Sempre a verdade)</option>
              <option value="mentiroso">O Mentiroso (Sempre mente)</option>
              <option value="alternador">O Alternador / Enganador</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Luna (Porta de Prata):
            </label>
            <select
              value={selectedScenario.luna}
              onChange={(e) => setSelectedScenario({ ...selectedScenario, luna: e.target.value })}
              disabled={submitted}
              className="w-full text-sm border border-stone-300 rounded-lg p-2.5 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20"
            >
              <option value="">Selecione o papel...</option>
              <option value="veridico">O Verídico (Sempre a verdade)</option>
              <option value="mentiroso">O Mentiroso (Sempre mente)</option>
              <option value="alternador">O Alternador / Enganador</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">
              Terra (Porta de Bronze):
            </label>
            <select
              value={selectedScenario.terra}
              onChange={(e) => setSelectedScenario({ ...selectedScenario, terra: e.target.value })}
              disabled={submitted}
              className="w-full text-sm border border-stone-300 rounded-lg p-2.5 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20"
            >
              <option value="">Selecione o papel...</option>
              <option value="veridico">O Verídico (Sempre a verdade)</option>
              <option value="mentiroso">O Mentiroso (Sempre mente)</option>
              <option value="alternador">O Alternador / Enganador</option>
            </select>
          </div>
        </div>

        {/* Scratchpad for notes */}
        <div className="pt-2">
          <label className="block text-xs font-medium text-stone-600 mb-1">
            Espaço de Rascunho Mental (anote suas premissas e testes de hipótese):
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            disabled={submitted}
            rows={2}
            placeholder="Ex: Se Solaris falasse a verdade, Terra também estaria falando a verdade, o que violaria a regra de haver apenas 1 verídico..."
            className="w-full text-xs border border-stone-200 rounded-lg p-2.5 text-stone-700 bg-stone-50/50 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Hint toggle */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <button
          type="button"
          onClick={() => setShowHint(!showHint)}
          className="hover:text-amber-800 transition-colors underline decoration-dotted"
        >
          {showHint ? 'Ocultar dica socrática' : 'Precisa de uma dica de raciocínio?'}
        </button>

        {showHint && (
          <span className="text-stone-600 italic bg-amber-50 px-3 py-1 rounded border border-amber-200/60 max-w-md">
            Dica: Comece testando o que aconteceria se Solaris fosse o Verídico. Observe o que a afirmação de Terra causaria!
          </span>
        )}
      </div>

      {/* Result feedback when submitted */}
      {submitted && (
        <div className="p-4 rounded-xl bg-stone-900 text-stone-100 text-sm space-y-2 animate-fade-in">
          <div className="font-semibold text-amber-300">
            Resolução Analítica do Enigma:
          </div>
          <p className="text-stone-300 text-xs leading-relaxed">
            1. Se <strong>Solaris</strong> fosse o Verídico, Terra também seria verídico (pois Terra diz que Solaris nunca mente). Como só existe 1 verídico, Solaris <em>não pode</em> ser o Verídico.<br />
            2. Como Solaris não é o Verídico, a fala de <strong>Terra</strong> (“Solaris nunca mente”) é uma falsidade flagrante! Logo, <strong>Terra é o Mentiroso</strong>.<br />
            3. Sabendo que Terra é o Mentiroso, resta a <strong>Luna</strong> ser o Verídico (e sua afirmação é correta). Por exclusão, <strong>Solaris</strong> é o Alternador.
          </p>
          <p className="text-amber-200 text-xs font-medium pt-1">
            Gravando seu progresso no painel de Raciocínio...
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={submitted}
          className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || !selectedScenario.solaris || !selectedScenario.luna || !selectedScenario.terra}
          className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors"
        >
          Confirmar Dedução
        </button>
      </div>
    </div>
  );
};
