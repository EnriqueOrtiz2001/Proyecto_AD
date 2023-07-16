import React, { createContext, useState } from 'react';

export const CedulaContext = createContext();

export const CedulaProvider = ({ children }) => {
  const [cedulaGlobal, setCedulaGlobal] = useState('');

  return (
    <CedulaContext.Provider value={{ cedulaGlobal, setCedulaGlobal }}>
      {children}
    </CedulaContext.Provider>
  );
};
