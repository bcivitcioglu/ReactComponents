import React from 'react';
import { Card } from '@/components/ui/card';

const baseHeight = 'h-40'; // Base height for SmallSquareCard

const SmallSquareCard = () => (
  <Card className={`w-full ${baseHeight} bg-gray-100`} />
);

const BiggerRectangleCard = () => (
  <Card className={`w-full ${baseHeight} bg-gray-200`} />
);

const SmallerRectangleCard = () => (
  <Card className={`w-full ${baseHeight} bg-gray-300`} />
);

const DashboardLayout = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <SmallSquareCard />
        <SmallSquareCard />
        <SmallSquareCard />
        <SmallSquareCard />
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-3">
          <BiggerRectangleCard />
        </div>
        <SmallSquareCard />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <SmallerRectangleCard />
        <SmallerRectangleCard />
      </div>
      
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-2">
          <SmallerRectangleCard />
        </div>
        <SmallSquareCard />
        <SmallSquareCard />
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        <SmallSquareCard />
        <SmallSquareCard />
        <div className="col-span-2">
          <BiggerRectangleCard />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
