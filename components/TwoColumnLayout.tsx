import React from 'react';

interface TwoColumnLayoutProps {
  children: React.ReactNode[];
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ children }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>{children[0]}</div>
      <div style={{ flex: 1, marginLeft: '10px', width: '40%' }}>{children[1]}</div>
    </div>
  );
};

export default TwoColumnLayout;
