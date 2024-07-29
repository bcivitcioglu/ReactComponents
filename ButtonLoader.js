import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const RefinedDynamicHarmonicLoader = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition + 8) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  const x = Math.sin((position * Math.PI) / 180) * 40 + 50;
  const radius = Math.cos((position * Math.PI) / 180) * 1.5 + 3.5;

  return (
    <svg width="100" height="20" viewBox="0 0 100 20">
      <circle
        cx={x}
        cy="10"
        r={radius}
        fill="#FFFFFF"
      />
    </svg>
  );
};

const SubmitButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setIsSuccess(false);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 3500);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="p-6">
        <button
          onClick={handleClick}
          disabled={isLoading || isSuccess}
          className={`
            font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-48 h-12 
            flex items-center justify-center transition-colors duration-300
            ${isLoading || isSuccess ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-700'}
            ${isSuccess ? 'bg-green-500' : ''}
            text-white
          `}
        >
          {isLoading ? (
            <RefinedDynamicHarmonicLoader />
          ) : isSuccess ? (
            <Check size={24} />
          ) : (
            'Join!'
          )}
        </button>
      </Card>
    </div>
  );
};

export default SubmitButton;
