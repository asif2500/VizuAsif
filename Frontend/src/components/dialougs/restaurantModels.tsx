import { useEffect, useRef, useState } from "react";
import type { ViewRestaurantModelProps } from "@/lib/type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Upload, Image, Box, QrCode } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/redux/hook";
import { save3DModelForRestaurantAPI } from "@/apis/restaurant.api";
import { Validation } from "../ui/validation";

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
            <p className="font-medium text-sm hover:text-primary cursor-pointer">
              {title}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const ModelThumbnailCard = ({ model }: { model: any }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async (model: any) => {
    try {
      setDownloading(true);
      const qrValue = `https://vizu.app/models/${model._id}`;

      // Import QR code library dynamically
      const QRCodeLib = await import("qrcode");

      // Create canvas element
      const canvas = document.createElement("canvas");

      // Generate QR code directly to canvas
      await QRCodeLib.toCanvas(canvas, qrValue, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      });

      // Convert to PNG and download
      const pngUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `${model.title || "model"}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("QR download failed", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="rounded-xl border p-3 space-y-2">
      <img
        src={model.thumbnailUrl}
        alt={model.title}
        className="w-full h-32 object-cover rounded-md"
      />

      <div className="flex items-center justify-between">
        <p className="text-sm font-medium truncate">{model.title}</p>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDownload(model)}
          disabled={downloading}
          className="cursor-pointer hover:bg-gray-100"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <QrCode className="w-4 h-4 hover:text-black" />
          )}
        </Button>
      </div>
    </div>
  );
};

const RestaurantModels = ({
  restaurantID,
  open,
  onClose,
}: ViewRestaurantModelProps) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");
  const [models, setModels] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<{
    title: string;
    glb: File | null;
    usdz: File | null;
    thumbnail: File | null;
  }>({
    title: "",
    glb: null,
    usdz: null,
    thumbnail: null,
  });

  const canSave = form.glb && form.usdz && form.thumbnail;

  const handleSave = () => {
    const formData = new FormData();
    formData.append("glb", form.glb!);
    formData.append("usdz", form.usdz!);
    formData.append("thumbnail", form.thumbnail!);

    save3DModelForRestaurantAPI(
      restaurantID,
      formData,
      onClose,
      setForm,
      setLoading,
      setError
    )(dispatch);
  };

  useEffect(() => {
    setModels([
      {
        title: "Stake of Koila chai",
        glbUrl:
          "https://res.cloudinary.com/dyyfyyb8u/image/upload/v1766747116/make_me_a_fruit_bowl_yduqvp.glb",
        usdzUrl:
          "https://developer.apple.com/augmented-reality/quick-look/models/teapot/teapot.usdz",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1695390837115-408e49a2041e?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        _id: "123",
        isActive: true,
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
    ]);
  }, []);
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
            {models.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm">Existing Models</Label>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {models.map((model) => (
                    <ModelThumbnailCard key={model._id} model={model} />
                  ))}
                </div>

                <div className="border-t my-4" />
              </div>
            )}

            <Label className="text-sm text-muted-foreground">
              Upload all 3 files to activate this model
            </Label>

            <Input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UploadCard
                title="GLB / GLTF Model"
                description="Upload 3D model for Android & Web"
                icon={<Box className="mx-auto w-6 h-6" />}
                accept=".glb,.gltf"
                file={form.glb}
                previewUrl={form.glb ? URL.createObjectURL(form.glb) : null}
                onSelect={(file: File) => setForm({ ...form, glb: file })}
              />

              <UploadCard
                title="USDZ Model"
                description="Upload 3D model for iOS AR"
                icon={<Upload className="mx-auto w-6 h-6" />}
                accept=".usdz"
                file={form.usdz}
                previewUrl={form.usdz ? URL.createObjectURL(form.usdz) : null}
                onSelect={(file: File) => setForm({ ...form, usdz: file })}
              />

              <UploadCard
                title="Thumbnail"
                description="Upload thumbnail image for the model"
                icon={<Image className="mx-auto w-6 h-6" />}
                accept=".jpg,.jpeg,.png"
                file={form.thumbnail}
                previewUrl={
                  form.thumbnail ? URL.createObjectURL(form.thumbnail) : null
                }
                onSelect={(file: File) => setForm({ ...form, thumbnail: file })}
              />
            </div>
<Validation visible={error !== ""} text={error} />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={!canSave} onClick={handleSave}>
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
