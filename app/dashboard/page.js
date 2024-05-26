'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase-config'; // Korrekte Pfadangabe beachten
import { onAuthStateChanged, signOut } from 'firebase/auth';

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


  if (!user) {
    return <div>Loading...</div>; // Zeigt "Loading..." an, wenn der Benutzerzustand nicht gesetzt ist
  }

  return (
    <div className="container">
      <h1>Erfolgreich eingeloggt</h1>
      <p>Willkommen, {user.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
