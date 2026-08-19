import React from 'react';

// Simple interface to layout our component parameter definitions
interface NextStepsProps {
  steps: { label: string; href: string }[];
}

function NextSteps({ steps }: NextStepsProps) {
  return (
    <div className="next-steps">
      <ul>
        {/* Loop through steps array using a clean, traditional student-style function */}
        {steps.map(function (step, index) {
          return (
            <li key={index}>
              <a href={step.href}>{step.label}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default NextSteps;