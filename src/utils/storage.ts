import { ActivityRecord, DailyReflection, PillarCategory, UserCreation, UserProgress } from '../types';

const STORAGE_KEY = 'usevoce_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  scores: {
    raciocinio: 65,
    memoria: 60,
    escrita: 70,
    criatividade: 75,
  },
  activities: [
    {
      id: 'init-1',
      exerciseId: 'rascunho-puro',
      exerciseTitle: 'Oficina do Rascunho Puro',
      category: 'escrita',
      timestamp: Date.now() - 86400000,
      score: 85,
      summary: 'Redação autoral concluída sobre autonomia digital.',
    },
    {
      id: 'init-2',
      exerciseId: 'foco-stroop',
      exerciseTitle: 'Inibição de Impulso & Foco Seletivo',
      category: 'memoria',
      timestamp: Date.now() - 43200000,
      score: 80,
      summary: 'Treino de atenção e controle de impulsos concluído.',
    }
  ],
  creations: [
    {
      id: 'creation-demo-1',
      type: 'texto',
      title: 'A Faísca do Rascunho',
      content: 'Pensar dói no começo porque a folha em branco reflete nossa vulnerabilidade. Mas é exatamente nessa fresta de incerteza que mora o que nos faz humanos.',
      timestamp: Date.now() - 86400000,
      tags: ['Autonomia', 'Voz Própria']
    }
  ],
  reflections: [
    {
      date: new Date().toISOString().split('T')[0],
      autonomousTries: 2,
      feeling: 'excelente',
      note: 'Rascunhei um projeto no papel por 10 minutos antes de pedir sugestões.'
    }
  ]
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveUserProgress(DEFAULT_PROGRESS);
      return DEFAULT_PROGRESS;
    }
    const parsed = JSON.parse(raw) as UserProgress;
    
    // Check and update streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastActiveDate !== today) {
      const last = new Date(parsed.lastActiveDate);
      const now = new Date(today);
      const diffDays = Math.round((now.getTime() - last.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        parsed.streak += 1;
      } else if (diffDays > 1) {
        parsed.streak = 1;
      }
      parsed.lastActiveDate = today;
      saveUserProgress(parsed);
    }
    return parsed;
  } catch (err) {
    console.error('Failed to load user progress:', err);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Failed to save user progress:', err);
  }
}

export function recordActivity(
  exerciseId: string,
  exerciseTitle: string,
  category: PillarCategory,
  score: number,
  summary: string,
  userContent?: string,
  imageDataUrl?: string
): UserProgress {
  const current = loadUserProgress();
  const record: ActivityRecord = {
    id: 'act-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
    exerciseId,
    exerciseTitle,
    category,
    timestamp: Date.now(),
    score,
    summary,
    userContent,
    imageDataUrl
  };

  // Update pillar score smoothly (exponential moving average or incremental gain)
  const prevScore = current.scores[category] || 50;
  const newScore = Math.min(100, Math.round(prevScore * 0.85 + score * 0.15));
  current.scores[category] = newScore;
  current.activities.unshift(record);

  saveUserProgress(current);
  return current;
}

export function saveCreation(
  type: 'texto' | 'poema' | 'desenho' | 'pensamento',
  title: string,
  content: string,
  imageDataUrl?: string,
  tags: string[] = []
): UserProgress {
  const current = loadUserProgress();
  const creation: UserCreation = {
    id: 'create-' + Date.now(),
    type,
    title,
    content,
    imageDataUrl,
    timestamp: Date.now(),
    tags
  };

  current.creations.unshift(creation);
  // Boost creativity and writing slightly
  if (type === 'desenho') {
    current.scores.criatividade = Math.min(100, current.scores.criatividade + 4);
  } else {
    current.scores.escrita = Math.min(100, current.scores.escrita + 3);
    current.scores.criatividade = Math.min(100, current.scores.criatividade + 2);
  }

  saveUserProgress(current);
  return current;
}

export function saveDailyReflection(reflection: DailyReflection): UserProgress {
  const current = loadUserProgress();
  const existingIndex = current.reflections.findIndex(r => r.date === reflection.date);
  if (existingIndex >= 0) {
    current.reflections[existingIndex] = reflection;
  } else {
    current.reflections.unshift(reflection);
  }
  saveUserProgress(current);
  return current;
}
