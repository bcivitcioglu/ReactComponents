import React from 'react';
import { Card } from '@/components/ui/card';

const baseHeight = 'h-40'; // Base height for SmallSquareCard

// CSS for the more pronounced staggered blinking effect
const blinkingStyles = `
  @keyframes blink {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  .blinking {
    animation: blink 2s infinite;
    transition: opacity 0.3s ease-in-out;
  }
`;

const BlinkingCard = ({ className, delay, color }) => (
  <Card 
    className={`${className} blinking`} 
    style={{ 
      animationDelay: `${delay}s`, 
      willChange: 'opacity',
      backgroundColor: color
    }}
  />
);

const SmallSquareCard = ({ delay }) => (
  <BlinkingCard 
    className={`w-full ${baseHeight}`} 
    delay={delay} 
    color="#60A5FA" // Bright blue
  />
);

const BiggerRectangleCard = ({ delay }) => (
  <BlinkingCard 
    className={`w-full ${baseHeight}`} 
    delay={delay}
    color="#34D399" // Bright green
  />
);

const SmallerRectangleCard = ({ delay }) => (
  <BlinkingCard 
    className={`w-full ${baseHeight}`} 
    delay={delay}
    color="#F87171" // Bright red
  />
);

const DashboardLayout = () => {
  let delay = 0;
  const incrementDelay = () => {
    delay += 0.2;
    return delay;
  };

  return (
    <>
      <style>{blinkingStyles}</style>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="grid grid-cols-4 gap-4 mb-4">
          {[0, 1, 2, 3].map(i => (
            <SmallSquareCard key={`small-${i}`} delay={incrementDelay()} />
          ))}
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-3">
            <BiggerRectangleCard delay={incrementDelay()} />
          </div>
          <SmallSquareCard delay={incrementDelay()} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <SmallerRectangleCard delay={incrementDelay()} />
          <SmallerRectangleCard delay={incrementDelay()} />
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="col-span-2">
            <SmallerRectangleCard delay={incrementDelay()} />
          </div>
          <SmallSquareCard delay={incrementDelay()} />
          <SmallSquareCard delay={incrementDelay()} />
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          <SmallSquareCard delay={incrementDelay()} />
          <SmallSquareCard delay={incrementDelay()} />
          <div className="col-span-2">
            <BiggerRectangleCard delay={incrementDelay()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
