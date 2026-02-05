import React from 'react';
import './LandingPage.css';

interface LandingPageProps {
  onFinish?: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onFinish }) => {
  // Empathetic story steps
  const storySteps = [
    {
      title: "Welcome to AuroraMinds",
      text: "Your journey to inner light begins here. We’re here to support your mental health and well-being, every step of the way.",
      illustration: (
        <svg width="120" height="80" viewBox="0 0 120 80">
          <ellipse cx="60" cy="40" rx="50" ry="30" fill="#7f5af0" opacity="0.2" />
          <circle cx="60" cy="40" r="18" fill="#ff6fcb" opacity="0.7" />
          <circle cx="60" cy="40" r="10" fill="#e0eafc" />
        </svg>
      ),
    },
    {
      title: "Confidential Support",
      text: "Book private sessions, access resources, and connect with peers—all in a safe, confidential space.",
      illustration: (
        <svg width="120" height="80" viewBox="0 0 120 80">
          <rect x="30" y="30" width="60" height="30" rx="10" fill="#7f5af0" opacity="0.2" />
          <circle cx="60" cy="45" r="12" fill="#ff6fcb" opacity="0.7" />
          <rect x="50" y="40" width="20" height="10" rx="5" fill="#e0eafc" />
        </svg>
      ),
    },
    {
      title: "Empathetic AI Guidance",
      text: "Our AI chatbot is here to listen and guide you through tough times, whenever you need to vent or seek advice.",
      illustration: (
        <svg width="120" height="80" viewBox="0 0 120 80">
          <ellipse cx="60" cy="40" rx="50" ry="30" fill="#ff6fcb" opacity="0.2" />
          <rect x="40" y="30" width="40" height="20" rx="8" fill="#7f5af0" opacity="0.7" />
          <circle cx="60" cy="40" r="8" fill="#e0eafc" />
        </svg>
      ),
    },
  ];

  const [step, setStep] = React.useState(0);
  const handleNext = () => {
    if (step < storySteps.length - 1) {
      setStep(step + 1);
    } else if (onFinish) {
      onFinish();
    }
  };
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleSkip = () => {
    setStep(storySteps.length - 1);
    if (onFinish) onFinish();
  };

  const { title, text, illustration } = storySteps[step];

  return (
    <div className="landing-bg">
      <div className="story-container">
        <div>{illustration}</div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#ff6fcb' }}>{title}</h1>
        <p className="text-lg mb-4">{text}</p>
        <div className="story-nav">
          <button className="btn" onClick={handleBack} disabled={step === 0}>Back</button>
          <button className="btn" onClick={handleNext}>
            {step === storySteps.length - 1 ? 'Continue' : 'Next'}
          </button>
          <button className="btn" onClick={handleSkip} disabled={step === storySteps.length - 1}>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
