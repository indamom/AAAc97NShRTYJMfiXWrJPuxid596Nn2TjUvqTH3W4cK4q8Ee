'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../../lib/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { createLobbyCode } from '../../../lib/lobbyService';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleCreateGame = async () => {
    try {
      const key = await createLobbyCode();
      router.push(`/lobby/${key}`);
    } catch (error) {
      console.error('Error creating lobby:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Erfolgreich eingeloggt</h1>
      <p>Willkommen, {user.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCreateGame}>Create Game</button>
    </div>
  );
}
