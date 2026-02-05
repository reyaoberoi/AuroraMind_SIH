import React, { useEffect, useState } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginPage from './pages/LoginPage';
import App from './App';
import { AuthProvider } from './hooks/auth';

const AuroraEntry: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    setIsAuthed(Boolean(stored));
  }, []);

  const handleSplashFinish = () => setShowSplash(false);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  return (
    <AuthProvider>
      {isAuthed ? <App /> : <LoginPage onAuth={() => setIsAuthed(true)} />}
    </AuthProvider>
  );
};

export default AuroraEntry;
