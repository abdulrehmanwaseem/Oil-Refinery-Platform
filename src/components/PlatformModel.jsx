import { useGLTF, useTexture } from "@react-three/drei";
import React from "react";
import { MeshStandardMaterial } from "three";

export function PlatformModel(props) {
  const { scene } = useGLTF("/assets/ibda_platform_v1.glb");

  const texture = useTexture("/assets/texture5.jpg");

  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({
        map: texture,
        metalness: 1,
        roughness: 0.7,
        opacity: 0.8,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/assets/ibda_platform_v1.glb");
