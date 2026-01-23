import { useEffect } from 'react';

export const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    // Save the original overflow value to restore it later
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    // Cleanup: Restore scroll when the component unmounts 
    // or when isLocked changes to false
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};