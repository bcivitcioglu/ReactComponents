import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

const HarmonicLoader = () => {
  const [time, setTime] = useState(0);
  const [trails, setTrails] = useState([]);
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#F7D065', '#E0BBE4'];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime + 6) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTrails(prevTrails => {
      const newTrails = prevTrails
        .map(trail => ({
          ...trail,
          opacity: trail.opacity - 0.05
        }))
        .filter(trail => trail.opacity > 0);
      return [...newTrails, ...calculateOscillators()];
    });
  }, [time]);

  const calculateOscillators = () => {
    return [0, 72, 144, 216, 288].map((angle, index) => {
      const t = (time * Math.PI) / 180;
      const a = (angle * Math.PI) / 180;
      const rotation = Math.sin(t);
      const radialMotion = Math.sin(t * 2) * 10 + 25;
      const x = Math.sin(a + rotation) * radialMotion + 50;
      const y = Math.cos(a + rotation) * radialMotion + 50;
      return { x, y, color: colors[index], opacity: 1 };
    });
  };

  const oscillators = calculateOscillators();

  return (
    <div className="w-32 h-32 relative">
      <svg width="100%" height="100%" viewBox="0 0 100 100">
        {trails.map((trail, index) => (
          <circle
            key={`trail-${index}`}
            cx={trail.x}
            cy={trail.y}
            r="2"
            fill={trail.color}
            opacity={trail.opacity}
          />
        ))}
        {oscillators.map((osc, index) => (
          <circle
            key={`osc-${index}`}
            cx={osc.x}
            cy={osc.y}
            r="2"
            fill={osc.color}
          />
        ))}
      </svg>
    </div>
  );
};

const TextLoader = ({ color }) => {
  const [time, setTime] = useState(0);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime + 6) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTrails(prevTrails => {
      const newTrails = prevTrails
        .map(trail => ({
          ...trail,
          opacity: trail.opacity - 0.05
        }))
        .filter(trail => trail.opacity > 0);
      
      const x = (Math.sin((time * Math.PI) / 180) + 1) / 2 * 100;
      return [...newTrails, { x, opacity: 1 }];
    });
  }, [time]);

  return (
    <div className="h-4 bg-gray-200 rounded relative overflow-hidden w-full">
      <svg width="100%" height="100%" viewBox="0 0 100 4">
        {trails.map((trail, index) => (
          <circle
            key={`trail-${index}`}
            cx={trail.x}
            cy="2"
            r="1"
            fill={color}
            opacity={trail.opacity}
          />
        ))}
        <circle
          cx={(Math.sin((time * Math.PI) / 180) + 1) / 2 * 100}
          cy="2"
          r="1"
          fill={color}
        />
      </svg>
    </div>
  );
};

const ContentLoader = () => {
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-96 p-6 bg-white shadow-lg flex flex-col items-center">
        <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center mb-6">
          <HarmonicLoader />
        </div>
        <div className="w-full space-y-4">
          {colors.map((color, index) => (
            <TextLoader key={index} color={color} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ContentLoader;
