import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const BarChartLoader = ({ width = 300, height = 200, duration = 600, pauseDuration = 500 }) => {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const barCount = 5;
  const barWidth = width / (barCount * 2);
  const maxBarHeight = height * 0.8;

  const colors = ['#FFA07A', '#98FB98', '#87CEFA', '#DDA0DD', '#F0E68C'];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + direction * 2;
          if (newProgress >= 100 || newProgress <= 0) {
            if (direction === 1) {
              setIsPaused(true);
              setTimeout(() => {
                setDirection(-1);
                setIsPaused(false);
              }, pauseDuration);
            } else {
              setDirection(1);
            }
            return direction === 1 ? 100 : 0;
          }
          return newProgress;
        });
      }
    }, duration / 200);
    return () => clearInterval(interval);
  }, [duration, direction, isPaused, pauseDuration]);

  const getBarHeight = (index) => {
    const baseHeight = maxBarHeight * ((index + 1) / barCount);
    const animationProgress = Math.max(0, Math.min(100, progress * 5 - index * 100)) / 100;
    return baseHeight * animationProgress;
  };

  return (
    <div className="chart flex justify-center items-center p-4 h-screen">
      <Card className="p-4">
        <svg width={width} height={height}>
          {Array.from({ length: barCount }).map((_, index) => (
            <rect
              key={index}
              x={index * (barWidth * 2) + barWidth / 2}
              y={height - getBarHeight(index)}
              width={barWidth}
              height={getBarHeight(index)}
              fill={colors[index]}
            />
          ))}
        </svg>
      </Card>
    </div>
  );
};

export default BarChartLoader;
