import React from 'react';

export const LoadingContext = React.createContext(false);

export const LoadingProvider = ({ value, children }: { value: boolean, children: React.ReactNode }) => (
  <LoadingContext.Provider value={value}>
    {children}
  </LoadingContext.Provider>
);
