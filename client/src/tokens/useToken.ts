import { useContext } from 'react';
import { TokenContext, TokenContextType } from './init';

// Custom hook to use the TokenContext
export const useToken = (): TokenContextType => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};
