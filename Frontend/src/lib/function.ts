export const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
export const isAndroid = /Android/.test(navigator.userAgent);

export const launchAR = (glbUrl:string,usdzUrl?:string) => {
    if (isAndroid) {
      const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
        glbUrl
      )}&mode=ar_preferred`;

      window.location.href = sceneViewerUrl;
    } 
    else if (isIOS && usdzUrl) {
      window.location.href = usdzUrl;
    } 
    else {
      alert("AR not supported on this device");
    }
  };