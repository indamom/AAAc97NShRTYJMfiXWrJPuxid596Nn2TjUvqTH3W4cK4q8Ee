export const createLobbyCode = async () => {
  const response = await fetch('/api/createLobby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error('Error creating lobby');
  }

  const data = await response.json();
  return data.key;
};
