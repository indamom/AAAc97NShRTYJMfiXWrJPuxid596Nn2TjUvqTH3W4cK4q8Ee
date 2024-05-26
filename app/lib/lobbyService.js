export const createLobbyCode = async () => {
  try {
    const response = await fetch('/api/createLobby', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error response from server:', errorData);
      throw new Error(errorData.message || 'Error creating lobby');
    }

    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error('Error creating lobby:', error);
    throw error;
  }
};
