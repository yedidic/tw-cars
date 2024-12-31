import { createContext, ReactNode } from 'react';

export interface TokenContextType {
  token: string;
  requestToken: (user: string) => void;
}

// Create the context with a default value
export const TokenContext = createContext<TokenContextType | undefined>(
  undefined,
);

// Define the provider props
export interface TokenProviderProps {
  children: ReactNode;
}
