import { Canvas } from "@react-three/fiber";
import AutoFitModel from "./AutoFitModel";
import type { UrlProps } from "@/lib/type";
import { isIOS } from "@/lib/function";
import { OrbitControls } from "@react-three/drei";

const ModelViewer = ({ glbUrl, usdzUrl }: UrlProps) => {
  if (isIOS && usdzUrl) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">View in AR</p>

        <a
          href={usdzUrl}
          rel="ar"
          className="px-4 py-2 rounded-md bg-black text-white"
        >
          Open AR
        </a>
      </div>
    );
  }

  return (
    <Canvas camera={{ position: [0, 1.5, 4], fov: 50 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} />
      <AutoFitModel glbUrl={glbUrl} usdzUrl={usdzUrl} />
      <OrbitControls />
    </Canvas>
  );
};

export default ModelViewer;
