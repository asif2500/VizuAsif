import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Box3, Vector3, Group } from "three";
import { useEffect, useRef } from "react";
import type { UrlProps } from "@/lib/type";



export default function AutoFitModel({ glbUrl }: UrlProps) {
  const { scene } = useGLTF(glbUrl);
  const group = useRef<Group>(null!);
  const { camera } = useThree();

  useEffect(() => {
    if (!scene || !group.current) return;

    // 1️⃣ Compute bounding box
    const box = new Box3().setFromObject(scene);

    // 2️⃣ Get size & center
    const size = box.getSize(new Vector3());
    const center = box.getCenter(new Vector3());

    // 3️⃣ Center the model
    scene.position.sub(center);

    // 4️⃣ Calculate scale factor
    const maxDimension = Math.max(size.x, size.y, size.z);
    const fitScale = 2.5 / maxDimension;

    group.current.scale.setScalar(fitScale);

    // 5️⃣ Adjust camera
    camera.position.set(0, 1.5, 4);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [scene, camera]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}
