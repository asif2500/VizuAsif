import { Canvas } from "@react-three/fiber";
import AutoFitModel from "./AutoFitModel";
import type { UrlProps } from "@/lib/type";
import { isIOS } from "@/lib/function";
import { OrbitControls } from "@react-three/drei";

const ModelViewer = ({ glbUrl, usdzUrl }: UrlProps) => {

if (isIOS && usdzUrl) {
    return (
      <div className="flex flex-col items-center gap-3">
<a
      href="../../assets/MER_static.usdz"
      rel="ar"
      style={{
        display: "inline-block",
        padding: "12px 20px",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        textDecoration: "none"
      }}
    >
      View in AR
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
