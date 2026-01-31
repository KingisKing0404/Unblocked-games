
import React, { useState, useMemo, useEffect } from 'react';
import { GAMES, CATEGORIES } from './constants';
import Header from './components/Header';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeGame, setActiveGame] = useState(null);

  // Sync hash with active game
  useEffect(() => {
    const handleHashChange = () => {
      const hashId = window.location.hash.replace('#', '');
      if (hashId) {
        const game = GAMES.find(g => g.id === hashId);
        if (game) setActiveGame(game);
      } else {
        setActiveGame(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleGameSelect = (game) => {
    window.location.hash = game.id;
  };

  const handleClosePlayer = () => {
    window.location.hash = '';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Categories Bar */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === category
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Hero / Banner Area (Only when no search/filter active) */}
        {!searchQuery && selectedCategory === 'All' && (
          <div className="mb-12 relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 md:p-12">
            <div className="relative z-10 max-w-2xl">
              <span className="text-indigo-500 font-bold tracking-widest text-[10px] uppercase mb-4 block">Unblocked & Unlimited</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                Your Gaming Oasis, <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Anywhere You Are.</span>
              </h2>
              <p className="text-zinc-400 text-sm md:text-base mb-8 leading-relaxed">
                Access your favorite web games instantly. No downloads, no blocked filters, just pure fun. Hand-curated library of modern and classic browser titles.
              </p>
              <button 
                onClick={() => handleGameSelect(GAMES[0])}
                className="bg-zinc-100 hover:bg-white text-zinc-950 px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
              >
                Start Playing
              </button>
            </div>
            <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-600/10 blur-[100px] rounded-full"></div>
            <div className="absolute right-12 bottom-12 hidden lg:block opacity-20">
               <svg className="w-48 h-48 text-indigo-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21,6H3C1.9,6,1,6.9,1,8v8c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V8C23,6.9,22.1,6,21,6z M16,13h-2v2h-2v-2H10v-2h2V9h2v2h2V13z M19,11 c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S19.55,11,19,11z M21,13c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S21.55,13,21,13z" />
               </svg>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-white">
            {searchQuery ? `Search results for "${searchQuery}"` : selectedCategory === 'All' ? 'Trending Games' : `${selectedCategory} Games`}
          </h3>
          <p className="text-xs text-zinc-500 font-medium">
            Showing {filteredGames.length} games
          </p>
        </div>

        {/* Game Grid */}
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGames.map(game => (
              // Fix: Added key to GameCard which is now correctly recognized by the updated component definition
              <GameCard 
                key={game.id} 
                game={game} 
                onClick={handleGameSelect} 
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-4">
               <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            </div>
            <h4 className="text-white font-bold mb-1">No games found</h4>
            <p className="text-zinc-500 text-sm">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <div className="w-6 h-6 bg-zinc-700 rounded-md flex items-center justify-center font-bold text-white text-[10px]">N</div>
            <span className="text-sm font-bold tracking-tight">NovaArcade</span>
          </div>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-6">Built for fast, unblocked web play</p>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-medium">Privacy</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-medium">Terms</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-medium">Support</a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors text-xs font-medium">DMCA</a>
          </div>
          <p className="text-[10px] text-zinc-700">© 2024 NovaArcade Project. All trademarks belong to their respective owners.</p>
        </div>
      </footer>

      {/* Active Game Overlay */}
      {activeGame && (
        <GamePlayer game={activeGame} onClose={handleClosePlayer} />
      )}
    </div>
  );
};

export default App;
