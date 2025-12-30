import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import GltfModel from "@/components/common/GLTFModel";
import ARButton from "@/components/3DModel/ARButton";
import ModelViewer from "@/components/3DModel/ModelViewer";

const UserModelPage = () => {
  const [searchParams] = useSearchParams();

  // Get value from QR URL
  const code = searchParams.get("code");
  const [gltfUrl, setGltfUrl] = useState<string>("");
  const [usdzUrl,setUsdzUrl]= useState<string>("")
  useEffect(() => {
    if (!code) {
      console.log("Invalid QR code");
      return;
    }

    console.log("QR Code value:", code);
    setGltfUrl(`https://res.cloudinary.com/dyyfyyb8u/image/upload/v1766747116/make_me_a_fruit_bowl_yduqvp.glb`);
setUsdzUrl("https://res.cloudinary.com/dyyfyyb8u/image/upload/v1767017221/MER_static_f3e6qf.usdz")
    // NEXT STEP (later)
    // call API using this code
    // fetchUserByQr(code)
  }, [code]);
  // setGltfUrl(`https://marceltech.com/demo/glbs/sarfaraz.glb`);

  //   <Canvas>
  //   <ambientLight intensity={0.8} />
  //   <directionalLight position={[5, 5, 5]} />
  //   <GltfModel url={gltfUrl} />
  //   <OrbitControls />
  // </Canvas>

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="border rounded-lg  text-center w-full h-full">
        {code ? (
          <div className="h-screen flex flex-col">
            {/* AR Button */}
            <div className="p-4 flex justify-center">
              <ARButton glbUrl={gltfUrl} usdzUrl={usdzUrl} />
            </div>
            {/* 3D Preview */}
            <div className="flex-1">
            <ModelViewer glbUrl={gltfUrl} usdzUrl={usdzUrl}/>
            </div>
          </div>
        ) : (
          <p className="text-red-500">Invalid or missing QR code</p>
        )}
      </div>
    </div>
  );
};

export default UserModelPage;
