export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-purple/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Gradient waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-neon-teal/5 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-neon-purple/10 to-transparent opacity-30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-gradient-radial from-neon-blue/10 to-transparent opacity-20 rounded-full blur-2xl" />
    </div>
  );
};