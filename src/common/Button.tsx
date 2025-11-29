import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidthMobile?: boolean;
  fullWidthDesktop?: boolean;
  center?: boolean;
  onClick?: () => void;
}

function Button({ loading, fullWidthMobile = false, fullWidthDesktop = false, center = false, children, onClick, ...props }: ButtonProps) {
  const mobileWidth = fullWidthMobile ? 'w-full' : 'w-fit';
  const desktopWidth = fullWidthDesktop ? 'md:w-full' : 'md:w-fit';
  const centered = center ? 'mx-auto' : '';
  return (
    <button
      className={`${mobileWidth} ${desktopWidth} ${centered} bg-primary text-white min-w-32 p-2 font-medium rounded-full h-12 hover:bg-primary/90 transition-all duration-300 flex justify-center items-center ${props.className || ""}`}
      onClick={onClick}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-black"></div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
