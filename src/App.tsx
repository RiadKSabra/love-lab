import React from 'react';
import { useAppStore } from './store/useAppStore';
import LoadingScreen from './pages/Intro/LoadingScreen';
import Chapter1Intro from './pages/Intro/Chapter1Intro';
import Chapter2Question from './pages/Question/Chapter2Question';
import Chapter3Success from './pages/Question/Chapter3Success';
import Home from './pages/Home/Home';
import DNABuilder from './pages/Games/DNABuilder';
import SecretLetters from './pages/Letters/SecretLetters';
import Gallery from './pages/Memories/Gallery';

export default function App() {
  const { phase, activeGameId } = useAppStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden select-none">
      {phase === 'loading' && <LoadingScreen />}
      {phase === 'intro' && <Chapter1Intro />}
      {phase === 'question' && <Chapter2Question />}
      {phase === 'success' && <Chapter3Success />}
      {phase === 'home' && (
        activeGameId === 'dna-builder' ? (
          <DNABuilder />
        ) : activeGameId === 'letters' ? (
          <SecretLetters />
        ) : activeGameId === 'memories' ? (
          <Gallery />
        ) : (
          <Home />
        )
      )}
    </div>
  );
}