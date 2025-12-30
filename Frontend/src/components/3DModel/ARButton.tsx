import { launchAR } from "@/lib/function";
import type { UrlProps } from "@/lib/type";

  export default function ARButton({ glbUrl, 
  //  usdzUrl
   }: UrlProps) {
  
    return (
      <button
        onClick={() => launchAR(glbUrl)}
        className="px-6 py-3 rounded-xl bg-black text-white text-lg font-semibold"
      >
        View in AR
      </button>
    );
  }
  