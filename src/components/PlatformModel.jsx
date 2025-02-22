import { useGLTF, useTexture } from "@react-three/drei";
import React, { useState, useEffect } from "react";

export function PlatformModel({ toggleTexture, ...props }) {
  const { nodes } = useGLTF("/assets/platform.glb");

  // Load both textures
  const texture2 = useTexture("/assets/texture2.jpg");
  const texture1 = useTexture("/assets/texture1.jpg");

  // Rotate both textures
  texture2.center.set(0.5, 0.5);
  texture2.rotation = Math.PI;
  texture1.center.set(0.5, 0.5);
  texture1.rotation = Math.PI;

  const [hovered, setHovered] = useState(null);
  const [activeTexture, setActiveTexture] = useState(texture1); // Default to texture11

  // Switch texture based on prop
  useEffect(() => {
    setActiveTexture(toggleTexture ? texture2 : texture1);
  }, [toggleTexture]);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(e.object.name);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(null);
    document.body.style.cursor = "auto";
  };

  const meshKeys = Object.keys(nodes).filter((key) => nodes[key].isMesh);

  return (
    <group {...props} dispose={null}>
      {meshKeys.map((key) => {
        const node = nodes[key];
        return (
          <mesh
            key={key}
            geometry={node.geometry}
            name={key}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              map={activeTexture}
              metalness={0.4}
              roughness={0.7}
              transparent
              opacity={hovered === key ? 0.65 : 1}
            />
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload("/assets/platform.glb");
