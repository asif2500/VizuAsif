import { useGLTF } from "@react-three/drei";
import { Group } from "three";
import { useRef } from "react";

type ModelProps = {
  url: string;
};

export default function GltfModel({ url }: ModelProps) {
  const group = useRef<Group>(null!);

  // Load GLTF / GLB
  const { scene } = useGLTF(url);

  return (
    <group ref={group} dispose={null}>
      <primitive
        object={scene}
        scale={1.5}
        position={[0, -1, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}
