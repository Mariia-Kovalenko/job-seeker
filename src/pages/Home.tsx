import React from 'react';
import IntroSection from '../components/IntroSection';
import { useTheme } from '../context/ThemeContext';

export default function Home() {
    const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' ? 'bg-darkBackground' : 'bg-white'} max-w-7xl mx-auto`}>
      <IntroSection />
    </div>
  );
}
