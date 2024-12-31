import React, { useCallback, useState } from 'react';
import { TokenContext, TokenProviderProps } from './init';
import { handleRequestToken } from './requestToken';

export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const requestToken = useCallback(
    async (username: string) => {
      const token = await handleRequestToken(username);
      setToken(token);
    },
    [setToken],
  );

  return (
    <TokenContext.Provider value={{ token, requestToken }}>
      {children}
    </TokenContext.Provider>
  );
};
