import React, { useRef, useState, useEffect } from 'react';
import { saveCreation } from '../utils/storage';

interface Props {
  onComplete?: (score: number, summary: string, notes?: string, imageDataUrl?: string) => void;
  onCancel?: () => void;
}

const DRAWING_PROMPTS = [
  'Desenhe uma metáfora visual para a autonomia intelectual humana.',
  'Como é a textura visual do “silêncio interior” quando você desacelera?',
  'Desenhe um objeto do seu cotidiano visto de um ângulo completamente inesperado.',
  'Faça um mapa mental da sua mente hoje usando apenas linhas, setas e formas orgânicas.',
  'Desenhe uma árvore cujas raízes representam a memória e os galhos a imaginação.'
];

const PALETTE = [
  { name: 'Carvão', color: '#1c1917' },
  { name: 'Terracota', color: '#c2410c' },
  { name: 'Ocre / Âmbar', color: '#d97706' },
  { name: 'Verde Floresta', color: '#15803d' },
  { name: 'Azul Índigo', color: '#1e3a8a' },
  { name: 'Cinza Ardósia', color: '#64748b' },
];

export const DrawingStudio: React.FC<Props> = ({ onComplete, onCancel }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#1c1917');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);
  const [drawingTitle, setDrawingTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [history, setHistory] = useState<ImageData[]>([]);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background with warm off-white
    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
  }, []);

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    try {
      const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setHistory((prev) => [...prev.slice(-12), snap]);
    } catch (e) {
      console.warn(e);
    }
  };

  const undo = () => {
    if (history.length <= 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const prevSnap = newHistory[newHistory.length - 1];
    ctx.putImageData(prevSnap, 0, 0);
    setHistory(newHistory);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
    setHasDrawn(false);
  };

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? '#fafaf9' : currentColor;
    ctx.lineWidth = isEraser ? brushSize * 4 : brushSize;
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveState();
  };

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `desenho-autonomia-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleSaveToPortfolio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const title = drawingTitle.trim() || `Expressão Visual: ${DRAWING_PROMPTS[promptIdx].slice(0, 30)}...`;

    saveCreation('desenho', title, notes || DRAWING_PROMPTS[promptIdx], dataUrl, ['Desenho Livre', 'Pensamento Visual']);

    if (onComplete) {
      onComplete(90, 'Exercício de pensamento visual e expressão plástica concluído com sucesso.', notes, dataUrl);
    } else {
      alert('Desenho salvo com sucesso no seu Portfólio de Autonomia!');
    }
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-stone-200 pb-3">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
          <span>Pensamento Visual & Coordenação Mão-Mente</span>
          <span aria-hidden="true">·</span>
          <span>Expressão Não-Verbal</span>
        </div>
        <h3 className="text-xl font-serif text-stone-900 font-semibold">
          Prancheta de Ideias & Desenho Livre
        </h3>
        <p className="text-xs text-stone-600 mt-1">
          Rabiscar, diagramar e desenhar são formas primordiais do intelecto humano para conectar intuição e síntese que as palavras não alcançam.
        </p>
      </div>

      {/* Prompt Card */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-semibold text-amber-900 uppercase tracking-wide block mb-0.5">
            Provocação Visual:
          </span>
          <p className="text-xs font-serif text-stone-800 italic leading-relaxed">
            “{DRAWING_PROMPTS[promptIdx]}”
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPromptIdx((prev) => (prev + 1) % DRAWING_PROMPTS.length)}
          className="text-xs text-amber-900 hover:text-amber-950 underline decoration-dotted whitespace-nowrap shrink-0 mt-0.5"
        >
          Trocar Tema
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-xl border border-stone-200">
        {/* Colors */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500">Cores:</span>
          {PALETTE.map((p) => (
            <button
              key={p.name}
              type="button"
              title={p.name}
              onClick={() => {
                setCurrentColor(p.color);
                setIsEraser(false);
              }}
              className={`w-6 h-6 rounded-full border transition-all ${
                currentColor === p.color && !isEraser
                  ? 'ring-2 ring-stone-900 ring-offset-2 scale-110'
                  : 'border-stone-300 hover:scale-105'
              }`}
              style={{ backgroundColor: p.color }}
            />
          ))}
        </div>

        {/* Brush Size */}
        <div className="flex items-center gap-2 text-xs text-stone-600">
          <span>Traço:</span>
          {[2, 4, 8, 14].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setBrushSize(size)}
              className={`px-2 py-1 rounded border text-[11px] ${
                brushSize === size ? 'bg-stone-900 text-white border-stone-900' : 'bg-stone-50 border-stone-200 text-stone-700'
              }`}
            >
              {size}px
            </button>
          ))}
        </div>

        {/* Tools (Eraser, Undo, Clear) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsEraser(!isEraser)}
            className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
              isEraser ? 'bg-amber-100 border-amber-300 text-amber-900 font-medium' : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            {isEraser ? '✓ Borracha Ativa' : 'Borracha'}
          </button>

          <button
            type="button"
            onClick={undo}
            disabled={history.length <= 1}
            className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900 disabled:opacity-40"
          >
            Desfazer
          </button>

          <button
            type="button"
            onClick={clearCanvas}
            className="px-2.5 py-1 text-xs text-rose-600 hover:text-rose-800"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="bg-white p-2 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          width={720}
          height={420}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
          className="w-full max-w-[720px] h-[360px] md:h-[420px] bg-stone-50 rounded-xl cursor-crosshair border border-stone-100 shadow-inner"
        />
        <span className="text-[11px] text-stone-400 mt-1.5 font-mono">
          Desenhe com o mouse ou toque touch screen diretamente na prancheta.
        </span>
      </div>

      {/* Title & Meaning inputs */}
      <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3">
        <input
          type="text"
          value={drawingTitle}
          onChange={(e) => setDrawingTitle(e.target.value)}
          placeholder="Dê um título ao seu desenho (ex: O Labirinto da Decisão)"
          className="w-full text-sm font-semibold text-stone-900 placeholder:text-stone-300 border-b border-stone-200 pb-1.5 focus:outline-none focus:border-stone-800"
        />
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="O que este desenho significa para você? (reflexão opcional)"
          className="w-full text-xs text-stone-700 placeholder:text-stone-300 border-b border-stone-200 pb-1.5 focus:outline-none focus:border-stone-800"
        />
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
          >
            Voltar
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={downloadPNG}
            disabled={!hasDrawn}
            className="px-4 py-2 text-xs font-medium text-stone-700 bg-stone-100 border border-stone-200 rounded-lg hover:bg-stone-200 disabled:opacity-40 transition-colors"
          >
            Baixar PNG
          </button>

          <button
            type="button"
            onClick={handleSaveToPortfolio}
            disabled={!hasDrawn}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 disabled:opacity-40 transition-colors"
          >
            Salvar no Meu Portfólio de Autonomia
          </button>
        </div>
      </div>
    </div>
  );
};
