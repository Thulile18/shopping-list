interface NextStepsProps {
  steps: { label: string; href: string }[];
}

function NextSteps({ steps }: NextStepsProps) {
  return (
    <div className="next-steps">
      <ul>
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
