/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeOverview } from './components/HomeOverview';
import { ExercisesView } from './components/ExercisesView';
import { StudioView } from './components/StudioView';
import { EducationalSection } from './components/EducationalSection';
import { EvolutionDashboard } from './components/EvolutionDashboard';
import { ExerciseModal } from './components/ExerciseModal';
import { DailyCheckinModal } from './components/DailyCheckinModal';
import { Footer } from './components/Footer';
import { ExerciseItem, UserProgress } from './types';
import { loadUserProgress } from './utils/storage';
import { EXERCISE_ITEMS } from './data/exercisesData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'exercises' | 'studio' | 'articles' | 'evolution'>('home');
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());
  const [currentExercise, setCurrentExercise] = useState<ExerciseItem | null>(null);
  const [isCheckinOpen, setIsCheckinOpen] = useState(false);

  const refreshProgress = () => {
    setProgress(loadUserProgress());
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  const handleStartExercise = (exercise: ExerciseItem) => {
    setCurrentExercise(exercise);
  };

  const handleStartExerciseById = (id: string) => {
    const found = EXERCISE_ITEMS.find((e) => e.id === id);
    if (found) {
      setCurrentExercise(found);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 font-sans selection:bg-amber-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenCheckin={() => setIsCheckinOpen(true)}
        streak={progress.streak}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'home' && (
          <HomeOverview
            progress={progress}
            onSelectTab={setActiveTab}
            onStartExercise={handleStartExercise}
            onOpenCheckin={() => setIsCheckinOpen(true)}
          />
        )}

        {activeTab === 'exercises' && (
          <ExercisesView onStartExercise={handleStartExercise} />
        )}

        {activeTab === 'studio' && (
          <StudioView onCreationSaved={refreshProgress} />
        )}

        {activeTab === 'articles' && (
          <EducationalSection />
        )}

        {activeTab === 'evolution' && (
          <EvolutionDashboard
            progress={progress}
            onSelectExercise={handleStartExerciseById}
          />
        )}
      </main>

      {/* Interactive Exercise Modal */}
      {currentExercise && (
        <ExerciseModal
          exercise={currentExercise}
          onClose={() => setCurrentExercise(null)}
          onUpdated={refreshProgress}
        />
      )}

      {/* Daily Reflection Check-in Modal */}
      <DailyCheckinModal
        isOpen={isCheckinOpen}
        onClose={() => setIsCheckinOpen(false)}
        onSaved={refreshProgress}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
