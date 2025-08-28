import React, { useEffect, useRef, useState } from 'react';
 // note: adjust imports as needed
import '@cropper/element-canvas';
import '@cropper/element-image';
import '@cropper/element-selection';
import '@cropper/element-handle';
import '@cropper/element-grid';
import '@cropper/element-shade';
import type CropperSelection from '@cropper/element-selection';

type Props = {
  submitText?: string;
  aspectRatio?: number;
  imageFile?: File | null;
  index?: number | null;
  onCrop?: (data: { img: Blob; index?: number | null }) => void;
  onRemove?: (data: { index?: number | null }) => void;
};

export const ImageCropper: React.FC<Props> = ({
  submitText = 'Submit',
  aspectRatio = 1,
  imageFile = null,
  index = null,
  onCrop,
  onRemove
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [finalImg, setFinalImg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const selectionRef = useRef<CropperSelection | null>(null);

  // Convert file to data URL on change
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageSrc(null);
    }
  }, [imageFile]);

  const handleCrop = async () => {
    if (!selectionRef.current) return;
    const canvas = await selectionRef.current.$toCanvas();
    canvas.toBlob((blob) => {
      if (blob && onCrop) onCrop({ img: blob, index });
    }, 'image/jpeg');
  };

  const handlePreview = async () => {
    if (!selectionRef.current) return;
    const canvas = await selectionRef.current.$toCanvas();
    setFinalImg(canvas.toDataURL('image/jpeg'));
    setPreview(true);
  };

  const handleRemove = () => {
    if (onRemove) onRemove({ index });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {imageSrc && (
        <cropper-canvas scale-step="0.1" theme-color="#39f" background class="h-[50vh] w-min495">
          <cropper-image src={imageSrc} alt="To crop" rotatable scalable skewable translatable />
          <cropper-shade hidden />
          <cropper-handle action="select" plain />
          <cropper-handle action="move" theme-color="rgba(255,255,255,0)" />
          <cropper-selection
            aspectratio={aspectRatio}
            width="200"
            height="200"
            initialaspectratio={aspectRatio}
            movable
            resizable
            outlined
            ref={selectionRef}
          >
            <cropper-grid role="grid" covered />
            <cropper-handle action="sw-resize" />
            <cropper-handle action="se-resize" />
            <cropper-handle action="ne-resize" />
            <cropper-handle action="nw-resize" />
            <cropper-handle action="e-resize" />
            <cropper-handle action="w-resize" />
            <cropper-handle action="s-resize" />
            <cropper-handle action="n-resize" />
            <cropper-handle action="move" theme-color="rgba(255,255,255,0.35)" />
          </cropper-selection>
        </cropper-canvas>
      )}

      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        {!imageSrc ? (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Image
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleCrop}
          >
            {submitText}
          </button>
        )}

        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleRemove}
        >
          Clear
        </button>

        {imageSrc && (
          <button
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            onClick={handlePreview}
          >
            Preview
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.avif,.webp,.tiff"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            if (file) {
              const reader = new FileReader();
              reader.onload = (ev) => setImageSrc(ev.target?.result as string);
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>

      {finalImg && preview && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center"
          onClick={() => setPreview(false)}
        >
          <div className="bg-white rounded-xl p-4 max-w-[1000px] w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end mb-4">
              <button className="text-red-500 text-2xl" onClick={() => setPreview(false)}>
                ×
              </button>
            </div>
            <div className="flex justify-center items-center pt-4 pb-2">
              <img src={finalImg} className="max-w-full max-h-[80vh] rounded" alt="Preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

