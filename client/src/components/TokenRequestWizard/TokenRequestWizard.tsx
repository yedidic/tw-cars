import { useState } from 'react';
import styled from 'styled-components';
import { useToken } from '../../tokens/useToken';

// Styled component for the container
const FullHeightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  height: 3em;
`;
const Label = styled.label`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Input = styled.input`
  height: 2.5em;
  font-size: 1rem;
`;
const Button = styled.button`
  height: 100%;
`;

const TokenRequestWizard = () => {
  const [user, setUser] = useState<string>('');
  const { requestToken } = useToken();

  return (
    <FullHeightContainer>
      <Label>
        Enter user name:
        <Input
          type="text"
          placeholder={`i.e "cars"`}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Label>
      <Button
        onClick={() => {
          requestToken(user);
        }}
        disabled={!user}
      >
        Submit
      </Button>
    </FullHeightContainer>
  );
};

export default TokenRequestWizard;
