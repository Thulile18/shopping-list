import React from 'react';

// Simple interface to layout our component parameter definitions
interface SpacerProps {
  height?: number;
  border?: boolean;
}

function Spacer({ height, border = true }: SpacerProps) {
  
  // Build our dynamic styling object step-by-step
  let spacerStyle: React.CSSProperties = {};

  // Check if a specific pixel height was passed down
  if (height !== undefined && height !== null) {
    spacerStyle.height = height + 'px';
  }

  // Check if a line border should display
  if (border === true) {
    spacerStyle.borderTop = '1px solid #e2e8f0';
  } else {
    spacerStyle.borderTop = 'none';
  }

  return (
    <div
      className="spacer"
      style={spacerStyle}
    />
  );
}

export default Spacer;