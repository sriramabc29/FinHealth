import { useState, useEffect } from 'react';

export const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('none');
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > lastScroll && currentScroll > 100) {
        setScrollDirection('down');
      } else if (currentScroll < lastScroll && currentScroll > 100) {
        setScrollDirection('up');
      } else {
        setScrollDirection('none');
      }
      
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  return scrollDirection;
};