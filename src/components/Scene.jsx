import {
  Environment,
  OrbitControls,
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
import { Model } from "./platform";

export function Scene({ onLoaded }) {
  const ocean = useRef();
  const { scene, camera } = useThree();

  const envMap = useEnvironment({
    files: "/assets/clouds.hdr",
  });

  useEffect(() => {
    scene.background = envMap;

    // Add humming sound
    const listener = new AudioListener();
    camera.add(listener);

    const audio = new Audio(listener);
    const audioLoader = new AudioLoader();
    audioLoader.load("/assets/waves.mp3", (buffer) => {
      audio.setBuffer(buffer);
      audio.setLoop(true);
      audio.setVolume(0.3);
      audio.play();
    });

    return () => {
      camera.remove(listener);
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

      <Model
        position={[0, 2, 0]}
        rotation={[0, 10, 0]}
        castShadow
        receiveShadow
      />

      <Ocean
        ref={ocean}
        dimensions={[4000, 4000]}
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
    </>
  );
}
