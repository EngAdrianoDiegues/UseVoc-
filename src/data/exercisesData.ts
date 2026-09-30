import { ExerciseItem } from '../types';

export const EXERCISE_ITEMS: ExerciseItem[] = [
  // RACIOCÍNIO & LÓGICA
  {
    id: 'desafio-portas-verdade',
    title: 'O Enigma das Três Portas da Verdade',
    category: 'raciocinio',
    subtitle: 'Dedução lógica pura sem recorrer a buscas instantâneas.',
    estimatedMinutes: 5,
    difficulty: 'Intermediário',
    description: 'Três guardiões guardam três portas: um sempre fala a verdade, um sempre mente, e um alterna entre a verdade e a mentira. Descubra quem é quem através de premissas estritas.',
    instructions: [
      'Leia com calma as três declarações dos guardiões.',
      'Analise as hipóteses mentalmente ou anote em uma folha.',
      'Assinale qual guardião corresponde a cada comportamento e justifique o raciocínio.'
    ],
    whyItMatters: 'Exercita o raciocínio hipotético-dedutivo e a capacidade de testar múltiplos cenários mentais simultaneamente.'
  },
  {
    id: 'cacador-de-falacias',
    title: 'Caçador de Falácias & Alucinações',
    category: 'raciocinio',
    subtitle: 'Identifique falhas sutis em argumentos persuasivos.',
    estimatedMinutes: 6,
    difficulty: 'Avançado',
    description: 'Textos sintéticos costumam parecer convincentes mesmo quando sustentados por premissas falsas ou saltos lógicos. Teste sua capacidade de auditar e nomear 4 falácias clássicas.',
    instructions: [
      'Leia o parágrafo de cada rodada com olhar investigativo.',
      'Identifique qual erro de raciocínio invalida a conclusão.',
      'Selecione a falácia correta e compreenda a anatomia do erro.'
    ],
    whyItMatters: 'Fortalece o filtro crítico indispensável para não aceitar passivamente qualquer resposta bem redigida por algoritmos.'
  },
  {
    id: 'sequencias-do-pensador',
    title: 'Padrões Indutivos & Sequências',
    category: 'raciocinio',
    subtitle: 'Decifre a lei matemática oculta por trás da série.',
    estimatedMinutes: 4,
    difficulty: 'Iniciante',
    description: 'Encontre a relação lógica entre números e símbolos que compõem séries não-óbvias.',
    instructions: [
      'Observe os elementos fornecidos na sequência.',
      'Determine qual operação ou padrão de transformação foi aplicado.',
      'Calcule o próximo termo e confirme sua hipótese.'
    ],
    whyItMatters: 'Estimula o raciocínio indutivo e a busca de princípios fundamentais em vez de fórmulas decoradas.'
  },

  // MEMÓRIA & CONCENTRAÇÃO
  {
    id: 'palacio-mental',
    title: 'Matriz de Retenção Visual',
    category: 'memoria',
    subtitle: 'Exercite sua memória de trabalho espacial.',
    estimatedMinutes: 4,
    difficulty: 'Intermediário',
    description: 'Observe uma matriz de símbolos por 6 segundos. Quando a tela ocultar os itens, posicione cada um em seu respectivo quadrante.',
    instructions: [
      'Concentre-se sem piscar na disposição dos símbolos.',
      'Crie uma narrativa ou mapa mental para agrupá-los.',
      'Clique nos quadrantes para reconstruir a matriz original de memória.'
    ],
    whyItMatters: 'A memória de trabalho é o espaço onde o pensamento ativo ocorre. Praticá-la melhora a clareza e a retenção de leitura.'
  },
  {
    id: 'cadeia-reversa',
    title: 'Cadeia de Dígitos Reversa',
    category: 'memoria',
    subtitle: 'O teste padrão de ouro da neuropsicologia para memória operacional.',
    estimatedMinutes: 5,
    difficulty: 'Avançado',
    description: 'Uma série de números aparecerá um a um. Seu desafio é retê-los e digitá-los na ordem exatamente inversa à que viu.',
    instructions: [
      'Acompanhe cada dígito conforme é exibido.',
      'Não anote em papel nem grave áudio: confie estritamente na sua mente.',
      'Digite os números de trás para frente.'
    ],
    whyItMatters: 'Exige manipular ativamente a informação retida, prevenindo a amnésia digital causada por salvar tudo em notas automáticas.'
  },
  {
    id: 'foco-stroop',
    title: 'Inibição de Impulso & Foco Seletivo',
    category: 'memoria',
    subtitle: 'Treine a atenção consciente e supere o piloto automático cerebral.',
    estimatedMinutes: 3,
    difficulty: 'Iniciante',
    description: 'Palavras de cores escritas em tintas diferentes. Você deve responder com base na cor da tinta, ignorando o impulso automático de ler a palavra.',
    instructions: [
      'Mantenha a atenção fixa na cor visual do texto.',
      'Não clique no que a palavra diz, mas na cor com que foi pintada.',
      'Mantenha ritmo constante com o menor número possível de erros.'
    ],
    whyItMatters: 'Fortalece o córtex pré-frontal e a habilidade de frear respostas automáticas impensadas.'
  },

  // ESCRITA & EXPRESSÃO HUMANA
  {
    id: 'rascunho-puro',
    title: 'Oficina do Rascunho Puro (Zero IA)',
    category: 'escrita',
    subtitle: '5 minutos de escrita livre e autoral sobre um tema provocador.',
    estimatedMinutes: 5,
    difficulty: 'Iniciante',
    description: 'Escreva um parágrafo denso e pessoal defendendo uma posição. Sem corretor inteligente, sem prompts, apenas o fluxo da sua mente consciente.',
    instructions: [
      'Receba a pergunta instigante do dia.',
      'Escreva continuamente por pelo menos 100 palavras.',
      'Avalie se a voz no texto soa como você em uma conversa sincera.'
    ],
    whyItMatters: 'Reconecta você com o ato de pensar através da escrita, combatendo o medo da página em branco sem muletas tecnológicas.'
  },
  {
    id: 'oficina-poesia',
    title: 'Laboratório de Poesia & Metáforas',
    category: 'escrita',
    subtitle: 'Construa imagens sensoriais que nenhum modelo estatístico viveria.',
    estimatedMinutes: 7,
    difficulty: 'Intermediário',
    description: 'Combine três estímulos sensoriais humanos (um som, um cheiro e uma lembrança) para compor um pequeno poema ou prosa poética autêntica.',
    instructions: [
      'Sorteie ou escolha seus três estímulos da experiência humana.',
      'Escreva um poema (livre, haiku ou estrofe rimada).',
      'Salve a criação no seu Portfólio de Autonomia.'
    ],
    whyItMatters: 'A metáfora viva nasce da vivência biológica e afetiva, o território onde a imaginação humana continua insuperável.'
  },
  {
    id: 'cirurgiao-de-texto',
    title: 'O Cirurgião de Texto (Humanize o Sintético)',
    category: 'escrita',
    subtitle: 'Transforme um parágrafo genérico em uma mensagem vívida.',
    estimatedMinutes: 6,
    difficulty: 'Avançado',
    description: 'Você receberá um texto típico de IA, repleto de jargões burocráticos ("no cenário atual", "faz-se mister", listas óbvias). Sua missão é reescrevê-lo com alma, objetividade e calor humano.',
    instructions: [
      'Analise as fraquezas e os clichês do texto original.',
      'Corte o excesso de advérbios e adjetivos vazios.',
      'Reescreva com frases diretas, analogias concretas e voz própria.'
    ],
    whyItMatters: 'Desenvolve olhar editorial refinado para você nunca aceitar rascunhos insossos na sua vida profissional.'
  },

  // CRIATIVIDADE & PENSAMENTO VISUAL
  {
    id: 'usos-inusitados',
    title: 'Teste dos Usos Inusitados (Pensamento Divergente)',
    category: 'criatividade',
    subtitle: 'Quantas utilidades você consegue inventar para um mesmo objeto?',
    estimatedMinutes: 4,
    difficulty: 'Iniciante',
    description: 'Um clássico teste de criatividade desenvolvido por J.P. Guilford: imagine e descreva 6 utilidades completamente diferentes para um objeto corriqueiro.',
    instructions: [
      'Veja o objeto do dia (ex: um grampo de papel, um tijolo ou uma rolha).',
      'Pense além do uso óbvio; explore física, arte, emergência ou simbolismo.',
      'Registre 6 ideias originais sem filtrar com autocrítica precoce.'
    ],
    whyItMatters: 'Quebra a rigidez cognitiva e estimula a geração fluida de hipóteses originais.'
  },
  {
    id: 'conexao-remota',
    title: 'Ponte de Conceitos (Associação Remota)',
    category: 'criatividade',
    subtitle: 'Conecte dois mundos distantes em uma ideia inovadora.',
    estimatedMinutes: 5,
    difficulty: 'Intermediário',
    description: 'Receba dois conceitos aparentemente sem nenhuma relação e crie uma analogia, produto ou método que una os dois de maneira engenhosa.',
    instructions: [
      'Analise as propriedades essenciais dos dois conceitos sorteados.',
      'Encontre pontos de contato estruturais, visuais ou funcionais.',
      'Formule uma explicação concisa da sua nova ideia combinada.'
    ],
    whyItMatters: 'A criatividade de alto nível é essencialmente a conexão inédita entre saberes prévios não correlatos.'
  },
  {
    id: 'doodle-thinking',
    title: 'Prancheta de Ideias & Desenho Livre',
    category: 'criatividade',
    subtitle: 'Pensamento visual e coordenação mão-mente no canvas digital.',
    estimatedMinutes: 8,
    difficulty: 'Iniciante',
    description: 'Use a prancheta de desenho para responder a um desafio visual ou expressar uma ideia através de traços, diagramas e formas orgânicas.',
    instructions: [
      'Escolha um tema ou desenhe livremente.',
      'Alterne espessuras de pincel e paleta de cores.',
      'Salve seu desenho para sua galeria pessoal ou baixe a imagem.'
    ],
    whyItMatters: 'Desenhar à mão ativa áreas sensório-motoras do cérebro fundamentais para a memória espacial e a síntese visual.'
  }
];
