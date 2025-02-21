import React from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { MathUtils, MeshStandardMaterial } from "three";

export function Model(props) {
  const { scene } = useGLTF("/assets/ibda_platform_v1.glb");

  // Load a single texture
  const texture = useTexture("/assets/texture5.jpg");

  // Apply the metallic material to all child meshes in the model
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new MeshStandardMaterial({
        map: texture,
        metalness: 0.9, // High metalness for a metallic look
        roughness: 0.2, // Low roughness for a shiny, reflective surface
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/assets/ibda_platform_v1.glb");
