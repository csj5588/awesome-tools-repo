import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

interface TwoColumnLayoutProps {
  children: React.ReactNode[];
}

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({ children }) => {
  console.log('children[1]', children[1])
  return (
    <PhotoProvider>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 0',
          borderTop: '1px solid #f5f5f5'
        }}
      >
        <div style={{ flex: 1, marginRight: '10px' }}>{children[0]}</div>
        <div style={{ flex: 1, marginLeft: '10px', width: '40%', cursor: 'pointer' }}>
          <PhotoView src={children[1].props.src}>
            {children[1]}
          </PhotoView>
        </div>
      </div>
    </PhotoProvider>
  );
};

export default TwoColumnLayout;
