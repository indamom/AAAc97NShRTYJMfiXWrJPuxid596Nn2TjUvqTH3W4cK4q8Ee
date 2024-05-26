import { supabase } from '../../lib/supabaseClient';

const generateLobbyKey = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  let key;
  let exists = true;

  while (exists) {
    key = generateLobbyKey();
    const { data, error } = await supabase
      .from('lobbies')
      .select('key')
      .eq('key', key);

    if (data.length === 0) {
      exists = false;
    }
  }

  const { data, error } = await supabase
    .from('lobbies')
    .insert([{ key }]);

  if (error) {
    return res.status(500).json({ message: 'Error creating lobby', error });
  }

  res.status(200).json({ key: data[0].key });
}
