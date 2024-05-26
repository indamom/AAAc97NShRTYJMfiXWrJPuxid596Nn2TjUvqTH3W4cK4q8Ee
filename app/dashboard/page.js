'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase-config'; // Korrekte Pfadangabe beachten
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createLobbyCode } from '../../lib/lobbyService'; // Importiere die Lobby-Service-Funktion

export default function Dashboard() {
  const [user, setUser] = useState(null); // Zustand für Benutzerinformationen
  const router = useRouter();

  // Überwacht den Authentifizierungsstatus des Benutzers
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Setzt den Benutzerzustand, wenn der Benutzer angemeldet ist
      } else {
        router.push('/'); // Weiterleitung zur Anmeldeseite, wenn nicht authentifiziert
      }
    });

    return () => unsubscribe(); // Bereinigt den Listener bei Komponentendemontage
  }, [router]);

  // Funktion für Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/'); // Weiterleitung zur Anmeldeseite nach Logout
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Funktion zum Erstellen eines neuen Lobby-Codes
  const handleCreateGame = async () => {
    try {
      const key = await createLobbyCode();
      router.push(`/lobby/${key}`); // Weiterleitung zur Lobby-Seite mit dem neuen Lobby-Code
    } catch (error) {
      console.error('Error creating lobby:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Zeigt "Loading..." an, wenn der Benutzerzustand nicht gesetzt ist
  }

  return (
    <div className="container">
      <h1>Erfolgreich eingeloggt</h1>
      <p>Willkommen, {user.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreateGame}>Create Game</button>
      <button onClick={() => router.push('/join-game')}>Join Game</button>
    </div>
  );
}
