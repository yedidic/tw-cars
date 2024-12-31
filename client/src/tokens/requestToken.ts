export const handleRequestToken = async (username: string): Promise<string> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_API_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: username }),
    });

    if (!response.ok) {
      throw new Error('Failed to request token');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Error requesting token:', error);
  }
  return '';
};
