'use client';

import { useRouter } from 'next/navigation';

export default function Lobby() {
  const router = useRouter();
  const { key } = router.query;

  return (
    <div className="container">
      <h1>Lobby: {key}</h1>
      <p>Willkommen in der Lobby. Warte hier auf andere Spieler, die deinem Spiel beitreten.</p>
    </div>
  );
}
