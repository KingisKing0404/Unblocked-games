
import React, { useEffect } from 'react';

const GamePlayer = ({ game, onClose }) => {
  useEffect(() => {
    // Prevent scrolling when game is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col animate-in fade-in duration-300">
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
            title="Back to lobby"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h2 className="text-sm font-bold text-white leading-none">{game.title}</h2>
            <span className="text-[10px] text-zinc-500 uppercase font-bold">{game.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Restart
          </button>
          <div className="h-4 w-[1px] bg-zinc-800"></div>
          <button 
            onClick={onClose}
            className="text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-100 px-4 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-zinc-900 relative">
        <iframe 
          src={game.iframeUrl}
          className="w-full h-full border-none shadow-2xl"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          title={game.title}
        />
      </div>
    </div>
  );
};

export default GamePlayer;
