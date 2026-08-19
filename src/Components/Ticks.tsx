import React from 'react';

// Simple interface to layout our component parameter definitions
interface TicksProps {
  count?: number;
  size?: number;
  color?: string;
}

function Ticks({ count = 1, size = 20, color = '#000' }: TicksProps) {
  
  // Set up our inline styling properties step-by-step
  let ticksStyle: React.CSSProperties = {
    width: size + 'px',
    height: size + 'px'
  };

  return (
    <div 
      className="ticks" 
      style={ticksStyle} 
    />
  );
}

export default Ticks;