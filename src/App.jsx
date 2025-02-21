import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { useState, Suspense } from "react";
import { Leva } from "leva";
import Loader from "./components/loader";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Leva />
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 50,
          near: 0.1,
          far: 1000,
        }}
        shadows={true}
      >
        <Suspense fallback={null}>
          <Scene onLoaded={() => setIsLoading(false)} />
        </Suspense>
      </Canvas>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        >
          <Loader />
        </div>
      )}
    </div>
  );
}

export default App;
