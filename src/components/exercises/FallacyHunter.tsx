import React, { useState } from 'react';

interface Props {
  onComplete: (score: number, summary: string) => void;
  onCancel: () => void;
}

interface Round {
  quote: string;
  context: string;
  options: { label: string; explanation: string; isCorrect: boolean }[];
  breakdown: string;
}

const ROUNDS: Round[] = [
  {
    context: 'Debate sobre Produtividade & IA no Ambiente de Trabalho',
    quote: '“Ou você adota agentes autônomos de IA para gerar 100% dos seus relatórios a partir de agora, ou sua empresa entrará em falência inevitável nos próximos doze meses.”',
    options: [
      {
        label: 'Falsa Dicotomia (Falso Dilema)',
        explanation: 'Reduz uma situação complexa com múltiplas opções viáveis a apenas dois extremos opostos e caricatos.',
        isCorrect: true,
      },
      {
        label: 'Ataque Pessoal (Ad Hominem)',
        explanation: 'Ataca o caráter da pessoa que discursa em vez de examinar o argumento.',
        isCorrect: false,
      },
      {
        label: 'Apelo à Tradição',
        explanation: 'Defende que algo é bom simplesmente porque sempre foi feito assim.',
        isCorrect: false,
      },
    ],
    breakdown: 'A falsa dicotomia ignora uma infinidade de abordagens intermediárias (ex: usar IA como copiloto pontual mantendo o discernimento humano, modernizar processos gradualmente ou focar em qualidade artesanal).'
  },
  {
    context: 'Artigo sobre Aprendizagem Digital',
    quote: '“O Dr. Silva, renomado astrofísico ganhador de prêmios internacionais, declarou enfaticamente que crianças nunca mais precisarão aprender a escrever redações à mão nas escolas.”',
    options: [
      {
        label: 'Apelo à Autoridade Inapropriada (Ad Verecundiam)',
        explanation: 'Usa a autoridade de um especialista em uma área (Astrofísica) para validar uma afirmação em outra área completamente distinta (Pedagogia/Cognição Infantil).',
        isCorrect: true,
      },
      {
        label: 'Petição de Princípio (Raciocínio Circular)',
        explanation: 'Pressupõe como verdadeiro o que deveria ser provado.',
        isCorrect: false,
      },
      {
        label: 'Declive Escorregadio (Slippery Slope)',
        explanation: 'Afirma que um primeiro passo levará inevitavelmente a uma cadeia de desastres.',
        isCorrect: false,
      },
    ],
    breakdown: 'Um título em astrofísica não concede autoridade metodológica sobre neurobiologia do desenvolvimento infantil e aquisição de linguagem.'
  },
  {
    context: 'Discussão sobre Autonomia Intelectual',
    quote: '“Quem defende que devemos exercitar o raciocínio sem IA antes de consultar um algoritmo está simplesmente pregando a volta à idade da pedra e a proibição da tecnologia moderna.”',
    options: [
      {
        label: 'Espantalho (Straw Man)',
        explanation: 'Distorce e exagera a posição do interlocutor para torná-la ridícula e fácil de atacar.',
        isCorrect: true,
      },
      {
        label: 'Generalização Precipitada',
        explanation: 'Tira uma conclusão universal com base em uma amostra insignificante.',
        isCorrect: false,
      },
      {
        label: 'Causa Falsa (Post Hoc)',
        explanation: 'Assume que porque B ocorreu depois de A, A foi a causa de B.',
        isCorrect: false,
      },
    ],
    breakdown: 'O argumento original defende autonomia e moderação consciente; o opositor inventa um "espantalho" grotesco ("querem proibir tecnologia") para atacar algo que ninguém disse.'
  },
  {
    context: 'Relatório de Desempenho Algorítmico',
    quote: '“Meu colega passou a usar respostas de IA sem revisar e foi promovido na semana seguinte. Logo, delegar todo o pensamento ao computador é o melhor método garantido de crescimento profissional.”',
    options: [
      {
        label: 'Causa Falsa (Post Hoc Ergo Propter Hoc)',
        explanation: 'Confunde mera coincidência temporal ou correlação espúria com relação de causa e efeito.',
        isCorrect: true,
      },
      {
        label: 'Inversão do Ônus da Prova',
        explanation: 'Exige que o outro prove o contrário em vez de fundamentar a própria tese.',
        isCorrect: false,
      },
      {
        label: 'Equívoco Semântico',
        explanation: 'Usa uma mesma palavra com sentidos diferentes para induzir a erro.',
        isCorrect: false,
      },
    ],
    breakdown: 'A promoção pode ter decorrido de dezenas de outros fatores (projetos anteriores, comunicação, networking). Concluir que a falta de revisão foi o motor do sucesso é um erro crasso de causalidade.'
  }
];

