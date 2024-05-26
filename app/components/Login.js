'use client';

// Importiere benötigte Firebase-Module
import { auth } from '../lib/firebase-config'; // Korrekte Pfadangabe beachten
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const Login = () => {
  // Funktion für Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in:', result.user);
      window.location.href = '/dashboard'; // Weiterleitung zum Dashboard nach erfolgreichem Login
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Login;
