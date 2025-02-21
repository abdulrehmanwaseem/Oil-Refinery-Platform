import { Canvas } from "@react-three/fiber";
import { Scene } from "./components/Scene";
import { useState, Suspense } from "react";
import { Leva } from "leva";
import Loader from "./components/loader";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Suspense fallback={<Loader />}>
        <Leva />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#ffffff",
            fontSize: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
        >
          3D DOC Visualizer
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "20px",
            right: "20px",
            padding: "10px 15px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "#ffffff",
            fontSize: "14px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            lineHeight: "1.5",
          }}
        >
          <strong>Orbit Controls:</strong>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li>🔄 Rotate: Left Click + Drag</li>
            <li>🔍 Zoom: Scroll Wheel</li>
            <li>🔄 Pan: Right Click + Drag</li>
            <li>💯 Full Screen: Press ESC Key</li>
          </ul>
        </div>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: 50,
            near: 0.1,
            far: 1000,
          }}
          shadows={true}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
