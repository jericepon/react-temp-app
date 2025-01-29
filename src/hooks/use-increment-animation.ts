import { useState, useEffect } from 'react';

const useIncrementAnimation = (targetValue: number, duration: number) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const increment = Math.min(progress / duration, 1) * targetValue;
      setAnimatedValue(increment);
      if (progress < duration)
      {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [targetValue, duration]);

  return animatedValue;
};

export default useIncrementAnimation;