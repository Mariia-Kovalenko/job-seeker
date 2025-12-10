import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Loader: React.FC = () => {
  const { theme } = useTheme();
  const loaderStyle = theme === 'dark' ? 'bg-darkBackground text-white' : 'bg-white text-darkBackground';
  return (
    <div className={`${loaderStyle} flex justify-center items-center`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loader;
