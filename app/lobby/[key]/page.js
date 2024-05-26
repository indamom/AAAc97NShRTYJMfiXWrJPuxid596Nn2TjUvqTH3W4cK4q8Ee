'use client';

import { useRouter } from 'next/router';

export default function Lobby() {
  const router = useRouter();
  const { key } = router.query; // Extrahiere den Lobby-Code aus der URL

  return (
    <div className="container">
      <h1>Lobby: {key}</h1>
      <p>Willkommen in der Lobby. Warte hier auf andere Spieler, die deinem Spiel beitreten.</p>
    </div>
  );
}
