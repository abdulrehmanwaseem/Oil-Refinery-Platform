import {
  Environment,
  OrbitControls,
  Preload,
  Sky,
  useEnvironment,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Ocean } from "react-three-ocean";
import {
  Audio,
  AudioListener,
  AudioLoader,
  Color,
  FrontSide,
  Vector3,
} from "three";
import { PlatformModel } from "./PlatformModel";

const Scene = () => {
  const ocean = useRef();
  const { scene, camera } = useThree();

  const envMap = useEnvironment({
    files: "/assets/clouds.hdr",
  });

  useEffect(() => {
    scene.background = envMap;

    const listener = new AudioListener();
    camera.add(listener);

    const resumeAudioContext = () => {
      if (listener.context.state === "suspended") {
        listener.context.resume().then(() => {
          console.log("Audio context resumed");
        });
      }
      window.removeEventListener("click", resumeAudioContext);
      window.removeEventListener("touchstart", resumeAudioContext);
    };
    window.addEventListener("click", resumeAudioContext, { passive: true });
    window.addEventListener("touchstart", resumeAudioContext, {
      passive: true,
    });

    const audio = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load("/assets/waves.mp3", (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(0.2);

      if (ocean.current) {
        ocean.current.add(audio);
      }
      audio.play();
    });

    return () => {
      camera.remove(listener);
      window.removeEventListener("click", resumeAudioContext);
      window.removeEventListener("touchstart", resumeAudioContext);
    };
  }, [scene, envMap, camera]);

  return (
    <>
      <Environment map={envMap} background={false} />
      <Sky
        distance={450000}
        sunPosition={new Vector3(100, 50, 100)}
        inclination={0.5}
        azimuth={0.25}
        mieCoefficient={0.001}
        mieDirectionalG={0.7}
        rayleigh={0.2}
        turbidity={10}
      />

      {/* Lighting */}
      <ambientLight intensity={0.5} color="#ffffff" />
      <directionalLight
        intensity={2}
        position={new Vector3(100, 50, 100)}
        castShadow
        receiveShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={1000}
        shadow-camera-near={0.1}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.001}
      />

      {/* Scene Objects */}
      <PlatformModel
        position={[0, 2, 0]}
        rotation={[0, 10, 0]}
        castShadow
        receiveShadow
      />

      <Ocean
        ref={ocean}
        dimensions={[5000, 5000]}
        normals="/assets/waternormals.jpg"
        distortionScale={0.5}
        size={4}
        options={{
          clipBias: 0.001,
          alpha: 1,
          waterColor: new Color("#1a8cff"),
          sunColor: new Color("#FDB813"),
          sunDirection: new Vector3(100, 50, 100).normalize(),
          eye: new Vector3(0, 0, 0),
          distortionScale: 100,
          side: FrontSide,
          fog: true,
        }}
      >
        {(water) => {
          water.material.uniforms.distortionScale.value = 100;
          water.material.uniforms.size.value = 4;
          return null;
        }}
      </Ocean>

      <OrbitControls
        maxPolarAngle={Math.PI / 2 - 0.3}
        minDistance={5}
        maxDistance={75}
        enablePan
        enableZoom
        enableRotate
        autoRotate={false}
        autoRotateSpeed={1}
      />

      <Preload all />
    </>
  );
};

export default Scene;
