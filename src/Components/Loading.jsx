import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Loading");
  const [dots, setDots] = useState("");

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Animated dots for loading text
    const dotsInterval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(dotsInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-10 animate-pulse"
            style={{
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDelay: Math.random() * 3 + "s",
              animationDuration: Math.random() * 3 + 2 + "s",
            }}
          />
        ))}
      </div>

      {/* Main loading container */}
      <div className="text-center z-10 px-8 max-w-md w-full">
        {/* Logo/Brand area */}
        <div className="mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center animate-spin">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wide">
            Your App
          </h1>
          <p className="text-purple-200 text-lg">Preparing your experience</p>
        </div>

        {/* Loading animation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "0.8s",
                }}
              ></div>
            ))}
          </div>

          {/* Loading text */}
          <p className="text-2xl font-semibold text-white mb-8 h-8">
            {loadingText}
            {dots}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
          </div>
        </div>

        {/* Progress percentage */}
        <p className="text-purple-200 text-sm font-medium">
          {Math.round(Math.min(progress, 100))}%
        </p>

        {/* Additional loading states */}
        <div className="mt-8 space-y-2">
          <div
            className={`flex items-center justify-center space-x-2 transition-opacity duration-500 ${
              progress > 20 ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-purple-200">
              Initializing components
            </span>
          </div>
          <div
            className={`flex items-center justify-center space-x-2 transition-opacity duration-500 ${
              progress > 50 ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-purple-200">Loading resources</span>
          </div>
          <div
            className={`flex items-center justify-center space-x-2 transition-opacity duration-500 ${
              progress > 80 ? "opacity-100" : "opacity-30"
            }`}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-purple-200">Finalizing setup</span>
          </div>
        </div>

        {/* Completion message */}
        {progress >= 100 && (
          <div className="mt-8 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-semibold">Ready!</span>
            </div>
          </div>
        )}
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
