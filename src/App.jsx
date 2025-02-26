import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "./components/Loader";
import Scene from "./components/Scene";
import UI from "./components/ui";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);
  const [selectedAsset, setSelectedAsset] = useState("Cube001");

  return (
    <div className="relative w-screen h-screen">
      <Loader />
      <UI selectedAsset={selectedAsset} setSelectedAsset={setSelectedAsset} />
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: 50,
            near: 0.2,
            far: 1000,
          }}
          shadows
        >
          <Scene selectedAsset={selectedAsset} />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default App;
