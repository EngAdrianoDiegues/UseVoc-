export type PillarCategory = 'raciocinio' | 'memoria' | 'escrita' | 'criatividade';

export interface ExerciseItem {
  id: string;
  title: string;
  category: PillarCategory;
  subtitle: string;
  estimatedMinutes: number;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  description: string;
  instructions: string[];
  whyItMatters: string;
}

export interface ActivityRecord {
  id: string;
  exerciseId: string;
  exerciseTitle: string;
  category: PillarCategory;
  timestamp: number;
  score: number; // 0 to 100
  summary: string;
  userContent?: string;
  imageDataUrl?: string;
}

export interface UserCreation {
  id: string;
  type: 'texto' | 'poema' | 'desenho' | 'pensamento';
  title: string;
  content: string;
  imageDataUrl?: string;
  timestamp: number;
  tags?: string[];
}

export interface DailyReflection {
  date: string; // YYYY-MM-DD
  autonomousTries: number; // how many times tried solo before asking AI
  feeling: 'excelente' | 'em_evolucao' | 'desafiador';
  note: string;
}

export interface UserProgress {
  streak: number;
  lastActiveDate: string; // YYYY-MM-DD
  scores: {
    raciocinio: number;
    memoria: number;
    escrita: number;
    criatividade: number;
  };
  activities: ActivityRecord[];
  creations: UserCreation[];
  reflections: DailyReflection[];
}

export interface EducationalArticle {
  id: string;
  title: string;
  subtitle: string;
  readingTime: string;
  category: string;
  keyTakeaway: string;
  summary: string;
  content: {
    heading: string;
    body: string;
    practicalTip?: string;
  }[];
  actionStep: string;
}
