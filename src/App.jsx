import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useState } from "react";
import Loader from "./components/Loader";
import Scene from "./components/Scene";
import { PositionalAudio, Preload } from "@react-three/drei";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);

  return (
    <div className="w-screen h-screen relative">
      <Leva />
      <div className="absolute top-5 left-5 px-5 py-2.5 bg-black/50 text-white text-2xl rounded-lg shadow-md z-10 select-none">
        3D DOC Visualizer
      </div>

      <Loader />

      <div className="absolute bottom-5 right-5 px-4 py-2.5 bg-black/70 text-white text-sm rounded-lg shadow-md z-10 leading-relaxed select-none">
        <strong>Orbit Controls:</strong>
        <ul className="list-none p-0 m-0 space-y-1">
          <li>🔄 Rotate: Left Click + Drag</li>
          <li>🔍 Zoom: Scroll Wheel</li>
          <li>🔄 Pan: Right Click + Drag</li>
          <li>💯 Full Screen: Press ESC Key</li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          shadows
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
