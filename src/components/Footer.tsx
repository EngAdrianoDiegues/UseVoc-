import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/60 py-10 mt-16 text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-serif font-bold text-base text-stone-900 tracking-tight">
              UseVocê
            </span>
            <p className="text-stone-500 text-xs">
              Conceito central: <em>“Use a IA, mas não deixe de usar você.”</em>
            </p>
          </div>

          <div className="text-center md:text-right text-stone-500 text-[11px] leading-relaxed max-w-md">
            Promovendo autonomia intelectual, pensamento crítico, imaginação humana e uso consciente da tecnologia.
          </div>
        </div>

        <div className="pt-4 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
          <p>© {new Date().getFullYear()} UseVocê. Desenvolvido para exercitar a mente humana.</p>
          <p className="text-stone-500 text-center sm:text-right">
            Aviso: Este projeto não realiza diagnósticos médicos ou psicológicos.
          </p>
        </div>
      </div>
    </footer>
  );
};
