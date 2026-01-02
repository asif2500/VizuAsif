import { useRef, useState } from "react";
import type { ViewRestaurantModelProps } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, Image, Box } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UploadCard = ({
  title,
  icon,
  accept,
  file,
  onSelect,
  previewUrl,
}: any) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        onChange={(e) => onSelect(e.target.files?.[0] ?? null)}
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border border-dashed p-6 text-center hover:border-primary transition"
      >
        {file ? (
          <p className="text-sm font-medium">{file.name}</p>
        ) : previewUrl ? (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Already uploaded</p>
            {accept.includes("image") ? (
              <img
                src={previewUrl}
                className="w-24 h-24 mx-auto rounded-md object-cover"
              />
            ) : (
              <a
                href={previewUrl}
                target="_blank"
                className="text-sm underline text-primary"
              >
                View file
              </a>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {icon}
            <p className="font-medium">{title}</p>
          </div>
        )}
      </div>
    </>
  );
};

const RestaurantModels = ({ open, onClose }: ViewRestaurantModelProps) => {
  const { loading, models } = useAppSelector((state) => state.restaurant);

  const model = models?.[0];

  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [usdzFile, setUsdzFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const canSave = glbFile && usdzFile && imageFile;

  const handleSave = () => {
    const formData = new FormData();
    formData.append("glb", glbFile!);
    formData.append("usdz", usdzFile!);
    formData.append("thumbnail", imageFile!);

    console.log("Uploading models...");
    // call API here
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Restaurant Models</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            <Label className="text-sm text-muted-foreground">
              Upload all 3 files to activate this model
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UploadCard
                title="GLB / GLTF Model"
                description="Upload 3D model for Android & Web"
                icon={<Box className="mx-auto w-6 h-6" />}
                accept=".glb,.gltf"
                file={glbFile}
                previewUrl={model?.glbUrl}
                onSelect={setGlbFile}
              />

              <UploadCard
                title="USDZ Model"
                description="Upload 3D model for iOS AR"
                icon={<Upload className="mx-auto w-6 h-6" />}
                accept=".usdz"
                file={usdzFile}
                previewUrl={model?.usdzUrl}
                onSelect={setUsdzFile}
              />

              <UploadCard
                title="Fallback Image"
                description="Shown if 3D is not supported"
                icon={<Image className="mx-auto w-6 h-6" />}
                accept=".jpg,.jpeg,.png"
                file={imageFile}
                previewUrl={model?.thumbnail}
                onSelect={setImageFile}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                disabled={!canSave}
                onClick={handleSave}
              >
                Save & Upload
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RestaurantModels;
