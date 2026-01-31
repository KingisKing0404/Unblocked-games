
import React from 'react';

// Use a single props object to ensure standard React properties like 'key' are accepted 
// without triggering strict type assignment errors in the parent component.
const GameCard = (props) => {
  const { game, onClick } = props;
  return (
    <div 
      onClick={() => onClick(game)}
      className="group bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden cursor-pointer hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Play Now
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-zinc-100 truncate flex-1">{game.title}</h3>
          <span className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded uppercase font-bold">
            {game.category}
          </span>
        </div>
        <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
          {game.description}
        </p>
      </div>
    </div>
  );
};

export default GameCard;
