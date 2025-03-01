import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import Loader from "./components/Loader";
import Scene from "./components/Scene";
import { Header } from "./components/ui/Header";
import { LeftSidebar } from "./components/ui/LeftSidebar";
import { RightSidebar } from "./components/ui/RightSidebar";
import assets from "./data/assets.json";
import assetsDetails from "./data/details.json";

function App() {
  const [cameraPosition] = useState([5, 20, 25]);
  const [selectedAsset, setSelectedAsset] = useState("Main_Deck");

  return (
    <div className="relative w-screen h-screen">
      <Loader />
      <Header />
      <LeftSidebar
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        assets={assets}
      />
      <RightSidebar
        selectedAsset={selectedAsset}
        assetsDetails={assetsDetails}
      />
      <Suspense fallback={<Loader />}>
        <Canvas
          camera={{
            position: cameraPosition,
            fov: 50,
            near: 0.2,
            far: 800,
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
