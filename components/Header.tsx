
import React from 'react';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = ''}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
            N
          </div>
          <h1 className="text-xl font-extrabold tracking-tight hidden sm:block">
            Nova<span className="text-indigo-500">Arcade</span>
          </h1>
        </div>

        <div className="flex-1 max-w-xl relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for unblocked games..."
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-100 text-sm rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          <a href="#" className="hover:text-white transition-colors">Popular</a>
          <a href="#" className="hover:text-white transition-colors">New</a>
          <a href="#" className="hover:text-white transition-colors">About</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
