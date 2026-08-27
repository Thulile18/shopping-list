import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
}

function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Dynamic Content Layout Wrapper */}
      {children}
    </div>
  );
}

export default PageLayout;