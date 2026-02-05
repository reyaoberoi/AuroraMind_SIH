import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2500); // Show splash for 2.5s
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-bg">
      <div className="aurora-logo">
        <div className="aurora-heart-logo">
          {/* Bigger modern gradient heart logo */}
          <svg width="96" height="96" viewBox="0 0 64 64">
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff6fcb" />
                <stop offset="100%" stopColor="#7f5af0" />
              </linearGradient>
            </defs>
            <path d="M32 58 Q12 38 12 24 Q12 12 32 20 Q52 12 52 24 Q52 38 32 58 Z" fill="url(#heartGradient)" />
          </svg>
        </div>
        <span className="aurora-title">Aurora<span className="minds-highlight">Minds</span></span>
      </div>
    </div>
  );
};

export default SplashScreen;
