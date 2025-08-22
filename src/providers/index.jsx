import React from 'react';
// import { Toaster } from '@/components/ui/sonner';
import TanstackProvider from './tanstack';

const MainProvider = ({
  children,
}) => {
  return (
    <TanstackProvider>
      {children}
      {/* <Toaster position="top-right" className="pointer-events-auto"  /> */}
    </TanstackProvider>
  );
};

export default MainProvider;
