import { animated, useSpring } from "@react-spring/web";
import { useProgress } from "@react-three/drei";
import React, { useEffect, useState } from "react";

const Loader = () => {
  const { progress, loaded, total } = useProgress();
  const combinedProgress = (loaded / total) * 100;
  const [maxProgress, setMaxProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMaxProgress((prev) => Math.max(prev, combinedProgress));
  }, [combinedProgress]);

  const animatedProgress = useSpring({
    from: { width: 0 },
    to: { width: maxProgress },
    config: { tension: 220, friction: 30 },
  });

  useEffect(() => {
    if (maxProgress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  }, [maxProgress]);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center bg-white z-50 transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Shapes */}
        <div className="flex gap-4">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" />
            </svg>
          </div>
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72" />
            </svg>
          </div>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64" />
            </svg>
          </div>
        </div>
        {/* Smooth Progress Bar */}
        <div className="w-64 bg-black-custom rounded-full h-2.5 overflow-hidden">
          <animated.div
            className="bg-purple-custom h-2.5 rounded-full"
            style={{
              width: animatedProgress.width.to((w) => `${w}%`),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
