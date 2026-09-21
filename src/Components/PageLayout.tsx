import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="dashboard-main">
      <div className="dashboard-content">
        {children}
      </div>
    </main>
  );
}

export default PageLayout;