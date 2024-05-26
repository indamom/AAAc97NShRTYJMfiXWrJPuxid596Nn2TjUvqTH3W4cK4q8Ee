'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

export default function Lobby() {
  const router = useRouter();
  const { key } = router.query;
  const [lobby, setLobby] = useState(null);

  useEffect(() => {
    if (key) {
      const fetchLobby = async () => {
        const { data, error } = await supabase
          .from('lobbies')
          .select('*')
          .eq('key', key);

        if (data.length > 0) {
          setLobby(data[0]);
        }
      };
      fetchLobby();
    }
  }, [key]);

  if (!lobby) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Lobby: {key}</h1>
      <p>Willkommen in der Lobby. Warte hier auf andere Spieler, die deinem Spiel beitreten.</p>
    </div>
  );
}
