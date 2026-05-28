import { useMemo } from 'react';

interface Star {
  id: number;
  top: string;
  left: string;
  width: string;
  delay: string;
  duration: string;
}

const StarBackground = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }, (_, i) => {
      const size = Math.random() * 2 + 1;
      return {
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${size}px`,
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
      };
    });
  }, []);

  return (
    <div className="w-full h-full fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.width,
            height: star.width,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
};

export default StarBackground;
