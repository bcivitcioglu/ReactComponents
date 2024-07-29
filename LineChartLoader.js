import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const LineChartLoader = ({ width = 300, height = 200, duration = 150 }) => {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + direction * 4; // Increased step size
        if (newProgress >= 100 || newProgress <= 0) {
          setDirection((prevDirection) => -prevDirection);
        }
        return newProgress < 0 ? 0 : newProgress > 100 ? 100 : newProgress;
      });
    }, duration / 400); // Increased update frequency
    return () => clearInterval(interval);
  }, [duration, direction]);

  const getY = (x) => {
    const y = Math.sin((x / width) * Math.PI * 2) * 40 + height / 2;
    return y;
  };

  const currentX = (progress / 100) * width;
  const currentY = getY(currentX);

  return (
    <div className="chart flex justify-center items-center p-4 h-screen">
      <Card className="p-4">
        <div style={{ width, height, position: 'relative' }}>
          <svg width={width} height={height}>
            <path
              d={`M0 ${height / 2} ${Array.from({ length: 100 }, (_, i) => {
                const x = (i / 100) * width;
                return `L ${x} ${getY(x)}`;
              }).join(' ')}`}
              fill="none"
              stroke="#e0e0e0"
              strokeWidth={2}
            />
            <path
              d={`M0 ${height / 2} ${Array.from({ length: progress }, (_, i) => {
                const x = (i / 100) * width;
                return `L ${x} ${getY(x)}`;
              }).join(' ')}`}
              fill="none"
              stroke="#45B7D1"
              strokeWidth={2}
            />
            <circle
              cx={currentX}
              cy={currentY}
              r={4}
              fill="#45B7D1"
            />
          </svg>
        </div>
      </Card>
    </div>
  );
};

export default LineChartLoader;
