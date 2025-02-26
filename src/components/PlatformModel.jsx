import { useGLTF, useTexture } from "@react-three/drei";
import React, { useState } from "react";

export function PlatformModel({ selectedAsset, ...props }) {
  const { nodes } = useGLTF("/assets/platform.glb");
  const texture = useTexture("/assets/texture2.jpg");
  texture.center.set(0.5, 0.5);
  texture.rotation = Math.PI;

  const [hovered, setHovered] = useState(null);

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
  console.log(selectedAsset);

  const meshKeys = Object.keys(nodes).filter((key) => nodes[key].isMesh);

  return (
    <group {...props} dispose={null}>
      {meshKeys.map((key) => {
        const node = nodes[key];
        console.log(key);
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
              map={texture}
              metalness={0.2}
              roughness={0.7}
              transparent
              opacity={hovered === key ? 0.75 : 1}
              emissive={selectedAsset === key ? "red" : "black"}
              emissiveIntensity={selectedAsset === key ? 0.8 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

useGLTF.preload("/assets/platform.glb");
