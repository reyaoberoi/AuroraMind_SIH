import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// Corrected Paths: Using relative paths instead of aliases
import App from "./App";
import SplashScreen from "./components/SplashScreen";
import "./index.css";

/**
 * This is a small wrapper component that manages the application's entry.
 * It decides whether to show the splash screen or the main application.
 */
const AppWrapper = () => {
  // We use state to track when the splash screen has finished its animation/timer.
  const [isSplashFinished, setIsSplashFinished] = useState(false);

  // This function is passed down to the SplashScreen component.
  // When the splash screen is done, it calls this function, which updates our state.
  const handleSplashFinish = () => {
    setIsSplashFinished(true);
  };

  // Conditionally render the component:
  // If the splash screen is NOT finished, show the SplashScreen.
  // If it IS finished, show the main App.
  return (
    <>
      {isSplashFinished ? (
        <App />
      ) : (
        <SplashScreen onFinish={handleSplashFinish} />
      )}
    </>
  );
};

// We render the AppWrapper instead of the App directly.
// This ensures the splash screen logic runs first.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

