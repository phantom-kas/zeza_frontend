import { X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  submitText?: string;
  aspectRatio?: number;
  imageFile?: File | null;
  index?: number | null;
  onCrop?: (data: { img: Blob; index?: number | null }) => void;
  onRemove?: (data: { index?: number | null }) => void;
  size?: {
    width: number,
    height: number,
  }
  quality?: number
};

export const ImageCropper: React.FC<Props> = ({
  submitText = 'Submit',
  aspectRatio = 1,
  imageFile = null,
  index = null,
  onCrop,
  onRemove,
  size = undefined,
  quality = undefined
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectionRef = useRef<any>(null); // holds <cropper-selection> once created

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [finalImg, setFinalImg] = useState<string | null>(null);

  // Turn incoming file into data URL
  useEffect(() => {
    if (!imageFile) {
      setImageSrc(null);
      return;
    }
    const rd = new FileReader();
    rd.onload = () => setImageSrc(rd.result as string);
    rd.readAsDataURL(imageFile);
  }, [imageFile]);

  // Imperatively create and mount cropper elements when imageSrc/aspectRatio changes
  useEffect(() => {
    let cancelled = false;

    async function mount() {
      if (!imageSrc || !containerRef.current) {
        // clear if no image
        if (containerRef.current) containerRef.current.innerHTML = '';
        selectionRef.current = null;
        return;
      }

      // Only run in browser
      if (typeof window === 'undefined') return;

      // Dynamically import v2 element classes
      const [
        { default: CropperCanvas },
        { default: CropperImage },
        { default: CropperHandle },
        { default: CropperSelection },
        { default: CropperShade },
        { default: CropperGrid },
      ] = await Promise.all([
        import('@cropper/element-canvas'),
        import('@cropper/element-image'),
        import('@cropper/element-handle'),
        import('@cropper/element-selection'),
        import('@cropper/element-shade'),
        import('@cropper/element-grid'),
      ]);

      // Define custom elements once
      if (!customElements.get('cropper-canvas')) CropperCanvas.$define();
      if (!customElements.get('cropper-image')) CropperImage.$define();
      if (!customElements.get('cropper-handle')) CropperHandle.$define();
      if (!customElements.get('cropper-selection')) CropperSelection.$define();
      if (!customElements.get('cropper-shade')) CropperShade.$define();
      if (!customElements.get('cropper-grid')) CropperGrid.$define();

      if (cancelled) return;

      // Create elements
      const canvasEl = document.createElement('cropper-canvas') as any;
      canvasEl.setAttribute('scale-step', '0.1');
      canvasEl.setAttribute('theme-color', '#39f');
      canvasEl.setAttribute('background', '');
      canvasEl.className = 'h-[50vh] w-min495';

      const imgEl = document.createElement('cropper-image') as any;
      imgEl.src = imageSrc;
      imgEl.alt = 'To crop';
      imgEl.setAttribute('rotatable', '');
      imgEl.setAttribute('scalable', '');
      imgEl.setAttribute('skewable', '');
      imgEl.setAttribute('translatable', '');

      const shadeEl = document.createElement('cropper-shade');

      const selectHandleEl = document.createElement('cropper-handle');
      selectHandleEl.setAttribute('action', 'select');
      selectHandleEl.setAttribute('plain', '');

      const moveHandleEl = document.createElement('cropper-handle');
      moveHandleEl.setAttribute('action', 'move');
      moveHandleEl.setAttribute('theme-color', 'rgba(255,255,255,0)');

      const selectionEl = document.createElement('cropper-selection') as any;
      selectionEl.setAttribute('aspect-ratio', String(aspectRatio));
      selectionEl.setAttribute('initial-aspect-ratio', String(aspectRatio));
      selectionEl.setAttribute('width', '200');
      selectionEl.setAttribute('height', '200');
      selectionEl.setAttribute('movable', '');
      selectionEl.setAttribute('resizable', '');
      selectionEl.setAttribute('outlined', '');

      const gridEl = document.createElement('cropper-grid');
      gridEl.setAttribute('role', 'grid');
      gridEl.setAttribute('covered', '');

      // Resize handles
      const handles = [
        'sw-resize', 'se-resize', 'ne-resize', 'nw-resize',
        'e-resize', 'w-resize', 's-resize', 'n-resize',
      ].map(action => {
        const h = document.createElement('cropper-handle');
        h.setAttribute('action', action);
        return h;
      });

      const moveInside = document.createElement('cropper-handle');
      moveInside.setAttribute('action', 'move');
      moveInside.setAttribute('theme-color', 'rgba(255,255,255,0.35)');

      // Assemble DOM
      selectionEl.appendChild(gridEl);
      handles.forEach(h => selectionEl.appendChild(h));
      selectionEl.appendChild(moveInside);

      canvasEl.appendChild(imgEl);
      canvasEl.appendChild(shadeEl);
      canvasEl.appendChild(selectHandleEl);
      canvasEl.appendChild(moveHandleEl);
      canvasEl.appendChild(selectionEl);

      // Mount
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(canvasEl);

      // Save ref to use $toCanvas() later
      selectionRef.current = selectionEl;
    }

    mount();

    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = '';
      selectionRef.current = null;
    };
  }, [imageSrc, aspectRatio]);

  const handleCrop = async () => {
    if (!selectionRef.current) return;
    const canvas: HTMLCanvasElement = await selectionRef.current.$toCanvas(size);
    canvas.toBlob((blob) => {
      if (blob && onCrop) onCrop({ img: blob, index });
    }, 'image/png', quality);
  };

  const handlePreview = async () => {
    if (!selectionRef.current) return;
    const canvas: HTMLCanvasElement = await selectionRef.current.$toCanvas(size);
    setFinalImg(canvas.toDataURL('image/png'));
    setPreviewOpen(true);
  };

  const handleRemove = () => {
    if (onRemove) onRemove({ index });
    setImageSrc(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Mount point for cropper web components */}
      <div ref={containerRef} className="w-full" />

      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        {!imageSrc ? (
          <label className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
            Select Image
            <input
              type="file"
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
          </label>
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
      </div>

      {finalImg && previewOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="not-dark:bg-white theme1cont dark:bg-black rounded-xl p-4 max-w-[1000px] w-full shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button name='cloes' type='button' className="text-red-500 text-2xl" onClick={() => setPreviewOpen(false)}>
                <X />
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
