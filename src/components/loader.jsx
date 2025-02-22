import React, { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/web";

const Loader = () => {
  const { progress } = useProgress();
  const [isVisible, setIsVisible] = useState(true);

  const animatedProgress = useSpring({
    from: { width: 0 },
    to: { width: progress },
    config: { tension: 220, friction: 30 },
  });

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setIsVisible(true);
    }
  }, [progress]);

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
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
          <div className="loader triangle">
            <svg viewBox="0 0 86 80">
              <polygon points="43 8 79 72 7 72"></polygon>
            </svg>
          </div>
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <rect x="8" y="8" width="64" height="64"></rect>
            </svg>
          </div>
        </div>

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