export const FallacyHunter: React.FC<Props> = ({ onComplete, onCancel }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const round = ROUNDS[currentRound];

  const handleConfirm = () => {
    if (selectedOption === null) return;
    setConfirmed(true);
    if (round.options[selectedOption].isCorrect) {
      setScoreCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentRound < ROUNDS.length - 1) {
      setCurrentRound(currentRound + 1);
      setSelectedOption(null);
      setConfirmed(false);
    } else {
      const finalScore = Math.round((scoreCount / ROUNDS.length) * 100);
      const summary = `Auditou 4 argumentos críticos com ${scoreCount} acertos de ${ROUNDS.length}.`;
      onComplete(finalScore, summary);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Auditoria de Pensamento Crítico</span>
          <span aria-hidden="true">·</span>
          <span>Rodada {currentRound + 1} de {ROUNDS.length}</span>
          <span aria-hidden="true">·</span>
          <span>Acertos: {scoreCount}</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Caçador de Falácias & Alucinações
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Contexto: <strong className="text-stone-800">{round.context}</strong>
        </p>
      </div>

      {/* Quote Box */}
      <div className="p-5 rounded-xl bg-stone-100/80 border border-stone-200">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
          Analise o argumento:
        </span>
        <blockquote className="text-base text-stone-900 font-serif leading-relaxed italic">
          {round.quote}
        </blockquote>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <span className="text-xs font-medium text-stone-700 block">
          Qual falácia lógica invalida este raciocínio?
        </span>

        {round.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;
          let btnStyle = 'border-stone-200 bg-white hover:border-stone-400 text-stone-800';

          if (confirmed) {
            if (opt.isCorrect) {
              btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600';
            } else if (isSelected && !opt.isCorrect) {
              btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
            } else {
              btnStyle = 'border-stone-200 bg-stone-50 text-stone-400 opacity-60';
            }
          } else if (isSelected) {
            btnStyle = 'border-stone-900 bg-stone-900 text-white shadow-sm';
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={confirmed}
              onClick={() => setSelectedOption(idx)}
              className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${btnStyle}`}
            >
              <div className="font-semibold">{opt.label}</div>
              <div className={`text-xs mt-1 ${isSelected && !confirmed ? 'text-stone-300' : 'text-stone-600'}`}>
                {opt.explanation}
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation when confirmed */}
      {confirmed && (
        <div className="p-4 rounded-xl bg-stone-900 text-stone-100 text-xs space-y-1.5 animate-fade-in">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5">
            <span>Análise do Pensador:</span>
          </div>
          <p className="text-stone-300 leading-relaxed">
            {round.breakdown}
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
        >
          Sair do exercício
        </button>

        <div>
          {!confirmed ? (
            <button
              type="button"
              disabled={selectedOption === null}
              onClick={handleConfirm}
              className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-50 transition-colors"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 text-xs font-medium text-white bg-amber-800 rounded-lg hover:bg-amber-900 transition-colors"
            >
              {currentRound < ROUNDS.length - 1 ? 'Próxima Rodada →' : 'Concluir Auditoria'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
