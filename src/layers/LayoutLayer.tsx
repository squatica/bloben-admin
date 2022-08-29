import Navigation from '../components/Navigation';
import React from 'react';
import RouterProvider from './RouterProvider';

const LayoutProvider = () => {
  return (
    <div className={'container'}>
      <Navigation />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          maxHeight: '100vh',
        }}
      >
        <RouterProvider />
      </div>
    </div>
  );
};

export default LayoutProvider;
